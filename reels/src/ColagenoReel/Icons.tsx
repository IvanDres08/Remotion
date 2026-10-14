import { C } from "./theme";

type IconProps = { readonly size: number; readonly color?: string };

export const SunIcon: React.FC<IconProps> = ({ size, color = C.pink }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="20" fill={color} />
    {new Array(8).fill(0).map((_, i) => {
      const a = (i * Math.PI) / 4;
      return (
        <line
          key={i}
          x1={50 + Math.cos(a) * 30}
          y1={50 + Math.sin(a) * 30}
          x2={50 + Math.cos(a) * 42}
          y2={50 + Math.sin(a) * 42}
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

export const NoSmokingIcon: React.FC<IconProps> = ({
  size,
  color = C.pink,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="18" y="45" width="52" height="12" rx="3" fill={C.plumMid} />
    <rect x="70" y="45" width="12" height="12" rx="2" fill={C.lilac} />
    <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="8" />
    <line x1="21" y1="21" x2="79" y2="79" stroke={color} strokeWidth="8" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size, color = C.lilac }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M62 12 A40 40 0 1 0 88 66 A32 32 0 1 1 62 12 Z" fill={color} />
    <circle cx="74" cy="26" r="4" fill={C.pink} />
    <circle cx="84" cy="44" r="3" fill={C.pink} />
  </svg>
);

export const AppleIcon: React.FC<IconProps> = ({ size, color = C.pink }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 30 C35 18 12 26 14 52 C16 76 34 92 50 84 C66 92 84 76 86 52 C88 26 65 18 50 30 Z"
      fill={color}
    />
    <path
      d="M50 30 C50 20 54 12 60 8"
      stroke={C.plumMid}
      strokeWidth="5"
      fill="none"
    />
    <path d="M54 20 C62 8 76 10 78 14 C70 22 60 22 54 20 Z" fill={C.lilac} />
  </svg>
);

export const DropIcon: React.FC<IconProps> = ({ size, color = C.lilac }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 8 C50 8 18 48 18 64 A32 32 0 0 0 82 64 C82 48 50 8 50 8 Z"
      fill={color}
    />
    <path
      d="M34 64 A16 16 0 0 0 48 80"
      stroke={C.white}
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const StretchIcon: React.FC<IconProps> = ({ size, color = C.pink }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="30" y="30" width="40" height="40" rx="10" fill={color} />
    <path d="M8 50 L24 38 L24 62 Z" fill={C.lilac} />
    <path d="M92 50 L76 38 L76 62 Z" fill={C.lilac} />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size, color = C.white }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M18 52 L40 74 L84 26"
      stroke={color}
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrossIcon: React.FC<IconProps> = ({ size, color = C.white }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M24 24 L76 76 M76 24 L24 76"
      stroke={color}
      strokeWidth="14"
      strokeLinecap="round"
    />
  </svg>
);
