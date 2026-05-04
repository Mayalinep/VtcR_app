'use client';

import { useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

const T = {
  green:    '#1F3A30',
  greenDeep:'#162A22',
  gold:     '#C89A3A',
  cream:    '#FAF6EC',
  creamDeep:'#F3EEDF',
  paper:    '#FFFFFF',
  ink:      '#1F1D1A',
  ink2:     '#4A463F',
  ink3:     '#7A746A',
  line:     '#E3DDC9',
  red:      '#9A3A2A',
  redSoft:  '#F4DDD5',
};

const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";
const mono  = "'JetBrains Mono', ui-monospace, monospace";

function LockIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>
      ) : (
        <><path d="M17.94 17.94A10 10 0 0112 19c-6 0-10-7-10-7a18 18 0 015.06-5.94" /><path d="M9.9 4.24A9 9 0 0112 4c6 0 10 7 10 7a18 18 0 01-3.68 4.26" /><line x1="1" y1="1" x2="23" y2="23" /></>
      )}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Mot de passe incorrect'); return; }
      router.push('/admin/dashboard');
    } catch {
      setError('Erreur réseau, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: CSSProperties = {
    width: '100%', padding: '13px 14px 13px 44px',
    border: `1px solid ${T.line}`, borderRadius: 8,
    fontFamily: sans, fontSize: 15, color: T.ink,
    background: T.paper, outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100dvh', background: T.creamDeep, fontFamily: sans, display: 'flex', flexDirection: 'column' }}>

      {/* Mobile: top green band */}
      <div style={{
        background: `linear-gradient(155deg, ${T.greenDeep} 0%, ${T.green} 70%)`,
        padding: '48px 28px 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ornement */}
        <svg style={{ position: 'absolute', right: -80, top: -80, opacity: 0.07 }} width="320" height="320" viewBox="0 0 320 320">
          <circle cx="160" cy="160" r="140" fill="none" stroke={T.gold} strokeWidth="1" />
          <circle cx="160" cy="160" r="100" fill="none" stroke={T.gold} strokeWidth="1" />
          <circle cx="160" cy="160" r="60" fill="none" stroke={T.gold} strokeWidth="1" />
        </svg>

        {/* Logo */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.green, border: `1px solid ${T.gold}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: serif, fontWeight: 700, fontSize: 20, color: T.gold, boxShadow: 'inset 0 0 0 1px rgba(200,154,58,0.35)' }}>R</div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, color: T.cream, letterSpacing: 0.2 }}>VTC Rachel</div>
            <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 500, color: `rgba(250,246,236,0.5)`, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 1 }}>Espace administration</div>
          </div>
        </div>

        <h1 style={{ margin: 0, fontFamily: serif, fontSize: 36, fontWeight: 500, lineHeight: 1.15, letterSpacing: -0.5, color: T.cream }}>
          Bonjour Rachel.<br />
          <span style={{ color: T.gold }}>Pilotez votre activité</span>
          <br />en toute sérénité.
        </h1>
      </div>

      {/* Form card */}
      <div style={{ flex: 1, padding: '32px 24px 48px' }}>
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: T.gold, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 8 }}>
            Connexion
          </div>
          <h2 style={{ margin: '0 0 6px', fontFamily: serif, fontSize: 26, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>
            Bon retour parmi nous.
          </h2>
          <p style={{ margin: '0 0 28px', fontFamily: sans, fontSize: 13.5, color: T.ink2 }}>
            Entrez votre mot de passe pour accéder au tableau de bord.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontFamily: sans, fontSize: 11, fontWeight: 600, color: T.ink2, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
                Mot de passe <span style={{ color: T.red }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.ink3, display: 'flex' }}>
                  <LockIcon />
                </span>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoFocus
                  style={{ ...inputStyle, paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.ink3, display: 'flex', padding: 4 }}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px 14px', background: T.redSoft, border: `1px solid ${T.red}33`, borderRadius: 8, fontFamily: sans, fontSize: 13, color: T.red }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '15px 20px', marginTop: 4,
                background: password && !loading ? T.gold : T.creamDeep,
                border: 'none', borderRadius: 10,
                fontFamily: sans, fontSize: 15, fontWeight: 700,
                color: password && !loading ? T.greenDeep : T.ink3,
                cursor: password && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.18s ease',
                minHeight: 52,
              }}
            >
              {loading ? 'Connexion…' : 'Accéder au tableau de bord'}
              {!loading && <ArrowIcon />}
            </button>
          </form>

          {/* Security note */}
          <div style={{ marginTop: 28, padding: '12px 14px', background: T.paper, border: `1px solid ${T.line}`, borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" />
            </svg>
            <p style={{ margin: 0, fontFamily: sans, fontSize: 12, color: T.ink2, lineHeight: 1.55 }}>
              Accès réservé à l'administratrice. Vos données sont sécurisées.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: split layout override via media queries not needed — mobile first is fine */}
      <style>{`
        @media (min-width: 768px) {
          body { background: ${T.creamDeep}; }
        }
      `}</style>
    </div>
  );
}
