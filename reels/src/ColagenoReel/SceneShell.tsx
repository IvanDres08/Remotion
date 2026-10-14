import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BokehBackground } from "./BokehBackground";

// Full-screen cutaway: opens with a circular reveal and closes with a quick
// zoom-out so the cut back to the face feels snappy.
// Pass enter/exit={false} where two scenes are back to back, so the face
// doesn't flash through between them.
export const SceneShell: React.FC<{
  readonly children: React.ReactNode;
  readonly enter?: boolean;
  readonly exit?: boolean;
}> = ({ children, enter = true, exit = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const reveal = !enter
    ? 120
    : interpolate(frame, [0, 9], [0, 120], {
        extrapolateRight: "clamp",
      });
  const out = !exit
    ? 1
    : interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  return (
    <AbsoluteFill
      style={{
        clipPath: `circle(${reveal}% at 50% 45%)`,
        opacity: out,
        transform: `scale(${1 + (1 - out) * 0.08})`,
      }}
    >
      <BokehBackground />
      {children}
    </AbsoluteFill>
  );
};
