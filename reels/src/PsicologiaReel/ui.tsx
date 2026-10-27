import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Emo } from "./Emo";
import { fontFamily } from "./fonts";
import { P } from "./theme";

const usePop = (delay: number, stiffness = 180, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness } });
};

// Rounded pastel sticker with an optional emoji.
export const Sticker: React.FC<{
  readonly children: React.ReactNode;
  readonly emoji?: string;
  readonly delay?: number;
  readonly bg?: string;
  readonly fontSize?: number;
  readonly rotate?: number;
  readonly style?: React.CSSProperties;
}> = ({
  children,
  emoji,
  delay = 0,
  bg = P.lavender,
  fontSize = 64,
  rotate = 0,
  style,
}) => {
  const pop = usePop(delay, 150, 18);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        fontFamily,
        fontWeight: 700,
        fontSize: fontSize * 0.9,
        lineHeight: 1.1,
        letterSpacing: 0.5,
        textAlign: "center",
        textTransform: "uppercase",
        color: P.ink,
        backgroundColor: bg,
        padding: "16px 30px",
        borderRadius: 22,
        border: "3px solid rgba(255,255,255,0.85)",
        boxShadow: "0 10px 30px rgba(62,58,71,0.14)",
        transform: `scale(${pop}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {emoji ? <Emo char={emoji} size={fontSize * 0.9} /> : null}
      <span>{children}</span>
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
      left: 50,
      right: 50,
      display: "flex",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

// A big emoji that pops in and gently bobs.
export const Emoji: React.FC<{
  readonly char: string;
  readonly size: number;
  readonly x: number;
  readonly y: number;
  readonly delay?: number;
  readonly bob?: number;
  readonly spin?: number;
  readonly style?: React.CSSProperties;
}> = ({ char, size, x, y, delay = 0, bob = 10, spin = 0, style }) => {
  const frame = useCurrentFrame();
  const pop = usePop(delay, 160, 16);
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: `translateY(${Math.sin((frame + delay * 3) / 14) * bob}px) scale(${pop}) rotate(${spin * frame}deg)`,
        filter: "drop-shadow(0 10px 14px rgba(62,58,71,0.14))",
        ...style,
      }}
    >
      <Emo char={char} size={size} />
    </div>
  );
};

// Pastel card container.
export const Card: React.FC<{
  readonly children: React.ReactNode;
  readonly bg?: string;
  readonly style?: React.CSSProperties;
  readonly delay?: number;
}> = ({ children, bg = P.white, style, delay = 0 }) => {
  const pop = usePop(delay, 150, 18);
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: bg,
        borderRadius: 32,
        border: "3px solid rgba(255,255,255,0.85)",
        boxShadow: "0 12px 34px rgba(62,58,71,0.12)",
        fontFamily,
        color: P.ink,
        transform: `scale(${pop})`,
        opacity: Math.min(1, pop * 3),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export { usePop };
