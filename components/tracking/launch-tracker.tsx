"use client";

import { CalendarCheck, Check, Clock } from "lucide-react";

import type { LaunchStageRow } from "@/features/digital/plan-summary";
import { addDays } from "@/features/digital/plan-summary";

type StageState = "done" | "current" | "upcoming";

function floorToDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// A stage is "started" once its start day has arrived. The deepest started
// stage becomes the running dot (end of the highlighted line); earlier started
// stages are "done" and later ones are "upcoming". This guarantees a blinking
// current dot always sits at the tip of the highlighted progress line.
export function resolveStageStates(
  stages: LaunchStageRow[],
  today: Date,
  startDate: Date,
): StageState[] {
  const t = floorToDay(today);
  const started = stages.map((row) => t >= floorToDay(addDays(startDate, row.startDay)));
  let currentIdx = -1;
  for (let i = 0; i < started.length; i++) {
    if (started[i]) currentIdx = i;
  }
  if (currentIdx < 0 && stages.length > 0) currentIdx = 0;
  return stages.map((_, i) =>
    i < currentIdx ? "done" : i === currentIdx ? "current" : "upcoming",
  );
}

function resolveState(row: LaunchStageRow, states: StageState[], index: number): StageState {
  return states[index] ?? "upcoming";
}

export function formatCalendarDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function remainingDays(launchDate: Date, today: Date): number {
  const t = floorToDay(today);
  const l = floorToDay(launchDate);
  const diff = Math.round((l.getTime() - t.getTime()) / 86400000);
  return Math.max(0, diff);
}

interface LaunchTrackerProps {
  launchDays: number;
  launchDate: Date;
  stages: LaunchStageRow[];
  startDate?: Date;
  prefix?: string;
  showHeader?: boolean;
}

export function LaunchTracker({
  launchDate,
  stages,
  startDate = new Date(),
  prefix = "Launch date",
  showHeader = true,
}: LaunchTrackerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stageStates = resolveStageStates(stages, today, startDate);
  const daysLeft = remainingDays(launchDate, today);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden">
      {showHeader && (
        <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-teal-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-200">{prefix}</p>
              <p className="text-xl font-heading font-semibold text-white">
                {formatCalendarDate(launchDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <Clock className="w-4 h-4 text-slate-200" />
            {daysLeft > 0 ? `${daysLeft} days to launch` : "Launch day"}
          </div>
        </div>
      )}

      <ol className="p-6 space-y-0">
        {stages.map((row, index) => {
          const state = resolveState(row, stageStates, index);
          const next = stages[index + 1];
          const nextState = next ? resolveState(next, stageStates, index + 1) : state;
          const lineActive = nextState === "done" || nextState === "current";
          return (
            <li key={row.key} className="relative flex gap-4 pb-6 last:pb-0">
              {index < stages.length - 1 && (
                <span
                  aria-hidden
                  className={
                    lineActive
                      ? "absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-teal-400/70 to-teal-400/40"
                      : "absolute left-[15px] top-8 bottom-0 w-px bg-white/10"
                  }
                />
              )}
              <div className="relative z-10 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border shrink-0">
                {state === "done" ? (
                  <span className="h-8 w-8 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal-400" />
                  </span>
                ) : state === "current" ? (
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 border border-teal-400">
                    <span className="absolute h-8 w-8 rounded-full bg-teal-400/30 animate-ping" />
                    <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                  </span>
                ) : (
                  <span className="h-8 w-8 rounded-full border border-white/15 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                  </span>
                )}
              </div>
              <div className="pt-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h4
                    className={
                      state === "upcoming"
                        ? "text-sm font-semibold text-slate-200"
                        : "text-sm font-semibold text-white"
                    }
                  >
                    {row.label}
                  </h4>
                  <span className="text-xs font-mono text-teal-500/80 shrink-0">
                    {row.dayLabel}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-snug mt-1">{row.caption}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
