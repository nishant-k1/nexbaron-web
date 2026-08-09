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
  type PrintCatalogProduct,
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
  selectedProducts: string[];
  quantities: Record<string, number>;
}

interface PendingQuote {
  version: 3;
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
  deadline: "",
  deliveryPincode: "",
  notes: "",
  selectedProducts: [],
  quantities: {},
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
            quantity: Math.max(current.quantity || 500, product?.minQuantity ?? 500, 500),
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
    // eslint-disable-next-line react-hooks/immutability
    void submit(pending.draft, pending.clientRequestId);
    // submit is intentionally driven only by the persisted explicit intent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, initialized, pendingSubmit, user]);

  const selectedItems = draft.selectedProducts
    .map((id) => {
      const p = catalog?.products.find((pr) => pr.id === id);
      return p ? { ...p, quantity: draft.quantities[id] || p.minQuantity } : null;
    })
    .filter(Boolean) as (PrintCatalogProduct & { quantity: number })[];
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
        items: selectedItems.map((it) => ({ product: it.id, quantity: it.quantity })),
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
                <StepLabel>1. Select Products</StepLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {catalog.products.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        const selected = draft.selectedProducts.includes(item.id)
                          ? draft.selectedProducts.filter((id) => id !== item.id)
                          : [...draft.selectedProducts, item.id];
                        const quantities = { ...draft.quantities };
                        if (!draft.selectedProducts.includes(item.id)) {
                          quantities[item.id] = Math.max(item.minQuantity, 500);
                        } else {
                          delete quantities[item.id];
                        }
                        setDraft((d) => ({ ...d, selectedProducts: selected, quantities }));
                      }}
                      className={`p-3.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${draft.selectedProducts.includes(item.id) ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20" : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </section>

              {selectedItems.length > 0 && (
                <section>
                  <StepLabel>2. Quantities</StepLabel>
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                      >
                        <span className="text-sm text-slate-200 font-medium block mb-3">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              const min = Math.max(item.minQuantity, 500);
                              const qty = Math.max(min, (draft.quantities[item.id] || min) - 100);
                              setDraft((d) => ({
                                ...d,
                                quantities: { ...d.quantities, [item.id]: qty },
                              }));
                            }}
                            className="cursor-pointer w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xl font-bold flex items-center justify-center hover:bg-white/[0.12] transition-colors active:scale-95"
                          >
                            −
                          </button>
                          <div className="flex-1 text-center">
                            <input
                              type="number"
                              min={Math.max(item.minQuantity, 500)}
                              max={10000}
                              step={100}
                              value={draft.quantities[item.id] || item.minQuantity}
                              onChange={(e) => {
                                const qty = Math.max(
                                  Math.max(item.minQuantity, 500),
                                  Math.min(10000, Number(e.target.value) || 0),
                                );
                                setDraft((d) => ({
                                  ...d,
                                  quantities: { ...d.quantities, [item.id]: qty },
                                }));
                              }}
                              className="w-full bg-transparent text-2xl font-bold text-white text-center tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-[10px] text-slate-400">units</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const min = Math.max(item.minQuantity, 500);
                              const qty = Math.min(10000, (draft.quantities[item.id] || min) + 100);
                              setDraft((d) => ({
                                ...d,
                                quantities: { ...d.quantities, [item.id]: qty },
                              }));
                            }}
                            className="cursor-pointer w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xl font-bold flex items-center justify-center hover:bg-white/[0.12] transition-colors active:scale-95"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {[500, 1000, 2000, 5000].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                setDraft((d) => ({
                                  ...d,
                                  quantities: { ...d.quantities, [item.id]: preset },
                                }));
                              }}
                              className={`cursor-pointer px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                                (draft.quantities[item.id] || item.minQuantity) === preset
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : "bg-white/[0.04] text-slate-400 border border-white/5 hover:bg-white/[0.08]"
                              }`}
                            >
                              {preset.toLocaleString("en-IN")}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="pt-8 border-t border-white/10">
                <StepLabel>3. Delivery & Contact Details</StepLabel>
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
                      {selectedItems.length > 0 ? (
                        selectedItems.map((it) => (
                          <SummaryRow
                            key={it.id}
                            label={it.label}
                            value={`${it.quantity.toLocaleString("en-IN")} units`}
                          />
                        ))
                      ) : (
                        <SummaryRow label="Products" value="None selected" />
                      )}
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

function validateDraft(draft: QuoteDraft, _catalog: PrintCatalog): string | null {
  if (draft.selectedProducts.length === 0) return "Please choose at least one product.";
  if (!draft.name.trim() || draft.name.trim().length < 2) return "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))
    return "Please enter a valid email address.";
  if (draft.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
  if (!draft.deadline) return "Please choose when you need the order.";
  if (!/^\d{4,6}$/.test(draft.deliveryPincode)) return "Please enter a valid delivery pincode.";
  return null;
}

function writePendingQuote(draft: QuoteDraft) {
  const pending: PendingQuote = {
    version: 3,
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
      pending.version !== 3 ||
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
