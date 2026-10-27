import { interpolate, useCurrentFrame } from "remotion";
import { sans, serif } from "../../MascotaReel/fonts";
import { B } from "../../MascotaReel/theme";
import { Kicker, useIn } from "../../MascotaReel/ui";
import { Split } from "../Split";

// "puedes hacer el ejercicio de escribirlo y luego de escribirlo leerlo y decir
//  'esto ya pasó'"
const STEPS = [
  { n: "01", text: "Escríbelo", at: 39 },
  { n: "02", text: "Léelo", at: 98 },
  { n: "03", text: "«Esto ya pasó»", at: 125 },
];
const DONE_AT = 143;

const Step: React.FC<{
  readonly n: string;
  readonly text: string;
  readonly at: number;
  readonly top: number;
  readonly last: boolean;
}> = ({ n, text, at, top, last }) => {
  const frame = useCurrentFrame();
  const p = useIn(at, 16);
  const rule = useIn(at + 6, 20);
  const doneIn = useIn(DONE_AT, 14);
  const done = last ? doneIn : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top,
        opacity: p,
        transform: `translateX(${(1 - p) * -40}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 30 }}>
        <span
          style={{
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: 4,
            color: B.gold,
          }}
        >
          {n}
        </span>
        <span
          style={{
            fontFamily: serif,
            fontStyle: last ? "italic" : "normal",
            fontSize: 80,
            color: last ? B.gold : B.ink,
          }}
        >
          {text}
        </span>
      </div>
      <div
        style={{
          height: 2,
          marginTop: 14,
          width: `${rule * 100}%`,
          backgroundColor: last && done > 0 ? B.gold : B.sand,
        }}
      />
      {n === "01" ? (
        <svg
          width={220}
          height={60}
          viewBox="0 0 160 60"
          style={{ position: "absolute", right: 0, top: 10 }}
        >
          <path
            d="M5 40 C20 10 30 50 45 25 C60 0 70 50 85 25 C100 5 110 45 125 25 C135 12 145 30 155 20"
            stroke={B.taupe}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={
              1 -
              interpolate(frame, [at + 4, at + 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            }
          />
        </svg>
      ) : null}
    </div>
  );
};

export const Exercise: React.FC = () => (
  <Split>
    <div style={{ position: "absolute", top: 290, left: 120 }}>
      <Kicker delay={10}>El ejercicio</Kicker>
    </div>
    {STEPS.map((s, i) => (
      <Step
        key={s.n}
        n={s.n}
        text={s.text}
        at={s.at}
        top={400 + i * 170}
        last={i === 2}
      />
    ))}
  </Split>
);
