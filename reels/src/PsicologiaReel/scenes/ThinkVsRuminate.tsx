import { Emo } from "../Emo";
import { fontFamily } from "../fonts";
import { SplitPanel } from "../SceneShell";
import { Card, Sticker } from "../ui";
import { P } from "../theme";

// "Pensar es útil si te lleva a la acción, en cambio rumiar te hace entrar en
//  un bucle"
const ACTION_AT = 54;
const RUMIAR_AT = 89;
const LOOP_AT = 128;

const Column: React.FC<{
  readonly x: number;
  readonly bg: string;
  readonly emoji: string;
  readonly title: string;
  readonly delay: number;
  readonly resultEmoji: string;
  readonly result: string;
  readonly resultAt: number;
}> = ({ x, bg, emoji, title, delay, resultEmoji, result, resultAt }) => (
  <>
    <Card
      delay={delay}
      bg={bg}
      style={{
        left: x,
        top: 250,
        width: 440,
        height: 360,
        textAlign: "center",
      }}
    >
      <div style={{ marginTop: 34 }}>
        <Emo char={emoji} size={150} />
      </div>
      <div style={{ fontFamily, fontWeight: 700, fontSize: 66 }}>{title}</div>
    </Card>
    <div
      style={{
        position: "absolute",
        left: x,
        width: 440,
        top: 640,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Sticker
        delay={resultAt}
        emoji={resultEmoji}
        bg={P.white}
        fontSize={48}
        rotate={0}
      >
        {result}
      </Sticker>
    </div>
    <div
      style={{
        position: "absolute",
        left: x + 200,
        top: 612,
        fontSize: 40,
        color: P.inkSoft,
        opacity: 0.7,
      }}
    >
      ▼
    </div>
  </>
);

export const ThinkVsRuminate: React.FC = () => (
  <SplitPanel tint={P.cream}>
    <Column
      x={60}
      bg={P.mint}
      emoji="💡"
      title="PENSAR"
      delay={4}
      resultEmoji="✅"
      result="Acción"
      resultAt={ACTION_AT}
    />
    <Column
      x={580}
      bg={P.pink}
      emoji="🌀"
      title="RUMIAR"
      delay={RUMIAR_AT}
      resultEmoji="🔁"
      result="Bucle"
      resultAt={LOOP_AT}
    />
    <div style={{ position: "absolute", left: 490, top: 390 }}>
      <Sticker
        delay={RUMIAR_AT - 4}
        bg={P.lemon}
        fontSize={44}
        rotate={0}
        style={{ padding: "14px 18px" }}
      >
        VS
      </Sticker>
    </div>
  </SplitPanel>
);
