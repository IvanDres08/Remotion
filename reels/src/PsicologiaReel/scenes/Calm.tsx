import { Kicker, Rule, Scene, Title } from "../../MascotaReel/ui";
import { B } from "../../MascotaReel/theme";

// "...a dejar de sobrepensar." + end card.
export const Calm: React.FC = () => (
  <Scene exit={false}>
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <Kicker delay={6}>Psicología · Bienestar</Kicker>
      <div style={{ marginTop: 18 }}>
        <Title delay={20} size={112}>
          Deja de
        </Title>
        <Title delay={30} size={112} italic>
          sobrepensar
        </Title>
      </div>
      <Rule delay={40} />
      <Kicker delay={52} color={B.inkSoft}>
        Guarda este video
      </Kicker>
    </div>
  </Scene>
);
