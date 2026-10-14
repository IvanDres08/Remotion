import { random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { C, TAG_TOP } from "../theme";
import { Paper } from "./Paper";

// "Y muchos estudios los financia también la misma industria"
const STAMP_AT = 29; // "financia"

const COINS = new Array(14).fill(0).map((_, i) => ({
  x: 80 + random(`cx${i}`) * 920,
  delay: STAMP_AT - 4 + random(`cd${i}`) * 30,
  speed: 28 + random(`cs${i}`) * 18,
  spin: random(`cr${i}`) * 360,
}));

export const Industry: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const paper = spring({ frame: frame - 2, fps, config: { damping: 14 } });
  const stamp = spring({
    frame: frame - STAMP_AT,
    fps,
    config: { damping: 9, stiffness: 220 },
  });

  return (
    <SceneShell>
      {COINS.map((c, i) => {
        const t = frame - c.delay;
        if (t < 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.x - 50,
              top: -120 + t * c.speed,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${C.lavender}, ${C.lilac})`,
              border: `6px solid ${C.magenta}`,
              color: C.magenta,
              fontFamily,
              fontWeight: 900,
              fontSize: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${c.spin + t * 8}deg)`,
            }}
          >
            $
          </div>
        );
      })}
      <Centered top={TAG_TOP}>
        <Tag>Muchos estudios</Tag>
      </Centered>
      <div
        style={{
          position: "absolute",
          left: 540 - 230,
          top: 470,
          transform: `translateY(${(1 - paper) * 900}px) rotate(-3deg)`,
        }}
      >
        <Paper width={460} title="ESTUDIO CLÍNICO" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 760,
          display: "flex",
          justifyContent: "center",
          opacity: stamp > 0.01 ? 1 : 0,
          transform: `scale(${3 - 2 * stamp}) rotate(-12deg)`,
        }}
      >
        <div
          style={{
            border: `12px solid ${C.hotPink}`,
            borderRadius: 24,
            padding: "18px 30px",
            color: C.hotPink,
            backgroundColor: `${C.plum}CC`,
            fontFamily,
            fontWeight: 900,
            fontSize: 70,
            lineHeight: 1.05,
            textAlign: "center",
          }}
        >
          FINANCIADO POR
          <br />
          LA INDUSTRIA
        </div>
      </div>
    </SceneShell>
  );
};
