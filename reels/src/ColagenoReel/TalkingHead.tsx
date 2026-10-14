import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  readonly zoom: number;
};

// The source is 464x832 with a "Teleprompter.pw" watermark in the bottom-right
// corner. Zooming from an origin near the top keeps the face framed and pushes
// the watermark out of the frame (needs zoom >= 1.25). Trimming is done by the
// parent sequence so captions in the same clip stay in sync.
export const TalkingHead: React.FC<Props> = ({ zoom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle breathing zoom so static shots never feel frozen.
  const drift = 0.015 * Math.sin((frame / fps) * 0.6);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <Video
        src={staticFile("colageno.mp4")}
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
