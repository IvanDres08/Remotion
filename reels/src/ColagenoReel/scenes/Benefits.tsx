import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { DropIcon, StretchIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { C, TAG_TOP } from "../theme";

// "puede mejorar un poco la hidratación y la elasticidad de la piel"
const Meter: React.FC<{
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly at: number;
  readonly top: number;
}> = ({ label, icon, at, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inP = spring({ frame: frame - at, fps, config: { damping: 14 } });
  const gain = interpolate(frame, [at + 8, at + 22], [0, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label2 = spring({
    frame: frame - at - 18,
    fps,
    config: { damping: 10 },
  });
  const base = 0.55;

  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top,
        opacity: inP,
        transform: `translateY(${(1 - inP) * 60}px)`,
        fontFamily,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {icon}
        <div style={{ color: C.white, fontWeight: 900, fontSize: 64 }}>
          {label}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          marginTop: 24,
          height: 64,
          borderRadius: 32,
          backgroundColor: "rgba(255,255,255,0.15)",
          border: `4px solid ${C.white}55`,
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${base * 100}%`,
            borderRadius: "32px 0 0 32px",
            backgroundColor: C.lilac,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${base * 100}%`,
            top: 0,
            bottom: 0,
            width: `${gain * 100}%`,
            borderRadius: "0 32px 32px 0",
            backgroundColor: C.hotPink,
            boxShadow: `0 0 30px ${C.hotPink}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${base * 100}%`,
            top: -78,
            color: C.hotPink,
            fontWeight: 900,
            fontSize: 56,
            transform: `scale(${label2})`,
            transformOrigin: "0% 100%",
            whiteSpace: "nowrap",
          }}
        >
          + UN POCO
        </div>
      </div>
    </div>
  );
};

export const Benefits: React.FC = () => (
  <SceneShell enter={false}>
    <Centered top={TAG_TOP}>
      <Tag bg={C.lilac} color={C.plum}>
        Puede mejorar
      </Tag>
    </Centered>
    <Meter
      label="HIDRATACIÓN"
      icon={<DropIcon size={110} />}
      at={30}
      top={560}
    />
    <Meter
      label="ELASTICIDAD"
      icon={<StretchIcon size={110} />}
      at={56}
      top={900}
    />
  </SceneShell>
);
