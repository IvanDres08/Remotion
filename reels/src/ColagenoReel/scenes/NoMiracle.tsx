import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Jar, Pedestal } from "../Jar";
import { SceneShell } from "../SceneShell";
import { Tag } from "../Tag";
import { C } from "../theme";

// "Eliminar todas las arrugas por completo y rejuvenecer la piel,
//  eso no lo hace cualquier suplemento."
const CLAIMS = [
  { text: "Eliminar arrugas", at: 12, top: 290 },
  { text: "Rejuvenecer la piel", at: 51, top: 420 },
];
const DEBUNK_AT = 88; // "eso no lo hace"

const Sparkle: React.FC<{ x: number; y: number; phase: number }> = ({
  x,
  y,
  phase,
}) => {
  const frame = useCurrentFrame();
  const s = Math.max(0, Math.sin(frame / 6 + phase));
  return (
    <svg
      width={70}
      height={70}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${s})`,
      }}
    >
      <path
        d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
        fill={C.white}
      />
    </svg>
  );
};

export const NoMiracle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const debunk = spring({
    frame: frame - DEBUNK_AT,
    fps,
    config: { damping: 18 },
  });
  const strike = interpolate(frame, [DEBUNK_AT, DEBUNK_AT + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell exit={false}>
      <Pedestal x={540} top={1190} width={640} />
      <Jar
        x={540}
        bottom={1200}
        height={640}
        dim={debunk * 0.8}
        shine={frame < DEBUNK_AT}
      />
      {frame < DEBUNK_AT ? (
        <>
          <Sparkle x={250} y={700} phase={0} />
          <Sparkle x={760} y={620} phase={2} />
          <Sparkle x={800} y={980} phase={4} />
          <Sparkle x={210} y={1020} phase={1} />
        </>
      ) : null}
      {CLAIMS.map((c) => (
        <div
          key={c.text}
          style={{
            position: "absolute",
            top: c.top,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "center",
            opacity: 1 - debunk * 0.35,
          }}
        >
          <div style={{ position: "relative" }}>
            <Tag
              delay={c.at}
              bg={C.lilac}
              color={C.plum}
              fontSize={64}
              rotate={0}
            >
              {c.text}
            </Tag>
            <div
              style={{
                position: "absolute",
                left: -20,
                top: "50%",
                height: 14,
                width: `calc(${strike * 100}% + 40px)`,
                backgroundColor: C.hotPink,
                borderRadius: 7,
                transform: "rotate(-4deg)",
                boxShadow: `0 0 20px ${C.hotPink}`,
              }}
            />
          </div>
        </div>
      ))}
    </SceneShell>
  );
};
