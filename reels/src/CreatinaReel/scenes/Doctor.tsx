import { useCurrentFrame } from "remotion";
import { DoctorIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Pop, Tag } from "../Tag";
import { G } from "../theme";

// "ahí sí debes consultar a tu médico antes de usarla"
export const Doctor: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.04 * Math.sin(frame / 5);
  return (
    <SceneShell enter={false} exit={false}>
      <Pop delay={0} style={{ left: 290, top: 330 }}>
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            backgroundColor: G.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 14px ${G.white}, 0 0 80px ${G.neon}`,
            transform: `scale(${pulse})`,
          }}
        >
          <DoctorIcon size={380} />
        </div>
      </Pop>
      <Centered top={930}>
        <Tag delay={14} bg={G.white} fontSize={68}>
          Consulta a tu médico
        </Tag>
      </Centered>
      <Centered top={1100}>
        <Tag delay={39} fontSize={52} rotate={2}>
          Antes de usarla
        </Tag>
      </Centered>
    </SceneShell>
  );
};
