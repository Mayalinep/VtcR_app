'use client';

import { useState, useEffect, useCallback, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

// ── Design tokens ──────────────────────────────────────────────────────────────
const T = {
  green:       '#1F3A30',
  greenDeep:   '#162A22',
  greenInk:    '#0E1C16',
  greenSoft:   '#E5ECE7',
  greenSofter: '#EFF3EF',
  gold:        '#C89A3A',
  goldDeep:    '#A47E2C',
  goldSoft:    '#F2E5C2',
  cream:       '#FAF6EC',
  creamDeep:   '#F3EEDF',
  paper:       '#FFFFFF',
  ink:         '#1F1D1A',
  ink2:        '#4A463F',
  ink3:        '#7A746A',
  line:        '#E3DDC9',
  lineSoft:    '#EFE9D5',
  red:         '#9A3A2A',
  redSoft:     '#F4DDD5',
  amber:       '#B57A1F',
  emerald:     '#2E6A52',
  emeraldSoft: '#D9E8DF',
} as const;

const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";
const mono  = "'JetBrains Mono', ui-monospace, monospace";

// ── Types ──────────────────────────────────────────────────────────────────────
type Reservation = {
  id: string;
  hotel_id: string | null;
  hotel_name: string;
  client_name: string;
  client_phone: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  comment: string | null;
  estimated_price: number | null;
  final_price: number | null;
  commission_rate: number | null;
  commission_amount: number | null;
  commission_paid: boolean;
  status: string;
  staff_role: string | null;
  created_at: string;
};

type Hotel = {
  id: string;
  name: string;
  commission_rate: number;
  contact_email: string | null;
  contact_phone: string | null;
  is_demo: boolean;
  created_at: string;
};

type Tab = 'home' | 'inbox' | 'validate' | 'more';

// ── Utils ──────────────────────────────────────────────────────────────────────
function todayLabel() {
  return new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function fmtMoney(v: number) {
  return v.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// ── Icons ──────────────────────────────────────────────────────────────────────
const PATHS: Record<string, React.ReactNode> = {
  home:           <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
  inbox:          <><path d="M3 13l3-9h12l3 9" /><path d="M3 13v6h18v-6" /><path d="M8 13a4 4 0 008 0" /></>,
  history:        <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l3 2" /></>,
  'check-circle': <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
  check:          <path d="M4 12l5 5L20 6" />,
  menu:           <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  phone:          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  building:       <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></>,
  wallet:         <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18" /><circle cx="16" cy="15" r="1.2" fill="currentColor" /></>,
  logout:         <><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /></>,
  trash:          <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></>,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  'chevron-right':<path d="M9 6l6 6-6 6" />,
  backspace:      <><path d="M22 5H8L2 12l6 7h14a1 1 0 001-1V6a1 1 0 00-1-1z" /><path d="M18 9l-6 6M12 9l6 6" /></>,
  plus:           <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  info:           <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" /></>,
};

function Icon({ name, size = 18, color = 'currentColor', sw = 1.6, style }: {
  name: string; size?: number; color?: string; sw?: number; style?: CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}>
      {PATHS[name]}
    </svg>
  );
}

// ── Status pill ────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; bg: string; fg: string }> = {
  pending:    { label: 'Demande reçue', bg: T.goldSoft,    fg: T.goldDeep },
  confirmed:  { label: 'Acceptée',      bg: T.emeraldSoft, fg: T.emerald  },
  completed:  { label: 'Terminée',      bg: T.creamDeep,   fg: T.ink2     },
  tovalidate: { label: 'Prix à valider',bg: T.goldSoft,    fg: T.goldDeep },
  cancelled:  { label: 'Annulée',       bg: T.redSoft,     fg: T.red      },
};

function Pill({ status }: { status: string }) {
  const s = STATUS_CFG[status] ?? { label: status, bg: T.creamDeep, fg: T.ink2 };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2.5px 9px', borderRadius: 999, background: s.bg, color: s.fg, fontFamily: sans, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.45, textTransform: 'uppercase', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.fg, opacity: 0.85 }} />
      {s.label}
    </span>
  );
}

