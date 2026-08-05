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

export async function fetchMyOrder(
  division: "digital" | "print" = "digital",
): Promise<MyOrder | null> {
  if (!getToken(division)) return null;
  const data = await apiRequest<{ success: boolean; order: MyOrder | null }>(
    "/api/digital/payments/orders/mine",
    { method: "GET" },
    division,
  );
  return data.order ?? null;
}
