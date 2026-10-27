import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PastelBackground } from "./PastelBackground";

// Full-screen pastel scene: opens with a soft circle reveal, closes with a
// zoom-through so the cut back to the face feels like a transition.
export const SceneShell: React.FC<{
  readonly children: React.ReactNode;
  readonly tint?: string;
  readonly enter?: boolean;
  readonly exit?: boolean;
}> = ({ children, tint, enter = true, exit = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const r = enter
    ? interpolate(frame, [0, 10], [0, 130], { extrapolateRight: "clamp" })
    : 130;
  const out = exit
    ? interpolate(frame, [durationInFrames - 7, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  return (
    <AbsoluteFill
      style={{
        clipPath: `circle(${r}% at 50% 45%)`,
        opacity: 1 - out,
        transform: `scale(${1 + out * 0.25})`,
        filter: out > 0 ? `blur(${out * 10}px)` : undefined,
      }}
    >
      <PastelBackground tint={tint} />
      {children}
    </AbsoluteFill>
  );
};

// Top half graphic panel used while the speaker stays visible below.
export const SplitPanel: React.FC<{
  readonly children: React.ReactNode;
  readonly tint?: string;
}> = ({ children, tint }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inP = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const outP = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const p = Math.min(inP, outP);
  return (
    <AbsoluteFill
      style={{
        clipPath: `inset(0 0 ${100 - 52 * p}% 0)`,
      }}
    >
      <PastelBackground tint={tint} />
      {children}
    </AbsoluteFill>
  );
};
