"use client";

import { Player } from "@remotion/player";
import { AgentOSComposition } from "./AgentOSComposition";

const AGENTS_COUNT = 4;
const SCENE_DURATION = 90;
const FPS = 30;
const DURATION_IN_FRAMES = AGENTS_COUNT * SCENE_DURATION; // 360 frames = 12s, then loops

export default function AgentOSPlayerInner() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(141,54,235,0.18), 0 0 40px rgba(141,54,235,0.10), 0 25px 60px rgba(0,0,0,0.5)",
        background: "#0a0a14",
      }}
    >
      <Player
        component={AgentOSComposition}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        compositionWidth={520}
        compositionHeight={340}
        style={{ width: "100%", height: "auto", display: "block" }}
        loop
        autoPlay
        controls={false}
        showVolumeControls={false}
        clickToPlay={false}
      />
    </div>
  );
}
