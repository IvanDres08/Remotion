import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { serif } from "../fonts";
import { B } from "../theme";
import { Kicker, useIn } from "../ui";

// "la hormona del amor y la calma" — over the close-up of the cat.
const LOVE_AT = 24;
const CALM_AT = 48;

export const LoveCalm: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const card = useIn(0, 14);
  const love = useIn(LOVE_AT, 14);
  const calm = useIn(CALM_AT, 14);
  const out = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const word = (p: number): React.CSSProperties => ({
    display: "inline-block",
    opacity: p,
    transform: `translateY(${(1 - p) * 24}px)`,
    filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
  });
  return (
    <AbsoluteFill
      style={{ alignItems: "center", paddingTop: 250, opacity: out }}
    >
      <div
        style={{
          padding: "34px 60px 40px",
          borderRadius: 28,
          backgroundColor: "rgba(247,242,234,0.86)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 18px 50px rgba(58,50,43,0.18)",
          textAlign: "center",
          opacity: card,
          transform: `translateY(${(1 - card) * 30}px)`,
        }}
      >
        <Kicker delay={4}>La hormona del</Kicker>
        <div
          style={{
            fontFamily: serif,
            fontWeight: 500,
            fontSize: 116,
            color: B.ink,
            marginTop: 6,
          }}
        >
          <span style={{ ...word(love), fontStyle: "italic" }}>amor</span>
          <span style={{ ...word(calm), color: B.gold, margin: "0 22px" }}>
            &
          </span>
          <span style={{ ...word(calm), fontStyle: "italic" }}>calma</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
