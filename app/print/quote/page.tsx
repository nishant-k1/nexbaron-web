"use client";

import { Calculator, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/divisions";

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

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("product");
    if (param && basePrices[param]) {
      setProductType(param);
    }
  }, []);

  const productLabel = productOptions.find((p) => p.id === productType)?.label ?? productType;
  const stockLabel = stockOptions.find((s) => s.id === paperStock)?.label ?? paperStock;
  const finishLabel = finishOptions.find((f) => f.id === finishing)?.label ?? finishing;

  const getEstimatedPrice = () => {
    const base = basePrices[productType] ?? 500;
    const multiplier = quantity / 500;
    const stockExtra = paperStock === "premium" ? 300 : paperStock === "luxury" ? 500 : 0;
    const finishExtra = finishing !== "none" ? 400 : 0;

    return Math.round(base * multiplier + stockExtra + finishExtra);
  };

  const estimatedPrice = getEstimatedPrice();

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
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl space-y-8">
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
          </div>

          {/* Estimate Display Column */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-950/90 border border-amber-500/30 p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Estimated Quotation</h3>
                  <p className="text-xs text-slate-400">Nexbaron Print Division Commercial Rate</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Product:</span>
                  <span className="text-white font-mono">{productLabel}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Quantity:</span>
                  <span className="text-amber-400 font-mono">{quantity} Units</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Stock Grade:</span>
                  <span className="text-white font-mono">{stockLabel}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Finishing:</span>
                  <span className="text-white font-mono">{finishLabel}</span>
                </div>
              </div>

              <div className="pt-4 text-center">
                <span className="text-xs text-slate-400 block mb-1">
                  Estimated Total (Excl. Tax)
                </span>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 font-mono">
                  ₹{estimatedPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-6 rounded-xl shadow-lg shadow-amber-500/20"
              >
                <a
                  href={buildWhatsAppLink(
                    "print",
                    `Hi Nexbaron Print, I want to place an order for ${quantity} units of ${productLabel} (${stockLabel}, ${finishLabel}) estimated at ₹${estimatedPrice}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Order / Confirm via WhatsApp
                </a>
              </Button>
              <p className="text-[11px] text-slate-400 text-center">
                Express 24-hour turnaround available on confirmed orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
