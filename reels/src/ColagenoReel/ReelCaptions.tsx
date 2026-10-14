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

type Props = {
  // Timestamps are relative to the original media file. The parent sequence
  // carries `trimBefore`, so the current frame here is already in media time.
  readonly captions: Caption[];
  readonly accentColor: string;
  readonly top: number;
};

export const ReelCaptions: React.FC<Props> = ({
  captions,
  accentColor,
  top,
}) => {
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

  const page = pages.find(
    (p, i) =>
      nowMs >= p.startMs &&
      nowMs < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs),
  );
  if (!page) {
    return null;
  }

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
          color: "white",
          WebkitTextStroke: "14px black",
          paintOrder: "stroke fill",
          textShadow: "0 8px 24px rgba(0,0,0,0.5)",
          maxWidth: 900,
          transform: `scale(${0.85 + 0.15 * pop})`,
          whiteSpace: "pre-wrap",
        }}
      >
        {page.tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          return (
            <span
              key={t.fromMs}
              style={{ color: active ? accentColor : "white" }}
            >
              {i === 0 ? t.text.trimStart() : t.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
