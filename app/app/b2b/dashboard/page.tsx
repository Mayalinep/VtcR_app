'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Topbar, MobileNav, NotifPopover, Toast } from '../components/shell';
import type { Screen, Notif } from '../components/shell';
import { useBreakpoint } from '../components/useBreakpoint';
import BookingModal from '../components/BookingModal';
import Dashboard from '../components/Dashboard';
import History from '../components/History';
import Commissions from '../components/Commissions';
import Invoices from '../components/Invoices';
import type { Reservation } from '../components/types';

export default function B2BDashboardPage() {
  const router = useRouter();

  // ─── State ────────────────────────────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hotelName, setHotelName] = useState('');
  const [loading, setLoading] = useState(true);
  const { isMobile } = useBreakpoint();

  // ─── Data fetch ──────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      const [meRes, rRes] = await Promise.all([
        fetch('/api/b2b/me'),
        fetch('/api/b2b/reservations'),
      ]);

      if (rRes.status === 401) { router.push('/b2b/login'); return; }

      const [me, rData] = await Promise.all([meRes.json(), rRes.json()]);

      if (me.hotelName) setHotelName(me.hotelName);
      if (rData.reservations) setReservations(rData.reservations);
    } catch {
      // network error — stay on page
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Booking submit ──────────────────────────────────────────────────────
  const handleBookingSubmit = useCallback(async (data: {
    client_name: string; client_phone: string; room: string;
    departure: string; arrival: string;
    date: string; time: string; passengers: number; luggage: number;
    comment: string; estimated_price: number | null;
  }) => {
    setBookingOpen(false);
    try {
      const res = await fetch('/api/b2b/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: data.client_name,
          client_phone: data.client_phone || '',
          departure: data.departure,
          arrival: data.arrival,
          date: data.date,
          time: data.time,
          passengers: data.passengers,
          luggage: data.luggage ?? 0,
          comment: [data.room ? `Ch. ${data.room}` : '', data.comment].filter(Boolean).join(' — '),
          estimated_price: data.estimated_price,
          staff_role: '',
          distance: null,
          duration: null,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('Demande envoyée', `Course pour ${data.client_name} → ${data.arrival}`);
        // Add new reservation to the list
        if (json.reservation) {
          setReservations((prev) => [json.reservation, ...prev]);
          setNotifs((prev) => [{
            id: `n-${Date.now()}`,
            kind: 'pending',
            when: 'à l\'instant',
            title: 'Demande envoyée',
            body: `${data.client_name} → ${data.arrival}`,
            read: false,
          }, ...prev]);
        }
      } else {
        showToast('Erreur', json.error ?? 'Réessayez');
      }
    } catch {
      showToast('Erreur réseau', 'Veuillez réessayer');
    }
  }, []);

  const showToast = (title: string, body: string) => {
    setToast({ title, body });
    setTimeout(() => setToast(null), 4000);
  };

  // ─── Logout ──────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await fetch('/api/b2b/logout', { method: 'POST' });
    router.push('/b2b/login');
  };

  // ─── Screen titles ────────────────────────────────────────────────────────
  const titles: Record<Screen, { eyebrow?: string; title: string }> = {
    dashboard:   { eyebrow: new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), title: 'Bonjour,' },
    history:     { eyebrow: hotelName, title: 'Historique des courses' },
    commissions: { eyebrow: hotelName, title: 'Mes commissions' },
    invoices:    { eyebrow: hotelName, title: 'Facturation' },
    settings:    { eyebrow: hotelName, title: 'Paramètres' },
  };
  const t = titles[screen];
  const unread = notifs.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--cream)' }}>
        <div className="col gap-12" style={{ alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--f-serif)', color: 'var(--gold)', fontSize: 20, fontWeight: 600 }}>R</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Chargement…</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', background: 'var(--cream)', overflow: 'hidden' }}>
      {!isMobile && (
        <Sidebar
          screen={screen}
          hotelName={hotelName || 'Hôtel partenaire'}
          onNav={setScreen}
          onNew={() => setBookingOpen(true)}
          onLogout={handleLogout}
        />
      )}

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <Topbar
          eyebrow={t.eyebrow}
          title={t.title}
          onNew={() => setBookingOpen(true)}
          notifCount={unread}
          onOpenNotifs={() => setNotifsOpen(!notifsOpen)}
          notifsOpen={notifsOpen}
        />

        <div className="b2b-main-scroll" style={{ flex: 1, overflow: 'auto' }}>
          {screen === 'dashboard' && (
            <Dashboard reservations={reservations} onNew={() => setBookingOpen(true)} />
          )}
          {screen === 'history' && (
            <History reservations={reservations} />
          )}
          {screen === 'commissions' && (
            <Commissions reservations={reservations} />
          )}
          {screen === 'invoices' && (
            <Invoices reservations={reservations} />
          )}
          {screen === 'settings' && (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--ink-3)' }}>
              <div className="serif" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 6 }}>Bientôt disponible</div>
              <div style={{ fontSize: 13 }}>Cette section est en cours de production.</div>
            </div>
          )}
        </div>

        {notifsOpen && (
          <NotifPopover
            items={notifs}
            onClose={() => setNotifsOpen(false)}
            onMarkAll={() => setNotifs(notifs.map((n) => ({ ...n, read: true })))}
          />
        )}
      </main>

      {isMobile && (
        <MobileNav screen={screen} onNav={setScreen} onNew={() => setBookingOpen(true)} />
      )}

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onSubmit={handleBookingSubmit}
        hotelName={hotelName}
      />

      {toast && (
        <div className="b2b-toast" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200 }}>
          <Toast title={toast.title} body={toast.body} />
        </div>
      )}
    </div>
  );
}
