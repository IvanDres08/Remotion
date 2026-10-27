import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { serif } from "./fonts";
import { B } from "./theme";

type Range = readonly (readonly [number, number])[];

// Serif captions on a frosted ivory card; the spoken word turns italic gold.
export const Captions: React.FC<{
  readonly captions: Caption[];
  readonly scenes: Range;
  // Split-screen ranges: captions sit on the seam between panel and speaker.
  readonly splits?: Range;
}> = ({ captions, scenes, splits = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: 800,
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
  const inRange = (r: Range) => r.some(([a, b]) => frame >= a && frame < b);
  const top = inRange(splits) ? 950 : inRange(scenes) ? 1330 : 1250;
  const startF = (page.startMs / 1000) * fps;
  const p = interpolate(frame, [startF, startF + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top }}>
      <div
        style={{
          maxWidth: 900,
          padding: "16px 34px 20px",
          borderRadius: 20,
          backgroundColor: "rgba(247,242,234,0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(58,50,43,0.15)",
          fontFamily: serif,
          fontWeight: 500,
          fontSize: 60,
          lineHeight: 1.2,
          textAlign: "center",
          color: B.ink,
          opacity: p,
          transform: `translateY(${(1 - p) * 10}px)`,
        }}
      >
        {page.tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          const word = t.text.trimStart();
          return (
            <span
              key={t.fromMs}
              style={{
                marginLeft: i > 0 && word !== t.text ? "0.28em" : 0,
                fontStyle: active ? "italic" : "normal",
                fontWeight: active ? 600 : 500,
                color: active ? B.gold : B.ink,
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
