import { fontFamily } from "../font";
import { C } from "../theme";

// A stylised study / paper: title bar, text lines and a little bar chart.
export const Paper: React.FC<{
  readonly width: number;
  readonly title: string;
  readonly style?: React.CSSProperties;
}> = ({ width, title, style }) => {
  const u = width / 360;
  return (
    <div
      style={{
        width,
        height: width * 1.3,
        backgroundColor: C.white,
        borderRadius: 24 * u,
        padding: 30 * u,
        boxSizing: "border-box",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        fontFamily,
        ...style,
      }}
    >
      <div
        style={{
          fontWeight: 900,
          fontSize: 30 * u,
          color: C.magenta,
          marginBottom: 18 * u,
        }}
      >
        {title}
      </div>
      {[1, 0.85, 0.95, 0.7].map((w, i) => (
        <div
          key={i}
          style={{
            height: 12 * u,
            width: `${w * 100}%`,
            backgroundColor: C.lavender,
            borderRadius: 6 * u,
            marginBottom: 12 * u,
          }}
        />
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 14 * u,
          height: 150 * u,
          marginTop: 24 * u,
        }}
      >
        {[0.45, 0.6, 0.5, 0.75].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h * 100}%`,
              backgroundColor: i % 2 ? C.pink : C.lilac,
              borderRadius: 8 * u,
            }}
          />
        ))}
      </div>
    </div>
  );
};
