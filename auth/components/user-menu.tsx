"use client";

import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/auth/auth-context";
import type { DivisionSlug } from "@/lib/divisions";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const DIVISION_HOME: Record<DivisionSlug, string> = {
  digital: "/digital",
  print: "/print",
};

const DIVISION_ACCOUNT: Record<DivisionSlug, { label: string; href: string }> = {
  digital: { label: "Your plan", href: "/digital/pricing" },
  print: { label: "Your quotes", href: "/print/quotes" },
};

export function UserMenu() {
  const { user, division, signOut, initialized, openSignIn } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!initialized) {
    return (
      <div className="inline-flex w-9 h-9 rounded-full bg-white/5 border border-white/10 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={() => openSignIn()}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${division === "print" ? "text-amber-400 hover:text-amber-300 border-amber-500/40 hover:border-amber-500/70" : "text-teal-400 hover:text-teal-300 border-teal-500/40 hover:border-teal-500/70"}`}
      >
        <User className="w-4 h-4" /> Sign in
      </button>
    );
  }

  if (!division) return null;
  const isPrint = division === "print";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-white/5 transition-colors"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {user.photo ? (
          <Image
            src={user.photo}
            alt={user.name}
            width={32}
            height={32}
            className={`w-8 h-8 rounded-full object-cover border bg-slate-800 ${isPrint ? "border-amber-500/40" : "border-teal-500/40"}`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span
            className={`grid place-items-center w-8 h-8 rounded-full text-slate-950 text-xs font-bold ${isPrint ? "bg-amber-500" : "bg-teal-500"}`}
          >
            {initials(user.name) || "U"}
          </span>
        )}
        <span className="hidden lg:block text-sm font-semibold text-white max-w-[12ch] truncate">
          {user.name}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/40 p-2"
        >
          <div className="px-3 py-2.5 border-b border-white/10 mb-1">
            <div className="text-sm font-semibold text-white truncate">{user.name}</div>
            <div className="text-[11px] text-slate-400 truncate">{user.email ?? user.phone}</div>
          </div>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              router.push(DIVISION_ACCOUNT[division].href);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-white/5 ${isPrint ? "text-amber-300" : "text-teal-300"}`}
          >
            <User className="w-4 h-4" /> {DIVISION_ACCOUNT[division].label}
          </button>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut();
              router.push(DIVISION_HOME[division]);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
