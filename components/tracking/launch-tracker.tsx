"use client";

import { CalendarCheck, Check, Clock } from "lucide-react";

import type { LaunchStageRow } from "@/features/digital/plan-summary";
import { addDays } from "@/features/digital/plan-summary";

type StageState = "done" | "current" | "upcoming";

function resolveState(row: LaunchStageRow, today: Date, startDate: Date): StageState {
  const rowEnd = addDays(startDate, row.endDay);
  const rowStart = addDays(startDate, row.startDay);
  if (today >= rowEnd) return "done";
  if (today >= rowStart) return "current";
  return "upcoming";
}

export function formatCalendarDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
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
  launchDays,
  launchDate,
  stages,
  startDate = new Date(),
  prefix = "Launch date",
  showHeader = true,
}: LaunchTrackerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden">
      {showHeader && (
        <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-teal-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">{prefix}</p>
              <p className="text-xl font-heading font-semibold text-white">
                {formatCalendarDate(launchDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Clock className="w-4 h-4 text-slate-400" />
            {launchDays} days to launch
          </div>
        </div>
      )}

      <ol className="p-6 space-y-0">
        {stages.map((row, index) => {
          const state = resolveState(row, today, startDate);
          return (
            <li key={row.key} className="relative flex gap-4 pb-6 last:pb-0">
              {index < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[15px] top-8 bottom-0 w-px bg-white/10"
                />
              )}
              <div className="relative z-10 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border shrink-0">
                {state === "done" ? (
                  <span className="h-8 w-8 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal-400" />
                  </span>
                ) : state === "current" ? (
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 border border-teal-400">
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
                        ? "text-sm font-semibold text-slate-400"
                        : "text-sm font-semibold text-white"
                    }
                  >
                    {row.label}
                  </h4>
                  <span className="text-xs font-mono text-teal-500/80 shrink-0">
                    {row.dayLabel}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-snug mt-1">{row.caption}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
