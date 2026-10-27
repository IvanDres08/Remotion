import { interpolate, useCurrentFrame } from "remotion";
import { Emo } from "../Emo";
import { fontFamily } from "../fonts";
import { SplitPanel } from "../SceneShell";
import { Card, Centered, Sticker } from "../ui";
import { P } from "../theme";

// "puedes hacer el ejercicio de escribirlo y luego de escribirlo leerlo y decir
//  'esto ya pasó'"
const STEPS = [
  { n: 1, emoji: "✍️", text: "Escríbelo", at: 39, bg: P.mint },
  { n: 2, emoji: "👀", text: "Léelo", at: 98, bg: P.blue },
  { n: 3, emoji: "✅", text: "«Esto ya pasó»", at: 125, bg: P.pink },
];
const DONE_AT = 143;

export const Exercise: React.FC = () => {
  const frame = useCurrentFrame();
  const write = interpolate(
    frame,
    [STEPS[0].at + 4, STEPS[0].at + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const glow =
    frame >= DONE_AT ? 0.5 + 0.5 * Math.sin((frame - DONE_AT) / 3) : 0;
  return (
    <SplitPanel tint={P.cream}>
      <Centered top={240}>
        <Sticker delay={10} emoji="📝" bg={P.lavender} fontSize={58}>
          El ejercicio
        </Sticker>
      </Centered>
      {STEPS.map((s, i) => (
        <Card
          key={s.n}
          delay={s.at}
          bg={s.bg}
          style={{
            left: 80,
            top: 400 + i * 170,
            width: 920,
            height: 140,
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "0 34px",
            boxSizing: "border-box",
            boxShadow:
              i === 2 && glow > 0
                ? `0 0 ${30 + glow * 40}px ${P.rose}, 0 20px 50px rgba(61,53,83,0.2)`
                : undefined,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: P.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 50,
            }}
          >
            {s.n}
          </div>
          <div style={{ fontFamily, fontWeight: 900, fontSize: 62, flex: 1 }}>
            {s.text.toUpperCase()}
          </div>
          <Emo char={s.emoji} size={96} />
          {i === 0 ? (
            <svg
              width={160}
              height={60}
              viewBox="0 0 160 60"
              style={{ position: "absolute", right: 150, top: 40 }}
            >
              <path
                d="M5 40 C20 10 30 50 45 25 C60 0 70 50 85 25 C100 5 110 45 125 25 C135 12 145 30 155 20"
                stroke={P.ink}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset={400 * (1 - write)}
              />
            </svg>
          ) : null}
        </Card>
      ))}
    </SplitPanel>
  );
};
