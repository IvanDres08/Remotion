import { Easing, interpolate, useCurrentFrame } from "remotion";
import { serif } from "../../MascotaReel/fonts";
import { B } from "../../MascotaReel/theme";
import { Kicker, Scene, Title, useIn } from "../../MascotaReel/ui";

// "justo antes de dormir te llegan pensamientos constantes acerca de la
//  conversación de hace mil años"
const THOUGHTS = [
  { text: "¿Y si…?", x: 120, y: 760, at: 31 },
  { text: "¿Por qué dije eso?", x: 430, y: 880, at: 38 },
  { text: "Debí decir…", x: 170, y: 1010, at: 45 },
  { text: "¿Y si piensan que…?", x: 380, y: 1130, at: 52 },
];
const CHAT_AT = 90;
const AGES_AT = 116;

const Moon: React.FC = () => {
  const p = useIn(2, 30);
  return (
    <svg
      width={150}
      height={150}
      viewBox="0 0 100 100"
      style={{ position: "absolute", right: 120, top: 250 }}
    >
      <path
        d="M62 10 A40 40 0 1 0 90 66 A32 32 0 1 1 62 10 Z"
        fill="none"
        stroke={B.gold}
        strokeWidth="2.5"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
    </svg>
  );
};

export const Night: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [CHAT_AT - 8, CHAT_AT], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quote = useIn(CHAT_AT, 16);
  return (
    <Scene>
      <Moon />
      <div style={{ position: "absolute", top: 300, left: 110 }}>
        <Kicker delay={2}>Antes de dormir</Kicker>
        <div style={{ marginTop: 10 }}>
          <Title delay={6} size={150}>
            2:47
          </Title>
        </div>
      </div>
      <div style={{ opacity: fade }}>
        {THOUGHTS.map((t) => {
          const p = Easing.out(Easing.cubic)(
            interpolate(frame, [t.at, t.at + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          );
          return (
            <div
              key={t.at}
              style={{
                position: "absolute",
                left: t.x,
                top: t.y,
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 64,
                color: B.inkSoft,
                opacity: p * 0.9,
                transform: `translateY(${(1 - p) * 20 + Math.sin(frame / 20 + t.at) * 6}px)`,
                filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
              }}
            >
              {t.text}
            </div>
          );
        })}
      </div>
      {frame >= CHAT_AT ? (
        <div
          style={{
            position: "absolute",
            left: 100,
            right: 100,
            top: 760,
            textAlign: "center",
            opacity: quote,
            transform: `translateY(${(1 - quote) * 30}px)`,
          }}
        >
          <div
            style={{
              fontFamily: serif,
              fontSize: 200,
              lineHeight: 0.6,
              color: B.sand,
            }}
          >
            “
          </div>
          <div
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 76,
              color: B.ink,
              lineHeight: 1.15,
            }}
          >
            …y entonces yo le dije…
          </div>
          <div style={{ marginTop: 34 }}>
            <Kicker delay={AGES_AT}>Una conversación de hace mil años</Kicker>
          </div>
        </div>
      ) : null}
    </Scene>
  );
};
