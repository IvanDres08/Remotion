import { useCurrentFrame } from "remotion";
import { SceneShell } from "../SceneShell";
import { Centered, Emoji, Sticker } from "../ui";
import { P } from "../theme";

// "esos momentos en el cual estás en un bucle sin salida"
const LOOP_AT = 43;
const NOEXIT_AT = 52;

export const NoExit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell tint="#EAF0F5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 540 - (180 + i * 90),
            top: 820 - (180 + i * 90),
            width: (180 + i * 90) * 2,
            height: (180 + i * 90) * 2,
            borderRadius: 120 - i * 10,
            border: `22px solid ${[P.sky, P.lavender, P.pink, P.mint][i]}`,
            borderTopColor: "transparent",
            transform: `rotate(${(i % 2 ? -1 : 1) * frame * (2 + i)}deg)`,
          }}
        />
      ))}
      <Centered top={250}>
        <Sticker bg={P.blue} emoji="🌀">
          Esos momentos…
        </Sticker>
      </Centered>
      <Emoji char="🧍" size={220} x={540} y={820} bob={0} />
      <Emoji char="🔁" size={120} x={700} y={640} delay={LOOP_AT} />
      <Centered top={1150}>
        <Sticker
          delay={NOEXIT_AT}
          emoji="🚫"
          bg={P.rose}
          rotate={0}
          fontSize={66}
        >
          Sin salida
        </Sticker>
      </Centered>
    </SceneShell>
  );
};
