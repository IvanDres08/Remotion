import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../ColagenoReel/font";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { G } from "../theme";

// "pero eso no significa que haya daño"
const NE_AT = 25;
const DAMAGE_AT = 48;

export const NotDamage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ne = spring({
    frame: frame - NE_AT,
    fps,
    config: { damping: 9, stiffness: 220 },
  });
  return (
    <SceneShell enter={false}>
      <Centered top={420}>
        <Tag delay={2} fontSize={76}>
          Creatinina ▲
        </Tag>
      </Centered>
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily,
          fontWeight: 900,
          fontSize: 340,
          lineHeight: 1,
          color: G.neon,
          WebkitTextStroke: `12px ${G.black}`,
          paintOrder: "stroke fill",
          textShadow: `0 0 60px ${G.green}`,
          transform: `scale(${ne}) rotate(${(1 - ne) * 90}deg)`,
        }}
      >
        ≠
      </div>
      <Centered top={940}>
        <Tag delay={DAMAGE_AT} bg={G.white} fontSize={96} rotate={2}>
          Daño
        </Tag>
      </Centered>
    </SceneShell>
  );
};
