"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  Rocket,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppLink } from "@/lib/divisions";

type PlanId = "launch" | "growth" | "scale";

interface PlanOption {
  name: string;
  oneTime: string;
  monthly: string;
  monthlyName: string;
  timeline: string;
  featured?: boolean;
}

const planOptions: Record<PlanId, PlanOption> = {
  launch: {
    name: "Launch",
    oneTime: "₹24,999",
    monthly: "₹1,499",
    monthlyName: "Care",
    timeline: "Live in 7 days",
  },
  growth: {
    name: "Growth",
    oneTime: "₹39,999",
    monthly: "₹3,999",
    monthlyName: "Growth Care",
    timeline: "Live in 7–10 days · ranking builds over 60–90 days",
    featured: true,
  },
  scale: {
    name: "Scale",
    oneTime: "₹59,999",
    monthly: "₹7,999",
    monthlyName: "Business Partner",
    timeline: "First 30 days: foundation + audit + plan",
  },
};

const wizardSchema = z.object({
  plan: z.string().min(1, "Select a plan"),
  businessName: z.string().min(2, "Please enter your business name"),
  ownerName: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Enter a valid WhatsApp number"),
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

const paymentMethods = [
  { value: "UPI", label: "UPI (GPay, PhonePe, Paytm)", icon: CreditCard },
  { value: "Card", label: "Debit / Credit Card", icon: CreditCard },
  { value: "Bank transfer", label: "Bank Transfer", icon: CreditCard },
] as const;

export function OnboardingWizard({ initialPlan }: { initialPlan?: string }) {
  const [step, setStep] = useState(0);
  const [logoFiles, setLogoFiles] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI");
  const [confirmed, setConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: { plan: initialPlan || "" },
  });

  const selectedPlan = (watch("plan") || initialPlan || "") as PlanId;
  const plan = planOptions[selectedPlan] ?? planOptions.growth;

  const stepFields: (keyof WizardValues)[][] = [
    [
      "plan",
      "businessName",
      "ownerName",
      "phone",
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

  const onSubmit = () => {
    const values = getValues();
    const message = [
      "New order — Nexbaron Digital",
      "",
      `Plan: ${plan.name} (${plan.oneTime} one-time + ${plan.monthly}/mo · ${plan.monthlyName})`,
      `Business: ${values.businessName}`,
      `Owner: ${values.ownerName}`,
      `WhatsApp: ${values.phone}`,
      `City: ${values.city}`,
      `Services: ${values.services}`,
      values.hours ? `Hours: ${values.hours}` : null,
      values.address ? `Address: ${values.address}` : null,
      `Visitors should: ${values.visitorAction}`,
      `Logo/photos: ${logoFiles.join(", ") || "none yet"}`,
      values.notes ? `Notes: ${values.notes}` : null,
      `Payment method: ${paymentMethod}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink("digital", message), "_blank");
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-12 backdrop-blur-xl text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-teal-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-3">Order Sent on WhatsApp</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          We received your {plan.name} order. Look for a reply on WhatsApp shortly — we&apos;ll send
          a secure payment link (UPI or card), and your GST invoice comes with it. Once paid, your
          7-day build clock starts.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl"
          >
            <a
              href={buildWhatsAppLink(
                "digital",
                "Hi Nexbaron Digital, I just sent my order for the " + plan.name + " plan.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Chat With Us
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold rounded-xl">
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
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {(Object.keys(planOptions) as PlanId[]).map((id) => {
                  const option = planOptions[id];
                  const active = selectedPlan === id;
                  return (
                    <label
                      key={id}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                        active
                          ? "border-teal-500/60 bg-teal-500/10"
                          : "border-white/10 bg-white/[0.02] hover:border-teal-500/40"
                      }`}
                    >
                      <input type="radio" value={id} className="sr-only" {...register("plan")} />
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-heading font-bold text-white">
                          {option.name}
                        </span>
                        {option.featured && (
                          <span className="text-[9px] font-mono text-slate-950 px-1.5 py-0.5 rounded bg-teal-400 font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300">
                        {option.oneTime}
                        <span className="text-slate-500"> + {option.monthly}/mo</span>
                      </div>
                    </label>
                  );
                })}
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
                Confirm your order — we send a secure payment link on WhatsApp with your GST
                invoice.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">
                  <Rocket className="w-4 h-4 inline mr-2 text-teal-400" />
                  {plan.name} Plan
                </span>
                <span className="text-xs font-mono text-teal-300">{plan.timeline}</span>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                <div>
                  <div className="text-3xl font-heading font-extrabold text-white">
                    {plan.oneTime}
                    <span className="text-xs text-slate-400 ml-1 font-normal">one-time</span>
                  </div>
                  <div className="text-sm text-slate-300 mt-1">
                    + {plan.monthly}
                    <span className="text-xs text-slate-400">/month · {plan.monthlyName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Pay now</div>
                  <div className="text-xl font-heading font-bold text-teal-300">{plan.oneTime}</div>
                  <div className="text-[11px] text-slate-400">Monthly care billed from month 2</div>
                </div>
              </div>
            </div>

            <div>
              <Label>How would you like to pay?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const active = paymentMethod === method.value;
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentMethod(method.value)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-teal-500/60 bg-teal-500/10"
                          : "border-white/10 bg-white/[0.02] hover:border-teal-500/40"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-teal-400 mb-2" />
                      <span className="text-sm font-semibold text-white">{method.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  Secure payment link on WhatsApp — UPI, cards, or bank transfer.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  Proper GST invoice with every payment.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  Your 7-day build clock starts the moment payment clears.
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={step === 0}
            className="font-semibold text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {step < stepNames.length - 1 ? (
            <Button
              type="button"
              onClick={goNext}
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Confirm Order on WhatsApp
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
