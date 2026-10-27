import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Emo } from "../Emo";
import { fontFamily } from "../fonts";
import { SplitPanel } from "../SceneShell";
import { Centered, Sticker } from "../ui";
import { P } from "../theme";

// "separar estos dos conceptos y saber la importancia de este"
const CUT_AT = 6;
const APART_AT = 22;
const KEY_AT = 71;

export const Separate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const apart = spring({
    frame: frame - APART_AT,
    fps,
    config: { damping: 12 },
  });
  const cutY = interpolate(frame, [CUT_AT, CUT_AT + 14], [380, 900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const half = (bg: string, emoji: string, label: string, side: -1 | 1) => (
    <div
      style={{
        position: "absolute",
        top: 400,
        left: side === -1 ? 110 : 540,
        width: 430,
        height: 420,
        backgroundColor: bg,
        borderRadius: side === -1 ? "48px 0 0 48px" : "0 48px 48px 0",
        border: `6px solid ${P.white}`,
        boxShadow: "0 20px 50px rgba(61,53,83,0.2)",
        transform: `translateX(${side * apart * 40}px) rotate(${side * apart * 4}deg)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Emo char={emoji} size={140} />
      <div style={{ fontFamily, fontWeight: 900, fontSize: 60, color: P.ink }}>
        {label}
      </div>
    </div>
  );
  return (
    <SplitPanel tint={P.cream}>
      <Centered top={245}>
        <Sticker emoji="✂️" bg={P.blue} fontSize={56}>
          Sepáralos
        </Sticker>
      </Centered>
      {half(P.mint, "💡", "PENSAR", -1)}
      {half(P.pink, "🌀", "RUMIAR", 1)}
      {frame < APART_AT + 4 ? (
        <div
          style={{
            position: "absolute",
            left: 536,
            top: 380,
            width: 8,
            height: cutY - 380,
            backgroundImage: `repeating-linear-gradient(180deg, ${P.ink} 0 18px, transparent 18px 32px)`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 470,
          top: cutY - 70,
          transform: "rotate(90deg)",
        }}
      >
        <Emo char="✂️" size={130} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 830,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Sticker
          delay={KEY_AT}
          emoji="🔑"
          bg={P.lemon}
          fontSize={50}
          rotate={3}
        >
          La clave
        </Sticker>
      </div>
    </SplitPanel>
  );
};
