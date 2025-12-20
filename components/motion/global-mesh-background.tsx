"use client";

import { AnimatedMeshBackground } from "./animated-mesh-background";

export function GlobalMeshBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <AnimatedMeshBackground
        className="w-full h-full bg-primary"
        dotCount={50}
        connectionDistance={100}
      />
    </div>
  );
}
