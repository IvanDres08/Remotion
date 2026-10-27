import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Kicker, Rule, Title } from "../ui";

// Opening title over the first shot.
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 250,
        textAlign: "center",
        opacity: out,
      }}
    >
      <Kicker delay={4}>Psicología · Bienestar</Kicker>
      <div style={{ marginTop: 18 }}>
        <Title delay={8} size={104}>
          El poder de
        </Title>
        <Title delay={14} size={104} italic>
          una caricia
        </Title>
      </div>
      <Rule delay={24} />
    </AbsoluteFill>
  );
};
