import {
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// The floating product render (dark studio background), feathered into the
// scene background so only the jar reads.
export const FloatingProduct: React.FC<{
  readonly centerX: number;
  readonly centerY: number;
  // Rendered width of the full 1280x714 image.
  readonly width: number;
  readonly delay?: number;
}> = ({ centerX, centerY, width, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const float = Math.sin((frame / fps) * 2) * 14;
  const height = width * (714 / 1280);
  // The jar sits slightly right of centre in the source image.
  const jarCx = width * 0.5;
  const jarCy = height * 0.45;
  return (
    <div
      style={{
        position: "absolute",
        left: centerX - jarCx,
        top: centerY - jarCy,
        width,
        height,
        transform: `translateY(${(1 - p) * 900 + float}px) rotate(${Math.sin(frame / 25) * 1.5}deg)`,
        WebkitMaskImage:
          "radial-gradient(ellipse 34% 52% at 50% 45%, black 70%, transparent 100%)",
      }}
    >
      <Img
        src={staticFile("creatina/float-dark.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
