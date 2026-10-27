import { Easing, interpolate, useCurrentFrame } from "remotion";
import { serif } from "../../MascotaReel/fonts";
import { B } from "../../MascotaReel/theme";
import { Kicker, useIn } from "../../MascotaReel/ui";
import { Split } from "../Split";

// "separar estos dos conceptos y saber la importancia de este"
const CUT_AT = 4;
const APART_AT = 24;
const KEY_AT = 71;

export const Separate: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = Easing.inOut(Easing.cubic)(
    interpolate(frame, [CUT_AT, CUT_AT + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const apart = Easing.out(Easing.cubic)(
    interpolate(frame, [APART_AT, APART_AT + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const words = useIn(2, 16);
  const key = useIn(KEY_AT, 16);
  const word = (text: string, side: -1 | 1): React.ReactNode => (
    <div
      style={{
        position: "absolute",
        top: 470,
        width: 460,
        left: side === -1 ? 70 : 550,
        textAlign: "center",
        fontFamily: serif,
        fontSize: 110,
        color: B.ink,
        opacity: words,
        transform: `translateX(${side * apart * 30}px)`,
      }}
    >
      {text}
    </div>
  );
  return (
    <Split>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Kicker delay={2}>Separa estos dos conceptos</Kicker>
      </div>
      {word("Pensar", -1)}
      {word("Rumiar", 1)}
      <div
        style={{
          position: "absolute",
          left: 539,
          top: 420,
          width: 2,
          height: 260 * cut,
          backgroundColor: B.gold,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: key,
          transform: `translateY(${(1 - key) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 76,
            color: B.gold,
          }}
        >
          la clave está en distinguirlos
        </span>
      </div>
    </Split>
  );
};
