import { apiRequest } from "@/lib/api";

export interface PrintCatalogOption {
  id: string;
  label: string;
  extra: number;
}

export interface PrintCatalogProduct {
  id: string;
  label: string;
  basePrice: number;
  minQuantity: number;
}

export interface PrintCatalog {
  version: string;
  currency: "INR";
  products: PrintCatalogProduct[];
  stockTiers: PrintCatalogOption[];
  finishes: PrintCatalogOption[];
}

export interface PrintQuoteInput {
  clientRequestId?: string;
  name: string;
  email: string;
  phone?: string;
  product: string;
  quantity: number;
  paperStock: string;
  finishing: string;
  company?: string;
  deadline?: string;
  deliveryPincode?: string;
  notes?: string;
}

export interface SubmitQuoteResponse {
  success: boolean;
  quoteId?: string;
  quoteNumber?: string;
  message?: string;
}

export type PrintQuoteStatus = "new" | "quoted" | "accepted" | "lost" | "closed";

export interface PrintQuote {
  quoteId: string;
  quoteNumber: string;
  status: PrintQuoteStatus;
  selection: {
    product?: string;
    quantity?: number;
    paperStock?: string;
    finishing?: string;
    estimatedPrice?: number;
  };
  response: {
    price?: number;
    validityDays?: number;
    message?: string;
    sentAt?: string;
  } | null;
  createdAt: string;
}

export async function getPrintCatalog(): Promise<PrintCatalog> {
  return apiRequest<PrintCatalog>("/api/print/catalog", {}, "print");
}

export async function submitPrintQuote(input: PrintQuoteInput): Promise<SubmitQuoteResponse> {
  return apiRequest<SubmitQuoteResponse>(
    "/api/print/quotes",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    "print",
  );
}

export async function getMyPrintQuotes(): Promise<PrintQuote[]> {
  const data = await apiRequest<{ success: boolean; quotes: PrintQuote[] }>(
    "/api/print/quotes/mine",
    {},
    "print",
  );
  return data.quotes;
}
