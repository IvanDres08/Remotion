import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { bodoni, manrope } from "./fonts";
import { L } from "./theme";
import { rise, useFade } from "./ui";

const Kicker: React.FC<{
  readonly children: React.ReactNode;
  readonly color?: string;
}> = ({ children, color = L.peach }) => (
  <div
    style={{
      fontFamily: manrope,
      fontWeight: 600,
      fontSize: 30,
      letterSpacing: 8,
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </div>
);

// Opening question over the lemon shot.
export const Hook: React.FC = () => {
  const a = useFade(4, 16, 10);
  const b = useFade(12, 16, 10);
  return (
    <AbsoluteFill
      style={{ alignItems: "center", paddingTop: 1150, textAlign: "center" }}
    >
      <div
        style={{
          ...rise(Math.min(a, b), 10),
          padding: "30px 56px 40px",
          borderRadius: 26,
          backgroundColor: "rgba(247,243,235,0.88)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 16px 44px rgba(61,0,16,0.18)",
        }}
      >
        <div style={rise(a)}>
          <Kicker color={L.burgundy}>El mito</Kicker>
        </div>
        <div
          style={{
            ...rise(b),
            fontFamily: bodoni,
            fontWeight: 600,
            fontSize: 104,
            lineHeight: 1.05,
            color: L.burgundy,
            marginTop: 14,
          }}
        >
          ¿Limón para
          <br />
          <span style={{ fontStyle: "italic" }}>las manchas?</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Brand title when the product appears.
export const BrandTitle: React.FC = () => {
  const p = useFade(0, 18, 12);
  const k = useFade(10, 16, 12);
  return (
    <AbsoluteFill style={{ paddingTop: 250, paddingLeft: 70 }}>
      <div
        style={{
          ...rise(p),
          fontFamily: bodoni,
          fontWeight: 600,
          fontSize: 120,
          color: L.burgundy,
          letterSpacing: 4,
        }}
      >
        LÜME
      </div>
      <div style={{ ...rise(k), marginTop: 4 }}>
        <Kicker color={L.wine}>Corrector de manchas</Kicker>
      </div>
    </AbsoluteFill>
  );
};

// Three claims that appear with the words "sin arder, sin pelar, sin irritar".
export const Claims: React.FC<{ readonly at: readonly number[] }> = ({
  at,
}) => {
  const items = ["Sin arder", "Sin pelar", "Sin irritar"];
  const out = useFade(0, 1, 12);
  return (
    <AbsoluteFill
      style={{ alignItems: "center", paddingTop: 200, opacity: out }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 14,
          alignItems: "center",
        }}
      >
        {items.map((t, i) => (
          <Chip key={t} at={at[i]}>
            {t}
          </Chip>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Chip: React.FC<{
  readonly at: number;
  readonly children: React.ReactNode;
}> = ({ at, children }) => {
  const p = useFade(at, 12);
  return (
    <div
      style={{
        ...rise(p, 18),
        padding: "12px 24px",
        borderRadius: 999,
        backgroundColor: "rgba(247,243,235,0.92)",
        border: `2px solid ${L.peach}`,
        fontFamily: manrope,
        fontWeight: 600,
        fontSize: 36,
        color: L.burgundy,
        boxShadow: "0 10px 30px rgba(61,0,16,0.18)",
      }}
    >
      <span style={{ color: L.wine, marginRight: 14 }}>✓</span>
      {children}
    </div>
  );
};

// Offer card: guarantee, free shipping, price.
export const Offer: React.FC<{ readonly at: readonly number[] }> = ({ at }) => {
  const card = useFade(0, 14, 12);
  const rows = [
    { k: "Garantía", v: "60 días" },
    { k: "Envío", v: "Gratis a toda Colombia" },
    { k: "Hoy", v: "2 unidades · $149.900" },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 1190 }}>
      <div
        style={{
          ...rise(card),
          width: 900,
          padding: "22px 46px",
          borderRadius: 26,
          backgroundColor: "rgba(89,0,24,0.92)",
          boxShadow: "0 18px 50px rgba(61,0,16,0.35)",
        }}
      >
        {rows.map((r, i) => (
          <Row
            key={r.k}
            at={at[i]}
            k={r.k}
            v={r.v}
            last={i === rows.length - 1}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Row: React.FC<{
  readonly at: number;
  readonly k: string;
  readonly v: string;
  readonly last: boolean;
}> = ({ at, k, v, last }) => {
  const p = useFade(at, 12);
  return (
    <div
      style={{
        ...rise(p, 14),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "16px 0",
        borderBottom: last ? "none" : `1px solid rgba(223,165,143,0.35)`,
      }}
    >
      <span
        style={{
          fontFamily: manrope,
          fontWeight: 600,
          fontSize: 28,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: L.peach,
        }}
      >
        {k}
      </span>
      <span
        style={{
          fontFamily: last ? bodoni : manrope,
          fontWeight: 600,
          fontSize: last ? 54 : 40,
          color: L.ivory,
        }}
      >
        {v}
      </span>
    </div>
  );
};

// Call to action button in the brand style.
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useFade(0, 14, 10);
  const pulse = 1 + 0.025 * Math.sin(frame / 6);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 1080 }}>
      <div
        style={{
          ...rise(p),
          transform: `${rise(p).transform} scale(${pulse})`,
          padding: "26px 56px",
          backgroundColor: L.peach,
          color: L.burgundy,
          fontFamily: manrope,
          fontWeight: 700,
          fontSize: 50,
          boxShadow: "0 16px 40px rgba(61,0,16,0.3)",
        }}
      >
        Descubre LÜME ↓
      </div>
    </AbsoluteFill>
  );
};

// Closing card.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const bg = Easing.inOut(Easing.cubic)(
    interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" }),
  );
  const logo = useFade(8, 18);
  const line = useFade(18, 18);
  const tag = useFade(24, 16);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: L.burgundy,
        opacity: bg,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          ...rise(logo),
          fontFamily: bodoni,
          fontWeight: 600,
          fontSize: 190,
          color: L.ivory,
          letterSpacing: 6,
        }}
      >
        LÜME
      </div>
      <div
        style={{
          height: 2,
          width: 280 * line,
          backgroundColor: L.peach,
          margin: "18px auto 30px",
        }}
      />
      <div
        style={{
          ...rise(tag),
          fontFamily: bodoni,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 64,
          color: L.ivory,
        }}
      >
        Tu piel, en equilibrio.
      </div>
      <div style={{ ...rise(tag), marginTop: 26 }}>
        <Kicker>Ácido tranexámico + Niacinamida</Kicker>
      </div>
    </AbsoluteFill>
  );
};
