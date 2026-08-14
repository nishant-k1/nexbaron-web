"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { LaunchTracker } from "@/components/tracking/launch-tracker";
import { fetchMyOrder, type MyOrder } from "@/features/digital/orders";
import { buildStageSchedule } from "@/features/digital/plan-summary";

interface CustomerProjectTrackerProps {
  fallback: React.ReactNode;
}

export function CustomerProjectTracker({ fallback }: CustomerProjectTrackerProps) {
  const { user } = useAuth();
  const [order, setOrder] = useState<MyOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetchMyOrder()
      .then((o) => {
        if (cancelled) return;
        setOrder(o || null);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) return <>{fallback}</>;
  if (!ready) return null;
  if (!order || !order.launchDate) return <>{fallback}</>;

  const launchDate = new Date(order.launchDate);
  const launchDays = order.launchDays || 7;
  const startDate = new Date(launchDate);
  startDate.setDate(startDate.getDate() - launchDays);

  return (
    <div>
      <LaunchTracker
        launchDays={launchDays}
        launchDate={launchDate}
        stages={buildStageSchedule(launchDays)}
        startDate={startDate}
        prefix="Your Project Progress"
      />
    </div>
  );
}
