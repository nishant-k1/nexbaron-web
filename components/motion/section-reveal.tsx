"use client";

import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: string;
  duration?: number;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  return <section className={className}>{children}</section>;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  tag?: "div" | "ul" | "ol";
}

export function StaggerContainer({ children, className, tag = "div" }: StaggerProps) {
  const Tag = tag;
  return <Tag className={className}>{children}</Tag>;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  return <div className={className}>{children}</div>;
}
