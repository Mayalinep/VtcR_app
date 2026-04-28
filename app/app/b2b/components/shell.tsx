'use client';
import React from 'react';
import { Icon, Logo, Btn, STATUS_CONFIG, Avatar } from './ui';
import { useBreakpoint } from './useBreakpoint';
import type { RideStatus } from './ui';

// ─── Types ───────────────────────────────────────────────────────────────────

export type Screen = 'dashboard' | 'history' | 'commissions' | 'invoices' | 'settings';

export type Notif = {
  id: string;
  kind: RideStatus;
  when: string;
  title: string;
  body: string;
  read: boolean;
  rideId?: string;
};

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV: { key: Screen | 'new'; label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { key: 'dashboard',   label: 'Tableau de bord', icon: 'dashboard' },
  { key: 'new',         label: 'Nouvelle course',  icon: 'plus' },
  { key: 'history',     label: 'Historique',       icon: 'history' },
  { key: 'commissions', label: 'Commissions',      icon: 'euro' },
  { key: 'invoices',    label: 'Facturation',      icon: 'invoice' },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function Sidebar({
  screen, hotelName, onNav, onNew, onLogout,
}: {
  screen: Screen;
  hotelName: string;
  onNav: (s: Screen) => void;
  onNew: () => void;
  onLogout: () => void;
}) {
  return (
    <aside style={{
      width: 244, flexShrink: 0,
      background: 'var(--green)', color: 'var(--cream)',
      padding: '24px 18px 20px',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid rgba(0,0,0,0.1)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(900px 400px at -10% 110%, rgba(200,154,58,0.10), transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', marginBottom: 28, paddingLeft: 4 }}>
        <Logo size={38} variant="lockup" light={false} />
      </div>

      <div className="label" style={{ color: 'rgba(250,246,236,0.45)', paddingLeft: 12, marginBottom: 8, position: 'relative' }}>Menu</div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
        {NAV.map((n) => {
          const isNew = n.key === 'new';
          const active = !isNew && n.key === screen;
          return (
            <button key={n.key} type="button"
              onClick={() => isNew ? onNew() : onNav(n.key as Screen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px',
                background: active ? 'rgba(200,154,58,0.14)' : 'transparent',
                border: 'none',
                borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
                color: active ? 'var(--cream)' : 'rgba(250,246,236,0.78)',
                fontSize: 13.5, fontWeight: active ? 600 : 500,
                borderRadius: 'var(--r-sm)',
                textAlign: 'left', cursor: 'pointer',
                transition: 'all 160ms var(--ease)',
                width: '100%',
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(250,246,236,0.06)'; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <Icon name={n.icon} size={17} color={active ? 'var(--gold)' : 'rgba(250,246,236,0.7)'} />
              <span>{n.label}</span>
              {n.key === 'dashboard' && active && (
                <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Hotel card */}
      <div style={{
        position: 'relative', marginTop: 20,
        padding: '14px',
        background: 'rgba(250,246,236,0.06)',
        borderRadius: 'var(--r-md)',
        border: '1px solid rgba(250,246,236,0.10)',
      }}>
        <div className="row gap-10">
          <Avatar initials={hotelName.charAt(0).toUpperCase() || 'H'} size={34} color="var(--gold)" />
          <div className="col" style={{ gap: 1, minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--cream)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hotelName}</div>
            <div style={{ fontSize: 11, color: 'rgba(250,246,236,0.55)' }}>Paris</div>
          </div>
          <button type="button" onClick={onLogout} title="Déconnexion" style={{
            background: 'transparent', border: 'none', color: 'rgba(250,246,236,0.6)', cursor: 'pointer', padding: 4,
          }}>
            <Icon name="logout" size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Topbar ──────────────────────────────────────────────────────────────────

export function Topbar({
  title, eyebrow, onNew, notifCount, onOpenNotifs, notifsOpen,
}: {
  title: string; eyebrow?: string;
  onNew: () => void; notifCount: number;
  onOpenNotifs: () => void; notifsOpen: boolean;
}) {
  const { isMobile } = useBreakpoint();

  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16,
      padding: isMobile ? '14px 16px 12px' : '20px 28px 18px',
      background: 'var(--cream)',
      borderBottom: '1px solid var(--cream-3)',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      {isMobile && (
        <Logo size={28} variant="mark" light={false} />
      )}
      <div className="col" style={{ gap: 2 }}>
        {!isMobile && eyebrow && <div className="label">{eyebrow}</div>}
        <h1 className="serif" style={{
          margin: 0, fontSize: isMobile ? 20 : 28,
          fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.015em',
        }}>{title}</h1>
      </div>
      <div className="spacer" />
      {!isMobile && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 14px', height: 40, width: 280,
          background: 'var(--paper)', border: '1px solid var(--cream-3)',
          borderRadius: 'var(--r-md)', color: 'var(--ink-3)', fontSize: 13,
        }}>
          <Icon name="search" size={16} />
          <span>Rechercher une course, un client…</span>
        </div>
      )}
      <button type="button" onClick={onOpenNotifs} style={{
        position: 'relative', width: 40, height: 40, borderRadius: 'var(--r-md)',
        background: notifsOpen ? 'var(--cream-2)' : 'var(--paper)',
        border: '1px solid var(--cream-3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <Icon name="bell" size={17} color="var(--ink-2)" />
        {notifCount > 0 && (
          <span style={{
            position: 'absolute', top: 7, right: 7,
            minWidth: 16, height: 16, padding: '0 4px',
            background: 'var(--gold)', color: 'var(--green-12)',
            borderRadius: 999, fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid var(--cream)',
          }}>{notifCount}</span>
        )}
      </button>
      {!isMobile && <Btn kind="primary" icon="plus" onClick={onNew}>Nouvelle course</Btn>}
    </header>
  );
}

// ─── MobileNav ────────────────────────────────────────────────────────────────

const MOBILE_ITEMS: { key: Screen; icon: Parameters<typeof Icon>[0]['name']; label: string }[] = [
  { key: 'dashboard',   icon: 'dashboard', label: 'Accueil'  },
  { key: 'history',     icon: 'history',   label: 'Courses'  },
  { key: 'commissions', icon: 'euro',      label: 'Commissions' },
  { key: 'invoices',    icon: 'invoice',   label: 'Facturation' },
];

export function MobileNav({ screen, onNav, onNew }: {
  screen: Screen;
  onNav: (s: Screen) => void;
  onNew: () => void;
}) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
      height: 64, background: 'var(--green)',
      borderTop: '1px solid rgba(0,0,0,0.18)',
      display: 'flex', alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {MOBILE_ITEMS.slice(0, 2).map((n) => <MobileNavItem key={n.key} n={n} active={screen === n.key} onNav={onNav} />)}

      {/* FAB central */}
      <button type="button" onClick={onNew} style={{
        width: 50, height: 50, borderRadius: '50%', flexShrink: 0, margin: '0 4px',
        background: 'var(--gold)', color: 'var(--green-12)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(200,154,58,0.50)',
        transform: 'translateY(-10px)',
      }}>
        <Icon name="plus" size={22} />
      </button>

      {MOBILE_ITEMS.slice(2).map((n) => <MobileNavItem key={n.key} n={n} active={screen === n.key} onNav={onNav} />)}
    </nav>
  );
}

function MobileNavItem({ n, active, onNav }: {
  n: { key: Screen; icon: Parameters<typeof Icon>[0]['name']; label: string };
  active: boolean;
  onNav: (s: Screen) => void;
}) {
  return (
    <button type="button" onClick={() => onNav(n.key)} style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '8px 0',
      background: 'transparent', border: 'none', cursor: 'pointer',
      color: active ? 'var(--gold)' : 'rgba(250,246,236,0.55)',
    }}>
      <Icon name={n.icon} size={20} color={active ? 'var(--gold)' : 'rgba(250,246,236,0.55)'} />
      <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: '0.02em' }}>{n.label}</span>
    </button>
  );
}

// ─── NotifPopover ────────────────────────────────────────────────────────────

export function NotifPopover({
  items, onClose, onMarkAll,
}: {
  items: Notif[];
  onClose: () => void;
  onMarkAll: () => void;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50 }} />
      <div style={{
        position: 'absolute', top: 76, right: 28, width: 380, zIndex: 51,
        background: 'var(--paper)', border: '1px solid var(--cream-3)',
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-3)',
        animation: 'b2b-fadeUp 200ms var(--ease)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--cream-3)',
        }}>
          <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Notifications</div>
          <button type="button" onClick={onMarkAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--ink-3)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
            Tout marquer comme lu
          </button>
        </div>
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {items.map((n) => {
            const s = STATUS_CONFIG[n.kind];
            return (
              <div key={n.id} style={{
                padding: '14px 16px', display: 'flex', gap: 12,
                borderBottom: '1px solid var(--cream-2)',
                background: n.read ? 'transparent' : 'rgba(244,233,200,0.18)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: s.bg, color: s.fg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={n.kind === 'validated' ? 'checkCircle' : n.kind === 'inprogress' ? 'car2' : n.kind === 'done' ? 'check' : 'clock'} size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{n.when}</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2 }}>{n.body}</div>
                </div>
                {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', alignSelf: 'center', flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--cream-3)', background: 'var(--cream-2)' }}>
          <button type="button" style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--green)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
            Voir toutes les notifications →
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────

export function Toast({ title, body }: { title: string; body: string }) {
  return (
    <div style={{
      padding: '14px 16px', minWidth: 320,
      background: 'var(--green)', color: 'var(--cream)',
      borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-3)',
      display: 'flex', gap: 12, alignItems: 'flex-start',
      animation: 'b2b-fadeUp 280ms var(--ease)',
      borderLeft: '3px solid var(--gold)',
    }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(200,154,58,0.2)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="check" size={16} stroke={2.5} />
      </div>
      <div className="col" style={{ flex: 1, gap: 2 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'rgba(250,246,236,0.75)' }}>{body}</div>
      </div>
    </div>
  );
}
