import { apiRequest, getToken } from "@/lib/api";

export interface MyMilestone {
  key: string;
  label: string;
  dayLabel: string;
  date?: string;
  status: "pending" | "in_progress" | "done";
}

export interface MyOrder {
  orderId: string;
  invoiceNumber: string;
  plan: string;
  status: string;
  amount: number;
  amountPaid: number;
  launchDate: string | null;
  launchDays: number | null;
  milestones: MyMilestone[];
  createdAt: string;
}

export async function fetchMyOrder(): Promise<MyOrder | null> {
  if (!getToken("digital")) return null;
  const data = await apiRequest<{ success: boolean; order: MyOrder | null }>(
    "/digital/payments/orders/mine",
    { method: "GET" },
    "digital",
  );
  return data.order ?? null;
}
