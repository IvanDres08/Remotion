import { fontFamily } from "../../ColagenoReel/font";
import { Kidney, PillIcon, WarningIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Pop, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "si ya tienes una enfermedad renal o tomas algún medicamento que afecta el riñón"
const DISEASE_AT = 29;
const MEDS_AT = 84;

const Card: React.FC<{
  readonly icon: React.ReactNode;
  readonly title: string;
}> = ({ icon, title }) => (
  <div
    style={{
      width: 900,
      height: 280,
      borderRadius: 36,
      backgroundColor: G.panel,
      border: `5px solid ${G.green}`,
      boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${G.green}44`,
      display: "flex",
      alignItems: "center",
      gap: 40,
      padding: "0 50px",
      boxSizing: "border-box",
      fontFamily,
    }}
  >
    {icon}
    <div
      style={{
        fontWeight: 900,
        fontSize: 58,
        lineHeight: 1.05,
        color: G.white,
      }}
    >
      {title}
    </div>
  </div>
);

export const Caution: React.FC = () => (
  <SceneShell exit={false}>
    <Centered top={TAG_TOP}>
      <Tag>
        <WarningIcon size={80} color={G.black} /> Ojo si…
      </Tag>
    </Centered>
    <Pop delay={DISEASE_AT} from="left" style={{ left: 90, top: 480 }}>
      <Card
        title="TIENES ENFERMEDAD RENAL"
        icon={
          <div style={{ position: "relative" }}>
            <Kidney size={170} color={G.mute} />
            <div style={{ position: "absolute", right: -30, bottom: 0 }}>
              <WarningIcon size={90} />
            </div>
          </div>
        }
      />
    </Pop>
    <Pop delay={MEDS_AT} from="right" style={{ left: 90, top: 820 }}>
      <Card
        title="TOMAS MEDICAMENTOS QUE AFECTAN EL RIÑÓN"
        icon={<PillIcon size={190} />}
      />
    </Pop>
  </SceneShell>
);
