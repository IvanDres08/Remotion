import { useCurrentFrame } from "remotion";
import { B } from "../../MascotaReel/theme";
import { Kicker, Scene, Title } from "../../MascotaReel/ui";

// "esos momentos en el cual estás en un bucle sin salida"
const NOEXIT_AT = 52;

export const NoExit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      {[0, 1, 2, 3, 4].map((i) => {
        const r = 120 + i * 80;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 540 - r,
              top: 800 - r,
              width: r * 2,
              height: r * 2,
              borderRadius: 60 + i * 10,
              border: `2px solid ${[B.gold, B.taupe, B.sand, B.blush, B.sage][i]}`,
              borderTopColor: "transparent",
              transform: `rotate(${(i % 2 ? -1 : 1) * frame * (0.8 + i * 0.3)}deg)`,
              opacity: 0.9,
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
        <Kicker delay={2}>Esos momentos…</Kicker>
      </div>
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Title delay={NOEXIT_AT - 6} size={120} italic>
          sin salida
        </Title>
      </div>
    </Scene>
  );
};
