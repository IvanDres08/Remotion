import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { TalkingHead } from "../ColagenoReel/TalkingHead";
import { WarningIcon } from "./Icons";
import { ProgressBar } from "../ColagenoReel/ProgressBar";
import { ReelCaptions } from "./ReelCaptions";
import { AskDoctor } from "./scenes/AskDoctor";
import { Caution } from "./scenes/Caution";
import { Creatinine } from "./scenes/Creatinine";
import { Doctor } from "./scenes/Doctor";
import { Dose } from "./scenes/Dose";
import { Healthy } from "./scenes/Healthy";
import { NotDamage } from "./scenes/NotDamage";
import { Question } from "./scenes/Question";
import { Studied } from "./scenes/Studied";
import { Summary } from "./scenes/Summary";
import { Verdict } from "./scenes/Verdict";
import { Centered, Tag } from "./Tag";
import { G, TAG_TOP } from "./theme";

type Props = {
  readonly hook: string;
  readonly name: string;
  readonly cta: string;
};

// Frame ranges of the full-screen cutaways below. Keep in sync with the
// <Sequence>s so captions move out of the way.
const SCENES = [
  [118, 191],
  [226, 540],
  [591, 822],
  [885, 1229],
  [1290, 1370],
] as const;

// Silences (> 0.23 s below -36 dB) were cut out of the original 50 s take
// (-> 47 s). Explainer scenes cut away from the face on top of the
// continuous voice track; consecutive scenes hard-cut into each other.
export const CreatinaReel: React.FC<Props> = ({ hook, name, cta }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: G.dark }}>
      <TransitionSeries name="Voz y cara">
        <TransitionSeries.Sequence
          name="Segmento 1"
          trimBefore={16}
          durationInFrames={118}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 2"
          trimBefore={137}
          durationInFrames={73}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.4} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 3"
          trimBefore={219}
          durationInFrames={35}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 4"
          trimBefore={269}
          durationInFrames={458}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.4} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 5"
          trimBefore={731}
          durationInFrames={138}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 6"
          trimBefore={875}
          durationInFrames={45}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.4} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 7"
          trimBefore={926}
          durationInFrames={285}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 8"
          trimBefore={1218}
          durationInFrames={36}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.4} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 9"
          trimBefore={1260}
          durationInFrames={41}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 10"
          trimBefore={1306}
          durationInFrames={152}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.4} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 11"
          trimBefore={1466}
          durationInFrames={29}
          premountFor={fps}
        >
          <TalkingHead src="creatina.mp4" zoom={1.28} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence
        name="Pregunta + producto"
        from={118}
        durationInFrames={73}
        premountFor={fps}
      >
        <Question />
      </Sequence>
      <Sequence
        name="Más estudiados"
        from={226}
        durationInFrames={74}
        premountFor={fps}
      >
        <Studied />
      </Sequence>
      <Sequence
        name="Personas sanas"
        from={300}
        durationInFrames={75}
        premountFor={fps}
      >
        <Healthy />
      </Sequence>
      <Sequence
        name="3-5 g al día"
        from={375}
        durationInFrames={80}
        premountFor={fps}
      >
        <Dose />
      </Sequence>
      <Sequence
        name="No se ha demostrado daño"
        from={455}
        durationInFrames={85}
        premountFor={fps}
      >
        <Verdict />
      </Sequence>
      <Sequence
        name="Creatinina en sangre"
        from={591}
        durationInFrames={169}
        premountFor={fps}
      >
        <Creatinine />
      </Sequence>
      <Sequence
        name="Creatinina ≠ daño"
        from={760}
        durationInFrames={62}
        premountFor={fps}
      >
        <NotDamage />
      </Sequence>
      <Sequence
        name="Ojo si"
        from={885}
        durationInFrames={155}
        premountFor={fps}
      >
        <Caution />
      </Sequence>
      <Sequence
        name="Consulta a tu médico"
        from={1040}
        durationInFrames={89}
        premountFor={fps}
      >
        <Doctor />
      </Sequence>
      <Sequence
        name="Resumen"
        from={1129}
        durationInFrames={100}
        premountFor={fps}
      >
        <Summary />
      </Sequence>
      <Sequence
        name="¿Dudas?"
        from={1290}
        durationInFrames={80}
        premountFor={fps}
      >
        <AskDoctor />
      </Sequence>

      <Sequence name="Hook" durationInFrames={118} premountFor={fps}>
        <Centered top={TAG_TOP}>
          <Tag fontSize={70}>{hook}</Tag>
        </Centered>
      </Sequence>
      <Sequence name="Nombre" from={35} durationInFrames={83} premountFor={fps}>
        <Centered top={TAG_TOP + 210}>
          <Tag bg={G.white} fontSize={44} rotate={0}>
            {name}
          </Tag>
        </Centered>
      </Sequence>
      <Sequence
        name="Te cuento la verdad"
        from={191}
        durationInFrames={35}
        premountFor={fps}
      >
        <Centered top={TAG_TOP}>
          <Tag bg={G.white} fontSize={70}>
            Te cuento la verdad
          </Tag>
        </Centered>
      </Sequence>
      <Sequence
        name="El mito"
        from={549}
        durationInFrames={42}
        premountFor={fps}
      >
        <Centered top={TAG_TOP}>
          <Tag
            fontSize={96}
            rotate={-6}
            style={{ border: `8px solid ${G.black}` }}
          >
            El mito
          </Tag>
        </Centered>
      </Sequence>
      <Sequence
        name="Solo un efecto"
        from={834}
        durationInFrames={35}
        premountFor={fps}
      >
        <Centered top={TAG_TOP}>
          <Tag bg={G.white} fontSize={56}>
            Solo un efecto
            <br />
            del suplemento
          </Tag>
        </Centered>
      </Sequence>
      <Sequence
        name="Ahora bien"
        from={869}
        durationInFrames={16}
        premountFor={fps}
      >
        <Centered top={TAG_TOP}>
          <Tag fontSize={70}>
            <WarningIcon size={70} color={G.black} /> Ahora bien
          </Tag>
        </Centered>
      </Sequence>
      <Sequence name="CTA" from={1370} durationInFrames={40} premountFor={fps}>
        <Centered top={TAG_TOP}>
          <Tag fontSize={72}>{cta}</Tag>
        </Centered>
      </Sequence>

      <ReelCaptions
        sceneRanges={SCENES}
        captions={[
          {
            text: "Buenas,",
            startMs: 0,
            endMs: 500,
            timestampMs: 250,
            confidence: null,
          },
          {
            text: " mi",
            startMs: 547,
            endMs: 787,
            timestampMs: 667,
            confidence: null,
          },
          {
            text: " nombre",
            startMs: 787,
            endMs: 1007,
            timestampMs: 897,
            confidence: null,
          },
          {
            text: " es",
            startMs: 1007,
            endMs: 1167,
            timestampMs: 1087,
            confidence: null,
          },
          {
            text: " Iván",
            startMs: 1167,
            endMs: 1347,
            timestampMs: 1257,
            confidence: null,
          },
          {
            text: " Bolívar",
            startMs: 1347,
            endMs: 1747,
            timestampMs: 1547,
            confidence: null,
          },
          {
            text: " y",
            startMs: 1747,
            endMs: 2207,
            timestampMs: 1977,
            confidence: null,
          },
          {
            text: " deja",
            startMs: 2207,
            endMs: 2387,
            timestampMs: 2297,
            confidence: null,
          },
          {
            text: " que",
            startMs: 2387,
            endMs: 2527,
            timestampMs: 2457,
            confidence: null,
          },
          {
            text: " te",
            startMs: 2527,
            endMs: 2647,
            timestampMs: 2587,
            confidence: null,
          },
          {
            text: " responda",
            startMs: 2647,
            endMs: 3067,
            timestampMs: 2857,
            confidence: null,
          },
          {
            text: " una",
            startMs: 3067,
            endMs: 3227,
            timestampMs: 3147,
            confidence: null,
          },
          {
            text: " pregunta.",
            startMs: 3227,
            endMs: 3707,
            timestampMs: 3467,
            confidence: null,
          },
          {
            text: " ¿La",
            startMs: 4327,
            endMs: 4507,
            timestampMs: 4417,
            confidence: null,
          },
          {
            text: " creatina",
            startMs: 4507,
            endMs: 4967,
            timestampMs: 4737,
            confidence: null,
          },
          {
            text: " te",
            startMs: 4967,
            endMs: 5267,
            timestampMs: 5117,
            confidence: null,
          },
          {
            text: " daña",
            startMs: 5267,
            endMs: 5567,
            timestampMs: 5417,
            confidence: null,
          },
          {
            text: " los",
            startMs: 5567,
            endMs: 5727,
            timestampMs: 5647,
            confidence: null,
          },
          {
            text: " riñones?",
            startMs: 5727,
            endMs: 6107,
            timestampMs: 5917,
            confidence: null,
          },
          {
            text: " Déjame",
            startMs: 6367,
            endMs: 6647,
            timestampMs: 6507,
            confidence: null,
          },
          {
            text: " contarte",
            startMs: 6647,
            endMs: 7047,
            timestampMs: 6847,
            confidence: null,
          },
          {
            text: " la",
            startMs: 7047,
            endMs: 7187,
            timestampMs: 7117,
            confidence: null,
          },
          {
            text: " verdad.",
            startMs: 7187,
            endMs: 7447,
            timestampMs: 7317,
            confidence: null,
          },
          {
            text: " Es",
            startMs: 7627,
            endMs: 7767,
            timestampMs: 7697,
            confidence: null,
          },
          {
            text: " uno",
            startMs: 7767,
            endMs: 7907,
            timestampMs: 7837,
            confidence: null,
          },
          {
            text: " de",
            startMs: 7907,
            endMs: 8007,
            timestampMs: 7957,
            confidence: null,
          },
          {
            text: " los",
            startMs: 8007,
            endMs: 8087,
            timestampMs: 8047,
            confidence: null,
          },
          {
            text: " suplementos",
            startMs: 8067,
            endMs: 8527,
            timestampMs: 8297,
            confidence: null,
          },
          {
            text: " más",
            startMs: 8527,
            endMs: 8847,
            timestampMs: 8687,
            confidence: null,
          },
          {
            text: " estudiados",
            startMs: 8847,
            endMs: 9367,
            timestampMs: 9107,
            confidence: null,
          },
          {
            text: " del",
            startMs: 9367,
            endMs: 9567,
            timestampMs: 9467,
            confidence: null,
          },
          {
            text: " mundo",
            startMs: 9567,
            endMs: 9927,
            timestampMs: 9747,
            confidence: null,
          },
          {
            text: " y",
            startMs: 9927,
            endMs: 10367,
            timestampMs: 10147,
            confidence: null,
          },
          {
            text: " en",
            startMs: 10367,
            endMs: 10527,
            timestampMs: 10447,
            confidence: null,
          },
          {
            text: " personas",
            startMs: 10527,
            endMs: 10767,
            timestampMs: 10647,
            confidence: null,
          },
          {
            text: " sanas,",
            startMs: 10767,
            endMs: 11467,
            timestampMs: 11117,
            confidence: null,
          },
          {
            text: " con",
            startMs: 11507,
            endMs: 11767,
            timestampMs: 11637,
            confidence: null,
          },
          {
            text: " dosis",
            startMs: 11767,
            endMs: 12127,
            timestampMs: 11947,
            confidence: null,
          },
          {
            text: " normales",
            startMs: 12127,
            endMs: 12787,
            timestampMs: 12457,
            confidence: null,
          },
          {
            text: " entre",
            startMs: 12787,
            endMs: 13147,
            timestampMs: 12967,
            confidence: null,
          },
          {
            text: " 3",
            startMs: 13147,
            endMs: 13707,
            timestampMs: 13427,
            confidence: null,
          },
          {
            text: " a",
            startMs: 13707,
            endMs: 13887,
            timestampMs: 13797,
            confidence: null,
          },
          {
            text: " 5",
            startMs: 13887,
            endMs: 14207,
            timestampMs: 14047,
            confidence: null,
          },
          {
            text: " gramos",
            startMs: 14207,
            endMs: 14647,
            timestampMs: 14427,
            confidence: null,
          },
          {
            text: " al",
            startMs: 14647,
            endMs: 14827,
            timestampMs: 14737,
            confidence: null,
          },
          {
            text: " día,",
            startMs: 14827,
            endMs: 15087,
            timestampMs: 14957,
            confidence: null,
          },
          {
            text: " no",
            startMs: 15507,
            endMs: 15707,
            timestampMs: 15607,
            confidence: null,
          },
          {
            text: " se",
            startMs: 15707,
            endMs: 15847,
            timestampMs: 15777,
            confidence: null,
          },
          {
            text: " ha",
            startMs: 15847,
            endMs: 15927,
            timestampMs: 15887,
            confidence: null,
          },
          {
            text: " demostrado",
            startMs: 15907,
            endMs: 16247,
            timestampMs: 16077,
            confidence: null,
          },
          {
            text: " para",
            startMs: 16247,
            endMs: 16507,
            timestampMs: 16377,
            confidence: null,
          },
          {
            text: " nada",
            startMs: 16507,
            endMs: 16747,
            timestampMs: 16627,
            confidence: null,
          },
          {
            text: " que",
            startMs: 16747,
            endMs: 17007,
            timestampMs: 16877,
            confidence: null,
          },
          {
            text: " daña",
            startMs: 17007,
            endMs: 17247,
            timestampMs: 17127,
            confidence: null,
          },
          {
            text: " los",
            startMs: 17247,
            endMs: 17407,
            timestampMs: 17327,
            confidence: null,
          },
          {
            text: " riñones.",
            startMs: 17407,
            endMs: 17867,
            timestampMs: 17637,
            confidence: null,
          },
          {
            text: " El",
            startMs: 18307,
            endMs: 18527,
            timestampMs: 18417,
            confidence: null,
          },
          {
            text: " mito",
            startMs: 18527,
            endMs: 18947,
            timestampMs: 18737,
            confidence: null,
          },
          {
            text: " viene",
            startMs: 18947,
            endMs: 19387,
            timestampMs: 19167,
            confidence: null,
          },
          {
            text: " de",
            startMs: 19387,
            endMs: 19587,
            timestampMs: 19487,
            confidence: null,
          },
          {
            text: " que",
            startMs: 19587,
            endMs: 19687,
            timestampMs: 19637,
            confidence: null,
          },
          {
            text: " sube",
            startMs: 19687,
            endMs: 20227,
            timestampMs: 19957,
            confidence: null,
          },
          {
            text: " la",
            startMs: 20227,
            endMs: 20387,
            timestampMs: 20307,
            confidence: null,
          },
          {
            text: " creatinina",
            startMs: 20387,
            endMs: 20827,
            timestampMs: 20607,
            confidence: null,
          },
          {
            text: " un",
            startMs: 20827,
            endMs: 21207,
            timestampMs: 21017,
            confidence: null,
          },
          {
            text: " poco",
            startMs: 21207,
            endMs: 21607,
            timestampMs: 21407,
            confidence: null,
          },
          {
            text: " en",
            startMs: 21607,
            endMs: 22147,
            timestampMs: 21877,
            confidence: null,
          },
          {
            text: " sangre,",
            startMs: 22147,
            endMs: 22607,
            timestampMs: 22377,
            confidence: null,
          },
          {
            text: " que",
            startMs: 22813,
            endMs: 22953,
            timestampMs: 22883,
            confidence: null,
          },
          {
            text: " es",
            startMs: 22953,
            endMs: 23133,
            timestampMs: 23043,
            confidence: null,
          },
          {
            text: " un",
            startMs: 23133,
            endMs: 23253,
            timestampMs: 23193,
            confidence: null,
          },
          {
            text: " marcador",
            startMs: 23253,
            endMs: 23533,
            timestampMs: 23393,
            confidence: null,
          },
          {
            text: " que",
            startMs: 23533,
            endMs: 23673,
            timestampMs: 23603,
            confidence: null,
          },
          {
            text: " se",
            startMs: 23673,
            endMs: 23773,
            timestampMs: 23723,
            confidence: null,
          },
          {
            text: " utiliza",
            startMs: 23773,
            endMs: 24253,
            timestampMs: 24013,
            confidence: null,
          },
          {
            text: " para",
            startMs: 24253,
            endMs: 24553,
            timestampMs: 24403,
            confidence: null,
          },
          {
            text: " evaluar",
            startMs: 24553,
            endMs: 24853,
            timestampMs: 24703,
            confidence: null,
          },
          {
            text: " el",
            startMs: 24853,
            endMs: 24973,
            timestampMs: 24913,
            confidence: null,
          },
          {
            text: " riñón,",
            startMs: 24973,
            endMs: 25333,
            timestampMs: 25153,
            confidence: null,
          },
          {
            text: " pero",
            startMs: 25753,
            endMs: 25933,
            timestampMs: 25843,
            confidence: null,
          },
          {
            text: " eso",
            startMs: 25933,
            endMs: 26153,
            timestampMs: 26043,
            confidence: null,
          },
          {
            text: " no",
            startMs: 26153,
            endMs: 26273,
            timestampMs: 26213,
            confidence: null,
          },
          {
            text: " significa",
            startMs: 26273,
            endMs: 26573,
            timestampMs: 26423,
            confidence: null,
          },
          {
            text: " que",
            startMs: 26573,
            endMs: 26773,
            timestampMs: 26673,
            confidence: null,
          },
          {
            text: " haya",
            startMs: 26773,
            endMs: 26933,
            timestampMs: 26853,
            confidence: null,
          },
          {
            text: " daño,",
            startMs: 26933,
            endMs: 27333,
            timestampMs: 27133,
            confidence: null,
          },
          {
            text: " solo",
            startMs: 27433,
            endMs: 27573,
            timestampMs: 27503,
            confidence: null,
          },
          {
            text: " es",
            startMs: 27573,
            endMs: 27713,
            timestampMs: 27643,
            confidence: null,
          },
          {
            text: " un",
            startMs: 27713,
            endMs: 27813,
            timestampMs: 27763,
            confidence: null,
          },
          {
            text: " efecto",
            startMs: 27813,
            endMs: 28013,
            timestampMs: 27913,
            confidence: null,
          },
          {
            text: " del",
            startMs: 28013,
            endMs: 28233,
            timestampMs: 28123,
            confidence: null,
          },
          {
            text: " suplemento,",
            startMs: 28233,
            endMs: 28893,
            timestampMs: 28563,
            confidence: null,
          },
          {
            text: " ahora",
            startMs: 28953,
            endMs: 29173,
            timestampMs: 29063,
            confidence: null,
          },
          {
            text: " bien,",
            startMs: 29173,
            endMs: 29473,
            timestampMs: 29323,
            confidence: null,
          },
          {
            text: " si",
            startMs: 29733,
            endMs: 29833,
            timestampMs: 29783,
            confidence: null,
          },
          {
            text: " ya",
            startMs: 29833,
            endMs: 29993,
            timestampMs: 29913,
            confidence: null,
          },
          {
            text: " tienes",
            startMs: 29993,
            endMs: 30273,
            timestampMs: 30133,
            confidence: null,
          },
          {
            text: " una",
            startMs: 30273,
            endMs: 30473,
            timestampMs: 30373,
            confidence: null,
          },
          {
            text: " enfermedad",
            startMs: 30473,
            endMs: 30893,
            timestampMs: 30683,
            confidence: null,
          },
          {
            text: " renal",
            startMs: 30893,
            endMs: 31393,
            timestampMs: 31143,
            confidence: null,
          },
          {
            text: " o",
            startMs: 31393,
            endMs: 31833,
            timestampMs: 31613,
            confidence: null,
          },
          {
            text: " tomas",
            startMs: 31833,
            endMs: 32073,
            timestampMs: 31953,
            confidence: null,
          },
          {
            text: " algún",
            startMs: 32073,
            endMs: 32313,
            timestampMs: 32193,
            confidence: null,
          },
          {
            text: " medicamento",
            startMs: 32313,
            endMs: 32913,
            timestampMs: 32613,
            confidence: null,
          },
          {
            text: " que",
            startMs: 32913,
            endMs: 33153,
            timestampMs: 33033,
            confidence: null,
          },
          {
            text: " afecta",
            startMs: 33153,
            endMs: 33573,
            timestampMs: 33363,
            confidence: null,
          },
          {
            text: " el",
            startMs: 33573,
            endMs: 33673,
            timestampMs: 33623,
            confidence: null,
          },
          {
            text: " riñón,",
            startMs: 33673,
            endMs: 34053,
            timestampMs: 33863,
            confidence: null,
          },
          {
            text: " ahí",
            startMs: 34173,
            endMs: 34553,
            timestampMs: 34363,
            confidence: null,
          },
          {
            text: " sí",
            startMs: 34553,
            endMs: 34893,
            timestampMs: 34723,
            confidence: null,
          },
          {
            text: " debes",
            startMs: 34893,
            endMs: 35133,
            timestampMs: 35013,
            confidence: null,
          },
          {
            text: " consultar",
            startMs: 35133,
            endMs: 35533,
            timestampMs: 35333,
            confidence: null,
          },
          {
            text: " a",
            startMs: 35533,
            endMs: 35633,
            timestampMs: 35583,
            confidence: null,
          },
          {
            text: " tu",
            startMs: 35633,
            endMs: 35713,
            timestampMs: 35673,
            confidence: null,
          },
          {
            text: " médico",
            startMs: 35713,
            endMs: 35953,
            timestampMs: 35833,
            confidence: null,
          },
          {
            text: " antes",
            startMs: 35953,
            endMs: 36473,
            timestampMs: 36213,
            confidence: null,
          },
          {
            text: " de",
            startMs: 36473,
            endMs: 36593,
            timestampMs: 36533,
            confidence: null,
          },
          {
            text: " usarla,",
            startMs: 36593,
            endMs: 37113,
            timestampMs: 36853,
            confidence: null,
          },
          {
            text: " así",
            startMs: 37633,
            endMs: 37893,
            timestampMs: 37763,
            confidence: null,
          },
          {
            text: " que",
            startMs: 37893,
            endMs: 38073,
            timestampMs: 37983,
            confidence: null,
          },
          {
            text: " no,",
            startMs: 38073,
            endMs: 38233,
            timestampMs: 38153,
            confidence: null,
          },
          {
            text: " no",
            startMs: 38400,
            endMs: 38580,
            timestampMs: 38490,
            confidence: null,
          },
          {
            text: " dañan",
            startMs: 38580,
            endMs: 38820,
            timestampMs: 38700,
            confidence: null,
          },
          {
            text: " los",
            startMs: 38820,
            endMs: 38960,
            timestampMs: 38890,
            confidence: null,
          },
          {
            text: " riñones,",
            startMs: 38960,
            endMs: 39380,
            timestampMs: 39170,
            confidence: null,
          },
          {
            text: " todas",
            startMs: 39720,
            endMs: 39900,
            timestampMs: 39810,
            confidence: null,
          },
          {
            text: " las",
            startMs: 39900,
            endMs: 40120,
            timestampMs: 40010,
            confidence: null,
          },
          {
            text: " personas",
            startMs: 40120,
            endMs: 40600,
            timestampMs: 40360,
            confidence: null,
          },
          {
            text: " que",
            startMs: 40600,
            endMs: 40967,
            timestampMs: 40783,
            confidence: null,
          },
          {
            text: " la",
            startMs: 41073,
            endMs: 41213,
            timestampMs: 41143,
            confidence: null,
          },
          {
            text: " pueden",
            startMs: 41213,
            endMs: 41453,
            timestampMs: 41333,
            confidence: null,
          },
          {
            text: " llegar",
            startMs: 41453,
            endMs: 41693,
            timestampMs: 41573,
            confidence: null,
          },
          {
            text: " a",
            startMs: 41693,
            endMs: 41813,
            timestampMs: 41753,
            confidence: null,
          },
          {
            text: " utilizar,",
            startMs: 41813,
            endMs: 42153,
            timestampMs: 41983,
            confidence: null,
          },
          {
            text: " pero",
            startMs: 42473,
            endMs: 42613,
            timestampMs: 42543,
            confidence: null,
          },
          {
            text: " si",
            startMs: 42613,
            endMs: 42753,
            timestampMs: 42683,
            confidence: null,
          },
          {
            text: " tienes",
            startMs: 42753,
            endMs: 42993,
            timestampMs: 42873,
            confidence: null,
          },
          {
            text: " alguna",
            startMs: 42993,
            endMs: 43253,
            timestampMs: 43123,
            confidence: null,
          },
          {
            text: " duda",
            startMs: 43253,
            endMs: 43593,
            timestampMs: 43423,
            confidence: null,
          },
          {
            text: " sobre",
            startMs: 43593,
            endMs: 43933,
            timestampMs: 43763,
            confidence: null,
          },
          {
            text: " el",
            startMs: 43933,
            endMs: 44073,
            timestampMs: 44003,
            confidence: null,
          },
          {
            text: " uso",
            startMs: 44073,
            endMs: 44253,
            timestampMs: 44163,
            confidence: null,
          },
          {
            text: " de",
            startMs: 44253,
            endMs: 44393,
            timestampMs: 44323,
            confidence: null,
          },
          {
            text: " esta",
            startMs: 44393,
            endMs: 44613,
            timestampMs: 44503,
            confidence: null,
          },
          {
            text: " puedes",
            startMs: 44613,
            endMs: 44873,
            timestampMs: 44743,
            confidence: null,
          },
          {
            text: " preguntarle",
            startMs: 44873,
            endMs: 45313,
            timestampMs: 45093,
            confidence: null,
          },
          {
            text: " a",
            startMs: 45313,
            endMs: 45433,
            timestampMs: 45373,
            confidence: null,
          },
          {
            text: " tu",
            startMs: 45433,
            endMs: 45513,
            timestampMs: 45473,
            confidence: null,
          },
          {
            text: " médico,",
            startMs: 45473,
            endMs: 45793,
            timestampMs: 45633,
            confidence: null,
          },
          {
            text: " Sígueme",
            startMs: 46107,
            endMs: 46387,
            timestampMs: 46247,
            confidence: null,
          },
          {
            text: " para",
            startMs: 46387,
            endMs: 46547,
            timestampMs: 46467,
            confidence: null,
          },
          {
            text: " más.",
            startMs: 46547,
            endMs: 46767,
            timestampMs: 46657,
            confidence: null,
          },
        ]}
      />
      <ProgressBar color={G.neon} />
    </AbsoluteFill>
  );
};
