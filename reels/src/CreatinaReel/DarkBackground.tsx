import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { G } from "./theme";

const DUST = new Array(40).fill(0).map((_, i) => ({
  x: random(`dx${i}`) * 1080,
  y: random(`dy${i}`) * 1920,
  r: 2 + random(`dr${i}`) * 6,
  speed: 0.3 + random(`ds${i}`) * 1.2,
  green: random(`dg${i}`) > 0.4,
  phase: random(`dp${i}`) * Math.PI * 2,
}));

// Near-black studio backdrop with a soft green glow and drifting green dust,
// matching the floating product render.
export const DarkBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 45%, #1F2A22 0%, ${G.dark} 65%)`,
        overflow: "hidden",
      }}
    >
      {DUST.map((d, i) => {
        const y = ((((d.y - frame * d.speed * 2) % 1980) + 1980) % 1980) - 30;
        const x = d.x + Math.sin(frame / 30 + d.phase) * 14;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: "50%",
              backgroundColor: d.green ? G.neon : G.white,
              opacity: 0.25 + 0.35 * Math.abs(Math.sin(frame / 20 + d.phase)),
              boxShadow: `0 0 ${d.r * 4}px ${d.green ? G.neon : G.white}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
