import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { ACCENTS, P } from "./theme";

const BLOBS = new Array(9).fill(0).map((_, i) => ({
  x: random(`bx${i}`) * 1080,
  y: random(`by${i}`) * 1920,
  r: 180 + random(`br${i}`) * 260,
  color: ACCENTS[i % ACCENTS.length],
  phase: random(`bp${i}`) * Math.PI * 2,
}));

// Creamy backdrop with slowly drifting pastel blobs and a subtle dot grid.
export const PastelBackground: React.FC<{ readonly tint?: string }> = ({
  tint = P.cream,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: tint, overflow: "hidden" }}>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x - b.r + Math.sin(frame / 50 + b.phase) * 40,
            top: b.y - b.r + Math.cos(frame / 60 + b.phase) * 40,
            width: b.r * 2,
            height: b.r * 2,
            borderRadius: "50%",
            backgroundColor: b.color,
            opacity: 0.35,
            filter: "blur(60px)",
          }}
        />
      ))}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${P.inkSoft}10 2px, transparent 2px)`,
          backgroundSize: "36px 36px",
        }}
      />
    </AbsoluteFill>
  );
};
