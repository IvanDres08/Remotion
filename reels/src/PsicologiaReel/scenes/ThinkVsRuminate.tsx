import { serif } from "../../MascotaReel/fonts";
import { B } from "../../MascotaReel/theme";
import { Kicker, useIn } from "../../MascotaReel/ui";
import { Split } from "../Split";

// "Pensar es útil si te lleva a la acción, en cambio rumiar te hace entrar en
//  un bucle"
const ACTION_AT = 54;
const RUMIAR_AT = 89;
const LOOP_AT = 128;

const Column: React.FC<{
  readonly x: number;
  readonly title: string;
  readonly delay: number;
  readonly result: string;
  readonly resultAt: number;
  readonly icon: "arrow" | "loop";
}> = ({ x, title, delay, result, resultAt, icon }) => {
  const p = useIn(delay, 16);
  const r = useIn(resultAt, 16);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 290,
        width: 440,
        textAlign: "center",
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      <div
        style={{
          fontFamily: serif,
          fontWeight: 500,
          fontSize: 104,
          color: B.ink,
        }}
      >
        {title}
      </div>
      <svg
        width={160}
        height={150}
        viewBox="0 0 100 100"
        style={{ marginTop: 10 }}
      >
        {icon === "arrow" ? (
          <path
            d="M50 8 L50 86 M30 66 L50 88 L70 66"
            stroke={B.gold}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - r}
          />
        ) : (
          <path
            d="M50 14 A34 34 0 1 1 18 40 M10 26 L18 42 L34 36"
            stroke={B.gold}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - r}
          />
        )}
      </svg>
      <div
        style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 84,
          color: B.gold,
          opacity: r,
          marginTop: 6,
        }}
      >
        {result}
      </div>
      <div style={{ marginTop: 12, opacity: r }}>
        <Kicker delay={resultAt + 4} color={B.inkSoft}>
          {icon === "arrow" ? "útil" : "sin salida"}
        </Kicker>
      </div>
    </div>
  );
};

export const ThinkVsRuminate: React.FC = () => {
  const line = useIn(RUMIAR_AT - 6, 20);
  return (
    <Split>
      <Column
        x={70}
        title="Pensar"
        delay={4}
        result="acción"
        resultAt={ACTION_AT}
        icon="arrow"
      />
      <div
        style={{
          position: "absolute",
          left: 539,
          top: 300,
          width: 2,
          height: 560 * line,
          backgroundColor: B.sand,
        }}
      />
      <Column
        x={570}
        title="Rumiar"
        delay={RUMIAR_AT}
        result="bucle"
        resultAt={LOOP_AT}
        icon="loop"
      />
    </Split>
  );
};
