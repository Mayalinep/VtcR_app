'use client';
import React, { useMemo } from 'react';
import { Icon, Card, StatusPill, Avatar, Tabs, formatEUR, mapApiStatus } from './ui';
import { useBreakpoint } from './useBreakpoint';
import type { Reservation } from './types';

// ─── Mini bar chart ──────────────────────────────────────────────────────────

function MiniBars({ data, current = 3 }: { data: { m: string; eur: number }[]; current?: number }) {
  const max = Math.max(...data.map((d) => d.eur), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110, paddingTop: 8 }}>
      {data.map((d, i) => {
        const future = i > current;
        const isCurrent = i === current;
        const barH = future ? 8 : Math.max(6, (d.eur / max) * 86);
        return (
          <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', maxWidth: 22, height: barH,
              background: future ? 'var(--cream-3)' : isCurrent ? 'var(--gold)' : 'var(--green-soft)',
              border: future ? '1px dashed var(--ink-4)' : 'none',
              borderRadius: 4,
              boxShadow: isCurrent ? '0 4px 12px rgba(200,154,58,0.32)' : 'none',
            }} />
            <div className="mono" style={{ fontSize: 10, color: future ? 'var(--ink-4)' : isCurrent ? 'var(--gold-2)' : 'var(--ink-3)', fontWeight: isCurrent ? 700 : 400 }}>{d.m}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── KPI card ────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon, dark, accent }: {
  label: string; value: React.ReactNode; sub?: React.ReactNode;
  icon?: Parameters<typeof Icon>[0]['name']; dark?: boolean; accent?: 'gold';
}) {
  return (
    <Card pad={20} dark={dark} style={{ minHeight: 132, display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="label" style={{ color: dark ? 'rgba(250,246,236,0.55)' : 'var(--ink-3)' }}>{label}</span>
        {icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 'var(--r-sm)',
            background: dark ? 'rgba(200,154,58,0.18)' : accent === 'gold' ? 'var(--gold-soft)' : 'var(--cream-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: dark ? 'var(--gold)' : accent === 'gold' ? 'var(--gold-2)' : 'var(--ink-2)',
          }}>
            <Icon name={icon} size={16} />
          </div>
        )}
      </div>
      <div className="serif" style={{ fontSize: 38, fontWeight: 500, lineHeight: 1.05, marginTop: 4, color: dark ? 'var(--cream)' : 'var(--ink)', letterSpacing: '-0.02em' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12.5, color: dark ? 'rgba(250,246,236,0.65)' : 'var(--ink-3)' }}>{sub}</div>}
    </Card>
  );
}

// ─── Ride row ────────────────────────────────────────────────────────────────

function RideRow({ r, isHighlighted }: { r: Reservation; isHighlighted?: boolean }) {
  const status = mapApiStatus(r.status);
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '76px 1.4fr 1.6fr 0.9fr 0.85fr 1fr',
        alignItems: 'center',
        padding: '14px 20px',
        borderTop: '1px solid var(--cream-2)',
        cursor: 'pointer',
        transition: 'background 140ms var(--ease)',
        background: hovered ? 'var(--cream-2)' : isHighlighted ? 'rgba(244,233,200,0.4)' : 'transparent',
        animation: isHighlighted ? 'b2b-fadeUp 400ms var(--ease)' : 'none',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: 'var(--cream-2)', border: '1px solid var(--cream-3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, color: 'var(--ink)',
      }}>
        {r.room || '—'}
      </div>
      <div className="col" style={{ gap: 2, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.client_name}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
          {new Date(r.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div className="col" style={{ gap: 2, minWidth: 0 }}>
        <div className="row gap-6" style={{ fontSize: 13, color: 'var(--ink)' }}>
          <Icon name="pin" size={12} color="var(--green)" />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.arrival}</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>
          {r.date} · {r.time}
        </div>
      </div>
      <div className="col" style={{ gap: 2 }}>
        <div className="mono" style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 600 }}>
          {r.final_price != null
            ? formatEUR(r.final_price)
            : r.estimated_price != null
              ? <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>~{formatEUR(r.estimated_price)}</span>
              : <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>—</span>
          }
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{r.final_price != null ? 'final' : 'estimé'}</div>
      </div>
      <div className="col" style={{ gap: 2 }}>
        <div className="mono" style={{ fontSize: 13.5, color: r.commission_amount != null ? 'var(--green)' : 'var(--ink-3)', fontWeight: 700 }}>
          {r.commission_amount != null ? formatEUR(r.commission_amount, { decimals: 2 }) : '—'}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>commission</div>
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <StatusPill kind={status} />
        <Icon name="chevronRight" size={14} color="var(--ink-3)" />
      </div>
    </div>
  );
}

// ─── Monthly data ─────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

