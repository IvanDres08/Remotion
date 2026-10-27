import { Easing, interpolate, useCurrentFrame } from "remotion";
import { sans, serif } from "../fonts";
import { B } from "../theme";
import { Kicker, Scene, Title, useIn } from "../ui";

// "...liberar una más importante, que es la oxitocina"
const RISE_AT = 24; // "importante"
const NAME_AT = 53; // "oxitocina"

const Bar: React.FC<{
  readonly label: string;
  readonly value: number;
  readonly color: string;
  readonly x: number;
  readonly delay: number;
}> = ({ label, value, color, x, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 600,
        width: 260,
        textAlign: "center",
        opacity: p,
      }}
    >
      <div
        style={{
          height: 520 * value,
          borderRadius: "24px 24px 6px 6px",
          backgroundColor: color,
          boxShadow: "0 14px 40px rgba(58,50,43,0.1)",
        }}
      />
      <div
        style={{
          marginTop: 22,
          fontFamily: sans,
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: 5,
          color: B.inkSoft,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Oxytocin: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = Easing.out(Easing.cubic)(
    interpolate(frame, [RISE_AT, NAME_AT + 6], [0.12, 0.92], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
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
        <Kicker delay={4}>Y libera…</Kicker>
        <div style={{ marginTop: 14 }}>
          <Title delay={NAME_AT - 8} size={140} italic>
            Oxitocina
          </Title>
        </div>
      </div>
      <Bar label="CORTISOL" value={0.22} color={B.sand} x={220} delay={4} />
      <Bar label="OXITOCINA" value={rise} color={B.blush} x={600} delay={8} />
      <div
        style={{
          position: "absolute",
          left: 600,
          width: 260,
          bottom: 700 + 520 * rise + 16,
          textAlign: "center",
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 54,
          color: B.gold,
          opacity: interpolate(frame, [RISE_AT, RISE_AT + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ↑
      </div>
    </Scene>
  );
};
