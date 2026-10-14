import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { Jar } from "../Jar";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { C, TAG_TOP } from "../theme";
import { Paper } from "./Paper";

// "Algunos estudios muestran que tomar colágeno hidrolizado durante varias semanas"
const WEEKS_AT = 70; // "durante varias semanas"

export const Studies: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const papersOut = spring({
    frame: frame - WEEKS_AT,
    fps,
    config: { damping: 15 },
  });
  const cal = spring({
    frame: frame - WEEKS_AT - 4,
    fps,
    config: { damping: 12 },
  });
  const week = Math.round(
    interpolate(frame, [WEEKS_AT + 6, WEEKS_AT + 36], [1, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <SceneShell exit={false}>
      <Centered top={TAG_TOP}>
        <Tag>Estudios</Tag>
      </Centered>
      <Jar x={290} bottom={1220} height={620} delay={4} />
      <div style={{ position: "absolute", left: 540, top: 470 }}>
        {[0, 1, 2].map((i) => {
          const p = spring({
            frame: frame - 6 - i * 6,
            fps,
            config: { damping: 14 },
          });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * 30,
                top: i * 60,
                transform: `translateX(${(1 - p) * 700 + papersOut * 900}px) rotate(${(i - 1) * 5}deg)`,
              }}
            >
              <Paper width={360} title={`ESTUDIO ${i + 1}`} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 520,
          width: 420,
          borderRadius: 32,
          overflow: "hidden",
          backgroundColor: C.white,
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          fontFamily,
          textAlign: "center",
          transform: `scale(${cal})`,
        }}
      >
        <div
          style={{
            backgroundColor: C.pink,
            color: C.white,
            fontWeight: 900,
            fontSize: 48,
            padding: "22px 0",
          }}
        >
          SEMANA
        </div>
        <div
          style={{
            fontWeight: 900,
            fontSize: 220,
            color: C.plum,
            lineHeight: 1.1,
            padding: "20px 0 30px",
          }}
        >
          {week}
        </div>
      </div>
    </SceneShell>
  );
};
