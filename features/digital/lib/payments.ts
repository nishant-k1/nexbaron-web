import { apiRequest } from "@/lib/api";

export interface CheckoutCustomer {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  services?: string;
  notes?: string;
  address?: string;
}

export interface CheckoutSelections {
  planId: string;
  plans: Record<
    string,
    {
      selected: string[];
      addOns: string[];
      addOnCounts: Record<string, number>;
      inheritedOn: boolean;
    }
  >;
}

export interface CreateCheckoutResponse {
  success: boolean;
  orderId: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
  devMode?: boolean;
  amount: number;
  launchDate: string;
  launchDays: number;
  timelineMode?: "phased";
  milestones: {
    key: string;
    label: string;
    dayLabel: string;
    date: string;
    status: "pending";
  }[];
  invoiceNumber: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId: string;
  invoiceNumber: string;
  launchDate: string;
  milestones: {
    key: string;
    label: string;
    dayLabel: string;
    date: string;
    status: "pending";
  }[];
}

export async function createCheckout(payload: {
  planId: string;
  selections: CheckoutSelections;
  customer: CheckoutCustomer;
}): Promise<CreateCheckoutResponse> {
  return apiRequest<CreateCheckoutResponse>("/api/digital/payments/create-order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<VerifyPaymentResponse> {
  return apiRequest<VerifyPaymentResponse>("/api/digital/payments/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
