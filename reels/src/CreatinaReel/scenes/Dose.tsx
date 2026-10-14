import { random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../../ColagenoReel/font";
import { ScoopIcon } from "../Icons";
import { SceneShell } from "../SceneShell";
import { Centered, Tag } from "../Tag";
import { G, TAG_TOP } from "../theme";

// "con dosis normales, entre 3 a 5 gramos al día"
const THREE_AT = 19;
const FIVE_AT = 42;
const GRAMS_AT = 51;
const DAY_AT = 64;

const GRAINS = new Array(40).fill(0).map((_, i) => ({
  dx: (random(`gx${i}`) - 0.5) * 70,
  delay: random(`gd${i}`) * 60,
  r: 3 + random(`gr${i}`) * 5,
}));

export const Dose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const num = (at: number) =>
    spring({ frame: frame - at, fps, config: { damping: 10, stiffness: 200 } });

  const big: React.CSSProperties = {
    display: "inline-block",
    fontFamily,
    fontWeight: 900,
    fontSize: 300,
    lineHeight: 1,
    color: G.white,
    WebkitTextStroke: `12px ${G.black}`,
    paintOrder: "stroke fill",
    textShadow: `0 0 50px ${G.green}`,
  };

  return (
    <SceneShell enter={false} exit={false}>
      <Centered top={TAG_TOP}>
        <Tag bg={G.white}>Dosis normal</Tag>
      </Centered>
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 470,
          transform: "rotate(-28deg)",
        }}
      >
        <ScoopIcon size={300} />
      </div>
      {GRAINS.map((g, i) => {
        const t = (frame + g.delay) % 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 600 + g.dx + t * 0.6,
              top: 600 + t * t * 0.35,
              width: g.r * 2,
              height: g.r * 2,
              borderRadius: "50%",
              backgroundColor: G.white,
              opacity: 1 - t / 40,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span style={{ ...big, transform: `scale(${num(THREE_AT)})` }}>3</span>
        <span
          style={{ ...big, color: G.neon, transform: `scale(${num(FIVE_AT)})` }}
        >
          –5
        </span>
        <span
          style={{
            ...big,
            fontSize: 200,
            transform: `scale(${num(GRAMS_AT)})`,
          }}
        >
          g
        </span>
      </div>
      <Centered top={1060}>
        <Tag delay={DAY_AT} fontSize={64}>
          Al día
        </Tag>
      </Centered>
    </SceneShell>
  );
};
