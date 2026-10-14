import {
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "../../ColagenoReel/font";
import { Kidney } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Pop, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "...sube la creatinina un poco en sangre, que es un marcador que se utiliza
//  para evaluar el riñón"
const BIT_AT = 34; // "un poco"
const LAB_AT = 107; // "marcador"
const KIDNEY_AT = 146; // "evaluar el riñón"

const PARTICLES = new Array(26).fill(0).map((_, i) => ({
  offset: random(`po${i}`) * 1300,
  y: 30 + random(`py${i}`) * 80,
  speed: 6 + random(`ps${i}`) * 5,
  // The last few creatinine molecules only appear once it "rises".
  kind: i % 3 === 0 ? "creat" : "cell",
  late: i % 9 === 0,
}));

const Gauge: React.FC<{ readonly value: number }> = ({ value }) => {
  const angle = interpolate(value, [0, 1], [-90, 90]);
  return (
    <svg width={620} height={360} viewBox="0 0 620 360">
      <path
        d="M40 320 A270 270 0 0 1 580 320"
        stroke="#2A302C"
        strokeWidth="46"
        fill="none"
      />
      <path
        d="M40 320 A270 270 0 0 1 220 66"
        stroke={G.green}
        strokeWidth="46"
        fill="none"
      />
      <path
        d="M220 66 A270 270 0 0 1 400 66"
        stroke={G.neon}
        strokeWidth="46"
        fill="none"
      />
      <path
        d="M400 66 A270 270 0 0 1 580 320"
        stroke={G.white}
        strokeOpacity="0.6"
        strokeWidth="46"
        fill="none"
      />
      <g transform={`rotate(${angle} 310 320)`}>
        <path d="M302 320 L310 90 L318 320 Z" fill={G.white} />
      </g>
      <circle cx="310" cy="320" r="26" fill={G.white} />
    </svg>
  );
};

export const Creatinine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame: frame - BIT_AT, fps, config: { damping: 18 } });
  const phaseB = spring({
    frame: frame - LAB_AT,
    fps,
    config: { damping: 16 },
  });

  return (
    <SceneShell exit={false}>
      <Centered top={TAG_TOP}>
        <Tag fontSize={60}>
          Creatinina
          <br />
          en sangre
        </Tag>
      </Centered>

      {/* Phase A: gauge + blood vessel */}
      <div
        style={{
          opacity: 1 - phaseB,
          transform: `translateY(${phaseB * -80}px)`,
        }}
      >
        <Pop delay={2} style={{ left: 230, top: 540 }}>
          <Gauge value={0.33 + rise * 0.12} />
        </Pop>
        <Pop delay={BIT_AT} style={{ left: 640, top: 520 }}>
          <Tag bg={G.white} fontSize={44} rotate={6}>
            ▲ Un poco
          </Tag>
        </Pop>
        <div
          style={{
            position: "absolute",
            left: -20,
            right: -20,
            top: 960,
            height: 140,
            borderRadius: 70,
            background:
              "linear-gradient(180deg, #3A1414, #6E1E1E 50%, #3A1414)",
            border: `6px solid ${G.white}33`,
            overflow: "hidden",
          }}
        >
          {PARTICLES.map((p, i) => {
            if (p.late && frame < BIT_AT) return null;
            const x = ((p.offset + frame * p.speed) % 1300) - 100;
            return p.kind === "cell" ? (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: p.y - 20,
                  width: 56,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #8E2A2A 30%, #C94040 70%)",
                }}
              />
            ) : (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: p.y - 22,
                  width: 44,
                  height: 44,
                  backgroundColor: G.neon,
                  clipPath:
                    "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)",
                  boxShadow: `0 0 20px ${G.neon}`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Phase B: lab report -> kidney */}
      {frame >= LAB_AT ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 70,
              top: 520,
              width: 520,
              padding: 34,
              borderRadius: 28,
              backgroundColor: G.white,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              fontFamily,
              transform: `translateX(${(1 - phaseB) * -700}px) rotate(-2deg)`,
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 36,
                color: G.deep,
                marginBottom: 20,
              }}
            >
              ANÁLISIS DE SANGRE
            </div>
            {[
              ["Glucosa", "—"],
              ["Creatinina", "▲"],
              ["Urea", "—"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                  fontSize: 38,
                  padding: "14px 18px",
                  marginBottom: 10,
                  borderRadius: 14,
                  backgroundColor: k === "Creatinina" ? G.neon : "#EEF1EF",
                  color: G.black,
                }}
              >
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
            <div
              style={{
                fontWeight: 900,
                fontSize: 30,
                color: G.deep,
                marginTop: 14,
              }}
            >
              = MARCADOR
            </div>
          </div>
          <Pop delay={KIDNEY_AT} style={{ left: 690, top: 560 }}>
            <Kidney size={280} glow />
          </Pop>
          <Pop delay={KIDNEY_AT + 4} style={{ left: 590, top: 760 }}>
            <svg width={140} height={80} viewBox="0 0 140 80">
              <path
                d="M6 40 L110 40"
                stroke={G.neon}
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M96 14 L130 40 L96 66"
                stroke={G.neon}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Pop>
          <Centered top={1110}>
            <Tag delay={KIDNEY_AT + 2} bg={G.white} fontSize={54}>
              Evalúa el riñón
            </Tag>
          </Centered>
        </>
      ) : null}
    </SceneShell>
  );
};
