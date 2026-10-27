import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../fonts";
import { SceneShell } from "../SceneShell";
import { Centered, Emoji, Sticker } from "../ui";
import { P } from "../theme";

// "y entra en estado de supervivencia y por ende empieza la ansiedad"
const MODE_AT = 20;
const METER_AT = 64;
const ANXIETY_AT = 92;

export const Survival: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + 0.08 * Math.max(0, Math.sin(frame / 3));
  const meterIn = spring({
    frame: frame - METER_AT,
    fps,
    config: { damping: 16 },
  });
  const fill = interpolate(
    frame,
    [METER_AT + 4, ANXIETY_AT + 6],
    [0.05, 0.92],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const shake =
    frame >= ANXIETY_AT && frame < ANXIETY_AT + 12
      ? Math.sin(frame * 3) * 5
      : 0;
  return (
    <SceneShell tint="#F6EEE7" enter={false}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${shake}px, ${shake / 2}px)`,
        }}
      >
        {[0, 1, 2].map((i) => {
          const t = ((frame + i * 12) % 36) / 36;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 540 - 140 - t * 220,
                top: 560 - 140 - t * 220,
                width: 280 + t * 440,
                height: 280 + t * 440,
                borderRadius: "50%",
                border: `10px solid ${P.rose}`,
                opacity: 1 - t,
              }}
            />
          );
        })}
        <Emoji
          char="🚨"
          size={300}
          x={540}
          y={560}
          bob={0}
          style={{ transform: `scale(${pulse})` }}
        />
        <Centered top={260}>
          <Sticker delay={MODE_AT} bg={P.rose} emoji="🧬" fontSize={58}>
            Modo supervivencia
          </Sticker>
        </Centered>
        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 900,
            opacity: meterIn,
            transform: `translateY(${(1 - meterIn) * 80}px)`,
            fontFamily,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 64,
              color: P.ink,
              marginBottom: 18,
            }}
          >
            ANSIEDAD
          </div>
          <div
            style={{
              height: 80,
              borderRadius: 40,
              backgroundColor: P.white,
              border: `6px solid ${P.white}`,
              boxShadow: "0 12px 30px rgba(61,53,83,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${fill * 100}%`,
                borderRadius: 40,
                background: `linear-gradient(90deg, ${P.mint}, ${P.lemon} 40%, ${P.peach} 70%, ${P.rose})`,
              }}
            />
          </div>
        </div>
        {frame >= ANXIETY_AT ? (
          <Emoji char="😰" size={190} x={880} y={860} delay={ANXIETY_AT} />
        ) : null}
      </div>
    </SceneShell>
  );
};
