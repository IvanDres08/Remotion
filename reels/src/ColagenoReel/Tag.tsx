import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";
import { C } from "./theme";

type Props = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly bg?: string;
  readonly color?: string;
  readonly fontSize?: number;
  readonly rotate?: number;
  readonly style?: React.CSSProperties;
};

// Pill-shaped label that pops in with a spring.
export const Tag: React.FC<Props> = ({
  children,
  delay = 0,
  bg = C.pink,
  color = C.white,
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
        borderRadius: 28,
        boxShadow: `0 14px 40px rgba(0,0,0,0.4), 0 0 0 6px ${C.white}55`,
        transform: `scale(${pop}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Horizontally centered row at a given top offset.
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
