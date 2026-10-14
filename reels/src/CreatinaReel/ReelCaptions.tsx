import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { useMemo } from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "../ColagenoReel/font";
import { FACE_CAPTIONS_TOP, G, SCENE_CAPTIONS_TOP } from "./theme";

type Props = {
  // Timestamps are in composition time (after the silence cuts).
  readonly captions: Caption[];
  // [from, to) frame ranges where a full-screen scene is showing; captions
  // drop below the graphics there and sit above the head otherwise.
  readonly sceneRanges: readonly (readonly [number, number])[];
};

export const ReelCaptions: React.FC<Props> = ({ captions, sceneRanges }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: 700,
      }),
    [captions],
  );

  const pageIndex = pages.findIndex(
    (p, i) =>
      nowMs >= p.startMs &&
      nowMs < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs),
  );
  if (pageIndex === -1) {
    return null;
  }
  const page = pages[pageIndex];
  // Alternate between a neon-green word and a green highlight box.
  const boxed = pageIndex % 2 === 1;

  const inScene = sceneRanges.some(([a, b]) => frame >= a && frame < b);
  const top = inScene ? SCENE_CAPTIONS_TOP : FACE_CAPTIONS_TOP;

  const pop = spring({
    frame: frame - Math.round((page.startMs / 1000) * fps),
    fps,
    config: { damping: 14, stiffness: 260 },
    durationInFrames: 8,
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top }}>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 82,
          lineHeight: 1.15,
          textAlign: "center",
          textTransform: "uppercase",
          maxWidth: 920,
          transform: `scale(${0.85 + 0.15 * pop})`,
        }}
      >
        {page.tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          const word = t.text.trimStart();
          const box = active && boxed;
          return (
            <span
              key={t.fromMs}
              style={{
                display: "inline-block",
                // The thick outline eats into a normal space; use a margin.
                marginLeft: i > 0 && word !== t.text ? "0.3em" : 0,
                padding: box ? "0 14px" : 0,
                borderRadius: 12,
                backgroundColor: box ? G.green : "transparent",
                color: box ? G.black : active ? G.neon : G.white,
                WebkitTextStroke: box ? "0px" : `14px ${G.black}`,
                paintOrder: "stroke fill",
                textShadow: box ? "none" : "0 8px 24px rgba(0,0,0,0.6)",
                boxShadow: box ? `0 0 0 5px ${G.black}` : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
