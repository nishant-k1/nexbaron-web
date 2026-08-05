import {
  DEFAULT_EXPECTATIONS,
  type BillingType,
  type Plan,
  type PlanService,
  type TimelineExpectation,
} from "@/features/digital/plans";

export const LAUNCH_FIXED_DAYS = 4;

export interface PlanSelection {
  selected: Set<string>;
  addOns: Set<string>;
  addOnCounts: Record<string, number>;
  inheritedOn: boolean;
}

export interface InheritedView {
  label: string;
  oneTime: number;
  monthly: number;
  active: boolean;
  anySelected: boolean;
}

export interface PreparedPlan {
  plan: Plan;
  oneTimeTotal: number;
  monthlyTotal: number;
  serviceSelection: Record<string, boolean>;
  addOnSelection: Record<string, boolean>;
  addOnCounts: Record<string, number>;
  inherited: InheritedView | null;
}

export type SavedPlanState = {
  selected: string[];
  addOns: string[];
  addOnCounts: Record<string, number>;
  inheritedOn: boolean;
};

export function createDefaultSelection(plan: Plan): PlanSelection {
  return {
    selected: new Set(plan.services.map((s) => s.id)),
    addOns: new Set<string>(),
    addOnCounts: {},
    inheritedOn: true,
  };
}

export function selectionFromSaved(plan: Plan, saved?: SavedPlanState): PlanSelection {
  if (!saved) return createDefaultSelection(plan);
  return {
    selected: new Set(saved.selected),
    addOns: new Set(saved.addOns),
    addOnCounts: saved.addOnCounts ?? {},
    inheritedOn: saved.inheritedOn,
  };
}

function offByType(plan: Plan, selection: Set<string>, type: BillingType): number {
  return plan.services
    .filter((s) => s.type === type && !selection.has(s.id))
    .reduce((sum, s) => sum + s.price, 0);
}

function addOnByType(
  plan: Plan,
  selection: Set<string>,
  counts: Record<string, number>,
  type: BillingType,
): number {
  return plan.addOns
    .filter((s) => s.type === type && selection.has(s.id))
    .reduce((sum, s) => sum + s.price * (counts[s.id] ?? 1), 0);
}

function totalSelected(plan: Plan, selection: Set<string>): number {
  return plan.services.filter((s) => selection.has(s.id)).length;
}

