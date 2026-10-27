import { useCurrentFrame } from "remotion";
import { SceneShell } from "../SceneShell";
import { Centered, Emoji, Sticker } from "../ui";
import { P } from "../theme";

// "...a dejar de sobrepensar."
const BYE_AT = 26;
const SAVE_AT = 40;

export const Calm: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell tint="#EFFFF2" exit={false}>
      <Centered top={250}>
        <Sticker delay={BYE_AT} emoji="👋" bg={P.mint} fontSize={56}>
          Adiós sobrepensar
        </Sticker>
      </Centered>
      <Emoji char="🧠" size={300} x={540} y={760} />
      <Emoji char="😌" size={150} x={720} y={900} delay={8} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 + frame / 20;
        return (
          <Emoji
            key={i}
            char="✨"
            size={80}
            x={540 + Math.cos(a) * 260}
            y={760 + Math.sin(a) * 220}
            delay={i * 3}
          />
        );
      })}
      <Centered top={1120}>
        <Sticker
          delay={SAVE_AT}
          emoji="📌"
          bg={P.white}
          fontSize={48}
          rotate={2}
        >
          Guarda este video
        </Sticker>
      </Centered>
    </SceneShell>
  );
};
