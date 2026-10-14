import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";

type Props = {
  readonly text: string;
  readonly accentColor: string;
};

export const Cta: React.FC<Props> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 11, stiffness: 170 } });
  // Gentle pulse once it has landed, to draw the eye to the follow button.
  const pulse = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 3);

  return (
    <AbsoluteFill
      style={{ alignItems: "center", paddingTop: 340, fontFamily }}
    >
      <div
        style={{
          transform: `scale(${pop * pulse})`,
          backgroundColor: accentColor,
          color: "black",
          fontWeight: 900,
          fontSize: 76,
          padding: "20px 40px",
          borderRadius: 999,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
