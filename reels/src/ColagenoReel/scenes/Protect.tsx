import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";
import { AppleIcon, MoonIcon, NoSmokingIcon, SunIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { C, TAG_TOP } from "../theme";

// "Lo que más protege tu piel es el protector solar, usándolo todos los días,
//  no fumar, dormir bien y comer bien."
const DAILY_AT = 83; // "todos los días"

const Card: React.FC<{
  readonly at: number;
  readonly left: number;
  readonly top: number;
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly children?: React.ReactNode;
}> = ({ at, left, top, label, icon, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - at,
    fps,
    config: { damping: 11, stiffness: 170 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 420,
        height: 360,
        borderRadius: 40,
        backgroundColor: C.lavender,
        boxShadow: `0 20px 50px rgba(0,0,0,0.45), 0 0 0 6px ${C.pink}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily,
        transform: `scale(${p}) rotate(${(1 - p) * -10}deg)`,
      }}
    >
      {icon}
      <div
        style={{
          fontWeight: 900,
          fontSize: 46,
          color: C.plum,
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
};

export const Protect: React.FC = () => (
  <SceneShell enter={false}>
    <Centered top={TAG_TOP - 20}>
      <Tag fontSize={60}>
        Lo que más
        <br />
        protege tu piel
      </Tag>
    </Centered>
    <Card
      at={45}
      left={90}
      top={500}
      label="PROTECTOR SOLAR"
      icon={<SunIcon size={150} />}
    >
      <div style={{ position: "absolute", top: -40, right: -40 }}>
        <Tag delay={DAILY_AT} fontSize={36} rotate={8} bg={C.magenta}>
          Todos los días
        </Tag>
      </div>
    </Card>
    <Card
      at={115}
      left={570}
      top={500}
      label="NO FUMAR"
      icon={<NoSmokingIcon size={150} />}
    />
    <Card
      at={133}
      left={90}
      top={900}
      label="DORMIR BIEN"
      icon={<MoonIcon size={150} />}
    />
    <Card
      at={154}
      left={570}
      top={900}
      label="COMER BIEN"
      icon={<AppleIcon size={150} />}
    />
  </SceneShell>
);
