import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Cta } from "./Cta";
import { Hook } from "./Hook";
import { ProgressBar } from "./ProgressBar";
import { ReelCaptions } from "./ReelCaptions";
import { TalkingHead } from "./TalkingHead";

type Props = {
  readonly hook: string;
  readonly cta: string;
  readonly accentColor: string;
};

// Captions sit on the wall above the head, below the hook/CTA tag and clear of
// Instagram's top UI.
const CAPTIONS_TOP = 560;

// Silences (> 0.15 s below -36 dB) were cut out of the original 33.5 s take.
// Each clip is one spoken segment with its own captions (timestamps relative to
// the original file). The zoom alternates between clips so the jump cuts read
// as intentional punch-ins.
export const ColagenoReel: React.FC<Props> = ({ hook, cta, accentColor }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries name="Timeline">
        <TransitionSeries.Sequence
          name="Segmento 1"
          trimBefore={13}
          durationInFrames={325}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: "¿El",
                startMs: 0,
                endMs: 600,
                timestampMs: 300,
                confidence: null,
              },
              {
                text: " colágeno",
                startMs: 600,
                endMs: 860,
                timestampMs: 730,
                confidence: null,
              },
              {
                text: " en",
                startMs: 860,
                endMs: 1040,
                timestampMs: 950,
                confidence: null,
              },
              {
                text: " polvo",
                startMs: 1040,
                endMs: 1400,
                timestampMs: 1220,
                confidence: null,
              },
              {
                text: " borra",
                startMs: 1400,
                endMs: 1760,
                timestampMs: 1580,
                confidence: null,
              },
              {
                text: " las",
                startMs: 1760,
                endMs: 1920,
                timestampMs: 1840,
                confidence: null,
              },
              {
                text: " arrugas?",
                startMs: 1920,
                endMs: 2320,
                timestampMs: 2120,
                confidence: null,
              },
              {
                text: " Spoiler:",
                startMs: 2600,
                endMs: 3040,
                timestampMs: 2820,
                confidence: null,
              },
              {
                text: " no",
                startMs: 3520,
                endMs: 3660,
                timestampMs: 3590,
                confidence: null,
              },
              {
                text: " del",
                startMs: 3660,
                endMs: 3780,
                timestampMs: 3720,
                confidence: null,
              },
              {
                text: " todo.",
                startMs: 3780,
                endMs: 4000,
                timestampMs: 3890,
                confidence: null,
              },
              {
                text: " Algunos",
                startMs: 4520,
                endMs: 4940,
                timestampMs: 4730,
                confidence: null,
              },
              {
                text: " estudios",
                startMs: 4940,
                endMs: 5300,
                timestampMs: 5120,
                confidence: null,
              },
              {
                text: " muestran",
                startMs: 5300,
                endMs: 5600,
                timestampMs: 5450,
                confidence: null,
              },
              {
                text: " que",
                startMs: 5600,
                endMs: 5720,
                timestampMs: 5660,
                confidence: null,
              },
              {
                text: " tomar",
                startMs: 5720,
                endMs: 5920,
                timestampMs: 5820,
                confidence: null,
              },
              {
                text: " colágeno",
                startMs: 5920,
                endMs: 6260,
                timestampMs: 6090,
                confidence: null,
              },
              {
                text: " hidrolizado",
                startMs: 6260,
                endMs: 6860,
                timestampMs: 6560,
                confidence: null,
              },
              {
                text: " durante",
                startMs: 6860,
                endMs: 7180,
                timestampMs: 7020,
                confidence: null,
              },
              {
                text: " varias",
                startMs: 7180,
                endMs: 7820,
                timestampMs: 7500,
                confidence: null,
              },
              {
                text: " semanas",
                startMs: 7820,
                endMs: 8300,
                timestampMs: 8060,
                confidence: null,
              },
              {
                text: " puede",
                startMs: 8300,
                endMs: 8680,
                timestampMs: 8490,
                confidence: null,
              },
              {
                text: " mejorar",
                startMs: 8680,
                endMs: 9000,
                timestampMs: 8840,
                confidence: null,
              },
              {
                text: " un",
                startMs: 9000,
                endMs: 9200,
                timestampMs: 9100,
                confidence: null,
              },
              {
                text: " poco",
                startMs: 9200,
                endMs: 9360,
                timestampMs: 9280,
                confidence: null,
              },
              {
                text: " la",
                startMs: 9360,
                endMs: 9500,
                timestampMs: 9430,
                confidence: null,
              },
              {
                text: " hidratación",
                startMs: 9500,
                endMs: 9980,
                timestampMs: 9740,
                confidence: null,
              },
              {
                text: " y",
                startMs: 9980,
                endMs: 10180,
                timestampMs: 10080,
                confidence: null,
              },
              {
                text: " la",
                startMs: 10180,
                endMs: 10240,
                timestampMs: 10210,
                confidence: null,
              },
              {
                text: " elasticidad",
                startMs: 10240,
                endMs: 10740,
                timestampMs: 10490,
                confidence: null,
              },
              {
                text: " de",
                startMs: 10740,
                endMs: 10840,
                timestampMs: 10790,
                confidence: null,
              },
              {
                text: " la",
                startMs: 10840,
                endMs: 10920,
                timestampMs: 10880,
                confidence: null,
              },
              {
                text: " piel,",
                startMs: 10920,
                endMs: 11120,
                timestampMs: 11020,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 2"
          trimBefore={347}
          durationInFrames={148}
          premountFor={fps}
        >
          <TalkingHead zoom={1.42} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: " pero",
                startMs: 11560,
                endMs: 11780,
                timestampMs: 11670,
                confidence: null,
              },
              {
                text: " ojo:",
                startMs: 11780,
                endMs: 12040,
                timestampMs: 11910,
                confidence: null,
              },
              {
                text: " son",
                startMs: 12320,
                endMs: 12480,
                timestampMs: 12400,
                confidence: null,
              },
              {
                text: " mejoras",
                startMs: 12480,
                endMs: 12900,
                timestampMs: 12690,
                confidence: null,
              },
              {
                text: " modestas.",
                startMs: 12900,
                endMs: 13480,
                timestampMs: 13190,
                confidence: null,
              },
              {
                text: " Y",
                startMs: 13760,
                endMs: 13920,
                timestampMs: 13840,
                confidence: null,
              },
              {
                text: " muchos",
                startMs: 13920,
                endMs: 14120,
                timestampMs: 14020,
                confidence: null,
              },
              {
                text: " estudios",
                startMs: 14120,
                endMs: 14540,
                timestampMs: 14330,
                confidence: null,
              },
              {
                text: " los",
                startMs: 14540,
                endMs: 14720,
                timestampMs: 14630,
                confidence: null,
              },
              {
                text: " financia",
                startMs: 14720,
                endMs: 15120,
                timestampMs: 14920,
                confidence: null,
              },
              {
                text: " también",
                startMs: 15120,
                endMs: 15520,
                timestampMs: 15320,
                confidence: null,
              },
              {
                text: " la",
                startMs: 15660,
                endMs: 15680,
                timestampMs: 15670,
                confidence: null,
              },
              {
                text: " misma",
                startMs: 15680,
                endMs: 15820,
                timestampMs: 15750,
                confidence: null,
              },
              {
                text: " industria.",
                startMs: 15820,
                endMs: 16360,
                timestampMs: 16090,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 3"
          trimBefore={501}
          durationInFrames={311}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: " Eliminar",
                startMs: 16800,
                endMs: 17200,
                timestampMs: 17000,
                confidence: null,
              },
              {
                text: " todas",
                startMs: 17200,
                endMs: 17340,
                timestampMs: 17270,
                confidence: null,
              },
              {
                text: " las",
                startMs: 17340,
                endMs: 17520,
                timestampMs: 17430,
                confidence: null,
              },
              {
                text: " arrugas",
                startMs: 17520,
                endMs: 17860,
                timestampMs: 17690,
                confidence: null,
              },
              {
                text: " por",
                startMs: 17860,
                endMs: 18000,
                timestampMs: 17930,
                confidence: null,
              },
              {
                text: " completo",
                startMs: 18000,
                endMs: 18340,
                timestampMs: 18170,
                confidence: null,
              },
              {
                text: " y",
                startMs: 18340,
                endMs: 18500,
                timestampMs: 18420,
                confidence: null,
              },
              {
                text: " rejuvenecer",
                startMs: 18500,
                endMs: 19020,
                timestampMs: 18760,
                confidence: null,
              },
              {
                text: " la",
                startMs: 19020,
                endMs: 19160,
                timestampMs: 19090,
                confidence: null,
              },
              {
                text: " piel,",
                startMs: 19160,
                endMs: 19380,
                timestampMs: 19270,
                confidence: null,
              },
              {
                text: " eso",
                startMs: 19480,
                endMs: 19740,
                timestampMs: 19610,
                confidence: null,
              },
              {
                text: " no",
                startMs: 19740,
                endMs: 19920,
                timestampMs: 19830,
                confidence: null,
              },
              {
                text: " lo",
                startMs: 19920,
                endMs: 20020,
                timestampMs: 19970,
                confidence: null,
              },
              {
                text: " hace",
                startMs: 20020,
                endMs: 20140,
                timestampMs: 20080,
                confidence: null,
              },
              {
                text: " cualquier",
                startMs: 20140,
                endMs: 20400,
                timestampMs: 20270,
                confidence: null,
              },
              {
                text: " suplemento.",
                startMs: 20400,
                endMs: 21120,
                timestampMs: 20760,
                confidence: null,
              },
              {
                text: " Lo",
                startMs: 21400,
                endMs: 21560,
                timestampMs: 21480,
                confidence: null,
              },
              {
                text: " que",
                startMs: 21560,
                endMs: 21660,
                timestampMs: 21610,
                confidence: null,
              },
              {
                text: " más",
                startMs: 21660,
                endMs: 21800,
                timestampMs: 21730,
                confidence: null,
              },
              {
                text: " protege",
                startMs: 21800,
                endMs: 22120,
                timestampMs: 21960,
                confidence: null,
              },
              {
                text: " tu",
                startMs: 22120,
                endMs: 22280,
                timestampMs: 22200,
                confidence: null,
              },
              {
                text: " piel",
                startMs: 22280,
                endMs: 22480,
                timestampMs: 22380,
                confidence: null,
              },
              {
                text: " es",
                startMs: 22480,
                endMs: 22740,
                timestampMs: 22610,
                confidence: null,
              },
              {
                text: " el",
                startMs: 22740,
                endMs: 22840,
                timestampMs: 22790,
                confidence: null,
              },
              {
                text: " protector",
                startMs: 22840,
                endMs: 23020,
                timestampMs: 22930,
                confidence: null,
              },
              {
                text: " solar,",
                startMs: 23020,
                endMs: 23460,
                timestampMs: 23240,
                confidence: null,
              },
              {
                text: " usándolo",
                startMs: 23700,
                endMs: 24100,
                timestampMs: 23900,
                confidence: null,
              },
              {
                text: " todos",
                startMs: 24100,
                endMs: 24300,
                timestampMs: 24200,
                confidence: null,
              },
              {
                text: " los",
                startMs: 24300,
                endMs: 24520,
                timestampMs: 24410,
                confidence: null,
              },
              {
                text: " días,",
                startMs: 24500,
                endMs: 24760,
                timestampMs: 24630,
                confidence: null,
              },
              {
                text: " no",
                startMs: 25040,
                endMs: 25160,
                timestampMs: 25100,
                confidence: null,
              },
              {
                text: " fumar,",
                startMs: 25160,
                endMs: 25560,
                timestampMs: 25360,
                confidence: null,
              },
              {
                text: " dormir",
                startMs: 25780,
                endMs: 25940,
                timestampMs: 25860,
                confidence: null,
              },
              {
                text: " bien",
                startMs: 25940,
                endMs: 26260,
                timestampMs: 26100,
                confidence: null,
              },
              {
                text: " y",
                startMs: 26260,
                endMs: 26460,
                timestampMs: 26360,
                confidence: null,
              },
              {
                text: " comer",
                startMs: 26460,
                endMs: 26640,
                timestampMs: 26550,
                confidence: null,
              },
              {
                text: " bien.",
                startMs: 26640,
                endMs: 26940,
                timestampMs: 26790,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 4"
          trimBefore={822}
          durationInFrames={68}
          premountFor={fps}
        >
          <TalkingHead zoom={1.42} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: " Si",
                startMs: 27440,
                endMs: 27600,
                timestampMs: 27520,
                confidence: null,
              },
              {
                text: " lo",
                startMs: 27600,
                endMs: 27740,
                timestampMs: 27670,
                confidence: null,
              },
              {
                text: " tomas,",
                startMs: 27740,
                endMs: 28140,
                timestampMs: 27940,
                confidence: null,
              },
              {
                text: " que",
                startMs: 28360,
                endMs: 28420,
                timestampMs: 28390,
                confidence: null,
              },
              {
                text: " solo",
                startMs: 28420,
                endMs: 28580,
                timestampMs: 28500,
                confidence: null,
              },
              {
                text: " sea",
                startMs: 28580,
                endMs: 28760,
                timestampMs: 28670,
                confidence: null,
              },
              {
                text: " un",
                startMs: 28760,
                endMs: 28860,
                timestampMs: 28810,
                confidence: null,
              },
              {
                text: " complemento,",
                startMs: 28860,
                endMs: 29440,
                timestampMs: 29150,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 5"
          trimBefore={896}
          durationInFrames={27}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: " no",
                startMs: 29900,
                endMs: 30140,
                timestampMs: 30020,
                confidence: null,
              },
              {
                text: " un",
                startMs: 30140,
                endMs: 30260,
                timestampMs: 30200,
                confidence: null,
              },
              {
                text: " milagro.",
                startMs: 30260,
                endMs: 30680,
                timestampMs: 30470,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 6"
          trimBefore={932}
          durationInFrames={17}
          premountFor={fps}
        >
          <TalkingHead zoom={1.42} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: " Sígueme",
                startMs: 31080,
                endMs: 31540,
                timestampMs: 31310,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Segmento 7"
          trimBefore={956}
          durationInFrames={31}
          premountFor={fps}
        >
          <TalkingHead zoom={1.28} />
          <ReelCaptions
            accentColor={accentColor}
            top={CAPTIONS_TOP}
            captions={[
              {
                text: " para",
                startMs: 31540,
                endMs: 32040,
                timestampMs: 31790,
                confidence: null,
              },
              {
                text: " más",
                startMs: 32040,
                endMs: 32200,
                timestampMs: 32120,
                confidence: null,
              },
              {
                text: " mitos",
                startMs: 32200,
                endMs: 32420,
                timestampMs: 32310,
                confidence: null,
              },
              {
                text: " de",
                startMs: 32420,
                endMs: 32500,
                timestampMs: 32460,
                confidence: null,
              },
              {
                text: " salud.",
                startMs: 32500,
                endMs: 32700,
                timestampMs: 32600,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Sequence name="Hook" durationInFrames={90} premountFor={fps}>
        <Hook title={hook} accentColor={accentColor} />
      </Sequence>
      <Sequence name="CTA" from={852} durationInFrames={75} premountFor={fps}>
        <Cta text={cta} accentColor={accentColor} />
      </Sequence>
      <ProgressBar color={accentColor} />
    </AbsoluteFill>
  );
};
