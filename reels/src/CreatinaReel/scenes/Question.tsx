import { useCurrentFrame } from "remotion";
import { fontFamily } from "../../ColagenoReel/font";
import { FloatingProduct } from "../FloatingProduct";
import { Kidney } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Pop, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "¿La creatina te daña los riñones?"
export const Question: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell>
      <FloatingProduct centerX={420} centerY={760} width={1750} />
      <Centered top={TAG_TOP}>
        <Tag delay={8}>Creatina</Tag>
      </Centered>
      <Pop delay={44} style={{ left: 700, top: 820 }}>
        <Kidney size={250} glow />
      </Pop>
      <Pop delay={50} style={{ left: 820, top: 690 }}>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 200,
            color: G.neon,
            WebkitTextStroke: `10px ${G.black}`,
            paintOrder: "stroke fill",
            transform: `rotate(${Math.sin(frame / 5) * 8}deg)`,
          }}
        >
          ?
        </div>
      </Pop>
    </SceneShell>
  );
};
