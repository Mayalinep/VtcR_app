'use client';
import React from 'react';

// ─── Icon ────────────────────────────────────────────────────────────────────

type IconName =
  | 'dashboard' | 'plus' | 'list' | 'history' | 'euro' | 'invoice'
  | 'settings' | 'logout' | 'bell' | 'car' | 'user' | 'door' | 'pin'
  | 'flag' | 'calendar' | 'clock' | 'users' | 'arrowRight' | 'arrowDown'
  | 'arrowUp' | 'chevronRight' | 'chevronDown' | 'check' | 'checkCircle'
  | 'x' | 'download' | 'filter' | 'search' | 'eye' | 'eyeOff' | 'hash'
  | 'note' | 'sparkle' | 'trend' | 'menu' | 'moreH' | 'moreV' | 'home'
  | 'sun' | 'refresh' | 'car2';

const PATHS: Record<IconName, React.ReactNode> = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></>,
  euro: <><path d="M18 5a8 8 0 1 0 0 14"/><path d="M3 10h11M3 14h11"/></>,
  invoice: <><path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 2 2 2-2 2 2 3-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.16.66.42.88.74"/></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
  car: <><path d="M5 17h14M7 17v3M17 17v3"/><path d="M3 13l2-6a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 6"/><path d="M3 13h18v4H3z"/><circle cx="7" cy="15" r="0.5" fill="currentColor"/><circle cx="17" cy="15" r="0.5" fill="currentColor"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></>,
  door: <><path d="M4 21V4a1 1 0 0 1 1-1h11l4 3v15"/><path d="M16 3v18M4 21h16"/><circle cx="13" cy="13" r=".7" fill="currentColor"/></>,
  pin: <><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
  flag: <><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  users: <><circle cx="9" cy="8" r="3.5"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><circle cx="17" cy="9" r="2.5"/><path d="M22 20v-1a4 4 0 0 0-4-4"/></>,
  arrowRight: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  arrowDown: <><path d="M12 5v14M6 13l6 6 6-6"/></>,
  arrowUp: <><path d="M12 19V5M6 11l6-6 6 6"/></>,
  chevronRight: <><path d="M9 6l6 6-6 6"/></>,
  chevronDown: <><path d="M6 9l6 6 6-6"/></>,
  check: <><path d="M5 13l4 4L19 7"/></>,
  checkCircle: <><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>,
  x: <><path d="M6 6l12 12M18 6L6 18"/></>,
  download: <><path d="M12 3v13M6 11l6 6 6-6M5 21h14"/></>,
  filter: <><path d="M3 5h18M6 12h12M10 19h4"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
  eyeOff: <><path d="M17.94 17.94A10 10 0 0 1 12 19c-6 0-10-7-10-7a18 18 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c6 0 10 7 10 7a18 18 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M2 2l20 20"/></>,
  hash: <><path d="M5 9h14M5 15h14M10 3l-2 18M16 3l-2 18"/></>,
  note: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></>,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
  trend: <><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  moreH: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
  moreV: <><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></>,
  home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
  car2: <><path d="M3 13l1.6-5a2 2 0 0 1 1.9-1.5h11a2 2 0 0 1 1.9 1.5L21 13"/><rect x="3" y="13" width="18" height="5" rx="1.2"/><circle cx="7" cy="15.5" r="1.4"/><circle cx="17" cy="15.5" r="1.4"/><path d="M5 18v2M19 18v2"/></>,
};

export function Icon({
  name, size = 18, stroke = 1.5, color = 'currentColor', style,
}: {
  name: IconName; size?: number; stroke?: number; color?: string; style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}

// ─── Logo ────────────────────────────────────────────────────────────────────
// variant="mark"   — SVG seul (cercle interrompu + Rs), pour favicon / espaces serrés
// variant="lockup" — mark + "Rach Services" + "Service Premium" (nav, footer)

export function Logo({
  size = 40,
  light = false,
  variant = 'lockup',
}: {
  size?: number;
  light?: boolean;
  variant?: 'mark' | 'lockup';
}) {
  const fg = light ? 'var(--green)' : 'var(--gold)';
  const textColor = light ? 'var(--ink)' : 'var(--cream)';
  const subColor = light ? 'var(--ink-3)' : 'rgba(250,246,236,0.50)';

  const mark = (
    <svg
      width={size} height={size}
      viewBox="0 0 120 120" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Cercle interrompu — deux arcs opposés */}
      <path d="M 60 22 A 38 38 0 1 1 22 60" stroke={fg} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 60 98 A 38 38 0 1 1 98 60" stroke={fg} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Points aux 4 extrémités */}
      <circle cx="60" cy="22" r="1.4" fill={fg} />
      <circle cx="22" cy="60" r="1.4" fill={fg} />
      <circle cx="60" cy="98" r="1.4" fill={fg} />
      <circle cx="98" cy="60" r="1.4" fill={fg} />
      {/* Ligature Rs — Bodoni Moda italique */}
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
          color: textColor,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Rach{' '}
          <span style={{ fontStyle: 'normal', fontWeight: 400 }}>Services</span>
        </span>
        <span style={{
          fontFamily: 'var(--f-sans)',
          fontSize: subSize,
          letterSpacing: '0.42em',
          color: subColor,
          textTransform: 'uppercase',
          paddingLeft: '0.45em',
        }}>Service Premium</span>
      </div>
    </div>
  );
}

