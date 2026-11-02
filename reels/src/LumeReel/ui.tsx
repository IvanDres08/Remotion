import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Eased 0 -> 1 from `delay` over `dur` frames, and back to 0 over the last
// `outDur` frames of the sequence (if given).
export const useFade = (delay = 0, dur = 14, outDur = 0) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inP = Easing.out(Easing.cubic)(
    interpolate(frame, [delay, delay + dur], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const outP = outDur
    ? interpolate(
        frame,
        [durationInFrames - outDur, durationInFrames],
        [1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 1;
  return Math.min(inP, outP);
};

export const rise = (p: number, px = 24): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * px}px)`,
  filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
});
