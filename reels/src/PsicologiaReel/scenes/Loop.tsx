import { Easing, interpolate, useCurrentFrame } from "remotion";
import { B } from "../../MascotaReel/theme";
import { Kicker, Scene, Title, useIn } from "../../MascotaReel/ui";

// "...un bucle, en el cual el cerebro se confunde"
const CONFUSED_AT = 51;

export const Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = useIn(2, 30);
  const confused = Easing.out(Easing.cubic)(
    interpolate(frame, [CONFUSED_AT, CONFUSED_AT + 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const a = frame / 9;
  const wobble = confused * Math.sin(frame / 2) * 4;
  return (
    <Scene exit={false}>
      <svg
        width={760}
        height={760}
        viewBox="0 0 760 760"
        style={{
          position: "absolute",
          left: 160,
          top: 440,
          transform: `rotate(${wobble}deg)`,
        }}
      >
        <circle
          cx="380"
          cy="380"
          r="300"
          fill="none"
          stroke={B.sand}
          strokeWidth="2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - draw}
        />
        <circle
          cx="380"
          cy="380"
          r="250"
          fill="none"
          stroke={B.beige}
          strokeWidth="2"
          strokeDasharray="4 14"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={380 + Math.cos(a + (i * Math.PI * 2) / 3) * 300}
            cy={380 + Math.sin(a + (i * Math.PI * 2) / 3) * 300}
            r={14 - i * 3}
            fill={B.gold}
            opacity={draw * (1 - i * 0.25)}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Title delay={6} size={150} italic>
          Bucle
        </Title>
      </div>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Kicker delay={CONFUSED_AT}>El cerebro se confunde</Kicker>
      </div>
    </Scene>
  );
};