// ─── Button ──────────────────────────────────────────────────────────────────

type BtnKind = 'primary' | 'dark' | 'secondary' | 'ghost' | 'danger' | 'onDark';
type BtnSize = 'sm' | 'md' | 'lg';

export function Btn({
  kind = 'primary', size = 'md', icon, iconRight, full, children, onClick, style, disabled, type = 'button', ...rest
}: {
  kind?: BtnKind; size?: BtnSize; icon?: IconName; iconRight?: IconName;
  full?: boolean; children?: React.ReactNode; onClick?: () => void;
  style?: React.CSSProperties; disabled?: boolean; type?: 'button' | 'submit';
  [key: string]: unknown;
}) {
  const sizes = {
    sm: { padX: 12, fs: 12, gap: 6, ic: 14, h: 32 },
    md: { padX: 16, fs: 13, gap: 8, ic: 16, h: 40 },
    lg: { padX: 22, fs: 14, gap: 10, ic: 18, h: 48 },
  }[size];
  const kinds = {
    primary:   { bg: 'var(--gold)', fg: 'var(--green-12)', bd: 'var(--gold)', hbg: 'var(--gold-2)' },
    dark:      { bg: 'var(--green)', fg: 'var(--cream)', bd: 'var(--green)', hbg: 'var(--green-2)' },
    secondary: { bg: 'var(--paper)', fg: 'var(--ink)', bd: 'var(--cream-3)', hbg: 'var(--cream-2)' },
    ghost:     { bg: 'transparent', fg: 'var(--ink-2)', bd: 'transparent', hbg: 'var(--cream-2)' },
    danger:    { bg: 'transparent', fg: 'var(--danger)', bd: 'rgba(154,58,42,0.3)', hbg: 'rgba(154,58,42,0.06)' },
    onDark:    { bg: 'rgba(250,246,236,0.10)', fg: 'var(--cream)', bd: 'rgba(250,246,236,0.18)', hbg: 'rgba(250,246,236,0.16)' },
  }[kind];

  const boxShadow =
    kind === 'primary' ? '0 1px 0 rgba(255,255,255,0.25) inset, 0 1px 2px rgba(31,29,26,0.10)' :
    kind === 'dark'    ? '0 1px 0 rgba(255,255,255,0.06) inset, 0 1px 2px rgba(20,39,31,0.18)' :
    kind === 'secondary' ? 'var(--sh-1)' : 'none';

  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: sizes.h,
        padding: `0 ${sizes.padX}px`,
        background: hovered && !disabled ? kinds.hbg : kinds.bg,
        color: kinds.fg,
        border: `1px solid ${kinds.bd}`,
        borderRadius: 'var(--r-md)',
        fontSize: sizes.fs,
        fontWeight: 600,
        letterSpacing: '0.005em',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes.gap,
        width: full ? '100%' : 'auto',
        transition: 'all 160ms var(--ease)',
        opacity: disabled ? 0.5 : 1,
        boxShadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <Icon name={icon} size={sizes.ic} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={sizes.ic} />}
    </button>
  );
}

// ─── StatusPill ──────────────────────────────────────────────────────────────

export type RideStatus = 'pending' | 'validated' | 'inprogress' | 'done' | 'cancel';

export const STATUS_CONFIG: Record<RideStatus, { label: string; bg: string; fg: string; dot: string; live?: boolean }> = {
  pending:    { label: 'Attente prix',  bg: 'var(--st-pending-bg)',    fg: 'var(--st-pending-fg)',    dot: '#C89A3A' },
  validated:  { label: 'Prix validé',   bg: 'var(--st-validated-bg)',  fg: 'var(--st-validated-fg)',  dot: '#1F3A30' },
  inprogress: { label: 'En cours',      bg: 'var(--st-inprogress-bg)', fg: 'var(--st-inprogress-fg)', dot: '#F4E9C8', live: true },
  done:       { label: 'Terminée',      bg: 'var(--st-done-bg)',       fg: 'var(--st-done-fg)',       dot: '#8A857A' },
  cancel:     { label: 'Annulée',       bg: '#F8E8E4',                 fg: 'var(--danger)',           dot: '#9A3A2A' },
};

export function mapApiStatus(apiStatus: string): RideStatus {
  const map: Record<string, RideStatus> = {
    pending: 'pending',
    confirmed: 'validated',
    in_progress: 'inprogress',
    completed: 'done',
    cancelled: 'cancel',
  };
  return map[apiStatus] ?? 'pending';
}

