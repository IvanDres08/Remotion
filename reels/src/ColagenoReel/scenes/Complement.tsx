import { Jar, Pedestal } from "../Jar";
import { CheckIcon, CrossIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { C } from "../theme";

// "que solo sea un complemento, no un milagro"
export const Complement: React.FC = () => (
  <SceneShell>
    <Pedestal x={540} top={1190} width={640} />
    <Jar x={540} bottom={1200} height={640} shine />
    <Centered top={290}>
      <Tag delay={16} fontSize={66}>
        <CheckIcon size={70} /> Complemento
      </Tag>
    </Centered>
    <Centered top={430}>
      <Tag delay={52} fontSize={66} bg={C.lilac} color={C.plum} rotate={2}>
        <CrossIcon size={70} color={C.plum} /> Milagro
      </Tag>
    </Centered>
  </SceneShell>
);
