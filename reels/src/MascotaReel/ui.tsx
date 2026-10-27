import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { sans, serif } from "./fonts";
import { B } from "./theme";

// 0 -> 1 eased progress starting at `delay`, over `dur` frames.
export const useIn = (delay = 0, dur = 14) => {
  const frame = useCurrentFrame();
  return Easing.out(Easing.cubic)(
    interpolate(frame, [delay, delay + dur], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
};

// Small letter-spaced label above titles.
export const Kicker: React.FC<{
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly color?: string;
}> = ({ children, delay = 0, color = B.gold }) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        fontFamily: sans,
        fontWeight: 500,
        fontSize: 30,
        letterSpacing: 8,
        textTransform: "uppercase",
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      {children}
    </div>
  );
};

// Serif title revealed with a soft upward fade.
export const Title: React.FC<{
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly size?: number;
  readonly italic?: boolean;
  readonly color?: string;
}> = ({ children, delay = 0, size = 110, italic = false, color = B.ink }) => {
  const p = useIn(delay, 18);
  return (
    <div
      style={{
        fontFamily: serif,
        fontWeight: 500,
        fontStyle: italic ? "italic" : "normal",
        fontSize: size,
        lineHeight: 1.05,
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined,
      }}
    >
      {children}
    </div>
  );
};

// Thin gold rule that draws from the centre.
export const Rule: React.FC<{
  readonly delay?: number;
  readonly width?: number;
}> = ({ delay = 0, width = 260 }) => {
  const p = useIn(delay, 20);
  return (
    <div
      style={{
        height: 3,
        width: width * p,
        backgroundColor: B.gold,
        margin: "24px auto",
      }}
    />
  );
};

const BLOBS = new Array(6).fill(0).map((_, i) => ({
  x: random(`mbx${i}`) * 1080,
  y: random(`mby${i}`) * 1920,
  r: 260 + random(`mbr${i}`) * 260,
  color: [B.beige, B.blush, B.sage, B.mist, B.sand, B.blush][i],
}));

// Ivory backdrop with very soft beige/pastel light and film grain.
export const PaperBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: B.ivory, overflow: "hidden" }}>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x - b.r + Math.sin(frame / 70 + i) * 30,
            top: b.y - b.r + Math.cos(frame / 80 + i) * 30,
            width: b.r * 2,
            height: b.r * 2,
            borderRadius: "50%",
            backgroundColor: b.color,
            opacity: 0.5,
            filter: "blur(90px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Full-screen scene: rounded-rect mask grows from the centre, exits with a
// soft fade + blur.
export const Scene: React.FC<{
  readonly children: React.ReactNode;
  readonly exit?: boolean;
}> = ({ children, exit = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Easing.inOut(Easing.cubic)(
    interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" }),
  );
  const out = exit
    ? interpolate(frame, [durationInFrames - 8, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const inset = (1 - p) * 42;
  return (
    <AbsoluteFill
      style={{
        clipPath: `inset(${inset}% ${inset * 0.9}% ${inset}% ${inset * 0.9}% round ${60 * (1 - p) + 0}px)`,
        opacity: 1 - out,
        filter: out > 0 ? `blur(${out * 12}px)` : undefined,
      }}
    >
      <PaperBackground />
      {children}
    </AbsoluteFill>
  );
};

// Elegant cut cover: two beige panels sweep across with a gold hairline.
export const Sweep: React.FC = () => {
  const frame = useCurrentFrame();
  const t = Easing.inOut(Easing.cubic)(
    interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" }),
  );
  const x = interpolate(t, [0, 1], [-1500, 1500]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: x - 120,
          width: 1300,
          backgroundColor: B.sand,
          transform: "skewX(-12deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: x,
          width: 1150,
          backgroundColor: B.ivory,
          transform: "skewX(-12deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: x + 1150,
          width: 4,
          backgroundColor: B.gold,
          transform: "skewX(-12deg)",
        }}
      />
    </AbsoluteFill>
  );
};
