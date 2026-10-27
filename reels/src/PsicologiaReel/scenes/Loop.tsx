import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../SceneShell";
import { Centered, Emoji, Sticker } from "../ui";
import { P } from "../theme";

// "...un bucle, en el cual el cerebro se confunde"
const BRAIN_AT = 35;
const CONFUSED_AT = 51;
const ORBIT = ["💭", "😟", "📱", "🗣️", "⏰", "💬"];

export const Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = frame >= CONFUSED_AT ? Math.sin(frame * 2.2) * 10 : 0;
  return (
    <SceneShell tint="#FFEFF5" exit={false}>
      <Centered top={250}>
        <Sticker bg={P.pink} emoji="🔁">
          En bucle
        </Sticker>
      </Centered>
      <svg
        width={760}
        height={760}
        viewBox="0 0 760 760"
        style={{
          position: "absolute",
          left: 160,
          top: 400,
          transform: `rotate(${frame * 4}deg)`,
        }}
      >
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`rotate(${a} 380 380)`}>
            <path
              d="M380 60 A320 320 0 0 1 657 220"
              stroke={P.lavender}
              strokeWidth="34"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M630 170 L680 240 L596 246 Z" fill={P.lavender} />
          </g>
        ))}
      </svg>
      {ORBIT.map((e, i) => {
        const a = (i / ORBIT.length) * Math.PI * 2 + frame / 14;
        return (
          <Emoji
            key={e}
            char={e}
            size={110}
            x={540 + Math.cos(a) * 250}
            y={780 + Math.sin(a) * 250}
            delay={i * 3}
            bob={0}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${shake}px)`,
        }}
      >
        <Emoji char="🧠" size={260} x={540} y={780} delay={BRAIN_AT} />
        {frame >= CONFUSED_AT ? (
          <>
            <Emoji char="❓" size={110} x={420} y={600} delay={CONFUSED_AT} />
            <Emoji
              char="❓"
              size={90}
              x={680}
              y={620}
              delay={CONFUSED_AT + 4}
            />
            <Emoji
              char="😵‍💫"
              size={150}
              x={760}
              y={960}
              delay={CONFUSED_AT + 2}
            />
          </>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: P.rose,
          opacity: interpolate(
            frame,
            [CONFUSED_AT, CONFUSED_AT + 3, CONFUSED_AT + 10],
            [0, 0.25, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      />
    </SceneShell>
  );
};
