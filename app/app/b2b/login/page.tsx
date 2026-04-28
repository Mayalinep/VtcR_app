'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon, Logo, Btn, Field } from '../components/ui';

export default function B2BLoginPage() {
  const router = useRouter();
  const [hotelName, setHotelName] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/b2b/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotelName, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Erreur de connexion'); return; }
      router.push('/b2b/dashboard');
    } catch {
      setError('Erreur réseau, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', background: 'var(--cream)' }}>
      {/* Hero side */}
      <div style={{ flex: '1.05', position: 'relative', overflow: 'hidden', background: 'var(--green)', color: 'var(--cream)' }}>
        <Image
          src="/images/hotel_paris.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* Voile vert */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,39,31,0.62)', mixBlendMode: 'multiply' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,39,31,0.55) 0%, rgba(31,58,48,0.30) 45%, rgba(42,74,62,0.20) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,39,31,0.85) 0%, rgba(20,39,31,0.30) 45%, rgba(20,39,31,0.10) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 480px at 80% 25%, rgba(200,154,58,0.18), transparent 60%)' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: 56, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Logo size={42} variant="lockup" light={false} />
          <div style={{ maxWidth: 460 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', background: 'rgba(200,154,58,0.14)',
              border: '1px solid rgba(200,154,58,0.4)', color: 'var(--gold)',
              borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 22,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
              Service Premium · Île-de-France
            </div>
            <h1 className="serif serif-tight" style={{ fontSize: 64, fontWeight: 400, lineHeight: 1.02, margin: 0, color: 'var(--cream)' }}>
              Espace<br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>partenaires.</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(250,246,236,0.78)', marginTop: 22, maxWidth: 420 }}>
              Réservez les courses VTC de vos clients en quelques secondes, suivez les chauffeurs en temps réel, et touchez votre commission sur chaque trajet validé.
            </p>
          </div>
          <div className="row gap-24" style={{ fontSize: 12, color: 'rgba(250,246,236,0.55)' }}>
            <span className="row gap-6"><Icon name="checkCircle" size={14} color="var(--gold)" /> Validation manuelle des prix</span>
            <span className="row gap-6"><Icon name="checkCircle" size={14} color="var(--gold)" /> Versement mensuel</span>
            <span className="row gap-6"><Icon name="checkCircle" size={14} color="var(--gold)" /> Support 7j/7</span>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, position: 'relative' }}>
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="label" style={{ marginBottom: 8 }}>Connexion partenaire</div>
            <h2 className="serif serif-tight" style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: 1.1 }}>Bonjour,</h2>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>
              Connectez-vous pour réserver une course pour un de vos clients.
            </p>
          </div>

          <div className="col gap-16">
            <Field
              label="Nom de l'hôtel"
              icon="door"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="Hôtel Lutétia"
            />
            <Field
              label="Mot de passe"
              icon="hash"
              type={showPwd ? 'text' : 'password'}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="••••••••"
              suffix={
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
                  <Icon name={showPwd ? 'eyeOff' : 'eye'} size={16} color="var(--ink-3)" />
                </button>
              }
            />
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <label className="row gap-8" style={{ cursor: 'pointer', fontSize: 13, color: 'var(--ink-2)' }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--green)' }} />
                Se souvenir de cet appareil
              </label>
            </div>
          </div>

          {error && (
            <div style={{ padding: '12px 14px', background: 'rgba(154,58,42,0.08)', border: '1px solid rgba(154,58,42,0.2)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--danger)' }}>
              {error}
            </div>
          )}

          <Btn kind="primary" size="lg" full type="submit" iconRight="arrowRight" disabled={loading || !hotelName.trim() || !pwd}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </Btn>

          <div style={{ padding: 14, background: 'var(--cream-2)', border: '1px solid var(--cream-3)', borderRadius: 'var(--r-md)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            Pas encore de compte ? Contactez Rachel directement au <strong style={{ color: 'var(--ink)' }}>06 61 59 02 90</strong> pour rejoindre le programme partenaires.
          </div>
        </form>

        <div style={{ position: 'absolute', bottom: 24, right: 28, fontSize: 11, color: 'var(--ink-3)' }}>
          © {new Date().getFullYear()} Rachel VTC
        </div>
      </div>
    </div>
  );
}
