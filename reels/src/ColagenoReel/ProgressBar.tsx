import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressBar: React.FC<{ readonly color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 10,
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          backgroundColor: color,
        }}
      />
    </AbsoluteFill>
  );
};
