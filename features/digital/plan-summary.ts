import {
  DEFAULT_EXPECTATIONS,
  svcAnnual,
  svcMonthly,
  svcSetup,
  type Plan,
  type PlanService,
  type TimelineExpectation,
} from "@/features/digital/plans";

// Server is SSOT for pricing/timeline; these client helpers mirror
// nexbaron-api/src/features/digital/catalog/** and are re-validated on checkout.
// Keep LAUNCH_FIXED_DAYS and inheritance logic in sync with the API.
export const LAUNCH_FIXED_DAYS = 4;

export interface PlanSelection {
  selected: Set<string>;
  addOns: Set<string>;
  addOnCounts: Record<string, number>;
  inheritedOn: boolean;
}

export interface InheritedView {
  label: string;
  setup: number;
  monthly: number;
  annual: number;
  active: boolean;
  anySelected: boolean;
}

export interface PreparedPlan {
  plan: Plan;
  oneTimeTotal: number;
  monthlyTotal: number;
  annualTotal: number;
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

export function computePrepared(
  plans: Plan[],
  byId: (id: string) => PlanSelection,
): PreparedPlan[] {
  const result: PreparedPlan[] = [];

  let cumSetup = 0;
  let cumMonthly = 0;
  let cumAnnual = 0;
  let cumSelectedCount = 0;

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i]!;
    const selection = byId(plan.id);

    let ownSetup = 0;
    let ownMonthly = 0;
    let ownAnnual = 0;
    let ownSelected = 0;
    for (const svc of plan.services) {
      if (selection.selected.has(svc.id)) {
        ownSetup += svcSetup(svc);
        ownMonthly += svcMonthly(svc);
        ownAnnual += svcAnnual(svc);
        ownSelected += 1;
      }
    }

    let addSetup = 0;
    let addMonthly = 0;
    let addAnnual = 0;
    for (const addOn of plan.addOns) {
      if (selection.addOns.has(addOn.id)) {
        const count = Math.max(1, selection.addOnCounts[addOn.id] ?? 1);
        addSetup += svcSetup(addOn) * count;
        addMonthly += svcMonthly(addOn) * count;
        addAnnual += svcAnnual(addOn) * count;
      }
    }

    let inherited: InheritedView | null = null;
    let inheritedSetup = 0;
    let inheritedMonthly = 0;
    let inheritedAnnual = 0;
    if (plan.inherited) {
      const active = selection.inheritedOn;
      if (active) {
        inheritedSetup = cumSetup;
        inheritedMonthly = cumMonthly;
        inheritedAnnual = cumAnnual;
      }
      inherited = {
        label: plan.inherited.label,
        setup: cumSetup,
        monthly: cumMonthly,
        annual: cumAnnual,
        active,
        anySelected: cumSelectedCount > 0,
      };
    }

    const oneTimeTotal = ownSetup + addSetup + inheritedSetup;
    const monthlyTotal = ownMonthly + addMonthly + inheritedMonthly;
    const annualTotal = ownAnnual + addAnnual + inheritedAnnual;

    const serviceSelection: Record<string, boolean> = {};
    for (const svc of plan.services) {
      serviceSelection[svc.id] = selection.selected.has(svc.id);
    }
    const addOnSelection: Record<string, boolean> = {};
    for (const addOn of plan.addOns) {
      addOnSelection[addOn.id] = selection.addOns.has(addOn.id);
    }

    result.push({
      plan,
      oneTimeTotal,
      monthlyTotal,
      annualTotal,
      serviceSelection,
      addOnSelection,
      addOnCounts: selection.addOnCounts,
      inherited,
    });

    const next = plans[i + 1];
    if (plan.inherited || (next && next.inherited)) {
      cumSetup = oneTimeTotal;
      cumMonthly = monthlyTotal;
      cumAnnual = annualTotal;
    } else {
      cumSetup = 0;
      cumMonthly = 0;
      cumAnnual = 0;
    }
    cumSelectedCount =
      ownSelected + (plan.inherited && selection.inheritedOn ? cumSelectedCount : 0);
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

  for (let i = 0; i < idx; i++) {
    // A lower tier is included only when it is a real ancestor of the chosen
    // plan, i.e. every tier between it and the chosen one is `inherited`
    // (Launch ⊂ Growth ⊂ Scale). Standalone tiers (e.g. custom) never pull
    // in lower-tier services.
    let chainOk = true;
    for (let j = i + 1; j <= idx; j++) {
      const tier = plans[j];
      if (!tier?.inherited) {
        chainOk = false;
        break;
      }
    }
    if (!chainOk) continue;

    const lower = plans[i]!;
    const lowerSelection = byId(lower.id);
    if (selection.inheritedOn || lowerSelection.inheritedOn) {
      for (const s of lower.services) {
        if (lowerSelection.selected.has(s.id)) services.push(s);
      }
      for (const a of lower.addOns) {
        if (lowerSelection.addOns.has(a.id)) {
          const count = Math.max(1, lowerSelection.addOnCounts[a.id] ?? 1);
          for (let c = 0; c < count; c++) services.push(a);
        }
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
      caption: "A short form collects your business details, photos, and content.",
      dayLabel: "Day 1",
      startDay: 1,
      endDay: 1,
    },
    {
      key: "build",
      label: "Design & setup",
      caption: "We design, build, and set up every service in your plan.",
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
      caption: "Your services are live and your launch date is confirmed.",
      dayLabel: `Day ${launchDays}`,
      startDay: launchDays,
      endDay: launchDays,
    },
  ];
}
