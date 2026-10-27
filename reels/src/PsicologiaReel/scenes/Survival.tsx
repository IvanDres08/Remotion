import { Easing, interpolate, useCurrentFrame } from "remotion";
import { sans } from "../../MascotaReel/fonts";
import { B } from "../../MascotaReel/theme";
import { Kicker, PaperBackground, Title, useIn } from "../../MascotaReel/ui";
import { AbsoluteFill } from "remotion";

// "y entra en estado de supervivencia y por ende empieza la ansiedad"
const MODE_AT = 20;
const METER_AT = 64;
const ANXIETY_AT = 92;

export const Survival: React.FC = () => {
  const frame = useCurrentFrame();
  const meter = useIn(METER_AT, 14);
  const fill = Easing.inOut(Easing.cubic)(
    interpolate(frame, [METER_AT + 4, ANXIETY_AT + 8], [0.08, 0.86], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const out = interpolate(frame, [99, 107], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        opacity: 1 - out,
        filter: out > 0 ? `blur(${out * 12}px)` : undefined,
      }}
    >
      <PaperBackground />
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 16) % 48) / 48;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 540 - 120 - t * 260,
              top: 640 - 120 - t * 260,
              width: 240 + t * 520,
              height: 240 + t * 520,
              borderRadius: "50%",
              border: `2px solid ${B.blush}`,
              opacity: (1 - t) * 0.9,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Kicker delay={4}>Estado de</Kicker>
        <div style={{ marginTop: 14 }}>
          <Title delay={MODE_AT} size={124} italic>
            supervivencia
          </Title>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 1000,
          opacity: meter,
          transform: `translateY(${(1 - meter) * 30}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: 6,
            color: B.inkSoft,
          }}
        >
          <span>ANSIEDAD</span>
          <span style={{ color: B.gold }}>{Math.round(fill * 100)}%</span>
        </div>
        <div
          style={{
            marginTop: 18,
            height: 10,
            borderRadius: 5,
            backgroundColor: B.beige,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${fill * 100}%`,
              borderRadius: 5,
              background: `linear-gradient(90deg, ${B.sage}, ${B.sand} 50%, ${B.blush})`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
