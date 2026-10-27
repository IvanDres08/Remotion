import { Audio, Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// mascota.mp4 is 576x1024, i.e. exactly 1080x1920 at zoom 1.
const W = 1080;
const H = 1920;

export type Focus = {
  // Point of interest in the source, as fractions of width/height.
  readonly x: number;
  readonly y: number;
  readonly zoom: number;
};

type Props = {
  readonly trimBefore: number;
  readonly from: Focus;
  readonly to: Focus;
  // Where on screen the point of interest should sit.
  readonly screenY?: number;
};

// One kept phrase: muted video with a slow camera move between two framings
// (e.g. wide with the cat -> close on the face), plus the cleaned voice.
export const Shot: React.FC<Props> = ({
  trimBefore,
  from,
  to,
  screenY = 820,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = Easing.inOut(Easing.sin)(
    Math.min(1, frame / Math.max(1, durationInFrames - 1)),
  );
  const x = interpolate(p, [0, 1], [from.x, to.x]);
  const y = interpolate(p, [0, 1], [from.y, to.y]);
  const s = interpolate(p, [0, 1], [from.zoom, to.zoom]);

  const tx = Math.min(0, Math.max(W - W * s, 540 - s * x * W));
  const ty = Math.min(0, Math.max(H - H * s, screenY - s * y * H));

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <div
        style={{
          position: "absolute",
          width: W,
          height: H,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${s})`,
        }}
      >
        <Video
          src={staticFile("mascota.mp4")}
          trimBefore={trimBefore}
          muted
          premountFor={fps}
          objectFit="fill"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <Audio
        src={staticFile("mascota/voz.wav")}
        trimBefore={trimBefore}
        volume={0.68}
      />
    </AbsoluteFill>
  );
};
