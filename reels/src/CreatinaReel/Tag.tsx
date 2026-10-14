import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../ColagenoReel/font";
import { G } from "./theme";

type Props = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly bg?: string;
  readonly color?: string;
  readonly fontSize?: number;
  readonly rotate?: number;
  readonly style?: React.CSSProperties;
};

// Label that pops in with a spring.
export const Tag: React.FC<Props> = ({
  children,
  delay = 0,
  bg = G.green,
  color = G.black,
  fontSize = 72,
  rotate = -2,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, stiffness: 190 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 18,
        fontFamily,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.05,
        textAlign: "center",
        textTransform: "uppercase",
        color,
        backgroundColor: bg,
        padding: "20px 36px",
        borderRadius: 18,
        boxShadow: `0 14px 40px rgba(0,0,0,0.5), 0 0 0 5px ${G.white}`,
        transform: `scale(${pop}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Centered: React.FC<{
  readonly top: number;
  readonly children: React.ReactNode;
}> = ({ top, children }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 60,
      right: 60,
      display: "flex",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

// Wraps anything in a spring pop-in at `delay` frames.
export const Pop: React.FC<{
  readonly delay?: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
  readonly from?: "scale" | "up" | "left" | "right";
}> = ({ delay = 0, children, style, from = "scale" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 170 },
  });
  const t =
    from === "scale"
      ? `scale(${p})`
      : from === "up"
        ? `translateY(${(1 - p) * 300}px)`
        : `translateX(${(1 - p) * (from === "left" ? -900 : 900)}px)`;
  return (
    <div
      style={{
        position: "absolute",
        transform: t,
        opacity: Math.min(1, p * 3),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
