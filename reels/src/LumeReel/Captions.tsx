import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { manrope } from "./fonts";
import { L } from "./theme";

// Manrope captions on a burgundy pill; the spoken word turns peach.
export const Captions: React.FC<{
  readonly captions: Caption[];
  // Frame ranges where an on-screen card already carries the words.
  readonly hide?: readonly (readonly [number, number])[];
}> = ({ captions, hide = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: 750,
        breakOnSilenceAfterMilliseconds: 500,
      }),
    [captions],
  );
  const idx = pages.findIndex(
    (p, i) =>
      nowMs >= p.startMs &&
      nowMs <
        Math.min(
          pages[i + 1]?.startMs ?? Infinity,
          p.startMs + p.durationMs + 400,
        ),
  );
  if (idx === -1 || hide.some(([a, b]) => frame >= a && frame < b)) return null;
  const page = pages[idx];
  const startF = (page.startMs / 1000) * fps;
  const p = interpolate(frame, [startF, startF + 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 1300 }}>
      <div
        style={{
          maxWidth: 920,
          padding: "14px 30px 16px",
          borderRadius: 18,
          backgroundColor: "rgba(89,0,24,0.86)",
          boxShadow: "0 12px 34px rgba(61,0,16,0.35)",
          fontFamily: manrope,
          fontWeight: 600,
          fontSize: 54,
          lineHeight: 1.25,
          textAlign: "center",
          color: L.ivory,
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
                marginLeft: i > 0 && word !== t.text ? "0.26em" : 0,
                color: active ? L.peach : L.ivory,
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
