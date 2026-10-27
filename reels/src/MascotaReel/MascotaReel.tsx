import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Captions } from "./Captions";
import "./fonts";
import { Cortisol } from "./scenes/Cortisol";
import { Ending } from "./scenes/Ending";
import { Hook } from "./scenes/Hook";
import { LoveCalm } from "./scenes/LoveCalm";
import { Oxytocin } from "./scenes/Oxytocin";
import { Shot } from "./Shot";
import { B } from "./theme";
import { Sweep } from "./ui";

// Full-screen explainer scenes; captions sit lower while they show.
const SCENES = [
  [236, 319],
  [355, 427],
] as const;

// The three raw clips were joined into mascota.mp4 (normalised to 576x1024,
// 30 fps). Clips 2 and 3 are two takes of the same text, so the edit keeps
// the intro (clip 1), "Tan solo una caricia a tu mascota" (clip 2, before the
// flub) and the clean rest of take 3, with pauses removed (43.5 s -> 20.5 s).
export const MascotaReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: B.ivory }}>
      <TransitionSeries name="Tomas">
        <TransitionSeries.Sequence
          name="Intro"
          durationInFrames={141}
          premountFor={fps}
        >
          <Shot
            trimBefore={20}
            from={{ x: 0.45, y: 0.55, zoom: 1.0 }}
            to={{ x: 0.365, y: 0.42, zoom: 1.3 }}
            screenY={820}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Una caricia"
          durationInFrames={71}
          premountFor={fps}
        >
          <Shot
            trimBefore={214}
            from={{ x: 0.5, y: 0.6, zoom: 1.05 }}
            to={{ x: 0.25, y: 0.8, zoom: 1.6 }}
            screenY={820}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Cortisol"
          durationInFrames={107}
          premountFor={fps}
        >
          <Shot
            trimBefore={859}
            from={{ x: 0.76, y: 0.42, zoom: 1.6 }}
            to={{ x: 0.76, y: 0.42, zoom: 1.75 }}
            screenY={820}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Oxitocina"
          durationInFrames={108}
          premountFor={fps}
        >
          <Shot
            trimBefore={977}
            from={{ x: 0.72, y: 0.45, zoom: 1.25 }}
            to={{ x: 0.76, y: 0.42, zoom: 1.55 }}
            screenY={820}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Amor y calma (gato)"
          durationInFrames={59}
          premountFor={fps}
        >
          <Shot
            trimBefore={1098}
            from={{ x: 0.17, y: 0.82, zoom: 2.0 }}
            to={{ x: 0.2, y: 0.84, zoom: 2.25 }}
            screenY={980}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Cierre"
          durationInFrames={129}
          premountFor={fps}
        >
          <Shot
            trimBefore={1171}
            from={{ x: 0.7, y: 0.5, zoom: 1.15 }}
            to={{ x: 0.76, y: 0.42, zoom: 1.5 }}
            screenY={820}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="Título" durationInFrames={120} premountFor={fps}>
        <Hook />
      </Sequence>
      <Sequence
        name="Cortisol"
        from={236}
        durationInFrames={83}
        premountFor={fps}
      >
        <Cortisol />
      </Sequence>
      <Sequence
        name="Oxitocina"
        from={355}
        durationInFrames={72}
        premountFor={fps}
      >
        <Oxytocin />
      </Sequence>
      <Sequence
        name="Amor y calma"
        from={427}
        durationInFrames={59}
        premountFor={fps}
      >
        <LoveCalm />
      </Sequence>
      <Sequence name="Transición 141" from={133} durationInFrames={16}>
        <Sweep />
      </Sequence>
      <Sequence name="Transición 212" from={204} durationInFrames={16}>
        <Sweep />
      </Sequence>
      <Sequence name="Transición 486" from={478} durationInFrames={16}>
        <Sweep />
      </Sequence>

      <Captions
        scenes={SCENES}
        captions={[
          {
            text: "¿Alguna",
            startMs: 0,
            endMs: 313,
            timestampMs: 156,
            confidence: null,
          },
          {
            text: " vez",
            startMs: 313,
            endMs: 593,
            timestampMs: 453,
            confidence: null,
          },
          {
            text: " has",
            startMs: 593,
            endMs: 753,
            timestampMs: 673,
            confidence: null,
          },
          {
            text: " pensado",
            startMs: 753,
            endMs: 1193,
            timestampMs: 973,
            confidence: null,
          },
          {
            text: " que",
            startMs: 1193,
            endMs: 1353,
            timestampMs: 1273,
            confidence: null,
          },
          {
            text: " con",
            startMs: 1353,
            endMs: 1593,
            timestampMs: 1473,
            confidence: null,
          },
          {
            text: " solo",
            startMs: 1593,
            endMs: 1833,
            timestampMs: 1713,
            confidence: null,
          },
          {
            text: " mirar",
            startMs: 1833,
            endMs: 2173,
            timestampMs: 2003,
            confidence: null,
          },
          {
            text: " a",
            startMs: 2173,
            endMs: 2273,
            timestampMs: 2223,
            confidence: null,
          },
          {
            text: " tu",
            startMs: 2273,
            endMs: 2373,
            timestampMs: 2323,
            confidence: null,
          },
          {
            text: " mascota",
            startMs: 2373,
            endMs: 2893,
            timestampMs: 2633,
            confidence: null,
          },
          {
            text: " se",
            startMs: 2893,
            endMs: 3193,
            timestampMs: 3043,
            confidence: null,
          },
          {
            text: " te",
            startMs: 3193,
            endMs: 3333,
            timestampMs: 3263,
            confidence: null,
          },
          {
            text: " va",
            startMs: 3333,
            endMs: 3473,
            timestampMs: 3403,
            confidence: null,
          },
          {
            text: " el",
            startMs: 3473,
            endMs: 3573,
            timestampMs: 3523,
            confidence: null,
          },
          {
            text: " estrés",
            startMs: 3573,
            endMs: 3833,
            timestampMs: 3703,
            confidence: null,
          },
          {
            text: " de",
            startMs: 3833,
            endMs: 3993,
            timestampMs: 3913,
            confidence: null,
          },
          {
            text: " todo",
            startMs: 3993,
            endMs: 4133,
            timestampMs: 4063,
            confidence: null,
          },
          {
            text: " el",
            startMs: 4133,
            endMs: 4313,
            timestampMs: 4223,
            confidence: null,
          },
          {
            text: " día?",
            startMs: 4313,
            endMs: 4533,
            timestampMs: 4423,
            confidence: null,
          },
          {
            text: " Tan",
            startMs: 4787,
            endMs: 4927,
            timestampMs: 4857,
            confidence: null,
          },
          {
            text: " solo",
            startMs: 4927,
            endMs: 5227,
            timestampMs: 5077,
            confidence: null,
          },
          {
            text: " una",
            startMs: 5227,
            endMs: 5587,
            timestampMs: 5407,
            confidence: null,
          },
          {
            text: " caricia",
            startMs: 5587,
            endMs: 6067,
            timestampMs: 5827,
            confidence: null,
          },
          {
            text: " a",
            startMs: 6067,
            endMs: 6267,
            timestampMs: 6167,
            confidence: null,
          },
          {
            text: " tu",
            startMs: 6267,
            endMs: 6367,
            timestampMs: 6317,
            confidence: null,
          },
          {
            text: " mascota",
            startMs: 6367,
            endMs: 6927,
            timestampMs: 6647,
            confidence: null,
          },
          {
            text: " nos",
            startMs: 7093,
            endMs: 7313,
            timestampMs: 7203,
            confidence: null,
          },
          {
            text: " ayuda",
            startMs: 7313,
            endMs: 7593,
            timestampMs: 7453,
            confidence: null,
          },
          {
            text: " a",
            startMs: 7593,
            endMs: 8073,
            timestampMs: 7833,
            confidence: null,
          },
          {
            text: " reducir",
            startMs: 8073,
            endMs: 8493,
            timestampMs: 8283,
            confidence: null,
          },
          {
            text: " la",
            startMs: 8493,
            endMs: 8653,
            timestampMs: 8573,
            confidence: null,
          },
          {
            text: " hormona",
            startMs: 8653,
            endMs: 8933,
            timestampMs: 8793,
            confidence: null,
          },
          {
            text: " del",
            startMs: 8933,
            endMs: 9113,
            timestampMs: 9023,
            confidence: null,
          },
          {
            text: " estrés",
            startMs: 9193,
            endMs: 9513,
            timestampMs: 9353,
            confidence: null,
          },
          {
            text: " llamada",
            startMs: 9513,
            endMs: 10013,
            timestampMs: 9763,
            confidence: null,
          },
          {
            text: " cortisol.",
            startMs: 10013,
            endMs: 10453,
            timestampMs: 10233,
            confidence: null,
          },
          {
            text: " Pero",
            startMs: 10633,
            endMs: 10847,
            timestampMs: 10740,
            confidence: null,
          },
          {
            text: " también",
            startMs: 10847,
            endMs: 11247,
            timestampMs: 11047,
            confidence: null,
          },
          {
            text: " nos",
            startMs: 11247,
            endMs: 11527,
            timestampMs: 11387,
            confidence: null,
          },
          {
            text: " ayuda",
            startMs: 11527,
            endMs: 11687,
            timestampMs: 11607,
            confidence: null,
          },
          {
            text: " a",
            startMs: 11687,
            endMs: 11967,
            timestampMs: 11827,
            confidence: null,
          },
          {
            text: " liberar",
            startMs: 11967,
            endMs: 12147,
            timestampMs: 12057,
            confidence: null,
          },
          {
            text: " una",
            startMs: 12147,
            endMs: 12427,
            timestampMs: 12287,
            confidence: null,
          },
          {
            text: " más",
            startMs: 12427,
            endMs: 12647,
            timestampMs: 12537,
            confidence: null,
          },
          {
            text: " importante",
            startMs: 12647,
            endMs: 13107,
            timestampMs: 12877,
            confidence: null,
          },
          {
            text: " que",
            startMs: 13107,
            endMs: 13387,
            timestampMs: 13247,
            confidence: null,
          },
          {
            text: " es",
            startMs: 13387,
            endMs: 13507,
            timestampMs: 13447,
            confidence: null,
          },
          {
            text: " la",
            startMs: 13507,
            endMs: 13607,
            timestampMs: 13557,
            confidence: null,
          },
          {
            text: " oxitocina,",
            startMs: 13607,
            endMs: 14127,
            timestampMs: 13867,
            confidence: null,
          },
          {
            text: " la",
            startMs: 14233,
            endMs: 14413,
            timestampMs: 14323,
            confidence: null,
          },
          {
            text: " hormona",
            startMs: 14413,
            endMs: 14813,
            timestampMs: 14613,
            confidence: null,
          },
          {
            text: " del",
            startMs: 14813,
            endMs: 15033,
            timestampMs: 14923,
            confidence: null,
          },
          {
            text: " amor",
            startMs: 15033,
            endMs: 15353,
            timestampMs: 15193,
            confidence: null,
          },
          {
            text: " y",
            startMs: 15353,
            endMs: 15713,
            timestampMs: 15533,
            confidence: null,
          },
          {
            text: " la",
            startMs: 15713,
            endMs: 15833,
            timestampMs: 15773,
            confidence: null,
          },
          {
            text: " calma.",
            startMs: 15833,
            endMs: 16200,
            timestampMs: 16016,
            confidence: null,
          },
          {
            text: " Con",
            startMs: 16200,
            endMs: 16387,
            timestampMs: 16293,
            confidence: null,
          },
          {
            text: " ellos",
            startMs: 16387,
            endMs: 16567,
            timestampMs: 16477,
            confidence: null,
          },
          {
            text: " podemos",
            startMs: 16567,
            endMs: 16827,
            timestampMs: 16697,
            confidence: null,
          },
          {
            text: " ser",
            startMs: 16827,
            endMs: 17167,
            timestampMs: 16997,
            confidence: null,
          },
          {
            text: " 100%",
            startMs: 17167,
            endMs: 17507,
            timestampMs: 17337,
            confidence: null,
          },
          {
            text: " nosotros",
            startMs: 17807,
            endMs: 18387,
            timestampMs: 18097,
            confidence: null,
          },
          {
            text: " ya",
            startMs: 18387,
            endMs: 18627,
            timestampMs: 18507,
            confidence: null,
          },
          {
            text: " que",
            startMs: 18627,
            endMs: 18767,
            timestampMs: 18697,
            confidence: null,
          },
          {
            text: " no",
            startMs: 18767,
            endMs: 18847,
            timestampMs: 18807,
            confidence: null,
          },
          {
            text: " nos",
            startMs: 18847,
            endMs: 19007,
            timestampMs: 18927,
            confidence: null,
          },
          {
            text: " juzgan.",
            startMs: 19007,
            endMs: 19347,
            timestampMs: 19177,
            confidence: null,
          },
        ]}
      />
      <Sequence
        name="100% nosotros + cierre"
        from={486}
        durationInFrames={159}
        premountFor={fps}
      >
        <Ending />
      </Sequence>

      <Audio
        src={staticFile("mascota/musica.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 20, durationInFrames - 30, durationInFrames],
            [0, 0.12, 0.12, 0],
            { extrapolateRight: "clamp" },
          )
        }
      />
      <Sequence name="SFX whoosh 133" from={133} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.3} />
      </Sequence>
      <Sequence name="SFX whoosh 204" from={204} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.3} />
      </Sequence>
      <Sequence name="SFX whoosh 232" from={232} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX ding 300" from={300} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.22} />
      </Sequence>
      <Sequence name="SFX whoosh 351" from={351} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX ding 408" from={408} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.22} />
      </Sequence>
      <Sequence name="SFX whoosh 478" from={478} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.3} />
      </Sequence>
      <Sequence name="SFX ding 515" from={515} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.2} />
      </Sequence>
      <Sequence name="SFX whoosh 584" from={584} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX ding 600" from={600} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.2} />
      </Sequence>
    </AbsoluteFill>
  );
};
