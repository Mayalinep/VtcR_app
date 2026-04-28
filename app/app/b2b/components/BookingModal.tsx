'use client';
import React, { useState, useMemo } from 'react';
import { Icon, Btn, Field, formatEUR } from './ui';
import { DESTINATIONS } from './types';

type BookingData = {
  client_name: string;
  client_phone: string;
  room: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: number;
  comment: string;
  estimated_price: number | null;
};

export default function BookingModal({
  open, onClose, onSubmit, hotelName,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
  hotelName: string;
}) {
  const defaultDeparture = hotelName ? `${hotelName}` : 'Hôtel';
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [room, setRoom] = useState('');
  const [from, setFrom] = useState(defaultDeparture);
  const [to, setTo] = useState('');
  const [toMatch, setToMatch] = useState<(typeof DESTINATIONS)[0] | null>(null);
  const [showSuggest, setShowSuggest] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pax, setPax] = useState(1);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (open) {
      setClient(''); setPhone(''); setRoom('');
      setTo(''); setToMatch(null); setDate(''); setTime(''); setPax(1); setNote('');
      setSubmitting(false);
      setFrom(defaultDeparture);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const matches = useMemo(() => {
    if (!to || to.length < 2) return [];
    const q = to.toLowerCase();
    return DESTINATIONS.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 6);
  }, [to]);

  const dest = toMatch ?? (matches.length === 1 ? matches[0] : null);
  const price = dest?.price ?? null;
  const comm = price ? Math.round(price * 0.10 * 100) / 100 : null;
  const canSubmit = client && to && date && time;

  const submit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        client_name: client,
        client_phone: phone,
        room,
        departure: from,
        arrival: dest?.name || to,
        date,
        time,
        passengers: pax,
        comment: note,
        estimated_price: price,
      });
    }, 400);
  };

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(20,39,31,0.45)', backdropFilter: 'blur(3px)',
        animation: 'b2b-fadeIn 200ms var(--ease)',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 'min(780px, calc(100vw - 48px))',
        maxHeight: 'calc(100vh - 48px)',
        zIndex: 101,
        background: 'var(--cream)', borderRadius: 'var(--r-xl)',
        boxShadow: 'var(--sh-modal)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        animation: 'b2b-fadeUp 240ms var(--ease)',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px 18px', borderBottom: '1px solid var(--cream-3)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="label">Nouvelle réservation</span>
            <h2 className="serif serif-tight" style={{ margin: 0, fontSize: 28, fontWeight: 500 }}>Réserver une course</h2>
          </div>
          <button type="button" onClick={onClose} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--cream-2)', border: '1px solid var(--cream-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><Icon name="x" size={16} /></button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {/* Section 1 — Client */}
          <div style={{ marginBottom: 22 }}>
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--f-serif)' }}>1</span>
              <span className="label">Client</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 14 }}>
              <Field label="Nom du client" placeholder="M. Dupont, Mme Chen…" value={client} onChange={(e) => setClient(e.target.value)} icon="user" autoFocus />
              <Field label="Chambre" placeholder="412" value={room} onChange={(e) => setRoom(e.target.value)} icon="door" />
              <Field label="Téléphone (optionnel)" placeholder="+33 6…" value={phone} onChange={(e) => setPhone(e.target.value)} icon="users" />
            </div>
          </div>

          {/* Section 2 — Trajet */}
          <div style={{ marginBottom: 22 }}>
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--f-serif)' }}>2</span>
              <span className="label">Trajet</span>
            </div>
            <div className="col" style={{ gap: 10 }}>
              <Field label="Prise en charge" value={from} onChange={(e) => setFrom(e.target.value)} icon="pin" hint="Adresse de l'hôtel par défaut" />
              <div style={{ position: 'relative' }}>
                <Field
                  label="Destination" placeholder="Aéroport, gare, adresse…"
                  value={to}
                  onChange={(e) => { setTo(e.target.value); setToMatch(null); setShowSuggest(true); }}
                  onFocus={() => setShowSuggest(true)}
                  onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                  icon="flag" accent="gold"
                />
                {showSuggest && matches.length > 0 && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10,
                    background: 'var(--paper)', border: '1px solid var(--cream-3)',
                    borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-2)', overflow: 'hidden',
                  }}>
                    {matches.map((m, i) => (
                      <div key={m.name}
                        onMouseDown={() => { setTo(m.name); setToMatch(m); setShowSuggest(false); }}
                        style={{
                          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
                          cursor: 'pointer', borderTop: i === 0 ? 'none' : '1px solid var(--cream-2)',
                          background: 'transparent',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--cream-2)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Icon name={m.cat === 'aéroport' ? 'flag' : 'pin'} size={14} color="var(--gold-2)" />
                        <span style={{ fontSize: 13, flex: 1 }}>{m.name}</span>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>~{formatEUR(m.price)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 14 }}>
              <Field label="Date" icon="calendar" value={date} onChange={(e) => setDate(e.target.value)} type="date" />
              <Field label="Heure" icon="clock" value={time} onChange={(e) => setTime(e.target.value)} type="time" />
              <Field label="Passagers" icon="users" value={pax} onChange={(e) => setPax(+e.target.value)} type="number" />
            </div>
          </div>

          {/* Estimate */}
          <div style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, var(--green-12), var(--green))',
            color: 'var(--cream)', borderRadius: 'var(--r-lg)',
            display: 'flex', alignItems: 'center', gap: 20,
            marginBottom: 18,
          }}>
            <div className="col" style={{ flex: 1, gap: 4 }}>
              <span className="label" style={{ color: 'rgba(250,246,236,0.6)' }}>Estimation</span>
              <div className="row gap-12" style={{ alignItems: 'baseline' }}>
                <span className="serif" style={{ fontSize: 36, fontWeight: 500, color: 'var(--cream)', letterSpacing: '-0.02em' }}>
                  {price ? `~${formatEUR(price)}` : '—'}
                </span>
              </div>
              <div className="row gap-6" style={{ fontSize: 12.5, marginTop: 4, color: 'rgba(244,233,200,0.85)' }}>
                <Icon name="sparkle" size={12} color="var(--gold)" />
                Commission estimée : <strong style={{ color: 'var(--gold)' }}>{comm ? formatEUR(comm, { decimals: 2 }) : '—'}</strong>
              </div>
            </div>
            <div style={{ width: 160, height: 90, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(250,246,236,0.15)' }}>
              <svg viewBox="0 0 160 90" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <rect width="160" height="90" fill="#243A30" />
                <path d="M0,32 Q 48,26 88,42 T 160,38" stroke="rgba(250,246,236,0.10)" strokeWidth="1" fill="none" />
                <path d="M0,66 Q 56,58 104,72 T 160,68" stroke="rgba(250,246,236,0.10)" strokeWidth="1" fill="none" />
                <path d="M24,68 Q 64,62 88,42 T 134,22" stroke="var(--gold)" strokeWidth="2" fill="none" strokeDasharray="3 4" />
                <circle cx="24" cy="68" r="4" fill="var(--gold)" stroke="var(--cream)" strokeWidth="1.5" />
                <circle cx="134" cy="22" r="4" fill="var(--cream)" stroke="var(--gold)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Note */}
          <Field label="Note interne (optionnel)" placeholder="Vol AF1234, siège bébé, contact réception…" value={note} onChange={(e) => setNote(e.target.value)} multiline rows={2} icon="note" />
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--cream-3)', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', maxWidth: 360 }}>
            Le prix final sera <strong style={{ color: 'var(--ink)' }}>validé par Rachel</strong> avant la course. Vous serez notifié·e.
          </div>
          <div className="row gap-10">
            <Btn kind="secondary" onClick={onClose}>Annuler</Btn>
            <Btn kind="primary" iconRight="arrowRight" onClick={submit} disabled={!canSubmit || submitting}>
              {submitting ? 'Envoi…' : 'Envoyer la demande'}
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}
