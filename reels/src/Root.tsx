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
          hook: "Colágeno en polvo",
          cta: "Sígueme para más mitos de salud",
        }}
      />
    </>
  );
};
