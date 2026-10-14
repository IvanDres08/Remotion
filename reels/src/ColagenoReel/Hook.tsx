import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "./font";

type Props = {
  readonly title: string;
  readonly subtitle: string;
  readonly accentColor: string;
};

export const Hook: React.FC<Props> = ({ title, subtitle, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 12, stiffness: 180 } });
  const subPop = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const exit = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 300,
        fontFamily,
        opacity: exit,
      }}
    >
      <div
        style={{
          transform: `scale(${pop}) rotate(-2deg)`,
          backgroundColor: accentColor,
          color: "black",
          fontWeight: 900,
          fontSize: 92,
          lineHeight: 1,
          padding: "22px 36px",
          borderRadius: 18,
          textAlign: "center",
          maxWidth: 860,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 24,
          transform: `scale(${subPop})`,
          color: "white",
          fontWeight: 800,
          fontSize: 56,
          textTransform: "uppercase",
          WebkitTextStroke: "10px black",
          paintOrder: "stroke fill",
          textAlign: "center",
          maxWidth: 860,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
