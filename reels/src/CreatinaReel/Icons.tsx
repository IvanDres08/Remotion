import { G } from "./theme";

type IconProps = { readonly size: number; readonly color?: string };

const KIDNEY =
  "M58 6 C28 4 8 30 10 62 C12 94 34 116 60 112 C82 108 92 92 86 80 C80 70 66 70 64 60 C62 50 76 46 82 36 C90 20 80 8 58 6 Z";

// Stylised kidney (bean) with a highlight; `glow` adds a healthy green halo.
export const Kidney: React.FC<
  IconProps & { readonly glow?: boolean; readonly flip?: boolean }
> = ({ size, color = G.green, glow = false, flip = false }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 100 120"
    style={{
      transform: flip ? "scaleX(-1)" : undefined,
      filter: glow ? `drop-shadow(0 0 ${size / 8}px ${G.neon})` : undefined,
      overflow: "visible",
    }}
  >
    <defs>
      <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={G.white} />
        <stop offset="1" stopColor={color} />
      </linearGradient>
    </defs>
    <path d={KIDNEY} fill="url(#kg)" stroke={G.white} strokeWidth="3" />
    <path
      d="M30 34 C22 50 22 74 32 90"
      stroke={G.white}
      strokeOpacity="0.7"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M64 60 C74 64 86 66 98 64"
      stroke={G.white}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M66 66 C70 84 70 100 66 120"
      stroke={G.mute}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const ShieldCheck: React.FC<IconProps> = ({ size, color = G.green }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 4 L88 18 L88 48 C88 72 70 88 50 96 C30 88 12 72 12 48 L12 18 Z"
      fill={color}
      stroke={G.white}
      strokeWidth="5"
    />
    <path
      d="M30 50 L44 64 L72 34"
      stroke={G.white}
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size, color = G.black }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M16 54 L40 76 L86 24"
      stroke={color}
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ size, color = G.neon }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 8 L94 88 L6 88 Z"
      fill={color}
      stroke={G.black}
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <rect x="45" y="34" width="10" height="30" rx="5" fill={G.black} />
    <circle cx="50" cy="74" r="6" fill={G.black} />
  </svg>
);

export const PersonIcon: React.FC<IconProps> = ({ size, color = G.white }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="28" r="16" fill={color} />
    <path d="M20 92 C20 64 34 52 50 52 C66 52 80 64 80 92 Z" fill={color} />
  </svg>
);

export const ScoopIcon: React.FC<IconProps> = ({ size }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 160 96">
    <path
      d="M8 30 L80 30 C80 64 62 84 44 84 C26 84 8 64 8 30 Z"
      fill={G.white}
      stroke={G.mute}
      strokeWidth="3"
    />
    <ellipse cx="44" cy="30" rx="36" ry="9" fill="#F4F6F4" />
    <path d="M14 30 C24 14 64 14 74 30 Z" fill={G.white} />
    <rect
      x="78"
      y="24"
      width="80"
      height="12"
      rx="6"
      fill={G.white}
      stroke={G.mute}
      strokeWidth="3"
    />
  </svg>
);

export const PillIcon: React.FC<IconProps> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g transform="rotate(-35 50 50)">
      <rect x="14" y="34" width="72" height="32" rx="16" fill={G.white} />
      <path d="M50 34 L70 34 A16 16 0 0 1 70 66 L50 66 Z" fill={G.green} />
    </g>
  </svg>
);

export const DoctorIcon: React.FC<IconProps> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="26" r="17" fill={G.white} />
    <path d="M16 96 C16 66 30 52 50 52 C70 52 84 66 84 96 Z" fill={G.white} />
    <path d="M40 54 L50 70 L60 54" fill={G.green} />
    <path
      d="M34 56 C30 72 36 82 46 82"
      stroke={G.deep}
      strokeWidth="4"
      fill="none"
    />
    <circle cx="48" cy="82" r="5" fill={G.deep} />
    <rect x="58" y="70" width="14" height="4" rx="2" fill={G.green} />
    <rect x="63" y="65" width="4" height="14" rx="2" fill={G.green} />
  </svg>
);
