import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { ProgressBar } from "./ProgressBar";
import { ReelCaptions } from "./ReelCaptions";
import { Benefits } from "./scenes/Benefits";
import { Complement } from "./scenes/Complement";
import { Industry } from "./scenes/Industry";
import { NoMiracle } from "./scenes/NoMiracle";
import { ProductHero } from "./scenes/ProductHero";
import { Protect } from "./scenes/Protect";
import { Studies } from "./scenes/Studies";
import { TalkingHead } from "./TalkingHead";
import { Centered, Tag } from "./Tag";
import { C, TAG_TOP } from "./theme";

type Props = {
  readonly hook: string;
  readonly cta: string;
};

// Frame ranges of the full-screen product/explainer cutaways below. Keep in
// sync with the <Sequence>s so captions move out of the way.
const SCENES = [
  [0, 48],
  [123, 236],
  [236, 321],
  [391, 469],
  [476, 612],
  [612, 784],
  [812, 879],
] as const;

// Silences (> 0.15 s below -36 dB) were cut out of the original 33.5 s take;
// each TalkingHead clip is one spoken segment and the zoom alternates between
// clips so the jump cuts read as punch-ins. Explainer scenes cut away from the
// face on top of the continuous voice track.
export const ColagenoReel: React.FC<Props> = ({ hook, cta }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: C.plum }}>
      <TransitionSeries name="Voz y cara">
        <TransitionSeries.Sequence
          name="Segmento 1"
          trimBefore={13}
          durationInFrames={325}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 2"
          trimBefore={347}
          durationInFrames={148}
          premountFor={fps}
        >
          <TalkingHead zoom={1.42} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 3"
          trimBefore={501}
          durationInFrames={311}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 4"
          trimBefore={822}
          durationInFrames={68}
          premountFor={fps}
        >
          <TalkingHead zoom={1.42} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 5"
          trimBefore={896}
          durationInFrames={27}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 6"
          trimBefore={932}
          durationInFrames={17}
          premountFor={fps}
        >
          <TalkingHead zoom={1.42} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 7"
          trimBefore={956}
          durationInFrames={31}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="Producto (hook)" durationInFrames={48} premountFor={fps}>
        <ProductHero />
      </Sequence>
      <Sequence
        name="Estudios / semanas"
        from={123}
        durationInFrames={113}
        premountFor={fps}
      >
        <Studies />
      </Sequence>
      <Sequence
        name="Hidratación y elasticidad"
        from={236}
        durationInFrames={85}
        premountFor={fps}
      >
        <Benefits />
      </Sequence>
      <Sequence
        name="Financiado por la industria"
        from={391}
        durationInFrames={78}
        premountFor={fps}
      >
        <Industry />
      </Sequence>
      <Sequence
        name="No es un milagro"
        from={476}
        durationInFrames={136}
        premountFor={fps}
      >
        <NoMiracle />
      </Sequence>
      <Sequence
        name="Lo que protege tu piel"
        from={612}
        durationInFrames={172}
        premountFor={fps}
      >
        <Protect />
      </Sequence>
      <Sequence
        name="Complemento, no milagro"
        from={812}
        durationInFrames={67}
        premountFor={fps}
      >
        <Complement />
      </Sequence>

      <Sequence name="Hook" durationInFrames={90} premountFor={fps}>
        <Centered top={TAG_TOP}>
          <Tag fontSize={88}>{hook}</Tag>
        </Centered>
      </Sequence>
      <Sequence
        name="No del todo"
        from={94}
        durationInFrames={29}
        premountFor={fps}
      >
        <Centered top={TAG_TOP}>
          <Tag bg={C.lilac} color={C.plum} fontSize={80} rotate={4}>
            No del todo
          </Tag>
        </Centered>
      </Sequence>
      <Sequence
        name="Mejoras modestas"
        from={352}
        durationInFrames={39}
        premountFor={fps}
      >
        <Centered top={TAG_TOP}>
          <Tag bg={C.lilac} color={C.plum} fontSize={72}>
            Mejoras modestas
          </Tag>
        </Centered>
      </Sequence>
      <Sequence name="CTA" from={879} durationInFrames={48} premountFor={fps}>
        <Centered top={TAG_TOP}>
          <Tag fontSize={64}>{cta}</Tag>
        </Centered>
      </Sequence>

      <ReelCaptions
        sceneRanges={SCENES}
        captions={[
          {
            text: "¿El",
            startMs: 0,
            endMs: 167,
            timestampMs: 83,
            confidence: null,
          },
          {
            text: " colágeno",
            startMs: 167,
            endMs: 427,
            timestampMs: 297,
            confidence: null,
          },
          {
            text: " en",
            startMs: 427,
            endMs: 607,
            timestampMs: 517,
            confidence: null,
          },
          {
            text: " polvo",
            startMs: 607,
            endMs: 967,
            timestampMs: 787,
            confidence: null,
          },
          {
            text: " borra",
            startMs: 967,
            endMs: 1327,
            timestampMs: 1147,
            confidence: null,
          },
          {
            text: " las",
            startMs: 1327,
            endMs: 1487,
            timestampMs: 1407,
            confidence: null,
          },
          {
            text: " arrugas?",
            startMs: 1487,
            endMs: 1887,
            timestampMs: 1687,
            confidence: null,
          },
          {
            text: " Spoiler:",
            startMs: 2167,
            endMs: 2607,
            timestampMs: 2387,
            confidence: null,
          },
          {
            text: " no",
            startMs: 3087,
            endMs: 3227,
            timestampMs: 3157,
            confidence: null,
          },
          {
            text: " del",
            startMs: 3227,
            endMs: 3347,
            timestampMs: 3287,
            confidence: null,
          },
          {
            text: " todo.",
            startMs: 3347,
            endMs: 3567,
            timestampMs: 3457,
            confidence: null,
          },
          {
            text: " Algunos",
            startMs: 4087,
            endMs: 4507,
            timestampMs: 4297,
            confidence: null,
          },
          {
            text: " estudios",
            startMs: 4507,
            endMs: 4867,
            timestampMs: 4687,
            confidence: null,
          },
          {
            text: " muestran",
            startMs: 4867,
            endMs: 5167,
            timestampMs: 5017,
            confidence: null,
          },
          {
            text: " que",
            startMs: 5167,
            endMs: 5287,
            timestampMs: 5227,
            confidence: null,
          },
          {
            text: " tomar",
            startMs: 5287,
            endMs: 5487,
            timestampMs: 5387,
            confidence: null,
          },
          {
            text: " colágeno",
            startMs: 5487,
            endMs: 5827,
            timestampMs: 5657,
            confidence: null,
          },
          {
            text: " hidrolizado",
            startMs: 5827,
            endMs: 6427,
            timestampMs: 6127,
            confidence: null,
          },
          {
            text: " durante",
            startMs: 6427,
            endMs: 6747,
            timestampMs: 6587,
            confidence: null,
          },
          {
            text: " varias",
            startMs: 6747,
            endMs: 7387,
            timestampMs: 7067,
            confidence: null,
          },
          {
            text: " semanas",
            startMs: 7387,
            endMs: 7867,
            timestampMs: 7627,
            confidence: null,
          },
          {
            text: " puede",
            startMs: 7867,
            endMs: 8247,
            timestampMs: 8057,
            confidence: null,
          },
          {
            text: " mejorar",
            startMs: 8247,
            endMs: 8567,
            timestampMs: 8407,
            confidence: null,
          },
          {
            text: " un",
            startMs: 8567,
            endMs: 8767,
            timestampMs: 8667,
            confidence: null,
          },
          {
            text: " poco",
            startMs: 8767,
            endMs: 8927,
            timestampMs: 8847,
            confidence: null,
          },
          {
            text: " la",
            startMs: 8927,
            endMs: 9067,
            timestampMs: 8997,
            confidence: null,
          },
          {
            text: " hidratación",
            startMs: 9067,
            endMs: 9547,
            timestampMs: 9307,
            confidence: null,
          },
          {
            text: " y",
            startMs: 9547,
            endMs: 9747,
            timestampMs: 9647,
            confidence: null,
          },
          {
            text: " la",
            startMs: 9747,
            endMs: 9827,
            timestampMs: 9787,
            confidence: null,
          },
          {
            text: " elasticidad",
            startMs: 9807,
            endMs: 10307,
            timestampMs: 10057,
            confidence: null,
          },
          {
            text: " de",
            startMs: 10307,
            endMs: 10407,
            timestampMs: 10357,
            confidence: null,
          },
          {
            text: " la",
            startMs: 10407,
            endMs: 10487,
            timestampMs: 10447,
            confidence: null,
          },
          {
            text: " piel,",
            startMs: 10487,
            endMs: 10687,
            timestampMs: 10587,
            confidence: null,
          },
          {
            text: " pero",
            startMs: 10833,
            endMs: 11047,
            timestampMs: 10940,
            confidence: null,
          },
          {
            text: " ojo:",
            startMs: 11047,
            endMs: 11307,
            timestampMs: 11177,
            confidence: null,
          },
          {
            text: " son",
            startMs: 11587,
            endMs: 11747,
            timestampMs: 11667,
            confidence: null,
          },
          {
            text: " mejoras",
            startMs: 11747,
            endMs: 12167,
            timestampMs: 11957,
            confidence: null,
          },
          {
            text: " modestas.",
            startMs: 12167,
            endMs: 12747,
            timestampMs: 12457,
            confidence: null,
          },
          {
            text: " Y",
            startMs: 13027,
            endMs: 13187,
            timestampMs: 13107,
            confidence: null,
          },
          {
            text: " muchos",
            startMs: 13187,
            endMs: 13387,
            timestampMs: 13287,
            confidence: null,
          },
          {
            text: " estudios",
            startMs: 13387,
            endMs: 13807,
            timestampMs: 13597,
            confidence: null,
          },
          {
            text: " los",
            startMs: 13807,
            endMs: 13987,
            timestampMs: 13897,
            confidence: null,
          },
          {
            text: " financia",
            startMs: 13987,
            endMs: 14387,
            timestampMs: 14187,
            confidence: null,
          },
          {
            text: " también",
            startMs: 14387,
            endMs: 14787,
            timestampMs: 14587,
            confidence: null,
          },
          {
            text: " la",
            startMs: 14927,
            endMs: 15007,
            timestampMs: 14967,
            confidence: null,
          },
          {
            text: " misma",
            startMs: 14947,
            endMs: 15087,
            timestampMs: 15017,
            confidence: null,
          },
          {
            text: " industria.",
            startMs: 15087,
            endMs: 15627,
            timestampMs: 15357,
            confidence: null,
          },
          {
            text: " Eliminar",
            startMs: 15867,
            endMs: 16267,
            timestampMs: 16067,
            confidence: null,
          },
          {
            text: " todas",
            startMs: 16267,
            endMs: 16407,
            timestampMs: 16337,
            confidence: null,
          },
          {
            text: " las",
            startMs: 16407,
            endMs: 16587,
            timestampMs: 16497,
            confidence: null,
          },
          {
            text: " arrugas",
            startMs: 16587,
            endMs: 16927,
            timestampMs: 16757,
            confidence: null,
          },
          {
            text: " por",
            startMs: 16927,
            endMs: 17067,
            timestampMs: 16997,
            confidence: null,
          },
          {
            text: " completo",
            startMs: 17067,
            endMs: 17407,
            timestampMs: 17237,
            confidence: null,
          },
          {
            text: " y",
            startMs: 17407,
            endMs: 17567,
            timestampMs: 17487,
            confidence: null,
          },
          {
            text: " rejuvenecer",
            startMs: 17567,
            endMs: 18087,
            timestampMs: 17827,
            confidence: null,
          },
          {
            text: " la",
            startMs: 18087,
            endMs: 18227,
            timestampMs: 18157,
            confidence: null,
          },
          {
            text: " piel,",
            startMs: 18227,
            endMs: 18447,
            timestampMs: 18337,
            confidence: null,
          },
          {
            text: " eso",
            startMs: 18547,
            endMs: 18807,
            timestampMs: 18677,
            confidence: null,
          },
          {
            text: " no",
            startMs: 18807,
            endMs: 18987,
            timestampMs: 18897,
            confidence: null,
          },
          {
            text: " lo",
            startMs: 18987,
            endMs: 19087,
            timestampMs: 19037,
            confidence: null,
          },
          {
            text: " hace",
            startMs: 19087,
            endMs: 19207,
            timestampMs: 19147,
            confidence: null,
          },
          {
            text: " cualquier",
            startMs: 19207,
            endMs: 19467,
            timestampMs: 19337,
            confidence: null,
          },
          {
            text: " suplemento.",
            startMs: 19467,
            endMs: 20187,
            timestampMs: 19827,
            confidence: null,
          },
          {
            text: " Lo",
            startMs: 20467,
            endMs: 20627,
            timestampMs: 20547,
            confidence: null,
          },
          {
            text: " que",
            startMs: 20627,
            endMs: 20727,
            timestampMs: 20677,
            confidence: null,
          },
          {
            text: " más",
            startMs: 20727,
            endMs: 20867,
            timestampMs: 20797,
            confidence: null,
          },
          {
            text: " protege",
            startMs: 20867,
            endMs: 21187,
            timestampMs: 21027,
            confidence: null,
          },
          {
            text: " tu",
            startMs: 21187,
            endMs: 21347,
            timestampMs: 21267,
            confidence: null,
          },
          {
            text: " piel",
            startMs: 21347,
            endMs: 21547,
            timestampMs: 21447,
            confidence: null,
          },
          {
            text: " es",
            startMs: 21547,
            endMs: 21807,
            timestampMs: 21677,
            confidence: null,
          },
          {
            text: " el",
            startMs: 21807,
            endMs: 21907,
            timestampMs: 21857,
            confidence: null,
          },
          {
            text: " protector",
            startMs: 21907,
            endMs: 22087,
            timestampMs: 21997,
            confidence: null,
          },
          {
            text: " solar,",
            startMs: 22087,
            endMs: 22527,
            timestampMs: 22307,
            confidence: null,
          },
          {
            text: " usándolo",
            startMs: 22767,
            endMs: 23167,
            timestampMs: 22967,
            confidence: null,
          },
          {
            text: " todos",
            startMs: 23167,
            endMs: 23367,
            timestampMs: 23267,
            confidence: null,
          },
          {
            text: " los",
            startMs: 23367,
            endMs: 23587,
            timestampMs: 23477,
            confidence: null,
          },
          {
            text: " días,",
            startMs: 23567,
            endMs: 23827,
            timestampMs: 23697,
            confidence: null,
          },
          {
            text: " no",
            startMs: 24107,
            endMs: 24227,
            timestampMs: 24167,
            confidence: null,
          },
          {
            text: " fumar,",
            startMs: 24227,
            endMs: 24627,
            timestampMs: 24427,
            confidence: null,
          },
          {
            text: " dormir",
            startMs: 24847,
            endMs: 25007,
            timestampMs: 24927,
            confidence: null,
          },
          {
            text: " bien",
            startMs: 25007,
            endMs: 25327,
            timestampMs: 25167,
            confidence: null,
          },
          {
            text: " y",
            startMs: 25327,
            endMs: 25527,
            timestampMs: 25427,
            confidence: null,
          },
          {
            text: " comer",
            startMs: 25527,
            endMs: 25707,
            timestampMs: 25617,
            confidence: null,
          },
          {
            text: " bien.",
            startMs: 25707,
            endMs: 26007,
            timestampMs: 25857,
            confidence: null,
          },
          {
            text: " Si",
            startMs: 26173,
            endMs: 26333,
            timestampMs: 26253,
            confidence: null,
          },
          {
            text: " lo",
            startMs: 26333,
            endMs: 26473,
            timestampMs: 26403,
            confidence: null,
          },
          {
            text: " tomas,",
            startMs: 26473,
            endMs: 26873,
            timestampMs: 26673,
            confidence: null,
          },
          {
            text: " que",
            startMs: 27093,
            endMs: 27173,
            timestampMs: 27133,
            confidence: null,
          },
          {
            text: " solo",
            startMs: 27153,
            endMs: 27313,
            timestampMs: 27233,
            confidence: null,
          },
          {
            text: " sea",
            startMs: 27313,
            endMs: 27493,
            timestampMs: 27403,
            confidence: null,
          },
          {
            text: " un",
            startMs: 27493,
            endMs: 27593,
            timestampMs: 27543,
            confidence: null,
          },
          {
            text: " complemento,",
            startMs: 27593,
            endMs: 28173,
            timestampMs: 27883,
            confidence: null,
          },
          {
            text: " no",
            startMs: 28433,
            endMs: 28673,
            timestampMs: 28553,
            confidence: null,
          },
          {
            text: " un",
            startMs: 28673,
            endMs: 28793,
            timestampMs: 28733,
            confidence: null,
          },
          {
            text: " milagro.",
            startMs: 28793,
            endMs: 29213,
            timestampMs: 29003,
            confidence: null,
          },
          {
            text: " Sígueme",
            startMs: 29313,
            endMs: 29773,
            timestampMs: 29543,
            confidence: null,
          },
          {
            text: " para",
            startMs: 29867,
            endMs: 30040,
            timestampMs: 29953,
            confidence: null,
          },
          {
            text: " más",
            startMs: 30040,
            endMs: 30200,
            timestampMs: 30120,
            confidence: null,
          },
          {
            text: " mitos",
            startMs: 30200,
            endMs: 30420,
            timestampMs: 30310,
            confidence: null,
          },
          {
            text: " de",
            startMs: 30420,
            endMs: 30500,
            timestampMs: 30460,
            confidence: null,
          },
          {
            text: " salud.",
            startMs: 30500,
            endMs: 30700,
            timestampMs: 30600,
            confidence: null,
          },
        ]}
      />
      <ProgressBar color={C.hotPink} />
    </AbsoluteFill>
  );
};
