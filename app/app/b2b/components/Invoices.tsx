'use client';
import React, { useState, useMemo } from 'react';
import { Icon, Card, Tabs, Btn, Field, formatEUR } from './ui';
import { useBreakpoint } from './useBreakpoint';
import type { Reservation } from './types';

type Invoice = {
  id: string; date: string; period: string; rides: number; eur: number;
  status: 'pending' | 'paid' | 'request';
  paidOn?: string;
};

const STATUS_INV = {
  pending: { label: 'En attente', bg: 'rgba(200,154,58,0.14)', fg: 'var(--gold-2)', dot: 'var(--gold)' },
  paid:    { label: 'Versé',     bg: 'rgba(31,58,48,0.08)',   fg: 'var(--green)',   dot: 'var(--green)' },
  request: { label: 'Demandé',   bg: 'rgba(31,58,48,0.06)',   fg: 'var(--ink-2)',   dot: 'var(--ink-3)' },
};

function InvPill({ status }: { status: Invoice['status'] }) {
  const s = STATUS_INV[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.fg, fontSize: 11, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
      {s.label}
    </span>
  );
}

const iconBtn: React.CSSProperties = {
  width: 30, height: 30, borderRadius: 6,
  background: 'var(--paper)', border: '1px solid var(--cream-3)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: 'var(--ink-2)',
};

// ─── Payout modal ────────────────────────────────────────────────────────────

