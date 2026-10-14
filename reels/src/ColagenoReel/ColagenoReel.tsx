import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Cta } from "./Cta";
import { Hook } from "./Hook";
import { ProgressBar } from "./ProgressBar";
import { TalkingHead } from "./TalkingHead";

type Props = {
  readonly hook: string;
  readonly hookSub: string;
  readonly cta: string;
  readonly accentColor: string;
};

// Silences (> 0.15 s below -36 dB) were cut out of the original 33.5 s take.
// Each clip is one spoken segment; the zoom alternates between clips so the
// jump cuts read as intentional punch-ins.
export const ColagenoReel: React.FC<Props> = ({
  hook,
  hookSub,
  cta,
  accentColor,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries name="Timeline">
        <TransitionSeries.Sequence name="Segmento 1" durationInFrames={325} premountFor={fps}>
          <TalkingHead trimBefore={13} zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Segmento 2" durationInFrames={148} premountFor={fps}>
          <TalkingHead trimBefore={347} zoom={1.42} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Segmento 3" durationInFrames={311} premountFor={fps}>
          <TalkingHead trimBefore={501} zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Segmento 4" durationInFrames={68} premountFor={fps}>
          <TalkingHead trimBefore={822} zoom={1.42} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Segmento 5" durationInFrames={27} premountFor={fps}>
          <TalkingHead trimBefore={896} zoom={1.28} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Segmento 6" durationInFrames={17} premountFor={fps}>
          <TalkingHead trimBefore={932} zoom={1.42} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Segmento 7" durationInFrames={31} premountFor={fps}>
          <TalkingHead trimBefore={956} zoom={1.28} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Sequence name="Hook" durationInFrames={75} premountFor={fps}>
        <Hook title={hook} subtitle={hookSub} accentColor={accentColor} />
      </Sequence>
      <Sequence name="CTA" from={852} durationInFrames={75} premountFor={fps}>
        <Cta text={cta} accentColor={accentColor} />
      </Sequence>
      <ProgressBar color={accentColor} />
    </AbsoluteFill>
  );
};
