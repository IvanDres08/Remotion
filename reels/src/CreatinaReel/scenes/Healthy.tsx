import { CheckIcon } from "../Icons";
import { Photo } from "../Photo";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { TAG_TOP } from "../theme";

// "y en personas sanas"
export const Healthy: React.FC = () => (
  <SceneShell
    enter={false}
    exit={false}
    background={<Photo src="creatina/pov-gym.jpg" origin="50% 55%" />}
  >
    <Centered top={TAG_TOP}>
      <Tag delay={14}>
        <CheckIcon size={70} /> Personas sanas
      </Tag>
    </Centered>
  </SceneShell>
);
