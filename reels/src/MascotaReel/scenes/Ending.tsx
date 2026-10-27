import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { sans, serif } from "../fonts";
import { B } from "../theme";
import { Kicker, PaperBackground, Rule, Title, useIn } from "../ui";

// "Con ellos podemos ser 100% nosotros, ya que no nos juzgan." + end card.
const COUNT_AT = 29; // "100%"
const US_AT = 48; // "nosotros"
const NOJUDGE_AT = 84; // "juzgan"
const END_AT = 100;

export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const card = useIn(COUNT_AT - 6, 14);
  const n = Math.round(
    100 *
      Easing.out(Easing.cubic)(
        interpolate(frame, [COUNT_AT, COUNT_AT + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      ),
  );
  const us = useIn(US_AT, 14);
  const judge = useIn(NOJUDGE_AT, 12);
  const end = Easing.inOut(Easing.cubic)(
    interpolate(frame, [END_AT, END_AT + 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
        <div
          style={{
            padding: "26px 70px 34px",
            borderRadius: 28,
            backgroundColor: "rgba(247,242,234,0.88)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 18px 50px rgba(58,50,43,0.15)",
            textAlign: "center",
            opacity: card,
            transform: `translateY(${(1 - card) * 30}px)`,
          }}
        >
          <div
            style={{
              fontFamily: serif,
              fontWeight: 500,
              fontSize: 150,
              color: B.ink,
              lineHeight: 1,
            }}
          >
            {n}
            <span style={{ fontSize: 90, color: B.gold }}>%</span>
          </div>
          <div
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 72,
              color: B.ink,
              opacity: us,
              transform: `translateY(${(1 - us) * 16}px)`,
            }}
          >
            nosotros
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: sans,
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: 7,
              color: B.gold,
              opacity: judge,
            }}
          >
            SIN JUICIOS
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${end * 120}% at 50% 40%)` }}>
        <PaperBackground />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingBottom: 200,
          }}
        >
          <Kicker delay={END_AT + 6}>Psicología · Bienestar</Kicker>
          <div style={{ marginTop: 18 }}>
            <Title delay={END_AT + 10} size={100}>
              El poder de
            </Title>
            <Title delay={END_AT + 14} size={100} italic>
              una caricia
            </Title>
          </div>
          <Rule delay={END_AT + 18} />
          <Kicker delay={END_AT + 22} color={B.inkSoft}>
            Guarda este video
          </Kicker>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
