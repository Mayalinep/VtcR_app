'use client';
import React, { useMemo, useState } from 'react';
import { Icon, Card, StatusPill, Avatar, Btn, formatEUR, mapApiStatus } from './ui';
import { useBreakpoint } from './useBreakpoint';
import type { Reservation } from './types';

const PERIODS = [
  { value: 'today',  label: "Aujourd'hui" },
  { value: 'week',   label: 'Cette semaine' },
  { value: 'month',  label: 'Ce mois' },
  { value: 'year',   label: 'Cette année' },
  { value: 'all',    label: 'Tout' },
];
const STATUSES = [
  { value: 'all',        label: 'Tous' },
  { value: 'pending',    label: 'Attente' },
  { value: 'confirmed',  label: 'Validés' },
  { value: 'completed',  label: 'Terminés' },
  { value: 'cancelled',  label: 'Annulés' },
];

function isInPeriod(r: Reservation, period: string): boolean {
  const d = new Date(r.created_at);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === 'today') return d >= today;
  if (period === 'week') {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    return d >= weekStart;
  }
  if (period === 'month') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  if (period === 'year') return d.getFullYear() === now.getFullYear();
  return true;
}

export default function History({ reservations }: { reservations: Reservation[] }) {
  const [period, setPeriod] = useState('month');
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      if (!isInPeriod(r, period)) return false;
      if (status !== 'all' && r.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!r.client_name.toLowerCase().includes(q) && !r.arrival.toLowerCase().includes(q) && !r.id.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [reservations, period, status, query]);

  const total = filtered.reduce((s, r) => s + (r.final_price ?? r.estimated_price ?? 0), 0);
  const totalComm = filtered.reduce((s, r) => s + (r.commission_amount ?? 0), 0);

  // Group by day
  const groups = useMemo(() => {
    const map = new Map<string, Reservation[]>();
    filtered.forEach((r) => {
      const key = new Date(r.created_at).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const { isMobile } = useBreakpoint();

  return (
    <div style={{ padding: isMobile ? '14px 12px 32px' : '20px 28px 40px' }}>
      {/* Filter bar */}
      <Card pad={16} style={{ marginBottom: 18, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="row gap-8">
          <Icon name="calendar" size={16} color="var(--ink-3)" />
          <div style={{ display: 'flex', gap: 4 }}>
            {PERIODS.map((p) => (
              <button key={p.value} type="button" onClick={() => setPeriod(p.value)} style={{
                padding: '7px 12px', fontSize: 12.5, fontWeight: 500,
                background: period === p.value ? 'var(--green)' : 'transparent',
                color: period === p.value ? 'var(--cream)' : 'var(--ink-2)',
                border: 'none', borderRadius: 'var(--r-sm)', cursor: 'pointer',
                transition: 'all 140ms var(--ease)',
              }}>{p.label}</button>
            ))}
          </div>
        </div>
        <div style={{ width: 1, height: 24, background: 'var(--cream-3)' }} />
        <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
          {STATUSES.map((s) => (
            <button key={s.value} type="button" onClick={() => setStatus(s.value)} style={{
              padding: '6px 12px', fontSize: 12, fontWeight: 600,
              background: status === s.value ? 'var(--gold-soft)' : 'var(--cream-2)',
              color: status === s.value ? 'var(--gold-2)' : 'var(--ink-2)',
              border: `1px solid ${status === s.value ? 'var(--gold)' : 'transparent'}`,
              borderRadius: 999, cursor: 'pointer',
            }}>{s.label}</button>
          ))}
        </div>
        <div className="spacer" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px',
          height: 36, background: 'var(--cream-2)', border: '1px solid var(--cream-3)',
          borderRadius: 'var(--r-md)', width: 220,
        }}>
          <Icon name="search" size={14} color="var(--ink-3)" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Client, course…"
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit' }} />
        </div>
        <Btn kind="secondary" size="sm" icon="download">CSV</Btn>
      </Card>

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <Card pad={14}><span className="label">Courses</span><div className="serif" style={{ fontSize: 26, fontWeight: 500, marginTop: 2 }}>{filtered.length}</div></Card>
        <Card pad={14}><span className="label">Total facturé</span><div className="serif" style={{ fontSize: 26, fontWeight: 500, marginTop: 2 }}>{formatEUR(total, { decimals: 0 })}</div></Card>
        <Card pad={14}><span className="label">Commission</span><div className="serif" style={{ fontSize: 26, fontWeight: 500, marginTop: 2, color: 'var(--green)' }}>{formatEUR(totalComm, { decimals: 0 })}</div></Card>
        <Card pad={14}><span className="label">Panier moyen</span><div className="serif" style={{ fontSize: 26, fontWeight: 500, marginTop: 2 }}>{formatEUR(filtered.length ? total / filtered.length : 0, { decimals: 0 })}</div></Card>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
      <Card pad={0} style={{ overflow: 'visible', minWidth: isMobile ? 700 : 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '140px 1.4fr 1.6fr 1fr 0.9fr 0.85fr 1fr',
          padding: '12px 20px',
          background: 'var(--cream-2)',
          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)',
          borderBottom: '1px solid var(--cream-3)',
        }}>
          <div>Date</div>
          <div>Client</div>
          <div>Trajet</div>
          <div>Commentaire</div>
          <div>Prix</div>
          <div>Commission</div>
          <div>Statut</div>
        </div>

        {groups.length === 0 && (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>Aucune course pour ce filtre.</div>
        )}

        {groups.map(([day, list]) => (
          <React.Fragment key={day}>
            <div style={{ padding: '8px 20px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--ink-3)', background: 'var(--cream)', borderBottom: '1px dashed var(--cream-3)', textTransform: 'capitalize' }}>{day}</div>
            {list.map((r) => (
              <div key={r.id} style={{
                display: 'grid',
                gridTemplateColumns: '140px 1.4fr 1.6fr 1fr 0.9fr 0.85fr 1fr',
                alignItems: 'center', padding: '14px 20px',
                borderBottom: '1px solid var(--cream-2)', cursor: 'pointer',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--cream-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="mono" style={{ fontSize: 12, color: 'var(--ink-2)' }}>
                  {r.date} {r.time}
                </div>
                <div className="col" style={{ gap: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.client_name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{r.id.slice(0, 8)}…</div>
                </div>
                <div className="col" style={{ gap: 1, fontSize: 12.5, color: 'var(--ink-2)', minWidth: 0 }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>→ {r.arrival}</span>
                  <span style={{ fontSize: 10.5, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.departure}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {r.comment || '—'}
                </div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
                  {r.final_price != null
                    ? formatEUR(r.final_price)
                    : r.estimated_price != null
                      ? <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>~{formatEUR(r.estimated_price)}</span>
                      : '—'}
                </div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: r.commission_amount ? 'var(--green)' : 'var(--ink-3)' }}>
                  {r.commission_amount != null ? formatEUR(r.commission_amount, { decimals: 2 }) : '—'}
                </div>
                <div><StatusPill kind={mapApiStatus(r.status)} size="sm" /></div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </Card>
      </div>
    </div>
  );
}
