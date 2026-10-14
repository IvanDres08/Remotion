import { fontFamily } from "../../ColagenoReel/font";
import { DoctorIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Pop } from "../Tag";
import { G } from "../theme";

// "pero si tienes alguna duda sobre el uso de esta, puedes preguntarle a tu médico"
const Bubble: React.FC<{
  readonly text: React.ReactNode;
  readonly mine?: boolean;
}> = ({ text, mine = false }) => (
  <div
    style={{
      maxWidth: 700,
      padding: "34px 44px",
      borderRadius: 48,
      borderBottomLeftRadius: mine ? 48 : 8,
      borderBottomRightRadius: mine ? 8 : 48,
      backgroundColor: mine ? G.green : G.white,
      color: G.black,
      fontFamily,
      fontWeight: 900,
      fontSize: 70,
      lineHeight: 1.05,
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    }}
  >
    {text}
  </div>
);

export const AskDoctor: React.FC = () => (
  <SceneShell>
    <Pop delay={6} from="left" style={{ left: 80, top: 330 }}>
      <Bubble text="¿TIENES DUDAS?" />
    </Pop>
    <Pop delay={54} from="right" style={{ right: 80, top: 600 }}>
      <Bubble mine text={<>PREGÚNTALE A TU MÉDICO</>} />
    </Pop>
    <Pop delay={58} style={{ right: 110, top: 900 }}>
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: G.panel,
          border: `6px solid ${G.green}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DoctorIcon size={150} />
      </div>
    </Pop>
  </SceneShell>
);
