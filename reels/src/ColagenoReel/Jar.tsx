import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C } from "./theme";

const JAR_SRC = staticFile("product/collagen-jar.png");
const JAR_RATIO = 548 / 990;

type JarProps = {
  // Horizontal center and bottom edge of the jar, in composition pixels.
  readonly x: number;
  readonly bottom: number;
  readonly height: number;
  readonly enter?: "drop" | "scale";
  readonly delay?: number;
  readonly shine?: boolean;
  // 0..1, fades the jar to grey (used when debunking a claim).
  readonly dim?: number;
};

export const Jar: React.FC<JarProps> = ({
  x,
  bottom,
  height,
  enter = "scale",
  delay = 0,
  shine = false,
  dim = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const width = height * JAR_RATIO;

  const inP = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const dropY = enter === "drop" ? interpolate(inP, [0, 1], [-1600, 0]) : 0;
  const scale = enter === "scale" ? interpolate(inP, [0, 1], [0.4, 1]) : 1;
  const float = Math.sin((frame / fps) * 2) * 12;
  const rotate = Math.sin((frame / fps) * 1.3) * 2.5;

  const sweep = interpolate((frame - delay) % 75, [10, 40], [-60, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Contact shadow */}
      <div
        style={{
          position: "absolute",
          left: x - width * 0.45,
          top: bottom - 30,
          width: width * 0.9,
          height: 60,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.55)",
          filter: "blur(18px)",
          opacity: inP * interpolate(float, [-12, 12], [0.9, 0.6]),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - width / 2,
          top: bottom - height,
          width,
          height,
          transform: `translateY(${dropY + float - 12}px) rotate(${rotate}deg) scale(${scale})`,
          transformOrigin: "50% 100%",
          opacity: enter === "scale" ? Math.min(1, inP * 2) : 1,
          filter: `drop-shadow(0 0 40px ${C.pink}88) grayscale(${dim}) brightness(${1 - dim * 0.35})`,
        }}
      >
        <Img src={JAR_SRC} style={{ width: "100%", height: "100%" }} />
        {shine ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent ${sweep - 15}%, rgba(255,255,255,0.75) ${sweep}%, transparent ${sweep + 15}%)`,
              WebkitMaskImage: `url(${JAR_SRC})`,
              WebkitMaskSize: "100% 100%",
              mixBlendMode: "screen",
            }}
          />
        ) : null}
      </div>
    </>
  );
};

type PedestalProps = {
  readonly x: number;
  readonly top: number;
  readonly width: number;
};

// Glossy lilac pedestal the jar stands on.
export const Pedestal: React.FC<PedestalProps> = ({ x, top, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 16 } });
  const capH = width * 0.22;

  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        top: top - capH / 2,
        width,
        height: 1920 - top + capH,
        transform: `translateY(${(1 - p) * 500}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: capH / 2,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, ${C.magenta} 0%, ${C.lilac} 45%, ${C.lavender} 60%, ${C.magenta} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: capH,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 50% 40%, ${C.white} 0%, ${C.lavender} 45%, ${C.lilac} 100%)`,
        }}
      />
    </div>
  );
};
