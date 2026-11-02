import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Captions } from "./Captions";
import { Clip } from "./Clip";
import "./fonts";
import { Ingredients } from "./Ingredients";
import { BrandTitle, Claims, CTA, EndCard, Hook, Offer } from "./Overlays";

// LÜME ad: the 15 clips in the brief's order (C1A ... CTA), each trimmed to
// its line with a short head/tail, joined with 9-frame crossfades. C7A was
// not received, so a placeholder ingredients scene stands in for it.
export const LumeReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  // Music sits under the voice and lifts where nobody speaks.
  const music = (f: number) =>
    interpolate(
      f,
      [
        0,
        12,
        89,
        105,
        321,
        331,
        405,
        417,
        1862,
        1872,
        1950,
        1958,
        2579,
        2589,
        durationInFrames - 20,
        durationInFrames,
      ],
      [
        0, 0.3, 0.3, 0.1, 0.1, 0.28, 0.28, 0.1, 0.1, 0.3, 0.3, 0.1, 0.1, 0.32,
        0.32, 0,
      ],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries name="Clips">
        <TransitionSeries.Sequence
          name="C1A Hook limón"
          durationInFrames={99}
          premountFor={fps}
        >
          <Clip name="Lemon_droplet_falling_on_hand" trimBefore={9} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C2A Limón villano"
          durationInFrames={240}
          premountFor={fps}
        >
          <Clip name="Animated_lemon_character_gesturing" trimBefore={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C2B Dentro de la piel"
          durationInFrames={96}
          premountFor={fps}
        >
          <Clip name="Microscopic_skin_animation_camer_" trimBefore={30} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C3A Célula y sol"
          durationInFrames={204}
          premountFor={fps}
        >
          <Clip
            name="Cell_reacting_to_sunlight_skin"
            trimBefore={9}
            blurBox={{ x: 3, y: 36.5, w: 31, h: 5 }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C3A Sirena"
          durationInFrames={51}
          premountFor={fps}
        >
          <Clip name="Alarm_cell_activating_in_skin" trimBefore={147} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C3B Fábrica en alerta"
          durationInFrames={72}
          premountFor={fps}
        >
          <Clip name="Factory_red_alert_state" trimBefore={14} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C4A Fábrica produce"
          durationInFrames={196}
          premountFor={fps}
        >
          <Clip name="Pigment_factory_operating_with_a_" trimBefore={3} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C4B Manchas"
          durationInFrames={173}
          premountFor={fps}
        >
          <Clip name="Woman_hand_pigmentation_macro_co_" trimBefore={3} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C5A Conduciendo"
          durationInFrames={211}
          premountFor={fps}
        >
          <Clip name="Woman_driving_car" trimBefore={4} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C5B Fábrica activa"
          durationInFrames={191}
          premountFor={fps}
        >
          <Clip name="Pigment_granules_moving_on_conveyor" trimBefore={30} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C6A Limón a la caneca"
          durationInFrames={210}
          premountFor={fps}
        >
          <Clip name="Woman_drops_lemon_into_bin" trimBefore={3} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C6B LÜME"
          durationInFrames={227}
          premountFor={fps}
        >
          <Clip name="Skincare_product_reveal_in_bathroom" trimBefore={3} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C7A Ingredientes (provisional)"
          durationInFrames={96}
          premountFor={fps}
        >
          <Ingredients trimBefore={190} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="C8A Formulada para"
          durationInFrames={200}
          premountFor={fps}
        >
          <Clip name="Woman_touching_hand_smiling" trimBefore={32} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="Oferta"
          durationInFrames={232}
          premountFor={fps}
        >
          <Clip name="Woman_holding_skincare_product" trimBefore={2} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="CTA"
          durationInFrames={225}
          premountFor={fps}
        >
          <Clip name="Woman_showcasing_skincare_product" trimBefore={15} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />
        <TransitionSeries.Sequence
          name="Cierre"
          durationInFrames={78}
          premountFor={fps}
        >
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="Hook" durationInFrames={97} premountFor={fps}>
        <Hook />
      </Sequence>
      <Sequence
        name="Marca LÜME"
        from={1662}
        durationInFrames={75}
        premountFor={fps}
      >
        <BrandTitle />
      </Sequence>
      <Sequence
        name="Sin arder / pelar / irritar"
        from={2046}
        durationInFrames={103}
        premountFor={fps}
      >
        <Claims at={[6, 38, 67]} />
      </Sequence>
      <Sequence
        name="Oferta"
        from={2140}
        durationInFrames={232}
        premountFor={fps}
      >
        <Offer at={[4, 56, 126]} />
      </Sequence>
      <Sequence name="CTA" from={2484} durationInFrames={104} premountFor={fps}>
        <CTA />
      </Sequence>

      <Captions
        hide={[
          [1866, 1958],
          [2140, 2372],
        ]}
        captions={[
          {
            text: "Arriba,",
            startMs: 3060,
            endMs: 3460,
            timestampMs: 3260,
            confidence: null,
          },
          {
            text: " el",
            startMs: 3660,
            endMs: 3780,
            timestampMs: 3720,
            confidence: null,
          },
          {
            text: " limón",
            startMs: 3780,
            endMs: 4040,
            timestampMs: 3910,
            confidence: null,
          },
          {
            text: " se",
            startMs: 4040,
            endMs: 4220,
            timestampMs: 4130,
            confidence: null,
          },
          {
            text: " pone",
            startMs: 4220,
            endMs: 4420,
            timestampMs: 4320,
            confidence: null,
          },
          {
            text: " a",
            startMs: 4420,
            endMs: 4540,
            timestampMs: 4480,
            confidence: null,
          },
          {
            text: " camellar.",
            startMs: 4540,
            endMs: 5020,
            timestampMs: 4780,
            confidence: null,
          },
          {
            text: " Arde,",
            startMs: 5220,
            endMs: 5660,
            timestampMs: 5440,
            confidence: null,
          },
          {
            text: " irrita",
            startMs: 5860,
            endMs: 6280,
            timestampMs: 6070,
            confidence: null,
          },
          {
            text: " y",
            startMs: 6280,
            endMs: 6380,
            timestampMs: 6330,
            confidence: null,
          },
          {
            text: " te",
            startMs: 6380,
            endMs: 6520,
            timestampMs: 6450,
            confidence: null,
          },
          {
            text: " pela",
            startMs: 6520,
            endMs: 6740,
            timestampMs: 6630,
            confidence: null,
          },
          {
            text: " la",
            startMs: 6740,
            endMs: 6900,
            timestampMs: 6820,
            confidence: null,
          },
          {
            text: " mancha",
            startMs: 6900,
            endMs: 7200,
            timestampMs: 7050,
            confidence: null,
          },
          {
            text: " por",
            startMs: 7200,
            endMs: 7380,
            timestampMs: 7290,
            confidence: null,
          },
          {
            text: " encima.",
            startMs: 7380,
            endMs: 7700,
            timestampMs: 7540,
            confidence: null,
          },
          {
            text: " Pero",
            startMs: 8300,
            endMs: 8380,
            timestampMs: 8340,
            confidence: null,
          },
          {
            text: " abajo,",
            startMs: 8320,
            endMs: 8720,
            timestampMs: 8520,
            confidence: null,
          },
          {
            text: " donde",
            startMs: 8960,
            endMs: 9100,
            timestampMs: 9030,
            confidence: null,
          },
          {
            text: " la",
            startMs: 9100,
            endMs: 9280,
            timestampMs: 9190,
            confidence: null,
          },
          {
            text: " mancha",
            startMs: 9280,
            endMs: 9580,
            timestampMs: 9430,
            confidence: null,
          },
          {
            text: " nace,",
            startMs: 9580,
            endMs: 9900,
            timestampMs: 9740,
            confidence: null,
          },
          {
            text: " no",
            startMs: 10120,
            endMs: 10220,
            timestampMs: 10170,
            confidence: null,
          },
          {
            text: " llega",
            startMs: 10220,
            endMs: 10380,
            timestampMs: 10300,
            confidence: null,
          },
          {
            text: " nunca.",
            startMs: 10380,
            endMs: 10700,
            timestampMs: 10540,
            confidence: null,
          },
          {
            text: " Y",
            startMs: 13720,
            endMs: 13820,
            timestampMs: 13770,
            confidence: null,
          },
          {
            text: " aquí",
            startMs: 13820,
            endMs: 14040,
            timestampMs: 13930,
            confidence: null,
          },
          {
            text: " está",
            startMs: 14040,
            endMs: 14400,
            timestampMs: 14220,
            confidence: null,
          },
          {
            text: " lo",
            startMs: 14400,
            endMs: 14760,
            timestampMs: 14580,
            confidence: null,
          },
          {
            text: " que",
            startMs: 14760,
            endMs: 14900,
            timestampMs: 14830,
            confidence: null,
          },
          {
            text: " nadie",
            startMs: 14900,
            endMs: 15240,
            timestampMs: 15070,
            confidence: null,
          },
          {
            text: " te",
            startMs: 15240,
            endMs: 15460,
            timestampMs: 15350,
            confidence: null,
          },
          {
            text: " explica.",
            startMs: 15460,
            endMs: 15980,
            timestampMs: 15720,
            confidence: null,
          },
          {
            text: " Cuando",
            startMs: 16540,
            endMs: 16800,
            timestampMs: 16670,
            confidence: null,
          },
          {
            text: " el",
            startMs: 16800,
            endMs: 17000,
            timestampMs: 16900,
            confidence: null,
          },
          {
            text: " limón",
            startMs: 17000,
            endMs: 17300,
            timestampMs: 17150,
            confidence: null,
          },
          {
            text: " te",
            startMs: 17300,
            endMs: 17500,
            timestampMs: 17400,
            confidence: null,
          },
          {
            text: " irrita",
            startMs: 17500,
            endMs: 17960,
            timestampMs: 17730,
            confidence: null,
          },
          {
            text: " la",
            startMs: 17960,
            endMs: 18100,
            timestampMs: 18030,
            confidence: null,
          },
          {
            text: " piel",
            startMs: 18100,
            endMs: 18420,
            timestampMs: 18260,
            confidence: null,
          },
          {
            text: " y",
            startMs: 18420,
            endMs: 18940,
            timestampMs: 18680,
            confidence: null,
          },
          {
            text: " después",
            startMs: 18940,
            endMs: 19300,
            timestampMs: 19120,
            confidence: null,
          },
          {
            text: " te",
            startMs: 19300,
            endMs: 19560,
            timestampMs: 19430,
            confidence: null,
          },
          {
            text: " da",
            startMs: 19560,
            endMs: 19700,
            timestampMs: 19630,
            confidence: null,
          },
          {
            text: " el",
            startMs: 19700,
            endMs: 19820,
            timestampMs: 19760,
            confidence: null,
          },
          {
            text: " sol...",
            startMs: 19820,
            endMs: 20100,
            timestampMs: 19960,
            confidence: null,
          },
          {
            text: " Tu",
            startMs: 21630,
            endMs: 21710,
            timestampMs: 21670,
            confidence: null,
          },
          {
            text: " piel",
            startMs: 21690,
            endMs: 21970,
            timestampMs: 21830,
            confidence: null,
          },
          {
            text: " siente",
            startMs: 21970,
            endMs: 22450,
            timestampMs: 22210,
            confidence: null,
          },
          {
            text: " que",
            startMs: 22450,
            endMs: 22650,
            timestampMs: 22550,
            confidence: null,
          },
          {
            text: " está",
            startMs: 22650,
            endMs: 22870,
            timestampMs: 22760,
            confidence: null,
          },
          {
            text: " en",
            startMs: 22870,
            endMs: 23030,
            timestampMs: 22950,
            confidence: null,
          },
          {
            text: " peligro.",
            startMs: 23030,
            endMs: 23570,
            timestampMs: 23300,
            confidence: null,
          },
          {
            text: " Y",
            startMs: 23700,
            endMs: 23780,
            timestampMs: 23740,
            confidence: null,
          },
          {
            text: " para",
            startMs: 23780,
            endMs: 24020,
            timestampMs: 23900,
            confidence: null,
          },
          {
            text: " defenderse,",
            startMs: 24020,
            endMs: 24940,
            timestampMs: 24480,
            confidence: null,
          },
          {
            text: " la",
            startMs: 25380,
            endMs: 25480,
            timestampMs: 25430,
            confidence: null,
          },
          {
            text: " fábrica",
            startMs: 25480,
            endMs: 25960,
            timestampMs: 25720,
            confidence: null,
          },
          {
            text: " de",
            startMs: 25960,
            endMs: 26140,
            timestampMs: 26050,
            confidence: null,
          },
          {
            text: " pigmento",
            startMs: 26140,
            endMs: 26860,
            timestampMs: 26500,
            confidence: null,
          },
          {
            text: " se",
            startMs: 26860,
            endMs: 27280,
            timestampMs: 27070,
            confidence: null,
          },
          {
            text: " prende",
            startMs: 27280,
            endMs: 27880,
            timestampMs: 27580,
            confidence: null,
          },
          {
            text: " y",
            startMs: 27880,
            endMs: 28200,
            timestampMs: 28040,
            confidence: null,
          },
          {
            text: " produce",
            startMs: 28200,
            endMs: 28680,
            timestampMs: 28440,
            confidence: null,
          },
          {
            text: " todavía",
            startMs: 28680,
            endMs: 29280,
            timestampMs: 28980,
            confidence: null,
          },
          {
            text: " más.",
            startMs: 29280,
            endMs: 29820,
            timestampMs: 29550,
            confidence: null,
          },
          {
            text: " Por",
            startMs: 29953,
            endMs: 30053,
            timestampMs: 30003,
            confidence: null,
          },
          {
            text: " eso",
            startMs: 30053,
            endMs: 30293,
            timestampMs: 30173,
            confidence: null,
          },
          {
            text: " la",
            startMs: 30293,
            endMs: 30493,
            timestampMs: 30393,
            confidence: null,
          },
          {
            text: " mancha,",
            startMs: 30493,
            endMs: 31033,
            timestampMs: 30763,
            confidence: null,
          },
          {
            text: " en",
            startMs: 31593,
            endMs: 31833,
            timestampMs: 31713,
            confidence: null,
          },
          {
            text: " vez",
            startMs: 31833,
            endMs: 32073,
            timestampMs: 31953,
            confidence: null,
          },
          {
            text: " de",
            startMs: 32073,
            endMs: 32233,
            timestampMs: 32153,
            confidence: null,
          },
          {
            text: " aclararse,",
            startMs: 32233,
            endMs: 33013,
            timestampMs: 32623,
            confidence: null,
          },
          {
            text: " vuelve",
            startMs: 33873,
            endMs: 34373,
            timestampMs: 34123,
            confidence: null,
          },
          {
            text: " más",
            startMs: 34373,
            endMs: 34653,
            timestampMs: 34513,
            confidence: null,
          },
          {
            text: " oscura.",
            startMs: 34653,
            endMs: 35293,
            timestampMs: 34973,
            confidence: null,
          },
          {
            text: " Estas",
            startMs: 35430,
            endMs: 37950,
            timestampMs: 36690,
            confidence: null,
          },
          {
            text: " manchas",
            startMs: 37950,
            endMs: 38290,
            timestampMs: 38120,
            confidence: null,
          },
          {
            text: " salen",
            startMs: 38290,
            endMs: 38650,
            timestampMs: 38470,
            confidence: null,
          },
          {
            text: " con",
            startMs: 38650,
            endMs: 38810,
            timestampMs: 38730,
            confidence: null,
          },
          {
            text: " la",
            startMs: 38810,
            endMs: 38970,
            timestampMs: 38890,
            confidence: null,
          },
          {
            text: " edad",
            startMs: 38970,
            endMs: 39390,
            timestampMs: 39180,
            confidence: null,
          },
          {
            text: " y",
            startMs: 39390,
            endMs: 40530,
            timestampMs: 39960,
            confidence: null,
          },
          {
            text: " los",
            startMs: 40530,
            endMs: 40690,
            timestampMs: 40610,
            confidence: null,
          },
          {
            text: " años",
            startMs: 40690,
            endMs: 40950,
            timestampMs: 40820,
            confidence: null,
          },
          {
            text: " de",
            startMs: 40950,
            endMs: 41150,
            timestampMs: 41050,
            confidence: null,
          },
          {
            text: " sol",
            startMs: 41150,
            endMs: 41370,
            timestampMs: 41260,
            confidence: null,
          },
          {
            text: " acumulado.",
            startMs: 41370,
            endMs: 42030,
            timestampMs: 41700,
            confidence: null,
          },
          {
            text: " Donde",
            startMs: 42213,
            endMs: 42473,
            timestampMs: 42343,
            confidence: null,
          },
          {
            text: " más",
            startMs: 42473,
            endMs: 42813,
            timestampMs: 42643,
            confidence: null,
          },
          {
            text: " sol",
            startMs: 42813,
            endMs: 43073,
            timestampMs: 42943,
            confidence: null,
          },
          {
            text: " te",
            startMs: 43073,
            endMs: 43213,
            timestampMs: 43143,
            confidence: null,
          },
          {
            text: " dio,",
            startMs: 43213,
            endMs: 43533,
            timestampMs: 43373,
            confidence: null,
          },
          {
            text: " las",
            startMs: 44173,
            endMs: 44433,
            timestampMs: 44303,
            confidence: null,
          },
          {
            text: " células",
            startMs: 44433,
            endMs: 44733,
            timestampMs: 44583,
            confidence: null,
          },
          {
            text: " que",
            startMs: 44733,
            endMs: 45013,
            timestampMs: 44873,
            confidence: null,
          },
          {
            text: " fabrican",
            startMs: 45013,
            endMs: 45513,
            timestampMs: 45263,
            confidence: null,
          },
          {
            text: " el",
            startMs: 45513,
            endMs: 45653,
            timestampMs: 45583,
            confidence: null,
          },
          {
            text: " pigmento",
            startMs: 45653,
            endMs: 46593,
            timestampMs: 46123,
            confidence: null,
          },
          {
            text: " se",
            startMs: 46593,
            endMs: 46853,
            timestampMs: 46723,
            confidence: null,
          },
          {
            text: " quedan",
            startMs: 46853,
            endMs: 47253,
            timestampMs: 47053,
            confidence: null,
          },
          {
            text: " hiperactivas.",
            startMs: 47253,
            endMs: 48113,
            timestampMs: 47683,
            confidence: null,
          },
          {
            text: " Por",
            startMs: 48200,
            endMs: 48300,
            timestampMs: 48250,
            confidence: null,
          },
          {
            text: " eso",
            startMs: 48300,
            endMs: 48520,
            timestampMs: 48410,
            confidence: null,
          },
          {
            text: " no",
            startMs: 48520,
            endMs: 48800,
            timestampMs: 48660,
            confidence: null,
          },
          {
            text: " necesitas",
            startMs: 48800,
            endMs: 49560,
            timestampMs: 49180,
            confidence: null,
          },
          {
            text: " otro",
            startMs: 49560,
            endMs: 49860,
            timestampMs: 49710,
            confidence: null,
          },
          {
            text: " remedio",
            startMs: 49860,
            endMs: 50560,
            timestampMs: 50210,
            confidence: null,
          },
          {
            text: " que",
            startMs: 50560,
            endMs: 51080,
            timestampMs: 50820,
            confidence: null,
          },
          {
            text: " ataque",
            startMs: 51080,
            endMs: 51480,
            timestampMs: 51280,
            confidence: null,
          },
          {
            text: " lo",
            startMs: 51480,
            endMs: 51680,
            timestampMs: 51580,
            confidence: null,
          },
          {
            text: " que",
            startMs: 51680,
            endMs: 51840,
            timestampMs: 51760,
            confidence: null,
          },
          {
            text: " ya",
            startMs: 51840,
            endMs: 52040,
            timestampMs: 51940,
            confidence: null,
          },
          {
            text: " ves.",
            startMs: 52040,
            endMs: 52380,
            timestampMs: 52210,
            confidence: null,
          },
          {
            text: " Necesitas",
            startMs: 53320,
            endMs: 54120,
            timestampMs: 53720,
            confidence: null,
          },
          {
            text: " lo",
            startMs: 54120,
            endMs: 54340,
            timestampMs: 54230,
            confidence: null,
          },
          {
            text: " contrario.",
            startMs: 54340,
            endMs: 54800,
            timestampMs: 54570,
            confidence: null,
          },
          {
            text: " Ahí",
            startMs: 54940,
            endMs: 55180,
            timestampMs: 55060,
            confidence: null,
          },
          {
            text: " entra",
            startMs: 55180,
            endMs: 55540,
            timestampMs: 55360,
            confidence: null,
          },
          {
            text: " LÜME,",
            startMs: 55540,
            endMs: 55940,
            timestampMs: 55740,
            confidence: null,
          },
          {
            text: " no",
            startMs: 56460,
            endMs: 56640,
            timestampMs: 56550,
            confidence: null,
          },
          {
            text: " ataca,",
            startMs: 56640,
            endMs: 57180,
            timestampMs: 56910,
            confidence: null,
          },
          {
            text: " no",
            startMs: 57600,
            endMs: 57720,
            timestampMs: 57660,
            confidence: null,
          },
          {
            text: " irrita.",
            startMs: 57720,
            endMs: 58240,
            timestampMs: 57980,
            confidence: null,
          },
          {
            text: " Calma",
            startMs: 58860,
            endMs: 59240,
            timestampMs: 59050,
            confidence: null,
          },
          {
            text: " la",
            startMs: 59240,
            endMs: 59360,
            timestampMs: 59300,
            confidence: null,
          },
          {
            text: " piel",
            startMs: 59360,
            endMs: 59680,
            timestampMs: 59520,
            confidence: null,
          },
          {
            text: " para",
            startMs: 59680,
            endMs: 59920,
            timestampMs: 59800,
            confidence: null,
          },
          {
            text: " que",
            startMs: 59920,
            endMs: 60120,
            timestampMs: 60020,
            confidence: null,
          },
          {
            text: " deje",
            startMs: 60120,
            endMs: 60400,
            timestampMs: 60260,
            confidence: null,
          },
          {
            text: " de",
            startMs: 60400,
            endMs: 60520,
            timestampMs: 60460,
            confidence: null,
          },
          {
            text: " sentirse",
            startMs: 60520,
            endMs: 61400,
            timestampMs: 60960,
            confidence: null,
          },
          {
            text: " en",
            startMs: 61400,
            endMs: 61540,
            timestampMs: 61470,
            confidence: null,
          },
          {
            text: " peligro.",
            startMs: 61540,
            endMs: 62080,
            timestampMs: 61810,
            confidence: null,
          },
          {
            text: " Formulada",
            startMs: 65137,
            endMs: 65677,
            timestampMs: 65407,
            confidence: null,
          },
          {
            text: " para",
            startMs: 65677,
            endMs: 65897,
            timestampMs: 65787,
            confidence: null,
          },
          {
            text: " las",
            startMs: 65897,
            endMs: 66137,
            timestampMs: 66017,
            confidence: null,
          },
          {
            text: " manchas",
            startMs: 66137,
            endMs: 66477,
            timestampMs: 66307,
            confidence: null,
          },
          {
            text: " de",
            startMs: 66477,
            endMs: 66617,
            timestampMs: 66547,
            confidence: null,
          },
          {
            text: " la",
            startMs: 66617,
            endMs: 66757,
            timestampMs: 66687,
            confidence: null,
          },
          {
            text: " edad",
            startMs: 66757,
            endMs: 67157,
            timestampMs: 66957,
            confidence: null,
          },
          {
            text: " y",
            startMs: 67157,
            endMs: 67477,
            timestampMs: 67317,
            confidence: null,
          },
          {
            text: " el",
            startMs: 67477,
            endMs: 67637,
            timestampMs: 67557,
            confidence: null,
          },
          {
            text: " sol,",
            startMs: 67637,
            endMs: 67897,
            timestampMs: 67767,
            confidence: null,
          },
          {
            text: " sin",
            startMs: 68417,
            endMs: 68717,
            timestampMs: 68567,
            confidence: null,
          },
          {
            text: " arder,",
            startMs: 68717,
            endMs: 69157,
            timestampMs: 68937,
            confidence: null,
          },
          {
            text: " sin",
            startMs: 69457,
            endMs: 69637,
            timestampMs: 69547,
            confidence: null,
          },
          {
            text: " pelar,",
            startMs: 69637,
            endMs: 70137,
            timestampMs: 69887,
            confidence: null,
          },
          {
            text: " sin",
            startMs: 70437,
            endMs: 70717,
            timestampMs: 70577,
            confidence: null,
          },
          {
            text: " irritar.",
            startMs: 70717,
            endMs: 71317,
            timestampMs: 71017,
            confidence: null,
          },
          {
            text: " 60",
            startMs: 71463,
            endMs: 71683,
            timestampMs: 71573,
            confidence: null,
          },
          {
            text: " días",
            startMs: 71683,
            endMs: 72103,
            timestampMs: 71893,
            confidence: null,
          },
          {
            text: " de",
            startMs: 72103,
            endMs: 72263,
            timestampMs: 72183,
            confidence: null,
          },
          {
            text: " garantía,",
            startMs: 72263,
            endMs: 72863,
            timestampMs: 72563,
            confidence: null,
          },
          {
            text: " envío",
            startMs: 73183,
            endMs: 73523,
            timestampMs: 73353,
            confidence: null,
          },
          {
            text: " gratis",
            startMs: 73523,
            endMs: 74003,
            timestampMs: 73763,
            confidence: null,
          },
          {
            text: " a",
            startMs: 74003,
            endMs: 74123,
            timestampMs: 74063,
            confidence: null,
          },
          {
            text: " toda",
            startMs: 74123,
            endMs: 74403,
            timestampMs: 74263,
            confidence: null,
          },
          {
            text: " Colombia",
            startMs: 74403,
            endMs: 74923,
            timestampMs: 74663,
            confidence: null,
          },
          {
            text: " y",
            startMs: 74923,
            endMs: 75323,
            timestampMs: 75123,
            confidence: null,
          },
          {
            text: " hoy",
            startMs: 75323,
            endMs: 75523,
            timestampMs: 75423,
            confidence: null,
          },
          {
            text: " dos",
            startMs: 75523,
            endMs: 75903,
            timestampMs: 75713,
            confidence: null,
          },
          {
            text: " unidades",
            startMs: 75903,
            endMs: 76323,
            timestampMs: 76113,
            confidence: null,
          },
          {
            text: " por",
            startMs: 76323,
            endMs: 76663,
            timestampMs: 76493,
            confidence: null,
          },
          {
            text: " $149.900",
            startMs: 76663,
            endMs: 78223,
            timestampMs: 77443,
            confidence: null,
          },
          {
            text: " pesos.",
            startMs: 78223,
            endMs: 78763,
            timestampMs: 78493,
            confidence: null,
          },
          {
            text: " No",
            startMs: 78907,
            endMs: 79107,
            timestampMs: 79007,
            confidence: null,
          },
          {
            text: " dejes",
            startMs: 79107,
            endMs: 79447,
            timestampMs: 79277,
            confidence: null,
          },
          {
            text: " que",
            startMs: 79447,
            endMs: 79627,
            timestampMs: 79537,
            confidence: null,
          },
          {
            text: " tus",
            startMs: 79627,
            endMs: 79827,
            timestampMs: 79727,
            confidence: null,
          },
          {
            text: " manos",
            startMs: 79827,
            endMs: 80127,
            timestampMs: 79977,
            confidence: null,
          },
          {
            text: " digan",
            startMs: 80127,
            endMs: 80587,
            timestampMs: 80357,
            confidence: null,
          },
          {
            text: " tu",
            startMs: 80587,
            endMs: 80927,
            timestampMs: 80757,
            confidence: null,
          },
          {
            text: " edad",
            startMs: 80927,
            endMs: 81327,
            timestampMs: 81127,
            confidence: null,
          },
          {
            text: " antes",
            startMs: 81327,
            endMs: 81787,
            timestampMs: 81557,
            confidence: null,
          },
          {
            text: " que",
            startMs: 81787,
            endMs: 82007,
            timestampMs: 81897,
            confidence: null,
          },
          {
            text: " tú.",
            startMs: 82007,
            endMs: 82287,
            timestampMs: 82147,
            confidence: null,
          },
          {
            text: " Dale",
            startMs: 83007,
            endMs: 83687,
            timestampMs: 83347,
            confidence: null,
          },
          {
            text: " clic",
            startMs: 83687,
            endMs: 83967,
            timestampMs: 83827,
            confidence: null,
          },
          {
            text: " abajo.",
            startMs: 83967,
            endMs: 84387,
            timestampMs: 84177,
            confidence: null,
          },
        ]}
      />
      <Audio src={staticFile("lume/musica.wav")} volume={music} />
    </AbsoluteFill>
  );
};
