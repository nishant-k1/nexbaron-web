"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const productOptions = [
  { id: "visiting-cards", label: "Visiting Cards" },
  { id: "card-holders", label: "Card Holders" },
  { id: "pamphlets-posters", label: "Pamphlets & Posters" },
  { id: "tags", label: "Tags" },
  { id: "files", label: "Files" },
  { id: "letter-heads", label: "Letter Heads" },
  { id: "envelopes", label: "Envelopes" },
  { id: "digital-paper-printing", label: "Digital Paper Printing" },
  { id: "atm-pouches", label: "ATM Pouches" },
  { id: "bill-books", label: "Bill Books" },
  { id: "stickers-labels", label: "Stickers & Labels" },
  { id: "pens", label: "Pens" },
  { id: "shooting-targets", label: "Shooting Targets" },
  { id: "sample-files", label: "Sample Files" },
];

const basePrices: Record<string, number> = {
  "visiting-cards": 499,
  "card-holders": 799,
  "pamphlets-posters": 1499,
  tags: 599,
  files: 999,
  "letter-heads": 899,
  envelopes: 899,
  "digital-paper-printing": 499,
  "atm-pouches": 1199,
  "bill-books": 1499,
  "stickers-labels": 799,
  pens: 1999,
  "shooting-targets": 999,
  "sample-files": 1499,
};

const stockOptions = [
  { id: "standard", label: "Standard Stock" },
  { id: "premium", label: "Premium Stock (+₹300)" },
  { id: "luxury", label: "Luxury / Specialty (+₹500)" },
];

const finishOptions = [
  { id: "none", label: "Standard" },
  { id: "spot-uv", label: "Spot UV (+₹400)" },
  { id: "gold-foil", label: "Gold Foil (+₹400)" },
];

export default function PrintQuotePage() {
  const [productType, setProductType] = useState<string>("visiting-cards");
  const [quantity, setQuantity] = useState<number>(500);
  const [paperStock, setPaperStock] = useState<string>("standard");
  const [finishing, setFinishing] = useState<string>("spot-uv");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("product");
    if (param && basePrices[param]) {
      setProductType(param);
    }
  }, []);

  const productLabel = productOptions.find((p) => p.id === productType)?.label ?? productType;
  const stockLabel = stockOptions.find((s) => s.id === paperStock)?.label ?? paperStock;
  const finishLabel = finishOptions.find((f) => f.id === finishing)?.label ?? finishing;

  const estimatedPrice = (() => {
    const base = basePrices[productType] ?? 500;
    const multiplier = quantity / 500;
    const stockExtra = paperStock === "premium" ? 300 : paperStock === "luxury" ? 500 : 0;
    const finishExtra = finishing !== "none" ? 400 : 0;
    return Math.round(base * multiplier + stockExtra + finishExtra);
  })();

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          division: "print",
          source: "quote-builder",
          name,
          phone,
          requirement: `${productLabel}`,
          quantity: String(quantity),
          message: `Print quote request — Product: ${productLabel} | Quantity: ${quantity} units | Stock: ${stockLabel} | Finishing: ${finishLabel} | Estimated: ₹${estimatedPrice.toLocaleString()}`,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setSubmitStatus("success");
      setName("");
      setPhone("");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
              Interactive Pricing Engine
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
              Instant Print Custom Quote Builder
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Select product, quantity, stock grade, and finishing options to generate an estimated
              commercial quotation.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-12 rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl space-y-8">
            {/* Step 1: Product Selection */}
            <div>
              <label className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-3">
                1. Select Product
              </label>
              <div className="grid grid-cols-2 gap-3">
                {productOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProductType(item.id)}
                    className={`p-3.5 rounded-xl text-xs font-medium text-left border transition-all ${
                      productType === item.id
                        ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20"
                        : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quantity Selector */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                  2. Order Quantity
                </label>
                <span className="text-xs font-mono text-white bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
                  {quantity} Units
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                <span>100</span>
                <span>2,500</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>

            {/* Step 3: Stock / Material Grade */}
            <div>
              <label className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-3">
                3. Stock / Material Grade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stockOptions.map((stock) => (
                  <button
                    key={stock.id}
                    onClick={() => setPaperStock(stock.id)}
                    className={`p-3.5 rounded-xl text-xs font-medium text-left border transition-all ${
                      paperStock === stock.id
                        ? "bg-amber-500/20 text-white border-amber-400"
                        : "bg-white/[0.03] text-slate-300 border-white/10"
                    }`}
                  >
                    {stock.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Finishing */}
            <div>
              <label className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-3">
                4. Finishing & Lamination
              </label>
              <div className="grid grid-cols-3 gap-3">
                {finishOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinishing(f.id)}
                    className={`p-3 rounded-xl text-xs font-medium text-center border transition-all ${
                      finishing === f.id
                        ? "bg-amber-500/20 text-white border-amber-400"
                        : "bg-white/[0.03] text-slate-300 border-white/10"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Your details & submit */}
            <div className="pt-8 border-t border-white/10">
              <label className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-3">
                5. Your Details — Get Your Quote
              </label>
              <p className="text-sm text-slate-300 mb-4">
                Share where to send your quote. Our team confirms the best price and turnaround and
                reaches back on WhatsApp.
              </p>
              <form onSubmit={submitQuote} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quote-name">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="quote-name"
                      className="mt-2 rounded-lg"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="quote-phone">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="quote-phone"
                      type="tel"
                      className="mt-2 rounded-lg"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 text-sm bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-1.5">
                  <p className="text-xs font-mono text-amber-400 mb-2">Your selection</p>
                  <div className="flex justify-between text-slate-300">
                    <span>Product</span>
                    <span className="text-white font-mono">{productLabel}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Quantity</span>
                    <span className="text-amber-400 font-mono">{quantity} Units</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Stock</span>
                    <span className="text-white font-mono">{stockLabel}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Finishing</span>
                    <span className="text-white font-mono">{finishLabel}</span>
                  </div>
                </div>

                {submitStatus === "success" && (
                  <p className="text-sm text-emerald-400">
                    Thanks! Your quote request is in — we&apos;ll WhatsApp you back shortly.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong sending your request. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !name.trim() || !phone.trim()}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-amber-500/20 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" /> Get My Quote
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
