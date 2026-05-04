'use client';
import React, { useMemo, useState } from 'react';
import { Icon, Card, Tabs, Btn, formatEUR } from './ui';
import { useBreakpoint } from './useBreakpoint';
import type { Reservation } from './types';

const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export default function Commissions({ reservations }: { reservations: Reservation[] }) {
  const [period, setPeriod] = useState('year');
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const yearCommission = useMemo(() =>
    reservations.filter((r) => new Date(r.created_at).getFullYear() === currentYear)
      .reduce((s, r) => s + (r.commission_amount ?? 0), 0),
    [reservations, currentYear]);

  const monthCommission = useMemo(() =>
    reservations.filter((r) => {
      const d = new Date(r.created_at);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    }).reduce((s, r) => s + (r.commission_amount ?? 0), 0),
    [reservations, currentYear, currentMonth]);

  const yearRides = useMemo(() =>
    reservations.filter((r) => new Date(r.created_at).getFullYear() === currentYear).length,
    [reservations, currentYear]);

  const monthly = useMemo(() => MONTH_LABELS.map((m, i) => {
    const eur = reservations.filter((r) => {
      const d = new Date(r.created_at);
      return d.getFullYear() === currentYear && d.getMonth() === i;
    }).reduce((s, r) => s + (r.commission_amount ?? 0), 0);
    return { m, eur };
  }), [reservations, currentYear]);

  const maxEur = Math.max(...monthly.map((d) => d.eur), 1);

  // Top destinations computed from actual data
  const topDests = useMemo(() => {
    const map = new Map<string, { n: number; eur: number }>();
    reservations.forEach((r) => {
      const key = r.arrival.split('·')[0].trim();
      const cur = map.get(key) ?? { n: 0, eur: 0 };
      map.set(key, { n: cur.n + 1, eur: cur.eur + (r.commission_amount ?? 0) });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1].eur - a[1].eur)
      .slice(0, 5)
      .map(([name, v]) => ({ name, ...v }));
  }, [reservations]);

  const maxDestEur = Math.max(...topDests.map((d) => d.eur), 1);

  const { isMobile } = useBreakpoint();

  return (
    <div style={{ padding: isMobile ? '14px 12px 32px' : '20px 28px 40px' }}>
      {/* Hero header */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Card pad={24} style={{ background: 'linear-gradient(135deg, var(--green-12), var(--green))', border: 'none', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,154,58,0.18), transparent 70%)' }} />
          <span className="label" style={{ color: 'rgba(250,246,236,0.6)' }}>Cumul {currentYear}</span>
          <div className="serif serif-tight" style={{ fontSize: 52, fontWeight: 500, lineHeight: 1, marginTop: 4, color: 'var(--cream)' }}>
            {formatEUR(yearCommission, { decimals: 2 })}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(250,246,236,0.7)', marginTop: 10 }}>
            {yearRides} courses · taux moyen 10%
          </div>
        </Card>
        <Card pad={20}>
          <span className="label">Ce mois</span>
          <div className="serif" style={{ fontSize: 32, fontWeight: 500, marginTop: 2, letterSpacing: '-0.02em' }}>{formatEUR(monthCommission, { decimals: 2 })}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 10 }}>
            {MONTH_LABELS[currentMonth]} {currentYear}
          </div>
        </Card>
        <Card pad={20} style={{ background: 'var(--gold-soft)', borderColor: 'var(--gold)' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="label" style={{ color: 'var(--gold-2)' }}>Prochain versement</span>
            <Icon name="sparkle" size={16} color="var(--gold-2)" />
          </div>
          <div className="serif" style={{ fontSize: 32, fontWeight: 500, marginTop: 2, letterSpacing: '-0.02em' }}>{formatEUR(monthCommission, { decimals: 2 })}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6 }}>
            prévu le <strong>5 du mois prochain</strong>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 10, paddingTop: 10, borderTop: '1px dashed rgba(200,154,58,0.4)' }}>
            Virement automatique sur IBAN enregistré
          </div>
        </Card>
      </div>

      {/* Period + actions */}
      <div className="row" style={{ marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
        <Tabs
          tabs={[{ label: 'Mois', value: 'month' }, { label: 'Année', value: 'year' }]}
          value={period} onChange={setPeriod}
        />
        <div className="spacer" />
        <Btn kind="secondary" size="sm" icon="download">Exporter CSV</Btn>
      </div>

      {/* Bar chart */}
      <Card pad={28} style={{ marginBottom: 18 }}>
        <div className="row" style={{ marginBottom: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="label">Évolution mensuelle</span>
            <h3 className="serif" style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>Commissions {currentYear}</h3>
          </div>
          <div className="row gap-16">
            <div className="row gap-6" style={{ fontSize: 12, color: 'var(--ink-2)' }}>
              <span style={{ width: 10, height: 10, background: 'var(--green-soft)', borderRadius: 2 }} /> Mois passés
            </div>
            <div className="row gap-6" style={{ fontSize: 12, color: 'var(--ink-2)' }}>
              <span style={{ width: 10, height: 10, background: 'var(--gold)', borderRadius: 2 }} /> Mois en cours
            </div>
            <div className="row gap-6" style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              <span style={{ width: 10, height: 10, border: '1px dashed var(--ink-4)', borderRadius: 2, background: 'var(--cream-3)' }} /> À venir
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div className="col" style={{ justifyContent: 'space-between', height: 240, paddingBottom: 24, fontSize: 10.5, color: 'var(--ink-3)', textAlign: 'right', minWidth: 40 }}>
            <span className="mono">{formatEUR(maxEur * 0.9, { decimals: 2 })}</span>
            <span className="mono">{formatEUR(maxEur * 0.6, { decimals: 2 })}</span>
            <span className="mono">{formatEUR(maxEur * 0.3, { decimals: 2 })}</span>
            <span className="mono">0</span>
          </div>
          <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid var(--cream-3)', paddingLeft: 14 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'absolute', left: 14, right: 0, top: i * ((240 - 24) / 3), height: 1, background: 'var(--cream-2)' }} />
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 240, paddingBottom: 24, position: 'relative' }}>
              {monthly.map((d, i) => {
                const future = i > currentMonth;
                const isCurrent = i === currentMonth;
                const barH = future ? 12 : Math.max(8, (d.eur / maxEur) * 200);
                return (
                  <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    {!future && d.eur > 0 && (
                      <div className="mono" style={{ fontSize: 10.5, fontWeight: 600, color: isCurrent ? 'var(--gold-2)' : 'var(--ink-3)' }}>
                        {formatEUR(d.eur, { decimals: 2 })}
                      </div>
                    )}
                    <div style={{
                      width: '100%', maxWidth: 38, height: barH,
                      background: future ? 'var(--cream-3)' : isCurrent ? 'var(--gold)' : 'var(--green-soft)',
                      border: future ? '1px dashed var(--ink-4)' : 'none',
                      borderRadius: 6,
                      boxShadow: isCurrent ? '0 6px 14px rgba(200,154,58,0.35)' : 'none',
                    }} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: -16 }}>
              {monthly.map((d, i) => (
                <div key={d.m} style={{ flex: 1, textAlign: 'center', fontSize: 11, fontWeight: i === currentMonth ? 700 : 500, color: i > currentMonth ? 'var(--ink-4)' : i === currentMonth ? 'var(--gold-2)' : 'var(--ink-2)' }}>
                  {d.m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom split */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
        {/* Versements */}
        <Card pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--cream-2)' }}>
            <h3 className="serif" style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>Versements</h3>
          </div>
          {monthly.filter((_, i) => i <= currentMonth && monthly[i].eur > 0).slice(-4).reverse().map((d, idx) => {
            const isPending = idx === 0;
            return (
              <div key={d.m} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--cream-2)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: isPending ? 'var(--gold-soft)' : 'var(--green-soft)', color: isPending ? 'var(--gold-2)' : 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={isPending ? 'clock' : 'check'} size={16} />
                </div>
                <div className="col" style={{ flex: 1, gap: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{MONTH_LABELS[currentMonth - idx]} {currentYear}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Virement IBAN enregistré</div>
                </div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: isPending ? 'var(--gold-2)' : 'var(--ink)' }}>{formatEUR(d.eur, { decimals: 2 })}</div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: isPending ? 'var(--gold-soft)' : 'var(--cream-2)', color: isPending ? 'var(--gold-2)' : 'var(--ink-2)' }}>
                  {isPending ? 'Prévu' : 'Versé'}
                </span>
              </div>
            );
          })}
          {monthly.every((d) => d.eur === 0) && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>Aucun versement pour le moment.</div>
          )}
        </Card>

        {/* Top destinations */}
        <Card pad={20}>
          <h3 className="serif" style={{ margin: 0, fontSize: 18, fontWeight: 500, marginBottom: 14 }}>Top destinations · {currentYear}</h3>
          {topDests.length === 0 && <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Aucune donnée disponible.</div>}
          {topDests.map((d, i) => (
            <div key={d.name} style={{ marginBottom: 14 }}>
              <div className="row" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                <span className="spacer" />
                <span className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{d.n} courses</span>
                <span style={{ width: 10 }} />
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{formatEUR(d.eur, { decimals: 2 })}</span>
              </div>
              <div style={{ height: 6, background: 'var(--cream-2)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${(d.eur / maxDestEur) * 100}%`, height: '100%', background: i === 0 ? 'var(--gold)' : 'var(--green)', borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
