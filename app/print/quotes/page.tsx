"use client";

import { FileText, Loader2, Plus } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";
import { getMyPrintQuotes, type PrintQuote } from "@/features/print/quotes";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "My Print Quotes | Nexbaron Print",
  description: "Track your print quotes, view pricing, and manage your print orders.",
  openGraph: {
    title: "My Print Quotes | Nexbaron Print",
    description: "Track your print quotes and orders.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

const STATUS_LABELS: Record<PrintQuote["status"], string> = {
  new: "Under review",
  quoted: "Quote ready",
  accepted: "Accepted",
  lost: "Closed",
  closed: "Closed",
};

export default function PrintQuotesPage() {
  const { user, initialized, openSignIn } = useAuth();
  const [quotes, setQuotes] = useState<PrintQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialized || !user) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    void getMyPrintQuotes()
      .then((data) => {
        if (!cancelled) setQuotes(data);
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(reason instanceof Error ? reason.message : "Could not load your quotes.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [initialized, user]);

  return (
    <div className="min-h-[70vh] pt-32 pb-24 md:pt-40">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
              Nexbaron Print
            </p>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">Your Quotes</h1>
            <p className="text-sm text-slate-400 mt-3">Track requests and confirmed pricing.</p>
          </div>
          <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
            <Link href="/print/quote">
              <Plus className="w-4 h-4 mr-2" /> New quote
            </Link>
          </Button>
        </div>

        {!initialized || loading ? (
          <div className="flex justify-center py-20 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading quotes...
          </div>
        ) : !user ? (
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 sm:p-12 text-center">
            <FileText className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-heading font-bold text-white mb-2">
              Sign in to view your quotes
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Use your Nexbaron Print account to see quote updates.
            </p>
            <Button
              onClick={() => openSignIn()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Sign in
            </Button>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
            {error}
          </div>
        ) : quotes.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 text-center">
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-4" />
            <h2 className="text-xl font-heading font-bold text-white mb-2">
              No quote requests yet
            </h2>
            <p className="text-sm text-slate-400">
              Build a request and the Print team will prepare your pricing.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <article
                key={quote.quoteId}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm text-amber-300">{quote.quoteNumber}</p>
                    <p className="text-lg font-semibold text-white mt-1">
                      {formatProduct(quote.selection.product)}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Requested{" "}
                      {new Date(quote.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {quote.selection.quantity
                        ? ` · ${quote.selection.quantity.toLocaleString("en-IN")} units`
                        : ""}
                    </p>
                  </div>
                  <span
                    className={`self-start rounded-full border px-3 py-1 text-xs font-medium ${quote.status === "quoted" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-amber-500/30 bg-amber-500/10 text-amber-300"}`}
                  >
                    {STATUS_LABELS[quote.status]}
                  </span>
                </div>
                {quote.response?.price && (
                  <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-slate-400">Confirmed price</span>
                    <span className="text-xl font-mono font-bold text-emerald-300">
                      ₹{quote.response.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                {quote.response?.message && (
                  <p className="mt-4 text-sm text-slate-300">{quote.response.message}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatProduct(product?: string): string {
  if (!product) return "Print quote";
  return product
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
