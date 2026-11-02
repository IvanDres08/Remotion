import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Clip } from "./Clip";
import { manrope } from "./fonts";
import { L } from "./theme";
import { rise, useFade } from "./ui";

// Placeholder for C7A (clip not received): two spheres - tranexamic acid and
// niacinamide - drift onto the pigment factory and calm it down.
const Sphere: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly color: string;
  readonly label: string;
  readonly delay: number;
}> = ({ x, y, color, label, delay }) => {
  const frame = useCurrentFrame();
  const p = useFade(delay, 22);
  const bob = Math.sin((frame + delay * 3) / 10) * 10;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 120,
        top: y - 120 + bob,
        width: 240,
        textAlign: "center",
        ...rise(p, 60),
      }}
    >
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #fff 0%, ${color} 38%, ${L.wine} 100%)`,
          boxShadow: `0 0 70px ${color}, 0 0 140px ${color}88`,
        }}
      />
      <div
        style={{
          marginTop: 22,
          fontFamily: manrope,
          fontWeight: 700,
          fontSize: 34,
          color: L.ivory,
          textShadow: "0 3px 12px rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Ingredients: React.FC<{ readonly trimBefore: number }> = ({
  trimBefore,
}) => {
  const frame = useCurrentFrame();
  const calm = Easing.inOut(Easing.cubic)(
    interpolate(frame, [30, 80], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const title = useFade(6, 16);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          filter: `saturate(${1 - calm * 0.45}) brightness(${1 - calm * 0.1})`,
        }}
      >
        <Clip
          name="Pigment_factory_operating_with_a_"
          trimBefore={trimBefore}
          muted
          playbackRate={0.45}
          push={0.06}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(61,0,16,0.55), rgba(61,0,16,0.15) 45%, rgba(61,0,16,0.55))`,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
        <div
          style={{
            ...rise(title),
            fontFamily: manrope,
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: 8,
            color: L.peach,
          }}
        >
          CALMA LA FÁBRICA
        </div>
      </AbsoluteFill>
      <Sphere
        x={330}
        y={820}
        color={L.peach}
        label="Ácido tranexámico"
        delay={10}
      />
      <Sphere x={760} y={940} color="#E9C2B4" label="Niacinamida" delay={20} />
    </AbsoluteFill>
  );
};
