import { interpolate, useCurrentFrame } from "remotion";
import { Emo } from "../Emo";
import { fontFamily } from "../fonts";
import { SceneShell } from "../SceneShell";
import { Card, Emoji, Sticker } from "../ui";
import { P } from "../theme";

// "justo antes de dormir te llegan pensamientos constantes acerca de la
//  conversación de hace mil años"
const THOUGHTS = [
  { text: "¿Y si…?", emoji: "💭", x: 110, y: 470, at: 31 },
  { text: "¿Por qué dije eso?", emoji: "😳", x: 440, y: 380, at: 38 },
  { text: "Debí decir…", emoji: "", x: 150, y: 640, at: 45 },
  { text: "", emoji: "😩", x: 720, y: 600, at: 52 },
];
const CHAT_AT = 90;
const AGES_AT = 116;

export const Night: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeThoughts = interpolate(frame, [CHAT_AT - 6, CHAT_AT], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneShell tint="#EAE6F0">
      <Emoji char="🌙" size={190} x={890} y={300} />
      <Emoji char="✨" size={90} x={700} y={250} delay={4} />
      <Emoji char="✨" size={70} x={180} y={300} delay={8} />
      <Card
        style={{
          left: 90,
          top: 230,
          padding: "16px 30px",
          fontWeight: 700,
          fontSize: 56,
        }}
        bg={P.lilac}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <Emo char="⏰" size={60} /> 2:47 AM
        </span>
      </Card>
      <Emoji char="🛌" size={430} x={540} y={1030} bob={4} />
      <div style={{ opacity: fadeThoughts }}>
        {THOUGHTS.map((t) => (
          <Card
            key={t.at}
            delay={t.at}
            bg={P.white}
            style={{
              left: t.x,
              top: t.y,
              padding: "18px 30px",
              fontWeight: 700,
              fontSize: 50,
            }}
          >
            <span
              style={{
                fontFamily,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {t.text}
              {t.emoji ? <Emo char={t.emoji} size={60} /> : null}
            </span>
          </Card>
        ))}
      </div>
      {frame >= CHAT_AT ? (
        <>
          <Card
            delay={CHAT_AT}
            bg={P.blue}
            style={{
              left: 120,
              top: 400,
              width: 840,
              padding: 34,
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 40, color: P.inkSoft }}>
              <Emo char="💬" size={46} /> Conversación
            </div>
            <div style={{ fontWeight: 700, fontSize: 60, marginTop: 8 }}>
              «…y entonces yo le dije…»
            </div>
            <div
              style={{
                position: "absolute",
                right: -20,
                top: -40,
              }}
            >
              <Emo char="🕸️" size={120} />
            </div>
          </Card>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 680,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Sticker
              delay={AGES_AT}
              bg={P.peach}
              emoji="🦖"
              rotate={-2}
              fontSize={60}
            >
              Hace mil años
            </Sticker>
          </div>
        </>
      ) : null}
    </SceneShell>
  );
};
