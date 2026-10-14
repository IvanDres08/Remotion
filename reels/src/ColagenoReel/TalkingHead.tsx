import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  readonly trimBefore: number;
  readonly zoom: number;
};

// The source is 464x832 with a "Teleprompter.pw" watermark in the bottom-right
// corner. Zooming from an origin near the top keeps the face framed and pushes
// the watermark out of the frame (needs zoom >= 1.25).
export const TalkingHead: React.FC<Props> = ({ trimBefore, zoom }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Slow push-in over the clip so static shots never feel frozen.
  const drift = interpolate(frame, [0, durationInFrames], [0, 0.04], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <Video
        src={staticFile("colageno.mp4")}
        trimBefore={trimBefore}
        premountFor={fps}
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom + drift})`,
          transformOrigin: "50% 22%",
        }}
      />
    </AbsoluteFill>
  );
};
