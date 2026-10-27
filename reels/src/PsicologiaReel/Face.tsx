import { Audio, Video } from "@remotion/media";
import { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// The source is 576x1040; covering a 1080x1920 frame scales it to 1080x1950
// with 15px cropped top and bottom.
const SRC_W = 1080;
const SRC_H = 1950;
const SRC_TOP = -15;

// Where the face should land on screen and an extra zoom factor; driven by
// the composition-level layout (full face vs split screen).
export const FaceTarget = createContext({ y: 760, zoomMul: 1 });

type Props = {
  // First source frame of this phrase.
  readonly trimBefore: number;
  // Face centre in the source, as fractions of width/height.
  readonly fx: number;
  readonly fy: number;
  readonly zoomFrom: number;
  readonly zoomTo: number;
  // Phrase-to-phrase transition: zoom-out "punch" or zoom-in "pull".
  readonly entry?: "punch" | "pull";
};

// One spoken phrase: muted video framed on the face with a slow zoom, plus
// the cleaned-up voice track.
export const Phrase: React.FC<Props> = ({
  trimBefore,
  fx,
  fy,
  zoomFrom,
  zoomTo,
  entry = "punch",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const target = useContext(FaceTarget);

  const progress = Easing.inOut(Easing.cubic)(
    Math.min(1, frame / Math.max(1, durationInFrames - 1)),
  );
  const settle = Easing.out(Easing.cubic)(Math.min(1, frame / 8));
  const kick =
    entry === "punch" ? 1 + 0.14 * (1 - settle) : 1 - 0.1 * (1 - settle);
  const s =
    interpolate(progress, [0, 1], [zoomFrom, zoomTo]) * target.zoomMul * kick;
  const blur = Math.max(0, 6 * (1 - frame / 5));

  const tx = Math.min(0, Math.max(SRC_W - SRC_W * s, 540 - s * fx * SRC_W));
  const ty = Math.min(
    -SRC_TOP,
    Math.max(1920 - SRC_TOP - SRC_H * s, target.y - SRC_TOP - s * fy * SRC_H),
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: SRC_TOP,
          width: SRC_W,
          height: SRC_H,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${s})`,
          filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
        }}
      >
        <Video
          src={staticFile("psicologia-raw.mp4")}
          trimBefore={trimBefore}
          muted
          premountFor={fps}
          objectFit="fill"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <Audio src={staticFile("psicologia/voz.wav")} trimBefore={trimBefore} volume={0.78} />
    </AbsoluteFill>
  );
};

// Composition-level wrapper: moves the face down (and zooms out a bit) while a
// split-screen panel occupies the top half.
export const FaceLayer: React.FC<{
  readonly splits: readonly (readonly [number, number])[];
  readonly children: React.ReactNode;
}> = ({ splits, children }) => {
  const frame = useCurrentFrame();
  let k = 0;
  for (const [a, b] of splits) {
    const v = Math.min(
      interpolate(frame, [a, a + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      interpolate(frame, [b - 8, b], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
    k = Math.max(k, v);
  }
  const eased = Easing.inOut(Easing.cubic)(k);
  return (
    <FaceTarget.Provider
      value={{
        y: interpolate(eased, [0, 1], [760, 1290]),
        zoomMul: interpolate(eased, [0, 1], [1, 0.82]),
      }}
    >
      {children}
    </FaceTarget.Provider>
  );
};