export function StatusPill({ kind = 'pending', size = 'md', style }: { kind?: RideStatus; size?: 'sm' | 'md'; style?: React.CSSProperties }) {
  const s = STATUS_CONFIG[kind];
  const fs = size === 'sm' ? 10.5 : 11.5;
  const py = size === 'sm' ? 3 : 4;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: `${py}px 10px ${py}px 8px`,
      background: s.bg, color: s.fg,
      borderRadius: 'var(--r-pill)',
      fontSize: fs, fontWeight: 600,
      letterSpacing: '0.005em',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: s.dot,
        animation: s.live ? 'b2b-pulseDot 1.6s ease-in-out infinite' : 'none',
        flexShrink: 0,
      }} />
      {s.label}
    </span>
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────

export function Field({
  label, value, onChange, placeholder, icon, prefix, suffix, type = 'text',
  readOnly, hint, error, accent, multiline, rows = 3, autoFocus, style, onFocus, onBlur,
}: {
  label?: string; value?: string | number; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; icon?: IconName; prefix?: string; suffix?: React.ReactNode;
  type?: string; readOnly?: boolean; hint?: string; error?: string;
  accent?: 'gold'; multiline?: boolean; rows?: number; autoFocus?: boolean;
  style?: React.CSSProperties; onFocus?: () => void; onBlur?: () => void;
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  const borderColor = error ? 'var(--danger)' : focus ? (accent === 'gold' ? 'var(--gold)' : 'var(--green)') : 'var(--cream-3)';
  const shadow = focus ? `0 0 0 4px ${accent === 'gold' ? 'var(--gold-glow)' : 'var(--green-glow)'}` : 'var(--sh-1)';

  return (
    <div className="col" style={{ gap: 6, ...style }}>
      {label && <label className="label" style={{ color: error ? 'var(--danger)' : 'var(--ink-2)' }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: multiline ? 'flex-start' : 'center', gap: 8,
        padding: multiline ? '10px 12px' : '0 12px',
        height: multiline ? 'auto' : 44,
        background: 'var(--paper)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--r-md)',
        boxShadow: shadow,
        transition: 'all 140ms var(--ease)',
      }}>
        {icon && <Icon name={icon} size={16} color="var(--ink-3)" />}
        {prefix && <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{prefix}</span>}
        <Tag
          type={multiline ? undefined : type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={multiline ? rows : undefined}
          autoFocus={autoFocus}
          onFocus={() => { setFocus(true); onFocus?.(); }}
          onBlur={() => { setFocus(false); onBlur?.(); }}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, color: 'var(--ink)',
            padding: 0, fontFamily: 'inherit',
            resize: multiline ? 'vertical' : 'none',
            minHeight: multiline ? 64 : 'auto',
            width: '100%',
          } as React.CSSProperties}
        />
        {suffix && <span style={{ display: 'flex', alignItems: 'center' }}>{suffix}</span>}
      </div>
      {hint && !error && <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{hint}</div>}
      {error && <div style={{ fontSize: 11.5, color: 'var(--danger)' }}>{error}</div>}
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

export function Card({
  children, pad = 20, dark, style, onClick, ...rest
}: {
  children?: React.ReactNode; pad?: number; dark?: boolean;
  style?: React.CSSProperties; onClick?: () => void;
  [key: string]: unknown;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: dark ? 'var(--green)' : 'var(--paper)',
        color: dark ? 'var(--cream)' : 'var(--ink)',
        borderRadius: 'var(--r-lg)',
        border: dark ? 'none' : '1px solid var(--cream-3)',
        padding: pad,
        boxShadow: 'var(--sh-1)',
        position: 'relative',
        ...style,
      }}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

export function Tabs({
  tabs, value, onChange, size = 'md',
}: {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <div style={{
      display: 'inline-flex', padding: 3,
      background: 'var(--cream-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--cream-3)',
    }}>
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button key={t.value} type="button" onClick={() => onChange(t.value)} style={{
            padding: size === 'sm' ? '6px 12px' : '8px 16px',
            fontSize: size === 'sm' ? 12 : 13, fontWeight: 600,
            border: 'none',
            background: active ? 'var(--paper)' : 'transparent',
            color: active ? 'var(--ink)' : 'var(--ink-3)',
            borderRadius: 'var(--r-sm)',
            boxShadow: active ? 'var(--sh-1)' : 'none',
            transition: 'all 160ms var(--ease)',
            cursor: 'pointer',
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

export function Avatar({ initials, size = 36, color = 'var(--green)' }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: 'var(--cream)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--f-serif)', fontWeight: 500,
      fontSize: size * 0.42, letterSpacing: 0,
      flexShrink: 0,
    }}>{initials}</div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatEUR(n: number, opts: { decimals?: number } = {}): string {
  const { decimals = 0 } = opts;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).format(n);
}

export function formatNum(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n);
}
