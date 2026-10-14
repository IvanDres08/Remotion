import { Kidney, ShieldCheck } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Pop, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "Así que no, no daña los riñones..." — qualified with the script's own
// conditions (healthy people, normal doses).
export const Summary: React.FC = () => (
  <SceneShell enter={false}>
    <Centered top={TAG_TOP}>
      <Tag bg={G.white}>Así que…</Tag>
    </Centered>
    <Pop delay={4} style={{ left: 200, top: 470 }}>
      <Kidney size={290} glow />
    </Pop>
    <Pop delay={8} style={{ left: 600, top: 470 }}>
      <Kidney size={290} glow flip />
    </Pop>
    <Pop delay={28} style={{ left: 410, top: 610 }}>
      <ShieldCheck size={260} />
    </Pop>
    <Centered top={960}>
      <Tag delay={28} fontSize={70}>
        No daña tus riñones
      </Tag>
    </Centered>
    <Centered top={1120}>
      <Tag delay={63} bg={G.white} fontSize={42} rotate={1}>
        En personas sanas · 3–5 g al día
      </Tag>
    </Centered>
  </SceneShell>
);
