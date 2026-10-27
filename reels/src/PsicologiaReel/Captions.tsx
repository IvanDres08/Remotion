import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { useMemo } from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "./fonts";
import { ACCENTS, P } from "./theme";

type Range = readonly (readonly [number, number])[];

// Pastel pill captions: ink text on white, the spoken word gets a pastel
// highlight (cycling through the palette page by page).
export const Captions: React.FC<{
  readonly captions: Caption[];
  readonly scenes: Range;
  readonly splits: Range;
}> = ({ captions, scenes, splits }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: 650,
      }),
    [captions],
  );
  const idx = pages.findIndex(
    (p, i) =>
      nowMs >= p.startMs &&
      nowMs < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs),
  );
  if (idx === -1) return null;
  const page = pages[idx];
  const accent = ACCENTS[idx % ACCENTS.length];
  const inRange = (r: Range) => r.some(([a, b]) => frame >= a && frame < b);
  const top = inRange(splits) ? 950 : inRange(scenes) ? 1330 : 1240;

  const pop = spring({
    frame: frame - Math.round((page.startMs / 1000) * fps),
    fps,
    config: { damping: 13, stiffness: 240 },
    durationInFrames: 9,
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top }}>
      <div
        style={{
          maxWidth: 940,
          padding: "14px 26px",
          borderRadius: 36,
          backgroundColor: P.white,
          boxShadow: "0 14px 40px rgba(61,53,83,0.28)",
          border: `5px solid ${accent}`,
          fontFamily,
          fontWeight: 900,
          fontSize: 70,
          lineHeight: 1.2,
          textAlign: "center",
          textTransform: "uppercase",
          color: P.ink,
          transform: `scale(${0.8 + 0.2 * pop}) translateY(${(1 - pop) * 20}px)`,
        }}
      >
        {page.tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          const word = t.text.trimStart();
          return (
            <span
              key={t.fromMs}
              style={{
                display: "inline-block",
                marginLeft: i > 0 && word !== t.text ? "0.25em" : 0,
                padding: "0 10px",
                borderRadius: 16,
                backgroundColor: active ? accent : "transparent",
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