function PayoutModal({ open, onClose, onSubmit, balance, invoice }: {
  open: boolean; onClose: () => void; onSubmit: (d: { amount: number }) => void;
  balance: number; invoice?: Invoice;
}) {
  const [amount, setAmount] = useState(balance);
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');
  const [accept, setAccept] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (open) { setAmount(balance); setSpeed('standard'); setAccept(false); setSubmitting(false); }
  }, [open, balance]);

  const fee = speed === 'express' ? 4.50 : 0;
  const net = Math.max(0, amount - fee);
  const canSubmit = amount > 0 && amount <= balance && accept;

  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,39,31,0.45)', backdropFilter: 'blur(3px)', animation: 'b2b-fadeIn 200ms var(--ease)' }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 'min(720px, calc(100vw - 48px))', height: 'min(820px, calc(100vh - 48px))',
        zIndex: 101, background: 'var(--cream)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-modal)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'b2b-fadeUp 240ms var(--ease)',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px 18px', borderBottom: '1px solid var(--cream-3)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="label">Versement de commissions</span>
            <h2 className="serif serif-tight" style={{ margin: 0, fontSize: 28, fontWeight: 500 }}>Demander un versement</h2>
          </div>
          <button type="button" onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--cream-2)', border: '1px solid var(--cream-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {/* Balance hero */}
          <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, var(--green-12), var(--green))', color: 'var(--cream)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div className="col" style={{ gap: 3 }}>
              <span className="label" style={{ color: 'rgba(250,246,236,0.6)' }}>Solde disponible</span>
              <div className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--cream)', letterSpacing: '-0.02em' }}>{formatEUR(balance, { decimals: 2 })}</div>
              {invoice && <div style={{ fontSize: 11.5, color: 'rgba(250,246,236,0.65)', marginTop: 2 }}>Facture {invoice.id} · {invoice.period}</div>}
            </div>
            <div style={{ padding: '6px 12px', background: 'rgba(200,154,58,0.18)', border: '1px solid rgba(200,154,58,0.35)', borderRadius: 999, color: 'var(--gold)', fontSize: 11, fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', marginRight: 6 }} />
              Prêt à verser
            </div>
          </div>

          {/* Section 1 */}
          <div style={{ marginBottom: 22 }}>
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>1</span>
              <span className="label">Montant</span>
            </div>
            <Field label="Montant à verser (€)" icon="euro" type="number" value={amount} onChange={(e) => setAmount(Math.min(balance, Math.max(0, +e.target.value)))} />
            <div className="row gap-8" style={{ marginTop: 10 }}>
              {[
                { label: `Tout (${formatEUR(balance, { decimals: 2 })})`, val: balance },
                { label: '50%', val: Math.round(balance / 2 * 100) / 100 },
                { label: '500 €', val: 500 },
              ].map((chip) => (
                <button key={chip.label} type="button" onClick={() => setAmount(Math.min(balance, chip.val))} style={{
                  padding: '6px 12px', borderRadius: 999,
                  background: amount === chip.val ? 'var(--green)' : 'var(--paper)',
                  border: `1px solid ${amount === chip.val ? 'var(--green)' : 'var(--cream-3)'}`,
                  color: amount === chip.val ? 'var(--cream)' : 'var(--ink-2)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>{chip.label}</button>
              ))}
            </div>
          </div>

          {/* Section 2 — Speed */}
          <div style={{ marginBottom: 22 }}>
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>2</span>
              <span className="label">Délai de versement</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { v: 'standard' as const, title: 'Standard', desc: 'Sous 2 jours ouvrés', fee: 'Gratuit' },
                { v: 'express'  as const, title: 'Express',  desc: "Aujourd'hui avant 18h", fee: '+ 4,50 €' },
              ].map((opt) => {
                const checked = speed === opt.v;
                return (
                  <label key={opt.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: checked ? 'rgba(31,58,48,0.05)' : 'var(--paper)', border: `1px solid ${checked ? 'var(--green)' : 'var(--cream-3)'}`, borderRadius: 'var(--r-md)', cursor: 'pointer' }}>
                    <input type="radio" name="speed" checked={checked} onChange={() => setSpeed(opt.v)} style={{ width: 16, height: 16, accentColor: 'var(--green)', marginTop: 2, flexShrink: 0 }} />
                    <div className="col" style={{ gap: 2, flex: 1 }}>
                      <div className="row" style={{ justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600 }}>{opt.title}</span>
                        <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: opt.v === 'express' ? 'var(--gold-2)' : 'var(--green)' }}>{opt.fee}</span>
                      </div>
                      <span style={{ fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.4 }}>{opt.desc}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div style={{ padding: 16, background: 'var(--cream-2)', border: '1px solid var(--cream-3)', borderRadius: 'var(--r-md)' }}>
            <div className="label" style={{ marginBottom: 8 }}>Récapitulatif</div>
            <div className="col gap-6" style={{ fontSize: 13 }}>
              <div className="row"><span style={{ color: 'var(--ink-2)' }}>Montant demandé</span><span className="spacer" /><span className="mono" style={{ fontWeight: 600 }}>{formatEUR(amount, { decimals: 2 })}</span></div>
              <div className="row"><span style={{ color: 'var(--ink-2)' }}>Frais</span><span className="spacer" /><span className="mono" style={{ fontWeight: 600, color: fee > 0 ? 'var(--gold-2)' : 'var(--green)' }}>{fee > 0 ? `− ${formatEUR(fee, { decimals: 2 })}` : 'Gratuit'}</span></div>
              <div style={{ borderTop: '1px dashed var(--cream-3)', margin: '4px 0' }} />
              <div className="row" style={{ alignItems: 'baseline' }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>Vous recevrez</span>
                <span className="spacer" />
                <span className="serif" style={{ fontSize: 24, fontWeight: 500, color: 'var(--green)', letterSpacing: '-0.02em' }}>{formatEUR(net, { decimals: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Consent */}
          <label className="row gap-10" style={{ marginTop: 16, cursor: 'pointer', alignItems: 'flex-start' }}>
            <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--green)', marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
              Je certifie que les coordonnées bancaires sont exactes et j&apos;accepte les conditions de versement du programme partenaires Rachel VTC.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--cream-3)', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', maxWidth: 320 }}>
            Une demande engage <strong style={{ color: 'var(--ink)' }}>Rachel VTC</strong> à effectuer le virement dans le délai annoncé.
          </div>
          <div className="row gap-10">
            <Btn kind="secondary" onClick={onClose}>Annuler</Btn>
            <Btn kind="primary" iconRight="arrowRight" onClick={() => { setSubmitting(true); setTimeout(() => onSubmit({ amount }), 700); }} disabled={!canSubmit || submitting}>
              {submitting ? 'Envoi…' : `Confirmer ${formatEUR(net, { decimals: 0 })}`}
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Invoices screen ─────────────────────────────────────────────────────────

export default function Invoices({ reservations }: { reservations: Reservation[] }) {
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState<string | null>(null);

  const now = new Date();

  // Build invoice list from reservations grouped by month
  const invoices: Invoice[] = useMemo(() => {
    const map = new Map<string, { rides: number; eur: number }>();
    reservations.forEach((r) => {
      const d = new Date(r.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const cur = map.get(key) ?? { rides: 0, eur: 0 };
      map.set(key, { rides: cur.rides + 1, eur: cur.eur + (r.commission_amount ?? 0) });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, v], idx) => {
        const [y, m] = key.split('-').map(Number);
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const isCurrent = y === now.getFullYear() && m - 1 === now.getMonth();
        return {
          id: `FAC-${key}`,
          date: `5 ${months[m - 1]} ${y}`,
          period: `${months[m - 1]} ${y}`,
          rides: v.rides,
          eur: v.eur,
          status: (isCurrent ? 'pending' : 'paid') as Invoice['status'],
          paidOn: isCurrent ? undefined : `5 ${months[m - 1]} ${y}`,
        };
      });
  }, [reservations]);

  const [rows, setRows] = useState<Invoice[]>([]);
  React.useEffect(() => { if (invoices.length > 0 && rows.length === 0) setRows(invoices); }, [invoices]);
  const displayRows = rows.length > 0 ? rows : invoices;

  const filtered = useMemo(() => {
    if (filter === 'all') return displayRows;
    return displayRows.filter((r) => r.status === filter);
  }, [displayRows, filter]);

  const pending = displayRows.find((r) => r.status === 'pending');
  const availableBalance = pending?.eur ?? 0;
  const ytdPaid = displayRows.filter((r) => r.status === 'paid' && r.id.includes(String(now.getFullYear()))).reduce((s, r) => s + r.eur, 0);

  const handlePayoutSubmit = (data: { amount: number }) => {
    setPayoutOpen(false);
    setRows((cur) => cur.map((r) => r.status === 'pending' ? { ...r, status: 'request' as const, date: 'Demande envoyée' } : r));
    setToast(`Demande de ${formatEUR(data.amount, { decimals: 2 })} envoyée · réception sous 2 jours`);
    setTimeout(() => setToast(null), 4500);
  };

  const { isMobile } = useBreakpoint();

  return (
    <div style={{ padding: isMobile ? '14px 12px 32px' : '20px 28px 40px' }}>
      {/* Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
        <Card pad={26} style={{ background: 'linear-gradient(135deg, var(--green-12), var(--green))', border: 'none', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -50, top: -50, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,154,58,0.20), transparent 70%)' }} />
          <div className="row gap-8">
            <span className="label" style={{ color: 'rgba(250,246,236,0.6)' }}>Solde disponible</span>
            {availableBalance > 0 && pending?.status !== 'request' && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'rgba(200,154,58,0.2)', color: 'var(--gold)', letterSpacing: '0.03em' }}>PRÊT À VERSER</span>
            )}
          </div>
          <div className="serif serif-tight" style={{ fontSize: 52, fontWeight: 500, lineHeight: 1, marginTop: 6, color: 'var(--cream)' }}>
            {formatEUR(Math.floor(availableBalance))}
            {availableBalance > 0 && <span style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 400 }}>,{String(Math.round((availableBalance % 1) * 100)).padStart(2, '0')}</span>}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(250,246,236,0.7)', marginTop: 10 }}>
            {pending ? `${pending.rides} courses · ${pending.period}` : 'Aucune commission en attente'}
          </div>
          <div className="row gap-10" style={{ marginTop: 18 }}>
            <Btn kind="primary" iconRight="arrowRight" onClick={() => setPayoutOpen(true)} disabled={availableBalance <= 0 || pending?.status === 'request'}>
              {pending?.status === 'request' ? 'Demande en cours' : 'Demander un versement'}
            </Btn>
          </div>
        </Card>
        <Card pad={20}>
          <span className="label">Versé en {now.getFullYear()}</span>
          <div className="serif" style={{ fontSize: 32, fontWeight: 500, marginTop: 2, letterSpacing: '-0.02em' }}>{formatEUR(ytdPaid, { decimals: 0 })}</div>
          <div className="row gap-6" style={{ marginTop: 10, fontSize: 12.5, color: 'var(--ink-2)' }}>
            <Icon name="check" size={14} color="var(--green)" />
            {displayRows.filter((r) => r.status === 'paid').length} factures réglées
          </div>
        </Card>
        <Card pad={20} style={{ background: 'var(--cream-2)' }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="label">Coordonnées bancaires</span>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>IBAN enregistré</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Contactez Rachel pour modifier</div>
          </div>
          <Icon name="check" size={18} color="var(--green)" style={{ position: 'absolute', top: 20, right: 20 }} />
        </Card>
      </div>

      {/* Filters */}
      <div className="row" style={{ marginBottom: 14, gap: 10 }}>
        <Tabs
          tabs={[
            { label: `Tout (${displayRows.length})`, value: 'all' },
            { label: 'En attente', value: 'pending' },
            { label: 'Demandé', value: 'request' },
            { label: 'Versé', value: 'paid' },
          ]}
          value={filter} onChange={setFilter}
        />
        <div className="spacer" />
        <Btn kind="secondary" size="sm" icon="download">Exporter CSV</Btn>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
      <Card pad={0} style={{ overflow: 'visible', minWidth: isMobile ? 620 : 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px 140px 140px 120px', padding: '12px 20px', background: 'var(--cream-2)', borderBottom: '1px solid var(--cream-3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          <div>N° facture</div><div>Période</div><div style={{ textAlign: 'right' }}>Courses</div><div style={{ textAlign: 'right' }}>Montant</div><div>Statut</div><div style={{ textAlign: 'right' }}>Actions</div>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>Aucune facture pour ce filtre.</div>
        )}
        {filtered.map((inv, i) => (
          <div key={inv.id} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px 140px 140px 120px', padding: '14px 20px', alignItems: 'center', borderTop: i === 0 ? 'none' : '1px solid var(--cream-2)', background: inv.status === 'pending' ? 'rgba(200,154,58,0.04)' : 'transparent' }}>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{inv.id}</div>
            <div className="col" style={{ gap: 2 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{inv.period}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>
                {inv.status === 'paid' ? `Versé le ${inv.paidOn}` : inv.status === 'pending' ? `Versement prévu : ${inv.date}` : inv.date}
              </div>
            </div>
            <div className="mono" style={{ fontSize: 13, fontWeight: 600, textAlign: 'right', color: 'var(--ink-2)' }}>{inv.rides}</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', color: inv.status === 'pending' ? 'var(--gold-2)' : 'var(--ink)' }}>{formatEUR(inv.eur, { decimals: 2 })}</div>
            <div><InvPill status={inv.status} /></div>
            <div className="row gap-6" style={{ justifyContent: 'flex-end' }}>
              <button type="button" style={iconBtn} title="Voir"><Icon name="eye" size={14} /></button>
              <button type="button" style={iconBtn} title="Télécharger"><Icon name="download" size={14} /></button>
            </div>
          </div>
        ))}
      </Card>
      </div>

      <div style={{ marginTop: 18, padding: 14, background: 'var(--cream-2)', border: '1px solid var(--cream-3)', borderRadius: 'var(--r-md)', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Icon name="checkCircle" size={14} color="var(--gold-2)" />
        <span>Vos factures sont émises automatiquement le 1<sup>er</sup> de chaque mois. Le versement standard a lieu le <strong style={{ color: 'var(--ink)' }}>5 du mois</strong>.</span>
      </div>

      <PayoutModal open={payoutOpen} onClose={() => setPayoutOpen(false)} onSubmit={handlePayoutSubmit} balance={availableBalance} invoice={pending} />

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, padding: '14px 16px', minWidth: 320, background: 'var(--green)', color: 'var(--cream)', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-3)', display: 'flex', gap: 12, animation: 'b2b-fadeUp 280ms var(--ease)', borderLeft: '3px solid var(--gold)' }}>
          <Icon name="check" size={16} stroke={2.5} color="var(--gold)" />
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{toast}</div>
        </div>
      )}
    </div>
  );
}
