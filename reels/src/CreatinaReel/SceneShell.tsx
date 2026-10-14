import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DarkBackground } from "./DarkBackground";
import { G } from "./theme";

// Full-screen cutaway with a green wipe in and a quick zoom-out exit. Pass
// enter/exit={false} where two scenes are back to back.
export const SceneShell: React.FC<{
  readonly children: React.ReactNode;
  readonly enter?: boolean;
  readonly exit?: boolean;
  readonly background?: React.ReactNode;
}> = ({ children, enter = true, exit = true, background }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const wipe = enter
    ? interpolate(frame, [0, 8], [0, 100], { extrapolateRight: "clamp" })
    : 100;
  const bar = enter
    ? interpolate(frame, [0, 4, 10], [0, 100, 100], {
        extrapolateRight: "clamp",
      })
    : 0;
  const out = exit
    ? interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `polygon(0 0, ${wipe * 1.3}% 0, ${wipe * 1.3 - 30}% 100%, 0 100%)`,
          opacity: out,
          transform: `scale(${1 + (1 - out) * 0.08})`,
        }}
      >
        {background ?? <DarkBackground />}
        {children}
      </AbsoluteFill>
      {enter && frame < 10 ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `calc(${wipe * 1.3 - 15}% - 40px)`,
            width: 80,
            background: G.neon,
            transform: "skewX(-9deg)",
            opacity: bar > 0 ? 1 - frame / 10 : 0,
            boxShadow: `0 0 60px ${G.neon}`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
