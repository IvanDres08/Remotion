import { Photo } from "../Photo";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "Es uno de los suplementos más estudiados del mundo"
export const Studied: React.FC = () => (
  <SceneShell
    exit={false}
    background={<Photo src="creatina/bench-gym.jpg" origin="50% 65%" />}
  >
    <Centered top={TAG_TOP}>
      <Tag delay={4} fontSize={64}>
        De los más
        <br />
        estudiados
      </Tag>
    </Centered>
    <Centered top={TAG_TOP + 200}>
      <Tag delay={58} bg={G.white} fontSize={52} rotate={2}>
        Del mundo
      </Tag>
    </Centered>
  </SceneShell>
);
