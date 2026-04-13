"use client";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Agent task data ───────────────────────────────────────────────────────────
const AGENTS = [
  {
    id: "product",
    icon: "🛍️",
    name: "상품 기획 Agent",
    color: "#8D36EB",
    glowColor: "rgba(141,54,235,0.35)",
    tasks: [
      "트렌드 상품 분석 중...",
      "경쟁사 가격 비교 완료",
      "추천 카테고리: 뷰티/스킨케어",
      "예상 마진율: 42% ↑",
    ],
    output: "상품 기획서 생성 완료 ✓",
  },
  {
    id: "content",
    icon: "✍️",
    name: "콘텐츠 생성 Agent",
    color: "#165CFF",
    glowColor: "rgba(22,92,255,0.35)",
    tasks: [
      "상품 설명문 초안 작성 중...",
      "SEO 키워드 최적화 적용",
      "이미지 프롬프트 생성 완료",
      "네이버 쇼핑 양식 맞춤 변환",
    ],
    output: "콘텐츠 패키지 완성 ✓",
  },
  {
    id: "marketing",
    icon: "📣",
    name: "마케팅 Agent",
    color: "#FF6B35",
    glowColor: "rgba(255,107,53,0.35)",
    tasks: [
      "SNS 포스팅 스케줄 수립 중...",
      "인스타그램 광고 소재 생성",
      "카카오 알림톡 메시지 완성",
      "이메일 캠페인 A/B 테스트 설계",
    ],
    output: "마케팅 캠페인 론칭 준비 완료 ✓",
  },
  {
    id: "analytics",
    icon: "📊",
    name: "데이터 분석 Agent",
    color: "#00D4AA",
    glowColor: "rgba(0,212,170,0.35)",
    tasks: [
      "판매 데이터 수집 중...",
      "전환율 35% → 52% 개선 감지",
      "고객 세그먼트 재분류 완료",
      "다음 시즌 수요 예측 생성",
    ],
    output: "인사이트 리포트 발행 완료 ✓",
  },
];

const SCENE_DURATION = 90; // frames per agent scene
const TOTAL_FRAMES = AGENTS.length * SCENE_DURATION;

// ─── Typed text helper ──────────────────────────────────────────────────────────
function TypedText({ text, startFrame, frame, color = "#e2e8f0" }: { text: string; startFrame: number; frame: number; color?: string }) {
  const charsVisible = Math.max(0, Math.floor((frame - startFrame) * 1.8));
  const visible = charsVisible > 0;
  return (
    <span style={{ color, opacity: visible ? 1 : 0 }}>
      {text.slice(0, charsVisible)}
      {charsVisible < text.length && charsVisible > 0 ? <span style={{ opacity: 0.6 }}>|</span> : null}
    </span>
  );
}

// ─── Mini metric card ───────────────────────────────────────────────────────────
function MetricCard({ label, value, delta, delay, frame, fps }: { label: string; value: string; delta: string; delay: number; frame: number; fps: number }) {
  const progress = spring({ frame, fps, from: 0, to: 1, delay, config: { damping: 12, stiffness: 80 } });
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8,
      padding: "10px 14px",
      flex: 1,
      transform: `translateY(${interpolate(progress, [0, 1], [12, 0])}px)`,
      opacity: progress,
    }}>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>{value}</div>
      <div style={{ fontSize: 10, color: "#22c55e" }}>{delta}</div>
    </div>
  );
}

