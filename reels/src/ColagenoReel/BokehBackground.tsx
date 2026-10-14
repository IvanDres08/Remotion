import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C } from "./theme";

const COLORS = [C.pink, C.lilac, C.white, C.magenta, C.hotPink];

const DOTS = new Array(28).fill(0).map((_, i) => ({
  x: random(`x${i}`) * 1080,
  y: random(`y${i}`) * 1920,
  r: 30 + random(`r${i}`) * 90,
  color: COLORS[i % COLORS.length],
  blur: 6 + random(`b${i}`) * 26,
  speed: 0.4 + random(`s${i}`) * 1.2,
  phase: random(`p${i}`) * Math.PI * 2,
  opacity: 0.2 + random(`o${i}`) * 0.45,
}));

// Dark plum backdrop with drifting out-of-focus pink/lilac "pills", like the
// reference product render.
export const BokehBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, ${C.plumMid} 0%, ${C.plum} 72%)`,
        overflow: "hidden",
      }}
    >
      {DOTS.map((d, i) => {
        const y = ((((d.y - frame * d.speed * 2) % 2100) + 2100) % 2100) - 90;
        const x = d.x + Math.sin(frame / 40 + d.phase) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - d.r,
              top: y - d.r,
              width: d.r * 2,
              height: d.r * 1.3,
              borderRadius: "50%",
              backgroundColor: d.color,
              opacity: d.opacity,
              filter: `blur(${d.blur}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
