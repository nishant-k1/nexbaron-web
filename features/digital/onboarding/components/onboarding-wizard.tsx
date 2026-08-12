"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  MessageSquare,
  Rocket,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAuth } from "@/components/auth/auth-context";
import { formatCalendarDate, LaunchTracker } from "@/components/tracking/launch-tracker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePlans } from "@/features/digital/catalog";
import { PlanServicesEditor } from "@/features/digital/components/plan-services-editor";
import {
  createCheckout,
  verifyPayment,
  type VerifyPaymentResponse,
} from "@/features/digital/payments";
import { loadPlanSelection } from "@/features/digital/plan-selection";
import {
  buildStageSchedule,
  computeLaunchTimeline,
  computePrepared,
  createDefaultSelection,
  selectionFromSaved,
  type PlanSelection,
} from "@/features/digital/plan-summary";
import { formatINR } from "@/features/digital/plans";
import { loadRazorpayScript, type RazorpayPaymentResponse } from "@/features/digital/razorpay";
import { buildWhatsAppLink } from "@/lib/divisions";
import { getDraft, saveDraft, selectionToDraftState, type DraftFields } from "@/lib/draft";

type PlanId = "launch" | "growth" | "scale";

const wizardSchema = z.object({
  plan: z.string().min(1, "Select a plan"),
  businessName: z.string().min(2, "Please enter your business name"),
  ownerName: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Enter a valid WhatsApp number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  city: z.string().min(2, "Please enter your city"),
  services: z.string().min(5, "Tell us what you offer (minimum 5 characters)"),
  hours: z.string().optional(),
  address: z.string().optional(),
  visitorAction: z.string().min(1, "Select what you want visitors to do"),
  notes: z.string().optional(),
});

type WizardValues = z.infer<typeof wizardSchema>;

const stepNames = ["Business Details", "Photos & Upload", "Payment"];

const visitorActions = [
  "Call you",
  "WhatsApp you",
  "Book an appointment",
  "Visit your shop",
  "Order online",
  "Send an enquiry",
];

