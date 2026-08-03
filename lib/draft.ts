import type { PlanSelection } from "@/features/digital/plan-summary";
import { apiRequest } from "@/lib/api";

export interface DraftFields {
  businessName?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  city?: string;
  services?: string;
  hours?: string;
  address?: string;
  visitorAction?: string;
  notes?: string;
}

export interface DraftPlanState {
  selected: string[];
  addOns: string[];
  addOnCounts: Record<string, number>;
  inheritedOn: boolean;
}

export interface ServerDraft {
  planId: string;
  planSelection: DraftPlanState;
  plans: Record<string, DraftPlanState>;
  fields: DraftFields;
  step: number;
  updatedAt: string;
}

export type DraftPayload = Partial<{
  planId: string;
  planSelection: DraftPlanState;
  plans: Record<string, DraftPlanState>;
  fields: DraftFields;
  step: number;
}>;

export async function getDraft(
  division: "digital" | "print" = "digital",
): Promise<ServerDraft | null> {
  const data = await apiRequest<{ success: boolean; draft: ServerDraft | null }>(
    `/api/digital/drafts/${division}`,
  );
  return data.draft;
}

export async function saveDraft(
  payload: DraftPayload,
  division: "digital" | "print" = "digital",
): Promise<ServerDraft> {
  const data = await apiRequest<{ success: boolean; draft: ServerDraft }>(
    `/api/digital/drafts/${division}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
  return data.draft;
}

export async function resetPlanDraft(
  division: "digital" | "print" = "digital",
): Promise<ServerDraft> {
  const data = await apiRequest<{ success: boolean; draft: ServerDraft }>(
    `/api/digital/drafts/${division}/reset-plan`,
    { method: "POST" },
  );
  return data.draft;
}

export function selectionToDraftState(selection: PlanSelection): DraftPlanState {
  return {
    selected: Array.from(selection.selected),
    addOns: Array.from(selection.addOns),
    addOnCounts: selection.addOnCounts,
    inheritedOn: selection.inheritedOn,
  };
}