export function computePrepared(
  plans: Plan[],
  byId: (id: string) => PlanSelection,
): PreparedPlan[] {
  const result: PreparedPlan[] = [];
  let lower: { plan: Plan; oneTimeLive: number; monthlyLive: number } | null = null;

  for (const plan of plans) {
    const selection = byId(plan.id);
    const ownOffOneTime = offByType(plan, selection.selected, "oneTime");
    const ownOffMonthly = offByType(plan, selection.selected, "monthly");

    let inheritedOneTime = 0;
    let inheritedMonthly = 0;
    let inherited: InheritedView | null = null;

    if (lower) {
      const lowerReductionOneTime = lower.plan.oneTime - lower.oneTimeLive;
      const lowerReductionMonthly = lower.plan.monthly - lower.monthlyLive;
      const lowerSelected = totalSelected(lower.plan, byId(lower.plan.id).selected);

      if (selection.inheritedOn) {
        inheritedOneTime = lowerReductionOneTime;
        inheritedMonthly = lowerReductionMonthly;
      } else {
        inheritedOneTime = lower.plan.oneTime;
        inheritedMonthly = lower.plan.monthly;
      }

      inherited = {
        label:
          lowerSelected === lower.plan.services.length
            ? (plan.inherited?.label ?? "Everything in previous plan")
            : lowerSelected > 0
              ? `${plan.inherited?.label ?? "Everything"} (${lowerSelected}/${lower.plan.services.length} included)`
              : `No ${(plan.inherited?.label ?? "services").replace("Everything in ", "").toLowerCase()} selected`,
        oneTime: lower.plan.oneTime,
        monthly: lower.plan.monthly,
        active: selection.inheritedOn,
        anySelected: lowerSelected > 0,
      };
    }

    const oneTimeTotal = Math.max(
      0,
      plan.oneTime -
        ownOffOneTime -
        inheritedOneTime +
        addOnByType(plan, selection.addOns, selection.addOnCounts, "oneTime"),
    );
    const monthlyTotal = Math.max(
      0,
      plan.monthly -
        ownOffMonthly -
        inheritedMonthly +
        addOnByType(plan, selection.addOns, selection.addOnCounts, "monthly"),
    );

    const serviceSelection: Record<string, boolean> = {};
    for (const service of plan.services) {
      serviceSelection[service.id] = selection.selected.has(service.id);
    }

    const addOnSelection: Record<string, boolean> = {};
    for (const addOn of plan.addOns) {
      addOnSelection[addOn.id] = selection.addOns.has(addOn.id);
    }

    result.push({
      plan,
      oneTimeTotal,
      monthlyTotal,
      serviceSelection,
      addOnSelection,
      addOnCounts: selection.addOnCounts,
      inherited,
    });

    lower = {
      plan,
      oneTimeLive: oneTimeTotal,
      monthlyLive: monthlyTotal,
    };
  }

  return result;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function collectBuildServices(
  plans: Plan[],
  byId: (id: string) => PlanSelection,
  planId: string,
): PlanService[] {
  const idx = plans.findIndex((p) => p.id === planId);
  if (idx < 0) return [];
  const selection = byId(planId);
  const services: PlanService[] = [];

  if (idx > 0) {
    const lower = plans[idx - 1];
    if (lower) {
      const lowerSelection = byId(lower.id);
      if (selection.inheritedOn || lowerSelection.inheritedOn) {
        services.push(...collectBuildServices(plans, byId, lower.id));
      }
    }
  }

  const activePlan = plans[idx];
  if (activePlan) {
    for (const s of activePlan.services) {
      if (selection.selected.has(s.id)) services.push(s);
    }
    for (const a of activePlan.addOns) {
      if (selection.addOns.has(a.id)) {
        const count = Math.max(1, selection.addOnCounts[a.id] ?? 1);
        for (let i = 0; i < count; i++) services.push(a);
      }
    }
  }
  return services;
}

export interface LaunchTimeline {
  launchDays: number;
  launchDate: Date;
  expectations: TimelineExpectation[];
}

export function computeLaunchTimeline(
  plans: Plan[],
  byId: (id: string) => PlanSelection,
  planId: string,
  from = new Date(),
): LaunchTimeline {
  const plan = plans.find((p) => p.id === planId);
  if (!plan) {
    return { launchDays: 7, launchDate: addDays(from, 7), expectations: DEFAULT_EXPECTATIONS };
  }

  if (plan.timelineMode === "phased") {
    const days = plan.foundationDays ?? 30;
    return {
      launchDays: days,
      launchDate: addDays(from, days),
      expectations: [...(plan.expectations ?? []), ...DEFAULT_EXPECTATIONS],
    };
  }

  const services = collectBuildServices(plans, byId, planId);
  const critical = services
    .filter((s) => !s.parallel && (s.deliverDays ?? 0) > 0)
    .reduce((sum, s) => sum + (s.deliverDays ?? 0), 0);
  const launchDays = Math.max(1, Math.round(LAUNCH_FIXED_DAYS + critical));

  return {
    launchDays,
    launchDate: addDays(from, launchDays),
    expectations: [...(plan.expectations ?? []), ...DEFAULT_EXPECTATIONS],
  };
}

export interface LaunchStageRow {
  key: string;
  label: string;
  caption: string;
  dayLabel: string;
  startDay: number;
  endDay: number;
}

export function buildStageSchedule(launchDays: number): LaunchStageRow[] {
  const buildEnd = Math.max(2, launchDays - 3);
  const reviewStart = buildEnd + 1;
  return [
    {
      key: "payment",
      label: "You book & pay online",
      caption: "You choose a plan, pay online, and get a GST invoice instantly.",
      dayLabel: "Today",
      startDay: 0,
      endDay: 0,
    },
    {
      key: "kickoff",
      label: "Kickoff & content",
      caption: "We send a short form for your business details, photos, and content.",
      dayLabel: "Day 1",
      startDay: 1,
      endDay: 1,
    },
    {
      key: "build",
      label: "Design & build",
      caption: "We design and build your website and prepare your Google Business Profile.",
      dayLabel: launchDays <= 4 ? `Days 2–${launchDays}` : `Days 2–${buildEnd}`,
      startDay: 2,
      endDay: buildEnd,
    },
    {
      key: "review",
      label: "Review & revisions",
      caption: "You see a live preview, mark tweaks, and we refine.",
      dayLabel: `Days ${reviewStart}–${launchDays - 1}`,
      startDay: reviewStart,
      endDay: launchDays - 1,
    },
    {
      key: "launch",
      label: "Go live",
      caption: "Your website is published and your Google Business Profile is submitted.",
      dayLabel: `Day ${launchDays}`,
      startDay: launchDays,
      endDay: launchDays,
    },
  ];
}
