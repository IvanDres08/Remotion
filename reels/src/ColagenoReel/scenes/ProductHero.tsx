import { Jar, Pedestal } from "../Jar";
import { SceneShell } from "../SceneShell";

export const ProductHero: React.FC = () => (
  <SceneShell>
    <Pedestal x={540} top={1240} width={720} />
    <Jar x={540} bottom={1250} height={820} enter="drop" shine />
  </SceneShell>
);
