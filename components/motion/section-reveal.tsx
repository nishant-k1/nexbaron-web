"use client";

import { motion, type Variants } from "framer-motion";
import { useSyncExternalStore } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useRevealInView } from "@/hooks/use-reveal-in-view";

const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

type RevealVariant = "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "none";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
}

const variants: Record<RevealVariant, Variants> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  slideLeft: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  none: { hidden: {}, visible: {} },
};

export function SectionReveal({
  children,
  className,
  delay = 0,
  variant = "slideUp",
  duration = 0.5,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useRevealInView<HTMLElement>();
  const hasMounted = useMounted();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={hasMounted && inView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.section>
  );
}

/* Stagger wrapper — delays children animations */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  tag?: "div" | "ul" | "ol";
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  tag = "div",
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useRevealInView<HTMLDivElement>();
  const hasMounted = useMounted();

  if (prefersReducedMotion) {
    const Tag = tag;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[tag] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={hasMounted && inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* Individual stagger item */
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Hover card wrapper — subtle lift on hover */
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className={className}>
      {children}
    </motion.div>
  );
}
