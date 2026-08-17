"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { DatePickerField } from "@/components/ui/date-picker";
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

interface QuoteDraft extends PrintQuoteInput {
  phone: string;
  company: string;
  deadline: string;
  deliveryPincode: string;
  address: string;
  city: string;
  state: string;
  notes: string;
  selectedProducts: string[];
  quantities: Record<string, number>;
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
  address: "",
  city: "",
  state: "",
  notes: "",
  selectedProducts: [],
  quantities: {},
};

export default function PrintQuotePage() {
  const { user } = useAuth();
  const [catalog, setCatalog] = useState<PrintCatalog | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuoteDraft>(EMPTY_DRAFT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  const [editingQuantities, setEditingQuantities] = useState<Record<string, string>>({});
  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

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
            quantity: Math.max(
              current.quantity || product?.minQuantity || 1,
              product?.minQuantity || 1,
            ),
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

  const [prevUserId, setPrevUserId] = useState<string | null>(null);
  if (user && prevUserId !== user.id) {
    setPrevUserId(user.id);
    setDraft((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
    }));
  }

  useEffect(() => {
    if (!activeEditor) return;
    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setActiveEditor(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveEditor(null);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [activeEditor]);

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
        address: input.address.trim() || undefined,
        city: input.city.trim() || undefined,
        state: input.state.trim() || undefined,
        notes: input.notes.trim() || undefined,
        items: selectedItems.map((it) => ({ product: it.id, quantity: it.quantity })),
      });
      setQuoteNumber(result.quoteNumber ?? null);
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Could not send your quote request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }
    void submit(draft);
  }

  return (
    <div className="relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <section className="py-32 md:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                Print Quote Builder
              </span>
              <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
                Build Your Commercial Print Quote
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Choose from the current Print catalog. Our team confirms final pricing and
                turnaround.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-8">
            {catalogError && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
              >
                {catalogError} Please refresh the page to try again.
              </div>
            )}
            {!catalog && !catalogError && (
              <div
                role="status"
                className="flex items-center justify-center gap-2 py-12 text-sm text-slate-400"
              >
                <Loader2 className="w-4 h-4 animate-spin" /> Loading the Print catalog...
              </div>
            )}

            {catalog && (
              <>
                <div>
                  <StepLabel>1. Select Products & Quantities</StepLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {catalog.products.map((item) => {
                      const isSelected = draft.selectedProducts.includes(item.id);
                      const qty = draft.quantities[item.id] || item.minQuantity;
                      const isEditing = editingQuantities[item.id] !== undefined;
                      const displayValue = isEditing ? editingQuantities[item.id] : String(qty);
                      const isPopoverOpen = activeEditor === item.id;

                      const commitQuantity = (value: number) => {
                        const clamped = Math.max(item.minQuantity, Math.min(100000, value));
                        setDraft((d) => ({
                          ...d,
                          quantities: { ...d.quantities, [item.id]: clamped },
                        }));
                        setEditingQuantities((prev) => {
                          const next = { ...prev };
                          delete next[item.id];
                          return next;
                        });
                      };

                      return (
                        <div
                          key={item.id}
                          className={`relative rounded-2xl border transition-all ${
                            isSelected
                              ? "bg-gradient-to-b from-amber-500/[0.06] to-transparent border-amber-500/30 shadow-lg shadow-amber-500/5"
                              : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setActiveEditor(null);
                                const selected = draft.selectedProducts.filter(
                                  (id) => id !== item.id,
                                );
                                const quantities = { ...draft.quantities };
                                delete quantities[item.id];
                                setDraft((d) => ({ ...d, selectedProducts: selected, quantities }));
                              } else {
                                setActiveEditor(item.id);
                                const quantities = {
                                  ...draft.quantities,
                                  [item.id]: item.minQuantity,
                                };
                                setDraft((d) => ({
                                  ...d,
                                  selectedProducts: [...draft.selectedProducts, item.id],
                                  quantities,
                                }));
                              }
                            }}
                            aria-pressed={isSelected}
                            className="cursor-pointer w-full text-left p-3.5 flex items-center gap-2.5"
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-amber-500 border-amber-500" : "border-white/[0.2]"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-2.5 h-2.5 text-slate-950"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                isSelected ? "text-amber-400" : "text-slate-300"
                              }`}
                            >
                              {item.label}
                            </span>
                            {isSelected && (
                              <span className="ml-auto text-[11px] font-mono text-amber-400/70 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                {qty.toLocaleString("en-IN")} units
                              </span>
                            )}
                          </button>

                          <AnimatePresence>
                            {isPopoverOpen && (
                              <motion.div
                                ref={popoverRef}
                                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute left-0 right-0 top-full z-30 mt-1 mx-1 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl shadow-black/40 backdrop-blur-xl p-4 space-y-2.5"
                              >
                                <div className="flex items-stretch gap-2">
                                  <button
                                    type="button"
                                    onClick={() => commitQuantity(qty - 1)}
                                    aria-label="Decrease quantity"
                                    className="cursor-pointer w-12 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 text-lg font-medium flex items-center justify-center hover:bg-white/[0.12] hover:text-white hover:border-white/[0.15] transition-all active:scale-[0.97]"
                                  >
                                    −
                                  </button>
                                  <div className="flex-1 rounded-xl bg-white/[0.06] border border-white/10 flex flex-col items-center justify-center py-1.5">
                                    <input
                                      type="number"
                                      min={item.minQuantity}
                                      max={100000}
                                      step={1}
                                      inputMode="numeric"
                                      placeholder={String(item.minQuantity)}
                                      aria-label={`Quantity for ${item.label}`}
                                      value={displayValue}
                                      onChange={(e) => {
                                        setEditingQuantities((prev) => ({
                                          ...prev,
                                          [item.id]: e.target.value,
                                        }));
                                      }}
                                      onBlur={() => {
                                        const raw = editingQuantities[item.id];
                                        if (raw === undefined) return;
                                        const n = Number(raw);
                                        commitQuantity(Number.isNaN(n) ? item.minQuantity : n);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          (e.target as HTMLInputElement).blur();
                                        }
                                      }}
                                      className="w-full bg-transparent text-2xl font-bold text-white text-center tabular-nums focus:outline-none leading-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="text-[10px] text-slate-500 mt-0.5 tracking-wider uppercase">
                                      units
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => commitQuantity(qty + 1)}
                                    aria-label="Increase quantity"
                                    className="cursor-pointer w-12 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 text-lg font-medium flex items-center justify-center hover:bg-white/[0.12] hover:text-white hover:border-white/[0.15] transition-all active:scale-[0.97]"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="flex gap-1.5">
                                  {[1, 10, 50, 100, 500].map((preset) => {
                                    const active = qty === preset;
                                    return (
                                      <button
                                        key={preset}
                                        type="button"
                                        onClick={() => commitQuantity(preset)}
                                        className={`cursor-pointer flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                          active
                                            ? "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30"
                                            : "bg-white/[0.03] text-slate-500 hover:text-slate-300 hover:bg-white/[0.05]"
                                        }`}
                                      >
                                        {preset}
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <StepLabel>2. Delivery & Contact Details</StepLabel>
                  {submitStatus === "success" ? (
                    <div
                      role="status"
                      className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center"
                    >
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
                        <DatePickerField
                          label="Required By"
                          id="quote-deadline"
                          required
                          value={draft.deadline}
                          onChange={(value) => updateDraft("deadline", value)}
                          accent="print"
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
                      <div className="pt-2">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                          Delivery Address
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <QuoteInput
                              label="Address"
                              id="quote-address"
                              value={draft.address}
                              onChange={(value) => updateDraft("address", value)}
                            />
                          </div>
                          <QuoteInput
                            label="City"
                            id="quote-city"
                            value={draft.city}
                            onChange={(value) => updateDraft("city", value)}
                          />
                          <QuoteInput
                            label="State"
                            id="quote-state"
                            value={draft.state}
                            onChange={(value) => updateDraft("state", value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="quote-notes">Notes (optional)</Label>
                        <Textarea
                          id="quote-notes"
                          rows={4}
                          className="mt-2 rounded-xl"
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
                            <MessageSquare className="w-4 h-4 mr-2" /> Send Request
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-3">
      {children}
    </h2>
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
        className="mt-2 rounded-xl"
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

function createRequestId(): string {
  return globalThis.crypto?.randomUUID() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