function buildMonthlyData(reservations: Reservation[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthly = MONTHS.map((m, i) => {
    const rOfMonth = reservations.filter((r) => {
      const d = new Date(r.created_at);
      return d.getFullYear() === currentYear && d.getMonth() === i;
    });
    const eur = rOfMonth.reduce((sum, r) => sum + (r.commission_amount ?? 0), 0);
    return { m, eur };
  });

  return { monthly, currentIdx: currentMonth };
}

// ─── Dashboard screen ────────────────────────────────────────────────────────

export default function Dashboard({
  reservations,
  onNew,
}: {
  reservations: Reservation[];
  onNew: () => void;
}) {
  const recent = reservations.slice(0, 7);

  const monthRides = useMemo(() => {
    const now = new Date();
    return reservations.filter((r) => {
      const d = new Date(r.created_at);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
  }, [reservations]);

  const pendingCount = useMemo(() => reservations.filter((r) => r.status === 'pending').length, [reservations]);

  const monthCommission = useMemo(() => {
    const now = new Date();
    return reservations
      .filter((r) => {
        const d = new Date(r.created_at);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      })
      .reduce((sum, r) => sum + (r.commission_amount ?? 0), 0);
  }, [reservations]);

  const yearCommission = useMemo(() => {
    const now = new Date();
    return reservations
      .filter((r) => new Date(r.created_at).getFullYear() === now.getFullYear())
      .reduce((sum, r) => sum + (r.commission_amount ?? 0), 0);
  }, [reservations]);

  const { monthly, currentIdx } = useMemo(() => buildMonthlyData(reservations), [reservations]);
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ padding: isMobile ? '16px 14px 32px' : '24px 28px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard
          label="Courses ce mois"
          value={monthRides}
          sub={<span className="row gap-4" style={{ color: 'var(--green)' }}><Icon name="car2" size={12} /> {monthRides} réservations</span>}
          icon="car2"
        />
        <KpiCard
          label="En attente validation"
          value={<span style={{ color: 'var(--gold-2)' }}>{pendingCount}</span>}
          sub="En attente de confirmation"
          icon="clock"
          accent="gold"
        />
        <KpiCard
          label="Commission ce mois"
          value={formatEUR(monthCommission, { decimals: 0 })}
          sub={<span style={{ color: 'var(--ink-3)' }}>sur {monthRides} courses</span>}
          icon="euro"
        />
        <KpiCard
          label={`Cumul ${new Date().getFullYear()}`}
          value={formatEUR(yearCommission, { decimals: 0 })}
          sub={<span style={{ color: 'rgba(250,246,236,0.7)' }}>{reservations.length} courses au total</span>}
          icon="sparkle"
          dark
        />
      </div>

      {/* Main content */}
      <div className="col gap-16">
        {/* Recent rides - full width */}
        <div style={{ overflowX: 'auto' }}>
        <Card pad={0} style={{ overflow: 'visible', minWidth: isMobile ? 580 : 'auto' }}>
          <div className="row" style={{ padding: '18px 20px 14px', justifyContent: 'space-between', borderBottom: '1px solid var(--cream-2)' }}>
            <div className="col" style={{ gap: 2 }}>
              <h3 className="serif" style={{ margin: 0, fontSize: 19, fontWeight: 500 }}>Courses récentes</h3>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </div>
            <button type="button" style={{ background: 'none', border: 'none', color: 'var(--green)', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              Voir l&apos;historique <Icon name="arrowRight" size={14} />
            </button>
          </div>
          {/* Header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '76px 1.4fr 1.6fr 0.9fr 0.85fr 1fr',
            alignItems: 'center', padding: '10px 20px',
            background: 'var(--cream-2)',
            fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)',
          }}>
            <div>Ch.</div>
            <div>Client</div>
            <div>Destination</div>
            <div>Prix</div>
            <div>Commission</div>
            <div>Statut</div>
          </div>
          {recent.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
              Aucune course pour le moment.
            </div>
          ) : (
            recent.map((r) => <RideRow key={r.id} r={r} />)
          )}
          {recent.length === 0 && (
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'center' }}>
              <button type="button" onClick={onNew} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', background: 'var(--gold)', color: 'var(--green-12)',
                border: 'none', borderRadius: 'var(--r-md)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>
                <Icon name="plus" size={16} /> Réserver la première course
              </button>
            </div>
          )}
        </Card>
        </div>

        {/* Commission chart */}
        <Card pad={20}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
            <div className="col" style={{ gap: 2 }}>
              <span className="label">Commissions {new Date().getFullYear()}</span>
              <div className="serif" style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}>{formatEUR(yearCommission, { decimals: 0 })}</div>
            </div>
            <Tabs size="sm" tabs={[{ label: 'M', value: 'm' }]} value="m" onChange={() => {}} />
          </div>
          <MiniBars data={monthly} current={currentIdx} />
          <div className="row gap-6" style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--cream-3)' }}>
            <span style={{ width: 8, height: 8, background: 'var(--gold)', borderRadius: 2 }} />
            <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>
              {MONTHS[new Date().getMonth()]} en cours
            </span>
            <span className="spacer" />
            <span className="mono">{formatEUR(monthCommission, { decimals: 2 })}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
