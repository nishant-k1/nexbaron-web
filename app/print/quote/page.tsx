"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getPrintCatalog,
  submitPrintQuote,
  type PrintCatalog,
  type PrintQuoteInput,
} from "@/features/print/quotes";

const PENDING_QUOTE_KEY = "nexbaron-pending-print-quote";
const PENDING_QUOTE_TTL_MS = 30 * 60 * 1000;

interface QuoteDraft extends PrintQuoteInput {
  phone: string;
  company: string;
  deadline: string;
  deliveryPincode: string;
  notes: string;
}

interface PendingQuote {
  version: 2;
  requestedAt: number;
  clientRequestId: string;
  draft: QuoteDraft;
}

const EMPTY_DRAFT: QuoteDraft = {
  name: "",
  email: "",
  phone: "",
  company: "",
  product: "",
  quantity: 500,
  paperStock: "",
  finishing: "",
  deadline: "",
  deliveryPincode: "",
  notes: "",
};

export default function PrintQuotePage() {
  const { user, initialized, openSignIn } = useAuth();
  const [catalog, setCatalog] = useState<PrintCatalog | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuoteDraft>(EMPTY_DRAFT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const resumedSubmit = useRef(false);

  useEffect(() => {
    let cancelled = false;
    void getPrintCatalog()
      .then((data) => {
        if (cancelled) return;
        if (!data.products.length || !data.stockTiers.length || !data.finishes.length) {
          throw new Error("The print catalog is currently unavailable.");
        }
        setCatalog(data);
        const requestedProduct = new URLSearchParams(window.location.search).get("product");
        setDraft((current) => {
          const product =
            data.products.find((item) => item.id === requestedProduct) ?? data.products[0];
          return {
            ...current,
            product: current.product || product?.id || "",
            quantity: Math.max(current.quantity, product?.minQuantity ?? 500, 500),
            paperStock: current.paperStock || data.stockTiers[0]?.id || "",
            finishing: current.finishing || data.finishes[0]?.id || "",
          };
        });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setCatalogError(
            error instanceof Error ? error.message : "Could not load the print catalog.",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const pending = readPendingQuote();
    if (!pending) return;
    setDraft(pending.draft);
    setPendingSubmit(true);
  }, []);

  useEffect(() => {
    if (!user) return;
    setDraft((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  useEffect(() => {
    if (
      !pendingSubmit ||
      resumedSubmit.current ||
      !initialized ||
      !user ||
      user.division !== "print" ||
      !catalog
    ) {
      return;
    }
    const pending = readPendingQuote();
    if (!pending || validateDraft(pending.draft, catalog)) {
      clearPendingQuote();
      setPendingSubmit(false);
      return;
    }
    resumedSubmit.current = true;
    setDraft(pending.draft);
    void submit(pending.draft, pending.clientRequestId);
    // submit is intentionally driven only by the persisted explicit intent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, initialized, pendingSubmit, user]);

  const product = catalog?.products.find((item) => item.id === draft.product);
  const stock = catalog?.stockTiers.find((item) => item.id === draft.paperStock);
  const finish = catalog?.finishes.find((item) => item.id === draft.finishing);
  const minimumQuantity = Math.max(product?.minQuantity ?? 500, 500);
  const estimatedPrice = product
    ? Math.round(
        product.basePrice * (draft.quantity / 500) + (stock?.extra ?? 0) + (finish?.extra ?? 0),
      )
    : null;
  const validationError = catalog ? validateDraft(draft, catalog) : "Loading catalog";

  function updateDraft<K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSubmitStatus("idle");
    setSubmitError(null);
  }

  async function submit(input: QuoteDraft, clientRequestId = createRequestId()) {
    if (isSubmitting || !catalog) return;
    const error = validateDraft(input, catalog);
    if (error) {
      setSubmitError(error);
      resumedSubmit.current = false;
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError(null);
    try {
      const result = await submitPrintQuote({
        ...input,
        clientRequestId,
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        company: input.company.trim() || undefined,
        deadline: input.deadline || undefined,
        deliveryPincode: input.deliveryPincode.trim() || undefined,
        notes: input.notes.trim() || undefined,
      });
      setQuoteNumber(result.quoteNumber ?? null);
      setSubmitStatus("success");
      clearPendingQuote();
      setPendingSubmit(false);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Could not send your quote request.");
    } finally {
      setIsSubmitting(false);
      resumedSubmit.current = false;
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }
    if (!user) {
      writePendingQuote(draft);
      setPendingSubmit(true);
      openSignIn();
      return;
    }
    void submit(draft);
  }

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
              Print Quote Builder
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
              Build Your Commercial Print Quote
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Choose from the current Print catalog. Our team confirms final pricing and turnaround.
            </p>
          </div>
        </SectionReveal>

        <div className="max-w-5xl mx-auto rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-8 backdrop-blur-xl space-y-8">
          {catalogError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {catalogError} Please refresh the page to try again.
            </div>
          )}
          {!catalog && !catalogError && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading the Print catalog...
            </div>
          )}

          {catalog && (
            <>
              <section>
                <StepLabel>1. Select Product</StepLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {catalog.products.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        updateDraft("product", item.id);
                        updateDraft("quantity", Math.max(draft.quantity, item.minQuantity, 500));
                      }}
                      className={`p-3.5 rounded-xl text-xs font-medium text-left border transition-all ${draft.product === item.id ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20" : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-3">
                  <StepLabel>2. Order Quantity</StepLabel>
                  <span className="text-xs font-mono text-white bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {draft.quantity.toLocaleString("en-IN")} units
                  </span>
                </div>
                <input
                  type="range"
                  min={minimumQuantity}
                  max={10000}
                  step={100}
                  value={draft.quantity}
                  onChange={(event) => updateDraft("quantity", Number(event.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>{minimumQuantity.toLocaleString("en-IN")}</span>
                  <span>5,000</span>
                  <span>10,000</span>
                </div>
              </section>

              <OptionSection
                label="3. Stock / Material Grade"
                options={catalog.stockTiers}
                selected={draft.paperStock}
                onSelect={(id) => updateDraft("paperStock", id)}
              />
              <OptionSection
                label="4. Finishing & Lamination"
                options={catalog.finishes}
                selected={draft.finishing}
                onSelect={(id) => updateDraft("finishing", id)}
              />

              <section className="pt-8 border-t border-white/10">
                <StepLabel>5. Delivery & Contact Details</StepLabel>
                {submitStatus === "success" ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                    <p className="text-lg font-semibold text-emerald-300 mb-1">
                      Quote request received
                    </p>
                    <p className="text-sm text-slate-300">
                      {quoteNumber && (
                        <>
                          Reference{" "}
                          <span className="font-mono text-emerald-300">{quoteNumber}</span>.{" "}
                        </>
                      )}
                      Track updates from Your Quotes in the account menu.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <QuoteInput
                        label="Name"
                        id="quote-name"
                        required
                        value={draft.name}
                        onChange={(value) => updateDraft("name", value)}
                      />
                      <QuoteInput
                        label="Email"
                        id="quote-email"
                        type="email"
                        required
                        value={draft.email}
                        onChange={(value) => updateDraft("email", value)}
                      />
                      <QuoteInput
                        label="WhatsApp Number"
                        id="quote-phone"
                        type="tel"
                        required
                        value={draft.phone}
                        onChange={(value) => updateDraft("phone", value)}
                      />
                      <QuoteInput
                        label="Company"
                        id="quote-company"
                        value={draft.company}
                        onChange={(value) => updateDraft("company", value)}
                      />
                      <QuoteInput
                        label="Required By"
                        id="quote-deadline"
                        type="date"
                        required
                        value={draft.deadline}
                        onChange={(value) => updateDraft("deadline", value)}
                      />
                      <QuoteInput
                        label="Delivery Pincode"
                        id="quote-pincode"
                        inputMode="numeric"
                        required
                        value={draft.deliveryPincode}
                        onChange={(value) =>
                          updateDraft("deliveryPincode", value.replace(/\D/g, "").slice(0, 6))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="quote-notes">Notes (optional)</Label>
                      <Textarea
                        id="quote-notes"
                        rows={4}
                        className="mt-2 rounded-lg"
                        placeholder="Sizes, artwork status, delivery instructions, or other requirements"
                        value={draft.notes}
                        onChange={(event) => updateDraft("notes", event.target.value)}
                      />
                    </div>

                    <div className="text-sm bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-1.5">
                      <SummaryRow label="Product" value={product?.label ?? "-"} />
                      <SummaryRow
                        label="Quantity"
                        value={`${draft.quantity.toLocaleString("en-IN")} units`}
                      />
                      <SummaryRow label="Stock" value={stock?.label ?? "-"} />
                      <SummaryRow label="Finishing" value={finish?.label ?? "-"} />
                      <SummaryRow
                        label="Estimated price"
                        value={
                          estimatedPrice === null
                            ? "-"
                            : `₹${estimatedPrice.toLocaleString("en-IN")}`
                        }
                        accent
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-400" role="alert">
                        {submitError}
                      </p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || Boolean(catalogError)}
                      className="cursor-pointer w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-amber-500/20 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 mr-2" />{" "}
                          {user ? "Request My Quote" : "Sign in & Request My Quote"}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-3">
      {children}
    </div>
  );
}

function OptionSection({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: PrintCatalog["stockTiers"];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section>
      <StepLabel>{label}</StepLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`p-3.5 rounded-xl text-xs font-medium border transition-all ${selected === option.id ? "bg-amber-500/20 text-white border-amber-400" : "bg-white/[0.03] text-slate-300 border-white/10"}`}
          >
            {option.label}
            {option.extra > 0 ? ` (+₹${option.extra.toLocaleString("en-IN")})` : ""}
          </button>
        ))}
      </div>
    </section>
  );
}

function QuoteInput({
  label,
  id,
  required,
  onChange,
  ...props
}: { label: string; id: string; required?: boolean; onChange: (value: string) => void } & Omit<
  React.ComponentProps<typeof Input>,
  "id" | "onChange"
>) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </Label>
      <Input
        id={id}
        required={required}
        className="mt-2 rounded-lg"
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 text-slate-300">
      <span>{label}</span>
      <span className={`font-mono text-right ${accent ? "text-amber-400" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}

function validateDraft(draft: QuoteDraft, catalog: PrintCatalog): string | null {
  const product = catalog.products.find((item) => item.id === draft.product);
  if (!product) return "Please choose a valid catalog product.";
  if (!catalog.stockTiers.some((item) => item.id === draft.paperStock))
    return "Please choose a valid stock.";
  if (!catalog.finishes.some((item) => item.id === draft.finishing))
    return "Please choose a valid finish.";
  if (!Number.isInteger(draft.quantity) || draft.quantity < Math.max(product.minQuantity, 500))
    return `Minimum quantity is ${Math.max(product.minQuantity, 500).toLocaleString("en-IN")}.`;
  if (draft.name.trim().length < 2) return "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))
    return "Please enter a valid email address.";
  if (draft.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
  if (!draft.deadline) return "Please choose when you need the order.";
  if (!/^\d{4,6}$/.test(draft.deliveryPincode)) return "Please enter a valid delivery pincode.";
  return null;
}

function writePendingQuote(draft: QuoteDraft) {
  const pending: PendingQuote = {
    version: 2,
    requestedAt: Date.now(),
    clientRequestId: createRequestId(),
    draft,
  };
  window.sessionStorage.setItem(PENDING_QUOTE_KEY, JSON.stringify(pending));
}

function readPendingQuote(): PendingQuote | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_QUOTE_KEY);
    if (!raw) return null;
    const pending = JSON.parse(raw) as PendingQuote;
    if (
      pending.version !== 2 ||
      !pending.clientRequestId ||
      !pending.draft ||
      Date.now() - pending.requestedAt > PENDING_QUOTE_TTL_MS
    ) {
      clearPendingQuote();
      return null;
    }
    return pending;
  } catch {
    clearPendingQuote();
    return null;
  }
}

function clearPendingQuote() {
  window.sessionStorage.removeItem(PENDING_QUOTE_KEY);
}

function createRequestId(): string {
  return globalThis.crypto?.randomUUID() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
