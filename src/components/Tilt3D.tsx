"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** 최대 기울기 각도 (deg) */
  max?: number;
  /** 마우스 위치를 따라가는 광택 하이라이트 */
  glare?: boolean;
  /** hover 시 살짝 확대 */
  scale?: number;
  /** 글레어 모서리 라운딩 클래스 (카드와 맞추기) */
  glareRadiusClassName?: string;
};

/**
 * 마우스를 따라 카드가 3D로 기울어지는 래퍼.
 * three.js 없이 CSS perspective + framer-motion 스프링으로 구현.
 */
export function Tilt3D({
  children,
  className,
  max = 8,
  glare = true,
  scale = 1.015,
  glareRadiusClassName = "rounded-2xl",
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32), rgba(255,255,255,0) 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        whileHover={{ scale }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-10 ${glareRadiusClassName}`}
            style={{ background: glareBg }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </motion.div>
    </div>
  );
}
