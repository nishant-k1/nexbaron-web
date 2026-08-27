"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Mark as mounted after first client paint — first hard load renders
  // without any motion wrapper, so no fade flash.
  useEffect(() => {
    setHasMounted(true);
    prevPathnameRef.current = pathname;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!hasMounted) return;
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current === pathname) return;

    prevPathnameRef.current = pathname;
    setShowOverlay(true);
    const timer = setTimeout(() => setShowOverlay(false), 500);
    return () => clearTimeout(timer);
  }, [pathname, hasMounted]);

  // First paint (hard load / deep link / refresh): no animation at all
  if (!hasMounted) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
