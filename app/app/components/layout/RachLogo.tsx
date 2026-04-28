// Logo Rach Services — V5 Bodoni · cercle interrompu
// Composant autonome (pas de dépendance aux CSS-vars b2b)
// theme="dark"  → fond sombre (nav) : mark or champagne + texte crème
// theme="light" → fond clair (footer) : mark vert sapin + texte encre

type Theme = 'dark' | 'light';
type Variant = 'mark' | 'lockup';

interface RachLogoProps {
  size?: number;
  theme?: Theme;
  variant?: Variant;
}

const COLORS = {
  dark:  { fg: '#C89A3A', text: '#FAF6EC', sub: 'rgba(250,246,236,0.52)' },
  light: { fg: '#1F3A30', text: '#1F1D1A', sub: '#8A857A' },
};

export default function RachLogo({ size = 40, theme = 'dark', variant = 'lockup' }: RachLogoProps) {
  const { fg, text, sub } = COLORS[theme];

  const mark = (
    <svg
      width={size} height={size}
      viewBox="0 0 120 120" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
      aria-hidden="true"
    >
      <path d="M 60 22 A 38 38 0 1 1 22 60" stroke={fg} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 60 98 A 38 38 0 1 1 98 60" stroke={fg} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="22" r="1.4" fill={fg} />
      <circle cx="22" cy="60" r="1.4" fill={fg} />
      <circle cx="60" cy="98" r="1.4" fill={fg} />
      <circle cx="98" cy="60" r="1.4" fill={fg} />
      <text
        x="60" y="76"
        textAnchor="middle"
        fill={fg}
        style={{
          fontFamily: 'var(--font-bodoni, "Bodoni Moda", serif)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 56,
          letterSpacing: '-0.04em',
        }}
      >Rs</text>
    </svg>
  );

  if (variant === 'mark') return mark;

  const gap = Math.round(size * 0.30);
  const brandSize = Math.round(size * 0.43);
  const subSize = Math.max(Math.round(size * 0.20), 9);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      {mark}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{
          fontFamily: 'var(--font-bodoni, "Bodoni Moda", serif)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: brandSize,
          color: text,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Rach{' '}
          <span style={{ fontStyle: 'normal', fontWeight: 400 }}>Services</span>
        </span>
        <span style={{
          fontFamily: 'var(--font-inter, system-ui, sans-serif)',
          fontSize: subSize,
          letterSpacing: '0.42em',
          color: sub,
          textTransform: 'uppercase',
          paddingLeft: '0.45em',
        }}>Service Premium</span>
      </div>
    </div>
  );
}
