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
  items?: { product: string; quantity: number }[];
  product?: string;
  quantity?: number;
  company?: string;
  deadline?: string;
  deliveryPincode?: string;
  address?: string;
  city?: string;
  state?: string;
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
  try {
    return await apiRequest<PrintCatalog>("/print/catalog", {}, "print");
  } catch (error) {
    // Dev fallback: single API instance on 3001 now serves /print/catalog
    // If print division URL is unreachable (e.g. 3002 not running), retry via digital URL
    const message = error instanceof Error ? error.message : String(error);
    const isNetworkError = message.includes("Failed to fetch") || message.includes("ECONNREFUSED");
    if (isNetworkError) {
      return apiRequest<PrintCatalog>("/print/catalog", {}, "digital");
    }
    throw error;
  }
}

export async function submitPrintQuote(input: PrintQuoteInput): Promise<SubmitQuoteResponse> {
  return apiRequest<SubmitQuoteResponse>(
    "/print/quotes",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    "print",
  );
}

export async function getMyPrintQuotes(): Promise<PrintQuote[]> {
  const data = await apiRequest<{ success: boolean; quotes: PrintQuote[] }>(
    "/print/quotes/mine",
    {},
    "print",
  );
  return data.quotes;
}