// ── Money ─────────────────────────────────────────────────────────────────────
function Money({ value, size = 14, color }: { value: number; size?: number; color?: string }) {
  return (
    <span style={{ fontFamily: mono, fontSize: size, fontWeight: 600, color: color ?? T.ink, letterSpacing: -0.3 }}>
      {fmtMoney(value)}<span style={{ fontSize: size * 0.75, opacity: 0.7, marginLeft: 2 }}>€</span>
    </span>
  );
}

// ── Numpad button ─────────────────────────────────────────────────────────────
function NumBtn({ children, onPress, soft }: { children: React.ReactNode; onPress: () => void; soft?: boolean }) {
  return (
    <button onClick={onPress} style={{ flex: 1, padding: '18px 0', minHeight: 56, background: soft ? T.creamDeep : T.paper, border: `1px solid ${T.line}`, borderRadius: 12, fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </button>
  );
}

// ── Hotel tag ─────────────────────────────────────────────────────────────────
function HotelTag({ name }: { name: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.greenSofter, color: T.green, border: `1px solid ${T.greenSoft}`, padding: '2px 8px', borderRadius: 999, fontFamily: sans, fontSize: 10.5, fontWeight: 600, whiteSpace: 'nowrap' }}>
      <Icon name="building" size={11} color={T.green} />{name}
    </span>
  );
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
function TabBar({ active, onTab, inboxCount, validateCount }: {
  active: Tab; onTab: (t: Tab) => void; inboxCount: number; validateCount: number;
}) {
  const items: { id: Tab; icon: string; label: string; badge?: number; accent?: boolean }[] = [
    { id: 'home',     icon: 'home',         label: "Auj." },
    { id: 'inbox',    icon: 'inbox',        label: 'Demandes',  badge: inboxCount || undefined },
    { id: 'validate', icon: 'history',      label: 'Historique', badge: validateCount || undefined },
    { id: 'more',     icon: 'menu',         label: 'Plus' },
  ];
  return (
    <div style={{ flexShrink: 0, background: T.green, padding: '10px 4px 24px', display: 'flex', justifyContent: 'space-around', borderTop: `1px solid ${T.greenDeep}` }}>
      {items.map(it => {
        const isActive = it.id === active;
        return (
          <button key={it.id} onClick={() => onTab(it.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px 10px', color: isActive ? T.gold : 'rgba(250,246,236,0.6)', position: 'relative', minWidth: 56 }}>
            {it.badge ? (
              <span style={{ position: 'absolute', top: 0, right: 8, background: it.accent ? T.gold : T.cream, color: it.accent ? T.greenInk : T.green, fontFamily: mono, fontSize: 9, fontWeight: 700, padding: '0 5px', borderRadius: 999, lineHeight: '14px', minHeight: 14, minWidth: 14, textAlign: 'center' }}>{it.badge}</span>
            ) : null}
            <Icon name={it.icon} size={20} color={isActive ? T.gold : 'rgba(250,246,236,0.65)'} />
            <span style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: 0.2 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Home Tab ──────────────────────────────────────────────────────────────────
function HomeTab({ reservations, onTab }: { reservations: Reservation[]; onTab: (t: Tab) => void }) {
  const iso = todayISO();
  const todayRides = reservations.filter(r => r.date === iso);
  const inProgress = todayRides.find(r => r.status === 'confirmed');
  const upcoming = todayRides.filter(r => r.status === 'confirmed').slice(1, 4);
  const upcomingCount = reservations.filter(r => r.status === 'confirmed').length;
  const inboxCount = reservations.filter(r => r.status === 'pending').length;
  const todayRevenue = todayRides.reduce((s, r) => s + (r.final_price ?? 0), 0);
  const validatedToday = todayRides.filter(r => r.final_price).length;

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.gold, letterSpacing: 0.7, textTransform: 'uppercase' }}>{todayLabel()}</div>
          <h1 style={{ margin: '3px 0 0', fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.ink, letterSpacing: -0.3, lineHeight: 1.1 }}>Bonjour Rachel.</h1>
        </div>
      </div>

      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Hero KPI */}
        <div style={{ background: T.green, borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.08 }} width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke={T.gold} strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke={T.gold} strokeWidth="1" />
          </svg>
          <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: 'rgba(250,246,236,0.65)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Revenus du jour</div>
          <div style={{ fontFamily: serif, fontSize: 48, fontWeight: 600, color: T.gold, letterSpacing: -1, lineHeight: 1, marginTop: 6 }}>
            {fmtMoney(todayRevenue)}<span style={{ fontSize: 26, marginLeft: 4 }}>€</span>
          </div>
          <div style={{ fontFamily: sans, fontSize: 12, color: 'rgba(250,246,236,0.65)', marginTop: 8 }}>
            {validatedToday} course{validatedToday > 1 ? 's' : ''} validée{validatedToday > 1 ? 's' : ''} · {todayRides.length} au total
          </div>
        </div>

        {/* Priority cards */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onTab('validate')} style={{ flex: 1, background: upcomingCount > 0 ? T.goldSoft : T.paper, border: `1px solid ${upcomingCount > 0 ? T.gold : T.line}`, borderRadius: 12, padding: 14, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <Icon name="history" size={14} color={upcomingCount > 0 ? T.goldDeep : T.ink3} />
              <span style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: upcomingCount > 0 ? T.goldDeep : T.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>Historique</span>
            </div>
            <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, color: T.greenInk, lineHeight: 1 }}>{upcomingCount}</div>
            <div style={{ fontFamily: sans, fontSize: 11, color: T.ink2, marginTop: 4 }}>courses à venir</div>
          </button>
          <button onClick={() => onTab('inbox')} style={{ flex: 1, background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <Icon name="inbox" size={14} color={T.green} />
              <span style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>Demandes</span>
            </div>
            <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, color: T.ink, lineHeight: 1 }}>{inboxCount}</div>
            <div style={{ fontFamily: sans, fontSize: 11, color: T.ink2, marginTop: 4 }}>en attente</div>
          </button>
        </div>

        {/* En cours */}
        {inProgress && (
          <div>
            <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.ink3, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8, padding: '0 2px' }}>En cours</div>
            <div style={{ background: T.paper, border: `1px solid ${T.green}`, borderRadius: 12, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.emerald, boxShadow: `0 0 0 4px ${T.emeraldSoft}` }} />
                <Pill status="confirmed" />
                <span style={{ fontFamily: mono, fontSize: 11, color: T.ink3 }}>{inProgress.time}</span>
              </div>
              <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{inProgress.client_name}</div>
              <div style={{ fontFamily: sans, fontSize: 12.5, color: T.ink2, marginBottom: 10 }}>
                {inProgress.departure} → {inProgress.arrival}
              </div>
              <HotelTag name={inProgress.hotel_name} />
            </div>
          </div>
        )}

        {/* À venir */}
        {upcoming.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 2px' }}>
              <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.ink3, letterSpacing: 0.6, textTransform: 'uppercase' }}>À venir</div>
              <button onClick={() => onTab('inbox')} style={{ fontFamily: sans, fontSize: 11.5, color: T.green, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Voir tout</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {upcoming.map(r => (
                <div key={r.id} style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 44, fontFamily: mono, fontSize: 13, fontWeight: 600, color: T.ink, flexShrink: 0 }}>{r.time}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: sans, fontSize: 13.5, fontWeight: 600, color: T.ink, marginBottom: 2 }}>{r.client_name}</div>
                    <div style={{ fontFamily: sans, fontSize: 11.5, color: T.ink2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.departure.split(',')[0]} → {r.arrival.split(',')[0]}
                    </div>
                  </div>
                  <Money value={r.estimated_price ?? 0} size={13} color={T.green} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {todayRides.filter(r => r.status === 'confirmed').length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px 20px', background: T.paper, border: `1px solid ${T.line}`, borderRadius: 14 }}>
            <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: T.ink3, marginBottom: 6 }}>Pas de course confirmée aujourd'hui</div>
            <div style={{ fontFamily: sans, fontSize: 13, color: T.ink3 }}>Les courses acceptées apparaîtront ici.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Inbox Tab ─────────────────────────────────────────────────────────────────
function InboxTab({ reservations, onRefresh }: { reservations: Reservation[]; onRefresh: () => void }) {
  const [saving, setSaving] = useState<string | null>(null);
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const pending = reservations.filter(r => r.status === 'pending');

  useEffect(() => {
    setPriceDrafts((prev) => {
      const next: Record<string, string> = {};
      for (const r of pending) {
        const defaultPrice = r.estimated_price ?? r.final_price ?? null;
        next[r.id] = prev[r.id] ?? (defaultPrice != null ? String(defaultPrice) : '');
      }
      return next;
    });
  }, [pending]);

  async function accept(r: Reservation) {
    setSaving(r.id + '-accept');
    const rawPrice = (priceDrafts[r.id] ?? '').replace(',', '.').trim();
    const parsedPrice = Number(rawPrice);
    const payload: Record<string, unknown> = { status: 'confirmed' };
    if (rawPrice && Number.isFinite(parsedPrice) && parsedPrice > 0) {
      payload.estimated_price = parsedPrice;
      payload.commission_rate = r.commission_rate;
    }
    await fetch(`/api/admin/reservations/${r.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(null);
    onRefresh();
  }

  async function refuse(id: string) {
    setSaving(id + '-refuse');
    await fetch(`/api/admin/reservations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    });
    setSaving(null);
    onRefresh();
  }

  if (pending.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: T.greenSofter, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check-circle" size={26} color={T.green} />
        </div>
        <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: T.ink }}>Boîte vide</div>
        <div style={{ fontFamily: sans, fontSize: 13, color: T.ink3, textAlign: 'center' }}>Aucune demande en attente.</div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.gold, letterSpacing: 0.7, textTransform: 'uppercase' }}>
          {pending.length} demande{pending.length > 1 ? 's' : ''}
        </div>
        <h1 style={{ margin: '3px 0 0', fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>Boîte de réception</h1>
      </div>

      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {pending.map(r => (
          <div key={r.id} style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  <HotelTag name={r.hotel_name} />
                  <span style={{ fontFamily: mono, fontSize: 10.5, color: T.ink3 }}>{r.time}</span>
                </div>
                <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: T.ink }}>{r.client_name}</div>
                {r.passengers > 1 && (
                  <div style={{ fontFamily: sans, fontSize: 11.5, color: T.ink3, marginTop: 2 }}>
                    {r.passengers} passagers · {r.luggage} bagage{r.luggage > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={priceDrafts[r.id] ?? ''}
                  onChange={(e) => setPriceDrafts((prev) => ({ ...prev, [r.id]: e.target.value }))}
                  style={{
                    width: 88,
                    padding: '6px 8px',
                    borderRadius: 8,
                    border: `1px solid ${T.line}`,
                    background: T.paper,
                    textAlign: 'right',
                    fontFamily: mono,
                    fontSize: 17,
                    fontWeight: 700,
                    color: T.green,
                  }}
                  aria-label={`Prix estimé pour ${r.client_name}`}
                />
                <div style={{ fontFamily: sans, fontSize: 10, color: T.ink3, marginTop: 4 }}>prix estimé (€)</div>
              </div>
            </div>

            {/* Route */}
            <div style={{ padding: '10px 0', borderTop: `1px solid ${T.lineSoft}`, borderBottom: `1px solid ${T.lineSoft}`, marginBottom: 10 }}>
              <div style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{r.departure}</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: T.ink3, margin: '3px 0' }}>↓</div>
              <div style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{r.arrival}</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: T.ink3, marginTop: 5 }}>{r.date} à {r.time}</div>
            </div>

            {/* Comment */}
            {r.comment && (
              <div style={{ padding: '8px 10px', background: T.creamDeep, borderRadius: 6, fontFamily: sans, fontSize: 12, color: T.ink2, lineHeight: 1.55, fontStyle: 'italic', marginBottom: 10 }}>
                « {r.comment} »
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 6 }}>
              <a href={`tel:${r.client_phone}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, flex: 1, padding: '12px 6px', background: T.paper, border: `1px solid ${T.line}`, borderRadius: 8, fontFamily: sans, fontSize: 12, fontWeight: 600, color: T.green, cursor: 'pointer', textDecoration: 'none', minHeight: 44 }}>
                <Icon name="phone" size={13} color={T.green} />
              </a>
              <button onClick={() => refuse(r.id)} disabled={saving !== null} style={{ flex: 1.5, padding: '12px 6px', background: 'transparent', border: `1px solid ${T.red}55`, borderRadius: 8, fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: T.red, cursor: 'pointer', minHeight: 44, opacity: saving !== null ? 0.6 : 1 }}>
                {saving === r.id + '-refuse' ? '…' : 'Refuser'}
              </button>
              <button onClick={() => accept(r)} disabled={saving !== null} style={{ flex: 2, padding: '12px 6px', background: T.gold, border: 'none', borderRadius: 8, fontFamily: sans, fontSize: 12.5, fontWeight: 700, color: T.greenInk, cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: saving !== null ? 0.7 : 1 }}>
                <Icon name="check" size={13} color={T.greenInk} sw={2.5} />
                {saving === r.id + '-accept' ? '…' : 'Accepter'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── History Tab (ex "Valider") ────────────────────────────────────────────────
function ValidateTab({ reservations }: { reservations: Reservation[]; onRefresh: () => void }) {
  const [filter, setFilter] = useState<'upcoming' | 'done'>('upcoming');

  const getRideDate = (r: Reservation) => {
    const fromDateTime = new Date(`${r.date}T${r.time}`);
    if (!Number.isNaN(fromDateTime.getTime())) return fromDateTime;
    return new Date(r.created_at);
  };

  const upcoming = reservations
    .filter((r) => r.status === 'confirmed')
    .sort((a, b) => getRideDate(a).getTime() - getRideDate(b).getTime());

  const done = reservations
    .filter((r) => r.status === 'completed')
    .sort((a, b) => getRideDate(b).getTime() - getRideDate(a).getTime());

  const rows = filter === 'upcoming' ? upcoming : done;

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.gold, letterSpacing: 0.7, textTransform: 'uppercase' }}>
          Historique des courses
        </div>
        <h1 style={{ margin: '3px 0 0', fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>
          {filter === 'upcoming' ? 'Courses à venir' : 'Courses réalisées'}
        </h1>
      </div>

      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ display: 'inline-flex', background: T.paper, border: `1px solid ${T.line}`, borderRadius: 999, padding: 3, gap: 4 }}>
          <button
            onClick={() => setFilter('upcoming')}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              fontFamily: sans,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              background: filter === 'upcoming' ? T.green : 'transparent',
              color: filter === 'upcoming' ? T.cream : T.ink2,
            }}
          >
            À venir ({upcoming.length})
          </button>
          <button
            onClick={() => setFilter('done')}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              fontFamily: sans,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              background: filter === 'done' ? T.green : 'transparent',
              color: filter === 'done' ? T.cream : T.ink2,
            }}
          >
            Réalisées ({done.length})
          </button>
        </div>
      </div>

      <div style={{ padding: '0 20px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.length === 0 ? (
          <div style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: T.greenSofter, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Icon name="history" size={26} color={T.green} />
            </div>
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: T.ink }}>
              {filter === 'upcoming' ? 'Aucune course à venir' : 'Aucune course réalisée'}
            </div>
            <div style={{ fontFamily: sans, fontSize: 13, color: T.ink3, textAlign: 'center', marginTop: 6 }}>
              {filter === 'upcoming'
                ? 'Les courses confirmées apparaîtront ici.'
                : 'Les courses terminées apparaîtront ici.'}
            </div>
          </div>
        ) : (
          rows.map((r) => (
            <div key={r.id} style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 56, textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: T.green }}>{r.time}</div>
                <div style={{ fontFamily: sans, fontSize: 10.5, color: T.ink3 }}>{r.date}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: sans, fontSize: 13.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {r.client_name}
                </div>
                <div style={{ fontFamily: sans, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                  {r.departure.split(',')[0]} → {r.arrival.split(',')[0]}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: mono, fontSize: 13.5, fontWeight: 700, color: T.green }}>
                  {r.final_price != null ? `${Number(r.final_price).toFixed(0)} €` : (r.estimated_price != null ? `${Number(r.estimated_price).toFixed(0)} €` : '—')}
                </div>
                <div style={{ fontFamily: sans, fontSize: 10.5, color: T.ink3 }}>
                  {filter === 'upcoming' ? 'estimé' : 'encaissé'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── More Tab ──────────────────────────────────────────────────────────────────
function MoreTab({ hotels, reservations, onRefresh, onLogout }: {
  hotels: Hotel[]; reservations: Reservation[]; onRefresh: () => void; onLogout: () => void;
}) {
  const [view, setView] = useState<'menu' | 'hotels' | 'add-hotel' | 'commissions'>('menu');
  const [saving, setSaving] = useState(false);
  const [deletingHotelId, setDeletingHotelId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', password: '', commission_rate: 10, contact_email: '', contact_phone: '' });

  const totalDue = reservations
    .filter(r => !r.commission_paid && r.commission_amount != null && (r.status === 'confirmed' || r.status === 'completed'))
    .reduce((s, r) => s + (r.commission_amount ?? 0), 0);

  const unpaidRes = reservations.filter(
    (r) => !r.commission_paid && r.commission_amount != null && (r.status === 'confirmed' || r.status === 'completed')
  );

  async function addHotel(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/admin/hotels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setForm({ name: '', password: '', commission_rate: 10, contact_email: '', contact_phone: '' });
    setView('hotels');
    onRefresh();
  }

  async function toggleCommission(r: Reservation) {
    await fetch(`/api/admin/reservations/${r.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commission_paid: !r.commission_paid }),
    });
    onRefresh();
  }

  async function deleteHotel(hotel: Hotel) {
    const hasReservations = reservations.some((r) => (r.hotel_id ? r.hotel_id === hotel.id : r.hotel_name === hotel.name));
    const confirmMessage = hasReservations
      ? `Supprimer "${hotel.name}" ?\\n\\nLes réservations liées seront aussi supprimées.`
      : `Supprimer "${hotel.name}" ?`;
    if (!window.confirm(confirmMessage)) return;

    setDeletingHotelId(hotel.id);
    try {
      const res = await fetch(`/api/admin/hotels/${hotel.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        window.alert(data.error ?? "Impossible de supprimer l'hôtel");
        return;
      }
      onRefresh();
    } catch {
      window.alert('Erreur réseau, veuillez réessayer.');
    } finally {
      setDeletingHotelId(null);
    }
  }

  // Sub-views
  if (view === 'add-hotel') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setView('hotels')} style={{ width: 36, height: 36, borderRadius: 8, background: T.paper, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevron-left" size={18} color={T.ink} />
          </button>
          <h1 style={{ margin: 0, fontFamily: serif, fontSize: 22, fontWeight: 600, color: T.ink }}>Ajouter un hôtel</h1>
        </div>
        <form onSubmit={addHotel} style={{ flex: 1, padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {([
            { label: "Nom de l'hôtel *", key: 'name', type: 'text', required: true },
            { label: 'Mot de passe *', key: 'password', type: 'text', required: true },
            { label: 'Email contact', key: 'contact_email', type: 'email', required: false },
            { label: 'Téléphone contact', key: 'contact_phone', type: 'tel', required: false },
          ] as const).map(({ label, key, type, required }) => (
            <div key={key}>
              <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: T.ink2, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
              <input required={required} type={type} value={form[key] as string}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '13px 14px', border: `1px solid ${T.line}`, borderRadius: 8, fontFamily: sans, fontSize: 14, color: T.ink, background: T.paper, outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div>
            <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: T.ink2, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>Commission (%)</div>
            <input type="number" min={0} max={50} step={0.5} value={form.commission_rate}
              onChange={e => setForm(f => ({ ...f, commission_rate: Number(e.target.value) }))}
              style={{ width: '100%', padding: '13px 14px', border: `1px solid ${T.line}`, borderRadius: 8, fontFamily: sans, fontSize: 14, color: T.ink, background: T.paper, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={saving}
            style={{ marginTop: 8, padding: '15px', background: T.gold, border: 'none', borderRadius: 12, fontFamily: sans, fontSize: 15, fontWeight: 700, color: T.greenInk, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Création…' : "Créer l'hôtel"}
          </button>
        </form>
      </div>
    );
  }

  if (view === 'hotels') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setView('menu')} style={{ width: 36, height: 36, borderRadius: 8, background: T.paper, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="chevron-left" size={18} color={T.ink} />
            </button>
            <h1 style={{ margin: 0, fontFamily: serif, fontSize: 22, fontWeight: 600, color: T.ink }}>Hôtels partenaires</h1>
          </div>
          <button onClick={() => setView('add-hotel')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', background: T.green, border: 'none', borderRadius: 8, fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: T.cream, cursor: 'pointer' }}>
            <Icon name="plus" size={14} color={T.cream} />Ajouter
          </button>
        </div>
        <div style={{ flex: 1, padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {hotels.map(h => {
            const hRes = reservations.filter(r => (r.hotel_id ? r.hotel_id === h.id : r.hotel_name === h.name));
            const hDue = hRes.filter(r => !r.commission_paid && r.commission_amount).reduce((s, r) => s + (r.commission_amount ?? 0), 0);
            return (
              <div key={h.id} style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{h.name}</div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontFamily: mono, fontSize: 12.5, fontWeight: 600, color: T.green }}>{h.commission_rate}%</span>
                      <span style={{ fontFamily: sans, fontSize: 12, color: T.ink3 }}>{hRes.length} course{hRes.length > 1 ? 's' : ''}</span>
                      {hDue > 0 && <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, color: T.amber }}>{hDue.toFixed(2)} € dûs</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {h.contact_phone && (
                      <a href={`tel:${h.contact_phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 8, background: T.greenSofter, textDecoration: 'none' }}>
                        <Icon name="phone" size={16} color={T.green} />
                      </a>
                    )}
                    <button
                      onClick={() => deleteHotel(h)}
                      disabled={deletingHotelId === h.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        background: T.redSoft,
                        border: `1px solid ${T.red}33`,
                        color: T.red,
                        cursor: deletingHotelId === h.id ? 'not-allowed' : 'pointer',
                        opacity: deletingHotelId === h.id ? 0.7 : 1,
                      }}
                      aria-label={`Supprimer ${h.name}`}
                      title={`Supprimer ${h.name}`}
                    >
                      <Icon name="trash" size={15} color={T.red} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {hotels.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: T.ink3, fontFamily: sans, fontSize: 13 }}>
              Aucun hôtel partenaire. Ajoutez-en un.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'commissions') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setView('menu')} style={{ width: 36, height: 36, borderRadius: 8, background: T.paper, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevron-left" size={18} color={T.ink} />
          </button>
          <h1 style={{ margin: 0, fontFamily: serif, fontSize: 22, fontWeight: 600, color: T.ink }}>Commissions</h1>
        </div>
        <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Total due */}
          <div style={{ background: T.green, borderRadius: 12, padding: 18 }}>
            <div style={{ fontFamily: sans, fontSize: 11, color: 'rgba(250,246,236,0.65)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Total à reverser</div>
            <div style={{ fontFamily: serif, fontSize: 36, fontWeight: 600, color: T.gold, marginTop: 6 }}>{totalDue.toFixed(2)} €</div>
            <div style={{ fontFamily: sans, fontSize: 12, color: 'rgba(250,246,236,0.65)', marginTop: 4 }}>{unpaidRes.length} commission{unpaidRes.length > 1 ? 's' : ''} en attente</div>
          </div>

          {unpaidRes.length > 0 ? (
            <div style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, overflow: 'hidden' }}>
              {unpaidRes.map((r, i) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderTop: i > 0 ? `1px solid ${T.lineSoft}` : 'none' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.hotel_name}</div>
                    <div style={{ fontFamily: sans, fontSize: 11.5, color: T.ink3, marginTop: 1 }}>{r.client_name} · {r.date}</div>
                  </div>
                  <Money value={r.commission_amount!} size={13} color={T.amber} />
                  <button onClick={() => toggleCommission(r)} style={{ flexShrink: 0, padding: '6px 12px', background: T.emeraldSoft, border: `1px solid ${T.emerald}33`, borderRadius: 6, fontFamily: sans, fontSize: 11, fontWeight: 600, color: T.emerald, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Réglé ✓
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 20px', background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, fontFamily: sans, fontSize: 13, color: T.ink3 }}>
              Toutes les commissions sont réglées.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.gold, letterSpacing: 0.7, textTransform: 'uppercase' }}>Administration</div>
        <h1 style={{ margin: '3px 0 0', fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>Plus</h1>
      </div>

      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Summary */}
        <div style={{ background: T.green, borderRadius: 14, padding: 18, display: 'flex', gap: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: sans, fontSize: 10.5, color: 'rgba(250,246,236,0.65)', letterSpacing: 0.5, textTransform: 'uppercase' }}>Commissions dues</div>
            <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.gold, marginTop: 4 }}>{totalDue.toFixed(2)} €</div>
          </div>
          <div style={{ width: 1, background: 'rgba(250,246,236,0.12)', margin: '0 16px' }} />
          <div style={{ flex: 0 }}>
            <div style={{ fontFamily: sans, fontSize: 10.5, color: 'rgba(250,246,236,0.65)', letterSpacing: 0.5, textTransform: 'uppercase' }}>Hôtels</div>
            <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.cream, marginTop: 4 }}>{hotels.length}</div>
          </div>
        </div>

        {/* Menu items */}
        {([
          { label: 'Hôtels partenaires', sub: `${hotels.length} partenaire${hotels.length !== 1 ? 's' : ''}`, icon: 'building', action: () => setView('hotels') },
          { label: 'Commissions', sub: `${totalDue.toFixed(2)} € à reverser`, icon: 'wallet', action: () => setView('commissions') },
        ] as const).map((item, i) => (
          <button key={i} onClick={item.action} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: T.paper, border: `1px solid ${T.line}`, borderRadius: 12, cursor: 'pointer', textAlign: 'left', width: '100%' }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: T.greenSofter, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={item.icon} size={19} color={T.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.ink }}>{item.label}</div>
              <div style={{ fontFamily: sans, fontSize: 12, color: T.ink3, marginTop: 2 }}>{item.sub}</div>
            </div>
            <Icon name="chevron-right" size={16} color={T.ink3} />
          </button>
        ))}

        {/* Logout */}
        <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: T.redSoft, border: `1px solid ${T.red}22`, borderRadius: 12, cursor: 'pointer', width: '100%', marginTop: 4 }}>
          <Icon name="logout" size={18} color={T.red} />
          <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.red }}>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('home');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [resRes, hotRes] = await Promise.all([
      fetch('/api/admin/reservations'),
      fetch('/api/admin/hotels'),
    ]);
    if (resRes.status === 401) { router.push('/admin/login'); return; }
    const [resData, hotData] = await Promise.all([resRes.json(), hotRes.json()]);
    if (resData.reservations) setReservations(resData.reservations);
    if (hotData.hotels) setHotels(hotData.hotels);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const inboxCount    = reservations.filter(r => r.status === 'pending').length;
  const validateCount = reservations.filter(r => r.status === 'confirmed').length;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', background: T.cream }}>
        <div style={{ fontFamily: serif, fontSize: 18, color: T.ink3 }}>Chargement…</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: T.cream, maxWidth: 600, margin: '0 auto', fontFamily: sans, color: T.ink, overflow: 'hidden' }}>
      {tab === 'home'     && <HomeTab     reservations={reservations} onTab={setTab} />}
      {tab === 'inbox'    && <InboxTab    reservations={reservations} onRefresh={load} />}
      {tab === 'validate' && <ValidateTab reservations={reservations} onRefresh={load} />}
      {tab === 'more'     && <MoreTab     hotels={hotels} reservations={reservations} onRefresh={load} onLogout={logout} />}
      <TabBar active={tab} onTab={setTab} inboxCount={inboxCount} validateCount={validateCount} />
    </div>
  );
}
