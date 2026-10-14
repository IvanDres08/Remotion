import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { useMemo } from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "./font";
import { C, FACE_CAPTIONS_TOP, SCENE_CAPTIONS_TOP } from "./theme";

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
  // Alternate the highlight between the product's pink and lilac.
  const accent = pageIndex % 2 === 0 ? C.hotPink : C.lilac;

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
          fontSize: 84,
          lineHeight: 1.1,
          textAlign: "center",
          textTransform: "uppercase",
          color: C.white,
          WebkitTextStroke: `14px ${C.plum}`,
          paintOrder: "stroke fill",
          textShadow: `0 8px 24px rgba(0,0,0,0.5)`,
          maxWidth: 900,
          transform: `scale(${0.85 + 0.15 * pop})`,
        }}
      >
        {page.tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          const word = t.text.trimStart();
          return (
            <span
              key={t.fromMs}
              style={{
                color: active ? accent : C.white,
                display: "inline-block",
                // The thick outline eats into a normal space; use a margin.
                marginLeft: i > 0 && word !== t.text ? "0.35em" : 0,
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
