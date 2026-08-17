"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DayPicker, type ClassNames } from "react-day-picker";

import "react-day-picker/style.css";

import { Label } from "@/components/ui/label";

const ACCENT_COLORS = {
  digital: "#14b8a6",
  print: "#f59e0b",
} as const;

const ACCENT_RING = {
  digital: "border-teal-500/50 ring-2 ring-teal-500/20",
  print: "border-amber-500/50 ring-2 ring-amber-500/20",
} as const;

type DatePickerAccent = keyof typeof ACCENT_COLORS;

const dayPickerClassNames: Partial<ClassNames> = {
  root: "font-body",
  month_caption: "text-slate-200 font-semibold text-sm",
  caption_label: "text-slate-200 font-semibold text-sm",
  button_previous:
    "cursor-pointer flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors",
  button_next:
    "cursor-pointer flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors",
  chevron: "fill-current w-4 h-4",
  weekdays: "text-slate-500",
  weekday: "text-slate-500",
  day: "text-slate-200 w-11 h-11",
  day_button: "cursor-pointer rounded-full hover:bg-white/10 transition-colors w-10 h-10",
  outside: "text-slate-600",
  disabled: "opacity-40 cursor-not-allowed",
};

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateString(value: string): Date | undefined {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

function formatDisplay(value: string): string {
  const date = parseDateString(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

interface DatePickerFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  accent?: DatePickerAccent;
  required?: boolean;
}

export function DatePickerField({
  label,
  id,
  value,
  onChange,
  accent = "print",
  required,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedDate = parseDateString(value);
  const accentColor = ACCENT_COLORS[accent];
  const accentStyle: React.CSSProperties & { "--rdp-accent-color": string } = {
    "--rdp-accent-color": accentColor,
  };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (date: Date | undefined) => {
    if (date) onChange(toDateString(date));
    setOpen(false);
  };

  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </Label>

      <div className="relative mt-2">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`cursor-pointer flex w-full items-center gap-2 border border-border bg-neutral-bg px-3 py-2.5 text-sm rounded-xl transition-colors ${
            open ? ACCENT_RING[accent] : "hover:border-accent/50"
          } ${value ? "text-heading" : "text-muted"}`}
        >
          <CalendarDays className="w-4 h-4 shrink-0 text-slate-400" />
          <span className="truncate">{value ? formatDisplay(value) : "Select date"}</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute left-0 top-full z-30 mt-2 origin-top-left min-w-[320px] rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl"
              style={accentStyle}
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                defaultMonth={selectedDate ?? new Date()}
                disabled={{ before: new Date() }}
                navLayout="around"
                classNames={dayPickerClassNames}
                components={{
                  Chevron: ({ orientation }) =>
                    orientation === "left" ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ),
                  Month: ({ children, className }) => {
                    const childArray = React.Children.toArray(children);
                    const prevButton = childArray[0];
                    const caption = childArray[1];
                    const nextButton = childArray[2];
                    const grid = childArray.slice(3);
                    return (
                      <div className={className}>
                        <div className="flex items-center justify-between mb-2">
                          <div>{caption}</div>
                          <div className="flex items-center gap-1">
                            {prevButton}
                            {nextButton}
                          </div>
                        </div>
                        {grid}
                      </div>
                    );
                  },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
