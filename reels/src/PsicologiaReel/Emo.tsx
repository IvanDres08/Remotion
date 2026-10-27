import { Img, staticFile } from "remotion";

// Emojis are pre-rendered PNGs (public/emoji, from Noto Color Emoji) because
// the colour emoji font paints unreliably in the headless renderer.
export const emojiSrc = (char: string) =>
  staticFile(
    `emoji/${[...char].map((c) => c.codePointAt(0)!.toString(16)).join("-")}.png`,
  );

export const Emo: React.FC<{
  readonly char: string;
  readonly size: number;
  readonly style?: React.CSSProperties;
}> = ({ char, size, style }) => (
  <Img
    src={emojiSrc(char)}
    style={{
      width: size,
      height: size,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
  />
);
