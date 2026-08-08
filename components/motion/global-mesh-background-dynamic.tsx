"use client";

import dynamic from "next/dynamic";

const GlobalMeshBackground = dynamic(
  () =>
    import("@/components/motion/global-mesh-background").then((mod) => ({
      default: mod.GlobalMeshBackground,
    })),
  { ssr: false },
);

export default function GlobalMeshBackgroundDynamic() {
  return <GlobalMeshBackground />;
}
