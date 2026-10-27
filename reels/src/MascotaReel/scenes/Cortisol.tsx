import { Easing, interpolate, useCurrentFrame } from "remotion";
import { sans } from "../fonts";
import { B } from "../theme";
import { Kicker, Scene, Title, useIn } from "../ui";

// "nos ayuda a reducir la hormona del estrés llamada cortisol"
const DRAW_AT = 6; // "reducir"
const NAME_AT = 60; // "cortisol"

const PATH = "M40 100 C 220 90, 300 130, 420 210 S 640 370, 820 390";

export const Cortisol: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = Easing.inOut(Easing.cubic)(
    interpolate(frame, [DRAW_AT, DRAW_AT + 50], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const card = useIn(2, 16);
  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Kicker delay={4}>La hormona del estrés</Kicker>
        <div style={{ marginTop: 14 }}>
          <Title delay={NAME_AT - 8} size={150} italic>
            Cortisol
          </Title>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 640,
          width: 900,
          height: 520,
          borderRadius: 28,
          backgroundColor: "rgba(255,255,255,0.55)",
          border: `1.5px solid ${B.sand}`,
          boxShadow: "0 18px 50px rgba(58,50,43,0.08)",
          opacity: card,
          transform: `translateY(${(1 - card) * 40}px)`,
        }}
      >
        <svg width={900} height={520} viewBox="0 0 900 520">
          {[110, 210, 310, 410].map((y) => (
            <line
              key={y}
              x1="40"
              x2="860"
              y1={y}
              y2={y}
              stroke={B.sand}
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
          ))}
          <path
            d={PATH}
            stroke={B.taupe}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - draw}
          />
          <circle cx={820} cy={390} r={14 * draw} fill={B.gold} />
        </svg>
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 400,
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: 4,
            color: B.gold,
            opacity: draw,
          }}
        >
          ↓ MENOS ESTRÉS
        </div>
      </div>
    </Scene>
  );
};
