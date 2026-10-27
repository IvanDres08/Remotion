import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { B } from "../MascotaReel/theme";
import { PaperBackground } from "../MascotaReel/ui";

// Top-half paper panel used while the speaker stays visible below; slides
// down like a blind, with a gold hairline on its edge.
export const Split: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inP = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const outP = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const p = Easing.inOut(Easing.cubic)(Math.min(inP, outP));
  const h = 1000 * p;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(0 0 ${1920 - h}px 0)` }}>
        <PaperBackground />
        {children}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: h - 2,
          height: 3,
          backgroundColor: B.gold,
          opacity: p,
        }}
      />
    </AbsoluteFill>
  );
};

// Small serif card used for overlays on the speaker.
export const NoteCard: React.FC<{
  readonly children: React.ReactNode;
  readonly p: number;
}> = ({ children, p }) => (
  <div
    style={{
      padding: "26px 56px 32px",
      borderRadius: 26,
      backgroundColor: "rgba(247,242,234,0.88)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 18px 50px rgba(58,50,43,0.15)",
      textAlign: "center",
      opacity: p,
      transform: `translateY(${(1 - p) * 26}px)`,
    }}
  >
    {children}
  </div>
);
