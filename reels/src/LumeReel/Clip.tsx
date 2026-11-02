import { Audio, Video } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  readonly name: string;
  // First frame of the source to use (30 fps timeline).
  readonly trimBefore: number;
  // Slow push-in amount over the clip, for a cinematic feel.
  readonly push?: number;
  readonly muted?: boolean;
  readonly playbackRate?: number;
  // Area (in % of the frame) to blur, e.g. text burned into the source.
  readonly blurBox?: { x: number; y: number; w: number; h: number };
};

// One source clip (720x1280, scaled to 1080x1920) with its loudness-matched
// audio track.
export const Clip: React.FC<Props> = ({
  name,
  trimBefore,
  push = 0.04,
  muted = false,
  playbackRate = 1,
  blurBox,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const s = interpolate(frame, [0, durationInFrames], [1, 1 + push]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${s})` }}>
        <Video
          src={staticFile(`lume/raw/${name}.mp4`)}
          trimBefore={trimBefore}
          playbackRate={playbackRate}
          muted
          premountFor={fps}
          objectFit="cover"
          style={{ width: "100%", height: "100%" }}
        />
        {blurBox ? (
          <div
            style={{
              position: "absolute",
              left: `${blurBox.x}%`,
              top: `${blurBox.y}%`,
              width: `${blurBox.w}%`,
              height: `${blurBox.h}%`,
              backdropFilter: "blur(14px)",
              borderRadius: 30,
            }}
          />
        ) : null}
      </AbsoluteFill>
      {muted ? null : (
        <Audio
          src={staticFile(`lume/audio/${name}.wav`)}
          trimBefore={trimBefore}
        />
      )}
    </AbsoluteFill>
  );
};