// ─── Main composition ──────────────────────────────────────────────────────────
export function AgentOSComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const loopedFrame = frame % TOTAL_FRAMES;
  const sceneIndex = Math.floor(loopedFrame / SCENE_DURATION);
  const sceneFrame = loopedFrame % SCENE_DURATION;

  const agent = AGENTS[sceneIndex];
  const prevAgent = AGENTS[(sceneIndex - 1 + AGENTS.length) % AGENTS.length];

  // Scene transition
  const transitionIn = spring({ frame: sceneFrame, fps, from: 0, to: 1, config: { damping: 18, stiffness: 120 } });
  const fadeOut = sceneFrame > SCENE_DURATION - 12
    ? interpolate(sceneFrame, [SCENE_DURATION - 12, SCENE_DURATION], [1, 0])
    : 1;
  const sceneOpacity = Math.min(transitionIn, fadeOut);

  // Task appearance timings
  const taskOffsets = [6, 22, 38, 54];
  const outputFrame = 70;

  // Progress bar
  const progressWidth = interpolate(sceneFrame, [0, SCENE_DURATION - 15], [0, 100]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0a0a14 0%, #0d0d1a 50%, #090912 100%)",
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
      overflow: "hidden",
    }}>
      {/* Glow orb */}
      <div style={{
        position: "absolute",
        top: -80,
        right: -80,
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: agent.glowColor,
        filter: "blur(80px)",
        opacity: sceneOpacity * 0.7,
        transition: "background 0.3s",
      }} />

      {/* Header */}
      <div style={{
        padding: "16px 20px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${agent.color}, ${agent.color}99)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}>N</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9", letterSpacing: "0.08em" }}>NGA Commerce OS</div>
          <div style={{ fontSize: 9, color: "#475569" }}>AI-Native 이커머스 운영 시스템</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {AGENTS.map((a, i) => (
            <div key={a.id} style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i === sceneIndex ? a.color : "rgba(255,255,255,0.12)",
              boxShadow: i === sceneIndex ? `0 0 8px ${a.color}` : "none",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Agent sidebar */}
      <div style={{ display: "flex", flex: 1, height: "calc(100% - 57px)" }}>
        <div style={{
          width: 130,
          padding: "12px 8px",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          <div style={{ fontSize: 8, color: "#475569", padding: "0 8px 6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Agent Hub</div>
          {AGENTS.map((a, i) => {
            const isActive = i === sceneIndex;
            const isDone = i < sceneIndex || (sceneIndex === 0 && i > 0 && frame > SCENE_DURATION);
            return (
              <div key={a.id} style={{
                padding: "8px 10px",
                borderRadius: 8,
                background: isActive ? `${a.color}22` : "transparent",
                border: `1px solid ${isActive ? `${a.color}44` : "transparent"}`,
                display: "flex",
                alignItems: "center",
                gap: 7,
                opacity: isActive ? 1 : 0.5,
              }}>
                <span style={{ fontSize: 13 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: isActive ? a.color : "#64748b", lineHeight: 1.3 }}>
                    {a.name.replace(" Agent", "")}
                  </div>
                  <div style={{ fontSize: 8, color: isDone ? "#22c55e" : isActive ? "#94a3b8" : "#334155" }}>
                    {isDone ? "완료 ✓" : isActive ? "실행중..." : "대기중"}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Stats */}
          <div style={{ marginTop: "auto", padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.03)" }}>
            <div style={{ fontSize: 8, color: "#475569", marginBottom: 4 }}>오늘 처리량</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9" }}>1,247</div>
            <div style={{ fontSize: 8, color: "#22c55e" }}>+18% vs 어제</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12, opacity: sceneOpacity }}>
          {/* Agent header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${agent.color}44, ${agent.color}22)`,
              border: `1px solid ${agent.color}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              transform: `scale(${spring({ frame: sceneFrame, fps, from: 0.6, to: 1, config: { damping: 10, stiffness: 200 } })})`,
            }}>
              {agent.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{agent.name}</div>
              <div style={{ fontSize: 10, color: agent.color }}>● 실행 중</div>
            </div>
            <div style={{
              marginLeft: "auto",
              padding: "4px 10px",
              borderRadius: 20,
              background: `${agent.color}22`,
              border: `1px solid ${agent.color}44`,
              fontSize: 9,
              color: agent.color,
              fontWeight: 600,
            }}>
              AI AGENT
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progressWidth}%`,
              background: `linear-gradient(90deg, ${agent.color}, ${agent.color}88)`,
              borderRadius: 4,
            }} />
          </div>

          {/* Task stream */}
          <div style={{
            flex: 1,
            background: "rgba(0,0,0,0.35)",
            borderRadius: 10,
            padding: "14px 16px",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: "0.08em", marginBottom: 2 }}>● LIVE LOG</div>
            {agent.tasks.map((task, i) => (
              <div key={task} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                opacity: sceneFrame >= taskOffsets[i] ? 1 : 0,
              }}>
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: agent.color,
                  marginTop: 4,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${agent.color}`,
                }} />
                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>
                  <TypedText text={task} startFrame={taskOffsets[i]} frame={sceneFrame} />
                </div>
              </div>
            ))}

            {/* Output */}
            {sceneFrame >= outputFrame ? (
              <div style={{
                marginTop: 4,
                padding: "10px 14px",
                borderRadius: 8,
                background: `${agent.color}18`,
                border: `1px solid ${agent.color}44`,
                fontSize: 11,
                fontWeight: 600,
                color: agent.color,
                opacity: interpolate(sceneFrame, [outputFrame, outputFrame + 8], [0, 1]),
                transform: `translateY(${interpolate(sceneFrame, [outputFrame, outputFrame + 8], [6, 0])}px)`,
              }}>
                <TypedText text={agent.output} startFrame={outputFrame} frame={sceneFrame} color={agent.color} />
              </div>
            ) : null}
          </div>

          {/* Metric cards */}
          <div style={{ display: "flex", gap: 8 }}>
            <MetricCard label="처리 건수" value="312" delta="+12.4%" delay={10} frame={sceneFrame} fps={fps} />
            <MetricCard label="정확도" value="98.7%" delta="+2.1%" delay={18} frame={sceneFrame} fps={fps} />
            <MetricCard label="시간 절감" value="4.2h" delta="오늘" delay={26} frame={sceneFrame} fps={fps} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