export function OnboardingWizard({ initialPlan }: { initialPlan?: string }) {
  const router = useRouter();
  const { user, initialized, openSignIn } = useAuth();
  const { plans } = usePlans();
  const [step, setStep] = useState(0);
  const [logoFiles, setLogoFiles] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paidOrder, setPaidOrder] = useState<VerifyPaymentResponse | null>(null);
  const [confirmedLaunchDays, setConfirmedLaunchDays] = useState(7);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dialogPlanId, setDialogPlanId] = useState<PlanId>((initialPlan as PlanId) || "launch");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [loadedDraft, setLoadedDraft] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getPlan = useCallback((id: string) => plans.find((p) => p.id === id) ?? plans[0]!, [plans]);
  const [activePlanId, setActivePlanId] = useState<PlanId>((initialPlan as PlanId) || "launch");
  const planId = activePlanId as string;

  const [selections, setSelections] = useState<Record<string, PlanSelection>>(() => {
    const loaded = loadPlanSelection();
    return Object.fromEntries(
      plans.map((plan) => [plan.id, selectionFromSaved(plan, loaded?.plans[plan.id])]),
    );
  });

  const getSelection = useCallback(
    (id: string): PlanSelection => selections[id] ?? createDefaultSelection(getPlan(id)),
    [selections, getPlan],
  );

  const toggleService = (id: string, serviceId: string) => {
    setSelections((prev) => {
      const current = prev[id] ?? createDefaultSelection(getPlan(id));
      const next = new Set(current.selected);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return { ...prev, [id]: { ...current, selected: next } };
    });
  };

  const toggleAddOn = (id: string, addOnId: string) => {
    setSelections((prev) => {
      const current = prev[id] ?? createDefaultSelection(getPlan(id));
      const next = new Set(current.addOns);
      if (next.has(addOnId)) {
        next.delete(addOnId);
      } else {
        next.add(addOnId);
      }
      return { ...prev, [id]: { ...current, addOns: next } };
    });
  };

  const setAddOnCount = (id: string, addOnId: string, count: number) => {
    setSelections((prev) => {
      const current = prev[id] ?? createDefaultSelection(getPlan(id));
      const next = new Set(current.addOns);
      const nextCounts = { ...current.addOnCounts };
      if (count > 0) {
        next.add(addOnId);
        nextCounts[addOnId] = count;
      } else {
        next.delete(addOnId);
        delete nextCounts[addOnId];
      }
      return { ...prev, [id]: { ...current, addOns: next, addOnCounts: nextCounts } };
    });
  };

  const toggleInherited = (id: string) => {
    setSelections((prev) => {
      const current = prev[id] ?? createDefaultSelection(getPlan(id));
      return { ...prev, [id]: { ...current, inheritedOn: !current.inheritedOn } };
    });
  };

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: { plan: activePlanId },
  });

  const prepared = useMemo(
    () => computePrepared(plans, (id) => getSelection(id)),
    [plans, getSelection],
  );

  const chosen = prepared.find((p) => p.plan.id === planId) ?? prepared[0]!;
  const dialogChosen = prepared.find((p) => p.plan.id === dialogPlanId) ?? prepared[0]!;

  const launchTimeline = useMemo(
    () => computeLaunchTimeline(plans, getSelection, planId),
    [plans, getSelection, planId],
  );

  const launchLabel =
    chosen.plan.timelineMode === "phased"
      ? chosen.plan.timeline
      : `Web live by ${formatCalendarDate(launchTimeline.launchDate)}`;

  // Load the server draft for a signed-in user and prefill the form + selections.
  useEffect(() => {
    if (!initialized || !user || loadedDraft) return;
    let cancelled = false;
    (async () => {
      try {
        const draft = await getDraft();
        if (cancelled) return;
        setLoadedDraft(true);
        if (draft) {
          if (draft.planId) setActivePlanId((draft.planId as PlanId) || "launch");
          setSelections((prev) => ({
            ...prev,
            ...Object.fromEntries(
              plans.map((plan) => [plan.id, selectionFromSaved(plan, draft.plans?.[plan.id])]),
            ),
          }));
          reset({
            plan: draft.planId || activePlanId || "",
            businessName: draft.fields?.businessName || "",
            ownerName: draft.fields?.ownerName || user.name || "",
            phone: draft.fields?.phone || user.phone || "",
            email: draft.fields?.email || user.email || "",
            city: draft.fields?.city || "",
            services: draft.fields?.services || "",
            hours: draft.fields?.hours || "",
            address: draft.fields?.address || "",
            visitorAction: draft.fields?.visitorAction || "",
            notes: draft.fields?.notes || "",
          });
          setStep(draft.step || 0);
        } else {
          // First-time signed-in user: prefill from the account.
          reset({
            plan: activePlanId,
            ownerName: user.name || "",
            phone: user.phone || "",
            email: user.email || "",
          });
        }
      } catch {
        // fall back to account prefill
        setLoadedDraft(true);
        reset({
          plan: activePlanId,
          ownerName: user.name || "",
          phone: user.phone || "",
          email: user.email || "",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialized, user, loadedDraft, activePlanId, reset, plans]);

  // Debounced: persist the draft + form fields to the server as the user edits.
  useEffect(() => {
    if (!initialized || !user || !loadedDraft || confirmed) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      setSaving(true);
      const values = getValues();
      const fields: DraftFields = {
        businessName: values.businessName,
        ownerName: values.ownerName,
        phone: values.phone,
        email: values.email,
        city: values.city,
        services: values.services,
        hours: values.hours,
        address: values.address,
        visitorAction: values.visitorAction,
        notes: values.notes,
      };
      try {
        await saveDraft({
          planId,
          plans: Object.fromEntries(
            plans.map((plan) => [plan.id, selectionToDraftState(getSelection(plan.id))]),
          ),
          fields,
          step,
        });
        setSavedAt(new Date());
      } catch {
        // silent — retried on next change
      } finally {
        setSaving(false);
      }
    }, 800);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections, step, initialized, user, loadedDraft, confirmed, getValues, activePlanId]);

  const openUpdateDialog = () => {
    setDialogPlanId(activePlanId);
    setShowUpdateDialog(true);
  };

  const applyDialogPlan = () => {
    const next = dialogPlanId;
    setShowUpdateDialog(false);
    if (next === activePlanId) return;
    setActivePlanId(next);
    setValue("plan", next);
    router.replace(`/digital/onboarding?plan=${next}`, { scroll: false });
  };

  if (initialized && !user) {
    return (
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-12 backdrop-blur-xl text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-teal-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-3">Sign in to continue</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          You need an account to save your progress and complete your{" "}
          {getPlan(planId as string).name} plan. Login or create one in a few seconds.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="cursor-pointer bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl"
            onClick={() => openSignIn()}
          >
            Sign in or create account
          </Button>
        </div>
      </div>
    );
  }
  const summary = {
    plan: chosen.plan,
    oneTimeTotal: chosen.oneTimeTotal,
    monthlyTotal: chosen.monthlyTotal,
    services: chosen.plan.services.filter((s) => chosen.serviceSelection[s.id]),
    addOns: chosen.plan.addOns
      .filter((s) => chosen.addOnSelection[s.id])
      .map((s) => ({ ...s, count: chosen.addOnCounts[s.id] ?? 1 })),
    inheritedActive: chosen.inherited?.active ?? false,
    inheritedLabel: chosen.inherited?.anySelected ? chosen.inherited.label : null,
    inheritedPrice: {
      setup: chosen.inherited?.setup ?? 0,
      monthly: chosen.inherited?.monthly ?? 0,
    },
  };

  const plan = getPlan(planId as string);

  const stepFields: (keyof WizardValues)[][] = [
    [
      "plan",
      "businessName",
      "ownerName",
      "phone",
      "email",
      "city",
      "services",
      "hours",
      "address",
      "visitorAction",
    ],
    ["notes"],
    [],
  ];

  const goNext = async () => {
    if (step === 0) {
      const valid = await trigger(stepFields[0]);
      if (!valid) return;
    }
    if (step === 1) {
      if (logoFiles.length === 0 && photoFiles.length === 0) {
        const wantsToSkip = window.confirm(
          "No photos or logo yet? That's fine — you can send them on WhatsApp later. Continue?",
        );
        if (!wantsToSkip) return;
      }
    }
    setStep((s) => Math.min(s + 1, stepNames.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handlePayment = async (): Promise<void> => {
    const valid = await trigger(stepFields[2]);
    if (!valid) return;
    const values = getValues();
    setPaying(true);
    setPaymentError(null);

    try {
      const checkout = await createCheckout({
        planId,
        selections: {
          planId,
          plans: Object.fromEntries(
            plans.map((p) => {
              const selection = getSelection(p.id);
              return [
                p.id,
                {
                  selected: Array.from(selection.selected),
                  addOns: Array.from(selection.addOns),
                  addOnCounts: selection.addOnCounts,
                  inheritedOn: selection.inheritedOn,
                },
              ];
            }),
          ),
        },
        customer: {
          name: values.ownerName,
          email: values.email || undefined,
          phone: values.phone,
          company: values.businessName,
          city: values.city,
          services: values.services,
          notes: values.notes,
          address: values.address,
        },
      });

      // Dev/test mode (no live Razorpay keys yet): simulate a successful
      // payment so the whole flow is tappable end-to-end.
      if (checkout.devMode) {
        setConfirmedLaunchDays(checkout.launchDays);
        const verified = await verifyPayment({
          razorpay_order_id: checkout.razorpayOrderId,
          razorpay_payment_id: "dev_payment",
          razorpay_signature: "dev_signature",
        });
        setPaidOrder(verified);
        setConfirmed(true);
        return;
      }

      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) {
        setPaymentError(
          "We couldn't load the secure payment window. Please try again or message us on WhatsApp.",
        );
        return;
      }

      const rzp = new window.Razorpay({
        key: checkout.razorpayKeyId,
        amount: checkout.amount * 100,
        currency: "INR",
        name: "Nexbaron Digital",
        description: `${plan.name} plan — ${checkout.invoiceNumber}`,
        order_id: checkout.razorpayOrderId,
        prefill: {
          name: values.ownerName,
          email: values.email || undefined,
          contact: values.phone,
        },
        theme: { color: "#14b8a6" },
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            setConfirmedLaunchDays(checkout.launchDays);
            const verified = await verifyPayment(response);
            setPaidOrder(verified);
            setConfirmed(true);
          } catch {
            setPaymentError(
              "Payment succeeded but we couldn't confirm it yet. Your invoice is on its way — message us on WhatsApp and we'll sort it immediately.",
            );
          }
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },
      });
      rzp.open();
    } catch (error) {
      setPaymentError(
        error instanceof Error ? error.message : "Could not start checkout. Please try again.",
      );
      setPaying(false);
    }
  };

  if (confirmed) {
    return (
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-12 backdrop-blur-xl text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-teal-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-3">
          Payment Received. Your Launch Is Booked.
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Your {plan.name} plan is confirmed and your GST invoice is on its way to your email.
          {paidOrder?.launchDate && (
            <span className="text-teal-300 font-semibold">
              {" "}
              Your launch date: {formatCalendarDate(new Date(paidOrder.launchDate))}.
            </span>
          )}
        </p>
        {paidOrder?.invoiceNumber && (
          <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
            Invoice {paidOrder.invoiceNumber}
          </div>
        )}
        {paidOrder?.launchDate && (
          <div className="mt-8 text-left">
            <LaunchTracker
              launchDays={confirmedLaunchDays}
              launchDate={new Date(paidOrder.launchDate)}
              stages={buildStageSchedule(confirmedLaunchDays)}
              prefix="Your Launch Timeline"
            />
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="cursor-pointer bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl"
          >
            <a
              href={buildWhatsAppLink(
                "digital",
                "Hi Nexbaron Digital, I just paid for the " +
                  plan.name +
                  " plan (invoice " +
                  (paidOrder?.invoiceNumber ?? "") +
                  ").",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Chat With Us
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="cursor-pointer font-bold rounded-xl"
          >
            <a href="/digital/process">See What Happens Next</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden">
      {/* Progress */}
      <div className="px-8 pt-8">
        <div className="flex items-center justify-between max-w-xl mb-2">
          {stepNames.map((name, index) => (
            <div key={name} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  index < step
                    ? "bg-teal-500 text-slate-950"
                    : index === step
                      ? "bg-teal-500/20 border border-teal-500/50 text-teal-300"
                      : "bg-white/5 border border-white/10 text-slate-500"
                }`}
              >
                {index < step ? "✓" : index + 1}
              </div>
              <span
                className={`hidden sm:inline text-xs font-medium ${
                  index <= step ? "text-white" : "text-slate-500"
                }`}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 w-full max-w-xl bg-white/10 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / stepNames.length) * 100}%` }}
          />
        </div>
        {savedAt && (
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
            {saving ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Saving your progress…
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(handlePayment)} className="p-8">
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-1">
                Your Business Details
              </h2>
              <p className="text-sm text-slate-400">
                About 10 minutes. Everything is plain English.
              </p>
            </div>

            <div>
              <Label htmlFor="plan">
                Your Plan <span className="text-red-500">*</span>
              </Label>
              <input type="hidden" value={activePlanId} {...register("plan")} />
              <div className="mt-2">
                <div
                  className={`rounded-2xl border p-6 ${
                    plan.featured
                      ? "border-teal-500/40 bg-teal-500/10"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-heading font-bold text-white">
                          {summary.plan.name}
                        </span>
                        {plan.featured && (
                          <span className="text-[9px] font-mono text-slate-950 px-1.5 py-0.5 rounded bg-teal-400 font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-heading font-extrabold text-white">
                        {formatINR(summary.oneTimeTotal)}
                        <span className="text-xs text-slate-400 ml-1 font-normal">one-time</span>
                      </div>
                      <div className="text-sm text-slate-300 mt-0.5">
                        + {formatINR(summary.monthlyTotal)}
                        <span className="text-xs text-slate-400">/month</span>
                      </div>
                      <div className="text-[10px] font-mono text-teal-400 mt-2">{launchLabel}</div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={openUpdateDialog}
                      className="cursor-pointer cursor-pointer shrink-0 rounded-lg border-teal-500/40 text-teal-300 hover:bg-teal-500/10 hover:text-teal-200"
                    >
                      Update Your Plan
                    </Button>
                  </div>
                </div>

                {summary.inheritedActive && summary.inheritedLabel && (
                  <div className="mt-3 p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
                    <div className="text-xs font-semibold text-teal-200">
                      {summary.inheritedLabel} included
                    </div>
                    <div className="text-[10px] font-mono text-teal-500/80 mt-0.5">
                      {formatINR(summary.inheritedPrice.setup)} one-time ·{" "}
                      {formatINR(summary.inheritedPrice.monthly)}/month
                    </div>
                  </div>
                )}
              </div>
              {errors.plan && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.plan.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessName">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  placeholder="e.g. Sharma Sweets"
                  className="mt-2 rounded-lg"
                  aria-invalid={errors.businessName ? "true" : "false"}
                  {...register("businessName")}
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {errors.businessName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="ownerName">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ownerName"
                  placeholder="Full name"
                  className="mt-2 rounded-lg"
                  aria-invalid={errors.ownerName ? "true" : "false"}
                  {...register("ownerName")}
                />
                {errors.ownerName && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">
                  WhatsApp Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="mt-2 rounded-lg"
                  aria-invalid={errors.phone ? "true" : "false"}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@business.com"
                  className="mt-2 rounded-lg"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  className="mt-2 rounded-lg"
                  aria-invalid={errors.city ? "true" : "false"}
                  {...register("city")}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="services">
                What do you offer? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="services"
                rows={3}
                placeholder="e.g. Haircuts, colouring, facials — or samosas, sweets, catering"
                className="mt-2 rounded-lg"
                aria-invalid={errors.services ? "true" : "false"}
                {...register("services")}
              />
              {errors.services && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.services.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="hours">Opening Hours (optional)</Label>
                <Input
                  id="hours"
                  placeholder="e.g. Mon–Sat, 10am to 8pm"
                  className="mt-2 rounded-lg"
                  {...register("hours")}
                />
              </div>
              <div>
                <Label htmlFor="address">Address (optional)</Label>
                <Input
                  id="address"
                  placeholder="Shop / office address"
                  className="mt-2 rounded-lg"
                  {...register("address")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="visitorAction">
                What should visitors do? <span className="text-red-500">*</span>
              </Label>
              <select
                id="visitorAction"
                className="mt-2 flex h-10 w-full border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg aria-[invalid=true]:border-red-500 [&>option]:text-slate-900"
                aria-invalid={errors.visitorAction ? "true" : "false"}
                defaultValue=""
                {...register("visitorAction")}
              >
                <option value="" disabled>
                  Select...
                </option>
                {visitorActions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
              {errors.visitorAction && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.visitorAction.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-1">
                Your Photos & Business Details
              </h2>
              <p className="text-sm text-slate-400">
                Skip this and send everything on WhatsApp later — nothing here blocks your order.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="logo">Your Logo (optional)</Label>
                <div className="mt-2 p-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] text-center">
                  <Upload className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 mb-1">Logo file (PNG / JPG / SVG)</p>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*,.svg"
                    className="text-xs text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-500/20 file:text-teal-300 file:px-3 file:py-1.5 file:text-xs file:font-semibold hover:file:bg-teal-500/30 cursor-pointer"
                    onChange={(e) =>
                      setLogoFiles(Array.from(e.target.files ?? []).map((f) => f.name))
                    }
                  />
                  {logoFiles.length > 0 && (
                    <p className="mt-2 text-xs font-mono text-teal-300">{logoFiles.join(", ")}</p>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  No logo yet? We design a simple one for you — no delays.
                </p>
              </div>

              <div>
                <Label htmlFor="photos">Business Photos (optional)</Label>
                <div className="mt-2 p-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] text-center">
                  <Upload className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 mb-1">
                    Photos of your shop, work, or products
                  </p>
                  <input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    className="text-xs text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-500/20 file:text-teal-300 file:px-3 file:py-1.5 file:text-xs file:font-semibold hover:file:bg-teal-500/30 cursor-pointer"
                    onChange={(e) =>
                      setPhotoFiles(Array.from(e.target.files ?? []).map((f) => f.name))
                    }
                  />
                  {photoFiles.length > 0 && (
                    <p className="mt-2 text-xs font-mono text-teal-300">
                      {photoFiles.length} photo(s) selected
                    </p>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Don&apos;t have photos ready? We can also arrange them.
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Anything else we should know? (optional)</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Special requests, references, things to avoid..."
                className="mt-2 rounded-lg"
                {...register("notes")}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-1">Payment</h2>
              <p className="text-sm text-slate-400">
                Pay securely online with UPI, debit/credit card, or netbanking. Your GST invoice is
                emailed instantly after payment.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">
                  <Rocket className="w-4 h-4 inline mr-2 text-teal-400" />
                  {plan.name} Plan
                </span>
                <span className="text-xs font-mono text-teal-300">{launchLabel}</span>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                <div>
                  <div className="text-3xl font-heading font-extrabold text-white">
                    {formatINR(summary.oneTimeTotal)}
                    <span className="text-xs text-slate-400 ml-1 font-normal">one-time</span>
                  </div>
                  <div className="text-sm text-slate-300 mt-1">
                    + {formatINR(summary.monthlyTotal)}
                    <span className="text-xs text-slate-400">/month</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Pay now</div>
                  <div className="text-xl font-heading font-bold text-teal-300">
                    {formatINR(summary.oneTimeTotal)}
                  </div>
                  <div className="text-[11px] text-slate-400">Monthly care billed from month 2</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  Secure online payment — UPI, cards, or netbanking via Razorpay.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  Proper GST invoice with every payment.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  Your build clock starts on a confirmed date the moment payment clears.{" "}
                  {chosen.plan.timelineMode !== "phased" && (
                    <span className="text-teal-300 font-semibold">
                      If you pay today: {launchLabel}.
                    </span>
                  )}
                </li>
              </ul>
            </div>

            {paymentError && (
              <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-sm text-red-200">
                {paymentError}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={step === 0}
            className="cursor-pointer cursor-pointer font-semibold text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {step < stepNames.length - 1 ? (
            <Button
              type="button"
              onClick={goNext}
              size="lg"
              className="cursor-pointer cursor-pointer bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              disabled={paying}
              className="cursor-pointer bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20 disabled:opacity-60"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {paying
                ? "Opening secure payment…"
                : `Pay ${formatINR(summary.oneTimeTotal)} Securely`}
            </Button>
          )}
        </div>
      </form>

      {showUpdateDialog &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Update your plan"
          >
            <button
              className="cursor-pointer absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setShowUpdateDialog(false)}
              aria-label="Close"
            />
            <div className="cursor-pointer relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-teal-500/30 shadow-2xl shadow-teal-500/10 p-6 md:p-8">
              <button
                onClick={() => setShowUpdateDialog(false)}
                className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Choose Your Package
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Pick the package that fits you best, or fine-tune what&apos;s included. Your
                business details stay as they are.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plans.map((p) => {
                  const prep = prepared.find((x) => x.plan.id === p.id) ?? prepared[0]!;
                  const isActive = dialogPlanId === p.id;
                  const isCurrent = activePlanId === p.id;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setDialogPlanId(p.id as PlanId)}
                      className={`text-left rounded-2xl border p-4 transition-all duration-200 ${
                        isActive
                          ? "border-teal-500/60 bg-teal-500/10 shadow-lg shadow-teal-500/10"
                          : "border-white/10 bg-white/[0.02] hover:border-teal-500/40 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                          <Icon className="w-4 h-4" />
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono text-slate-950 px-1.5 py-0.5 rounded bg-teal-400 font-semibold">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-heading font-bold text-white mb-1">
                        {prep.plan.name}
                      </div>
                      <div className="text-lg font-heading font-extrabold text-white">
                        {formatINR(prep.oneTimeTotal)}
                        <span className="text-[10px] text-slate-400 ml-1 font-normal">
                          one-time
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        + {formatINR(prep.monthlyTotal)}
                        <span className="text-[10px] text-slate-400">/month</span>
                      </div>
                      <div className="text-[10px] font-mono text-teal-400 mt-2">
                        {prep.plan.timelineMode === "phased"
                          ? prep.plan.timeline
                          : `Web live by ${formatCalendarDate(
                              computeLaunchTimeline(plans, getSelection, prep.plan.id).launchDate,
                            )}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <PlanServicesEditor
                  plan={dialogChosen.plan}
                  serviceSelection={dialogChosen.serviceSelection}
                  addOnSelection={dialogChosen.addOnSelection}
                  addOnCounts={dialogChosen.addOnCounts}
                  inherited={dialogChosen.inherited}
                  inheritedOn={getSelection(dialogChosen.plan.id).inheritedOn}
                  onToggleService={(id) => toggleService(dialogChosen.plan.id, id)}
                  onToggleAddOn={(id) => toggleAddOn(dialogChosen.plan.id, id)}
                  onSetAddOnCount={(id, count) => setAddOnCount(dialogChosen.plan.id, id, count)}
                  onToggleInherited={() => toggleInherited(dialogChosen.plan.id)}
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateDialog(false)}
                  className="cursor-pointer text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="button"
                  onClick={applyDialogPlan}
                  size="lg"
                  className="cursor-pointer cursor-pointer bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
                >
                  Continue with {dialogChosen.plan.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
