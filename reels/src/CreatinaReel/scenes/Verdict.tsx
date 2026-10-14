import { Kidney, ShieldCheck } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Pop, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "no se ha demostrado para nada que dañe los riñones"
export const Verdict: React.FC = () => (
  <SceneShell enter={false}>
    <Centered top={TAG_TOP}>
      <Tag delay={8} fontSize={62}>
        No se ha
        <br />
        demostrado
      </Tag>
    </Centered>
    <Pop delay={2} style={{ left: 150, top: 560 }}>
      <Kidney size={330} glow />
    </Pop>
    <Pop delay={6} style={{ left: 600, top: 560 }}>
      <Kidney size={330} glow flip />
    </Pop>
    <Pop delay={22} style={{ left: 390, top: 720 }}>
      <ShieldCheck size={300} />
    </Pop>
    <Centered top={1130}>
      <Tag delay={52} bg={G.white} fontSize={56} rotate={2}>
        Daño en los riñones
      </Tag>
    </Centered>
  </SceneShell>
);
