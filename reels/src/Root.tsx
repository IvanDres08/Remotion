import { Composition } from "remotion";
import { ColagenoReel } from "./ColagenoReel/ColagenoReel";
import { CreatinaReel } from "./CreatinaReel/CreatinaReel";
import { MascotaReel } from "./MascotaReel/MascotaReel";
import { PsicologiaReel } from "./PsicologiaReel/PsicologiaReel";

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
      <Composition
        id="CreatinaReel"
        component={CreatinaReel}
        durationInFrames={1410}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          hook: "¿La creatina daña tus riñones?",
          name: "Iván Bolívar",
          cta: "Sígueme para más",
        }}
      />
      <Composition
        id="PsicologiaReel"
        component={PsicologiaReel}
        durationInFrames={1059}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          hook: "¿Te ha pasado?",
        }}
      />
      <Composition
        id="MascotaReel"
        component={MascotaReel}
        durationInFrames={645}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
