import { Composition } from "remotion";
import { ColagenoReel } from "./ColagenoReel/ColagenoReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ColagenoReel"
        component={ColagenoReel}
        durationInFrames={927}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          hook: "COLÁGENO EN POLVO",
          cta: "SÍGUEME PARA MÁS MITOS DE SALUD",
          accentColor: "#FFD400",
        }}
      />
    </>
  );
};
