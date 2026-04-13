"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy-load the Player so it never runs on the server
const PlayerInner = dynamic(() => import("./AgentOSPlayerInner"), {
  ssr: false,
  loading: () => <AgentOSSkeleton />,
});

function AgentOSSkeleton() {
  return (
    <div className="w-full h-full rounded-2xl bg-[#0a0a14] border border-white/8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#8D36EB] border-t-transparent animate-spin" />
        <span className="text-xs text-slate-500">Agent OS 로딩 중...</span>
      </div>
    </div>
  );
}

export function AgentOSPlayer() {
  return (
    <Suspense fallback={<AgentOSSkeleton />}>
      <PlayerInner />
    </Suspense>
  );
}
