import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Captions } from "../MascotaReel/Captions";
import "../MascotaReel/fonts";
import { B } from "../MascotaReel/theme";
import { Kicker, Rule, Sweep, Title, useIn } from "../MascotaReel/ui";
import { FaceLayer, Phrase } from "./Face";
import { Calm } from "./scenes/Calm";
import { Exercise } from "./scenes/Exercise";
import { Loop } from "./scenes/Loop";
import { Night } from "./scenes/Night";
import { NoExit } from "./scenes/NoExit";
import { Separate } from "./scenes/Separate";
import { Survival } from "./scenes/Survival";
import { ThinkVsRuminate } from "./scenes/ThinkVsRuminate";
import { NoteCard } from "./Split";

// Full-screen scenes (speaker hidden) and split screens (paper panel on top,
// speaker below). Keep in sync with the <Sequence>s below.
const SCENES = [
  [60, 198],
  [349, 528],
  [713, 789],
  [1001, 1089],
] as const;
const SPLITS = [
  [198, 349],
  [562, 671],
  [789, 947],
] as const;

const Note: React.FC<{ readonly kicker: string; readonly text: string }> = ({
  kicker,
  text,
}) => {
  const p = useIn(0, 12);
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NoteCard p={p}>
        <Kicker delay={2}>{kicker}</Kicker>
        <div style={{ marginTop: 6 }}>
          <Title delay={4} size={84} italic>
            {text}
          </Title>
        </div>
      </NoteCard>
    </div>
  );
};

// Same cut as before (pauses, take changes and the CapCut end card removed,
// cleaned voice), restyled to match the mascota reel: ivory/beige/pastel
// paper scenes, Playfair Display + Poppins, line illustrations, no emojis.
export const PsicologiaReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: B.ivory }}>
      <FaceLayer splits={SPLITS}>
        <TransitionSeries name="Voz y cara">
          <TransitionSeries.Sequence
            name="Frase 1"
            durationInFrames={198}
            premountFor={fps}
          >
            <Phrase
              trimBefore={0}
              fx={0.417}
              fy={0.4}
              zoomFrom={1.35}
              zoomTo={1.75}
              entry="pull"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 2"
            durationInFrames={223}
            premountFor={fps}
          >
            <Phrase
              trimBefore={238}
              fx={0.474}
              fy={0.5}
              zoomFrom={1.9}
              zoomTo={1.6}
              entry="punch"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 3"
            durationInFrames={107}
            premountFor={fps}
          >
            <Phrase
              trimBefore={467}
              fx={0.474}
              fy={0.5}
              zoomFrom={1.5}
              zoomTo={2.0}
              entry="pull"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 4"
            durationInFrames={87}
            premountFor={fps}
          >
            <Phrase
              trimBefore={580}
              fx={0.479}
              fy={0.5}
              zoomFrom={2.1}
              zoomTo={1.7}
              entry="punch"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 5"
            durationInFrames={56}
            premountFor={fps}
          >
            <Phrase
              trimBefore={673}
              fx={0.479}
              fy={0.5}
              zoomFrom={1.6}
              zoomTo={1.8}
              entry="pull"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 6"
            durationInFrames={118}
            premountFor={fps}
          >
            <Phrase
              trimBefore={844}
              fx={0.479}
              fy={0.52}
              zoomFrom={1.7}
              zoomTo={2.05}
              entry="punch"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 7"
            durationInFrames={158}
            premountFor={fps}
          >
            <Phrase
              trimBefore={971}
              fx={0.47}
              fy={0.525}
              zoomFrom={1.9}
              zoomTo={1.6}
              entry="pull"
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence
            name="Frase 8"
            durationInFrames={112}
            premountFor={fps}
          >
            <Phrase
              trimBefore={1134}
              fx={0.458}
              fy={0.53}
              zoomFrom={1.6}
              zoomTo={2.0}
              entry="punch"
            />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </FaceLayer>

      <Sequence
        name="Antes de dormir"
        from={60}
        durationInFrames={138}
        premountFor={fps}
      >
        <Night />
      </Sequence>
      <Sequence
        name="Pensar vs rumiar"
        from={198}
        durationInFrames={151}
        premountFor={fps}
      >
        <ThinkVsRuminate />
      </Sequence>
      <Sequence name="Bucle" from={349} durationInFrames={72} premountFor={fps}>
        <Loop />
      </Sequence>
      <Sequence
        name="Supervivencia / ansiedad"
        from={421}
        durationInFrames={107}
        premountFor={fps}
      >
        <Survival />
      </Sequence>
      <Sequence
        name="Separar conceptos"
        from={562}
        durationInFrames={109}
        premountFor={fps}
      >
        <Separate />
      </Sequence>
      <Sequence
        name="Sin salida"
        from={713}
        durationInFrames={76}
        premountFor={fps}
      >
        <NoExit />
      </Sequence>
      <Sequence
        name="El ejercicio"
        from={789}
        durationInFrames={158}
        premountFor={fps}
      >
        <Exercise />
      </Sequence>
      <Sequence
        name="Deja de sobrepensar"
        from={1001}
        durationInFrames={88}
        premountFor={fps}
      >
        <Calm />
      </Sequence>

      <Sequence name="Título" durationInFrames={60} premountFor={fps}>
        <AbsoluteFill
          style={{ alignItems: "center", paddingTop: 200, textAlign: "center" }}
        >
          <Kicker delay={2}>Psicología · Bienestar</Kicker>
          <div style={{ marginTop: 16 }}>
            <Title delay={6} size={104}>
              Pensar vs.
            </Title>
            <Title delay={12} size={104} italic>
              rumiar
            </Title>
          </div>
          <Rule delay={20} />
        </AbsoluteFill>
      </Sequence>
      <Sequence
        name="Muy importante"
        from={541}
        durationInFrames={21}
        premountFor={fps}
      >
        <Note kicker="Por eso es" text="muy importante" />
      </Sequence>
      <Sequence
        name="Le quita poder"
        from={951}
        durationInFrames={50}
        premountFor={fps}
      >
        <Note kicker="Escribirlo" text="le quita poder" />
      </Sequence>
      <Sequence name="Transición 671" from={663} durationInFrames={16}>
        <Sweep />
      </Sequence>
      <Sequence name="Transición 947" from={939} durationInFrames={16}>
        <Sweep />
      </Sequence>

      <Captions
        scenes={SCENES}
        splits={SPLITS}
        captions={[
          {
            text: "¿Te",
            startMs: 0,
            endMs: 80,
            timestampMs: 40,
            confidence: null,
          },
          {
            text: " ha",
            startMs: 60,
            endMs: 160,
            timestampMs: 110,
            confidence: null,
          },
          {
            text: " pasado",
            startMs: 160,
            endMs: 460,
            timestampMs: 310,
            confidence: null,
          },
          {
            text: " alguna",
            startMs: 460,
            endMs: 800,
            timestampMs: 630,
            confidence: null,
          },
          {
            text: " vez",
            startMs: 800,
            endMs: 1120,
            timestampMs: 960,
            confidence: null,
          },
          {
            text: " que",
            startMs: 1120,
            endMs: 1280,
            timestampMs: 1200,
            confidence: null,
          },
          {
            text: " justo",
            startMs: 1280,
            endMs: 1600,
            timestampMs: 1440,
            confidence: null,
          },
          {
            text: " antes",
            startMs: 1600,
            endMs: 2020,
            timestampMs: 1810,
            confidence: null,
          },
          {
            text: " de",
            startMs: 2020,
            endMs: 2200,
            timestampMs: 2110,
            confidence: null,
          },
          {
            text: " dormir",
            startMs: 2200,
            endMs: 2460,
            timestampMs: 2330,
            confidence: null,
          },
          {
            text: " te",
            startMs: 2460,
            endMs: 2760,
            timestampMs: 2610,
            confidence: null,
          },
          {
            text: " llegan",
            startMs: 2760,
            endMs: 3020,
            timestampMs: 2890,
            confidence: null,
          },
          {
            text: " pensamientos",
            startMs: 3020,
            endMs: 3700,
            timestampMs: 3360,
            confidence: null,
          },
          {
            text: " constantes",
            startMs: 3700,
            endMs: 4440,
            timestampMs: 4070,
            confidence: null,
          },
          {
            text: " acerca",
            startMs: 4440,
            endMs: 4740,
            timestampMs: 4590,
            confidence: null,
          },
          {
            text: " de",
            startMs: 4740,
            endMs: 4960,
            timestampMs: 4850,
            confidence: null,
          },
          {
            text: " la",
            startMs: 4960,
            endMs: 5040,
            timestampMs: 5000,
            confidence: null,
          },
          {
            text: " conversación",
            startMs: 5000,
            endMs: 5560,
            timestampMs: 5280,
            confidence: null,
          },
          {
            text: " de",
            startMs: 5560,
            endMs: 5720,
            timestampMs: 5640,
            confidence: null,
          },
          {
            text: " hace",
            startMs: 5720,
            endMs: 5880,
            timestampMs: 5800,
            confidence: null,
          },
          {
            text: " mil",
            startMs: 5880,
            endMs: 6100,
            timestampMs: 5990,
            confidence: null,
          },
          {
            text: " años?",
            startMs: 6100,
            endMs: 6520,
            timestampMs: 6310,
            confidence: null,
          },
          {
            text: " Pensar",
            startMs: 6600,
            endMs: 7047,
            timestampMs: 6823,
            confidence: null,
          },
          {
            text: " es",
            startMs: 7047,
            endMs: 7207,
            timestampMs: 7127,
            confidence: null,
          },
          {
            text: " útil",
            startMs: 7207,
            endMs: 7467,
            timestampMs: 7337,
            confidence: null,
          },
          {
            text: " si",
            startMs: 7467,
            endMs: 7867,
            timestampMs: 7667,
            confidence: null,
          },
          {
            text: " te",
            startMs: 7867,
            endMs: 7987,
            timestampMs: 7927,
            confidence: null,
          },
          {
            text: " lleva",
            startMs: 7987,
            endMs: 8207,
            timestampMs: 8097,
            confidence: null,
          },
          {
            text: " a la",
            startMs: 8207,
            endMs: 8387,
            timestampMs: 8297,
            confidence: null,
          },
          {
            text: " acción,",
            startMs: 8387,
            endMs: 8827,
            timestampMs: 8607,
            confidence: null,
          },
          {
            text: " en",
            startMs: 9107,
            endMs: 9187,
            timestampMs: 9147,
            confidence: null,
          },
          {
            text: " cambio",
            startMs: 9187,
            endMs: 9567,
            timestampMs: 9377,
            confidence: null,
          },
          {
            text: " rumiar",
            startMs: 9567,
            endMs: 10227,
            timestampMs: 9897,
            confidence: null,
          },
          {
            text: " te",
            startMs: 10227,
            endMs: 10447,
            timestampMs: 10337,
            confidence: null,
          },
          {
            text: " hace",
            startMs: 10447,
            endMs: 10687,
            timestampMs: 10567,
            confidence: null,
          },
          {
            text: " entrar",
            startMs: 10687,
            endMs: 11327,
            timestampMs: 11007,
            confidence: null,
          },
          {
            text: " en",
            startMs: 11327,
            endMs: 11507,
            timestampMs: 11417,
            confidence: null,
          },
          {
            text: " un",
            startMs: 11507,
            endMs: 11647,
            timestampMs: 11577,
            confidence: null,
          },
          {
            text: " bucle",
            startMs: 11647,
            endMs: 12027,
            timestampMs: 11837,
            confidence: null,
          },
          {
            text: " en",
            startMs: 12027,
            endMs: 12307,
            timestampMs: 12167,
            confidence: null,
          },
          {
            text: " el",
            startMs: 12307,
            endMs: 12447,
            timestampMs: 12377,
            confidence: null,
          },
          {
            text: " cual",
            startMs: 12447,
            endMs: 12607,
            timestampMs: 12527,
            confidence: null,
          },
          {
            text: " el",
            startMs: 12607,
            endMs: 12807,
            timestampMs: 12707,
            confidence: null,
          },
          {
            text: " cerebro",
            startMs: 12807,
            endMs: 13147,
            timestampMs: 12977,
            confidence: null,
          },
          {
            text: " se",
            startMs: 13147,
            endMs: 13327,
            timestampMs: 13237,
            confidence: null,
          },
          {
            text: " confunde",
            startMs: 13327,
            endMs: 13867,
            timestampMs: 13597,
            confidence: null,
          },
          {
            text: " y",
            startMs: 14033,
            endMs: 14247,
            timestampMs: 14140,
            confidence: null,
          },
          {
            text: " entra",
            startMs: 14247,
            endMs: 14507,
            timestampMs: 14377,
            confidence: null,
          },
          {
            text: " en",
            startMs: 14507,
            endMs: 14607,
            timestampMs: 14557,
            confidence: null,
          },
          {
            text: " estado",
            startMs: 14607,
            endMs: 14867,
            timestampMs: 14737,
            confidence: null,
          },
          {
            text: " supervivencia",
            startMs: 14867,
            endMs: 15607,
            timestampMs: 15237,
            confidence: null,
          },
          {
            text: " y",
            startMs: 15607,
            endMs: 15747,
            timestampMs: 15677,
            confidence: null,
          },
          {
            text: " por",
            startMs: 15747,
            endMs: 15887,
            timestampMs: 15817,
            confidence: null,
          },
          {
            text: " ende",
            startMs: 15887,
            endMs: 16167,
            timestampMs: 16027,
            confidence: null,
          },
          {
            text: " empieza",
            startMs: 16167,
            endMs: 16867,
            timestampMs: 16517,
            confidence: null,
          },
          {
            text: " la",
            startMs: 16867,
            endMs: 17087,
            timestampMs: 16977,
            confidence: null,
          },
          {
            text: " ansiedad,",
            startMs: 17087,
            endMs: 17547,
            timestampMs: 17317,
            confidence: null,
          },
          {
            text: " por",
            startMs: 17667,
            endMs: 17807,
            timestampMs: 17737,
            confidence: null,
          },
          {
            text: " eso",
            startMs: 17807,
            endMs: 17947,
            timestampMs: 17877,
            confidence: null,
          },
          {
            text: " es",
            startMs: 17947,
            endMs: 18107,
            timestampMs: 18027,
            confidence: null,
          },
          {
            text: " muy",
            startMs: 18107,
            endMs: 18247,
            timestampMs: 18177,
            confidence: null,
          },
          {
            text: " importante",
            startMs: 18247,
            endMs: 18747,
            timestampMs: 18497,
            confidence: null,
          },
          {
            text: " separar",
            startMs: 18747,
            endMs: 19287,
            timestampMs: 19017,
            confidence: null,
          },
          {
            text: " estos",
            startMs: 19287,
            endMs: 19527,
            timestampMs: 19407,
            confidence: null,
          },
          {
            text: " dos",
            startMs: 19527,
            endMs: 19687,
            timestampMs: 19607,
            confidence: null,
          },
          {
            text: " conceptos",
            startMs: 19687,
            endMs: 20500,
            timestampMs: 20093,
            confidence: null,
          },
          {
            text: " y",
            startMs: 20500,
            endMs: 20667,
            timestampMs: 20583,
            confidence: null,
          },
          {
            text: " saber",
            startMs: 20667,
            endMs: 20907,
            timestampMs: 20787,
            confidence: null,
          },
          {
            text: " la",
            startMs: 20907,
            endMs: 21087,
            timestampMs: 20997,
            confidence: null,
          },
          {
            text: " importancia",
            startMs: 21087,
            endMs: 21667,
            timestampMs: 21377,
            confidence: null,
          },
          {
            text: " de",
            startMs: 21667,
            endMs: 21907,
            timestampMs: 21787,
            confidence: null,
          },
          {
            text: " este.",
            startMs: 21907,
            endMs: 22367,
            timestampMs: 22137,
            confidence: null,
          },
          {
            text: " Cuando",
            startMs: 22367,
            endMs: 22593,
            timestampMs: 22480,
            confidence: null,
          },
          {
            text: " pasas",
            startMs: 22813,
            endMs: 23113,
            timestampMs: 22963,
            confidence: null,
          },
          {
            text: " a",
            startMs: 23113,
            endMs: 23273,
            timestampMs: 23193,
            confidence: null,
          },
          {
            text: " través",
            startMs: 23273,
            endMs: 23453,
            timestampMs: 23363,
            confidence: null,
          },
          {
            text: " de",
            startMs: 23453,
            endMs: 23613,
            timestampMs: 23533,
            confidence: null,
          },
          {
            text: " esos",
            startMs: 23613,
            endMs: 23753,
            timestampMs: 23683,
            confidence: null,
          },
          {
            text: " momentos",
            startMs: 23753,
            endMs: 24093,
            timestampMs: 23923,
            confidence: null,
          },
          {
            text: " en",
            startMs: 24093,
            endMs: 24333,
            timestampMs: 24213,
            confidence: null,
          },
          {
            text: " el",
            startMs: 24333,
            endMs: 24433,
            timestampMs: 24383,
            confidence: null,
          },
          {
            text: " cual",
            startMs: 24433,
            endMs: 24553,
            timestampMs: 24493,
            confidence: null,
          },
          {
            text: " estás",
            startMs: 24553,
            endMs: 24853,
            timestampMs: 24703,
            confidence: null,
          },
          {
            text: " en",
            startMs: 24853,
            endMs: 25053,
            timestampMs: 24953,
            confidence: null,
          },
          {
            text: " un",
            startMs: 25053,
            endMs: 25213,
            timestampMs: 25133,
            confidence: null,
          },
          {
            text: " bucle",
            startMs: 25213,
            endMs: 25493,
            timestampMs: 25353,
            confidence: null,
          },
          {
            text: " sin salida",
            startMs: 25493,
            endMs: 26133,
            timestampMs: 25813,
            confidence: null,
          },
          {
            text: " puedes",
            startMs: 26300,
            endMs: 26593,
            timestampMs: 26446,
            confidence: null,
          },
          {
            text: " hacer",
            startMs: 26593,
            endMs: 26913,
            timestampMs: 26753,
            confidence: null,
          },
          {
            text: " el",
            startMs: 26913,
            endMs: 27073,
            timestampMs: 26993,
            confidence: null,
          },
          {
            text: " ejercicio",
            startMs: 27073,
            endMs: 27473,
            timestampMs: 27273,
            confidence: null,
          },
          {
            text: " de",
            startMs: 27473,
            endMs: 27613,
            timestampMs: 27543,
            confidence: null,
          },
          {
            text: " escribirlo",
            startMs: 27613,
            endMs: 28353,
            timestampMs: 27983,
            confidence: null,
          },
          {
            text: " y",
            startMs: 28353,
            endMs: 28733,
            timestampMs: 28543,
            confidence: null,
          },
          {
            text: " luego",
            startMs: 28733,
            endMs: 28893,
            timestampMs: 28813,
            confidence: null,
          },
          {
            text: " de",
            startMs: 28893,
            endMs: 29093,
            timestampMs: 28993,
            confidence: null,
          },
          {
            text: " escribirlo",
            startMs: 29093,
            endMs: 29573,
            timestampMs: 29333,
            confidence: null,
          },
          {
            text: " leerlo",
            startMs: 29573,
            endMs: 30073,
            timestampMs: 29823,
            confidence: null,
          },
          {
            text: " y",
            startMs: 30073,
            endMs: 30213,
            timestampMs: 30143,
            confidence: null,
          },
          {
            text: " decir",
            startMs: 30213,
            endMs: 30473,
            timestampMs: 30343,
            confidence: null,
          },
          {
            text: " «Esto",
            startMs: 30473,
            endMs: 30913,
            timestampMs: 30693,
            confidence: null,
          },
          {
            text: " ya",
            startMs: 30913,
            endMs: 31073,
            timestampMs: 30993,
            confidence: null,
          },
          {
            text: " pasó».",
            startMs: 31073,
            endMs: 31353,
            timestampMs: 31213,
            confidence: null,
          },
          {
            text: " Le",
            startMs: 31687,
            endMs: 31787,
            timestampMs: 31737,
            confidence: null,
          },
          {
            text: " quita",
            startMs: 31787,
            endMs: 32007,
            timestampMs: 31897,
            confidence: null,
          },
          {
            text: " poder",
            startMs: 32007,
            endMs: 32327,
            timestampMs: 32167,
            confidence: null,
          },
          {
            text: " y",
            startMs: 32327,
            endMs: 32587,
            timestampMs: 32457,
            confidence: null,
          },
          {
            text: " aparte",
            startMs: 32587,
            endMs: 33067,
            timestampMs: 32827,
            confidence: null,
          },
          {
            text: " te",
            startMs: 33067,
            endMs: 33187,
            timestampMs: 33127,
            confidence: null,
          },
          {
            text: " ayuda",
            startMs: 33187,
            endMs: 33367,
            timestampMs: 33277,
            confidence: null,
          },
          {
            text: " muchísimo",
            startMs: 33367,
            endMs: 33927,
            timestampMs: 33647,
            confidence: null,
          },
          {
            text: " a",
            startMs: 33927,
            endMs: 34227,
            timestampMs: 34077,
            confidence: null,
          },
          {
            text: " dejar",
            startMs: 34227,
            endMs: 34427,
            timestampMs: 34327,
            confidence: null,
          },
          {
            text: " de",
            startMs: 34427,
            endMs: 34587,
            timestampMs: 34507,
            confidence: null,
          },
          {
            text: " sobrepensar.",
            startMs: 34587,
            endMs: 35287,
            timestampMs: 34937,
            confidence: null,
          },
        ]}
      />

      <Audio
        src={staticFile("psicologia/musica-calma.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 20, durationInFrames - 40, durationInFrames],
            [0, 0.12, 0.12, 0],
            { extrapolateRight: "clamp" },
          )
        }
      />
      <Sequence name="SFX whoosh 60" from={60} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX whoosh 198" from={198} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX ding 252" from={252} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.18} />
      </Sequence>
      <Sequence name="SFX whoosh 349" from={349} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX ding 446" from={446} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.16} />
      </Sequence>
      <Sequence name="SFX heartbeat 485" from={485} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/heartbeat.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX whoosh 562" from={562} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      <Sequence name="SFX ding 633" from={633} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.16} />
      </Sequence>
      <Sequence name="SFX whoosh 663" from={663} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence name="SFX whoosh 713" from={713} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      <Sequence name="SFX whoosh 789" from={789} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      <Sequence name="SFX scribble 828" from={828} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/scribble.wav")} volume={0.3} />
      </Sequence>
      <Sequence name="SFX ding 932" from={932} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.2} />
      </Sequence>
      <Sequence name="SFX whoosh 939" from={939} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence name="SFX whoosh 1001" from={1001} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence name="SFX ding 1038" from={1038} durationInFrames={45}>
        <Audio src={staticFile("psicologia/sfx/ding.wav")} volume={0.18} />
      </Sequence>
    </AbsoluteFill>
  );
};
