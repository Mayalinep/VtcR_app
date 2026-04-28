'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Reservation = {
  id: string;
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

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];
const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente', confirmed: 'Confirmée', completed: 'Terminée', cancelled: 'Annulée',
};
const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<'reservations' | 'hotels' | 'commissions'>('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  // État édition réservation
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [savingRes, setSavingRes] = useState(false);

  // État formulaire nouvel hotel
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [hotelForm, setHotelForm] = useState({
    name: '', password: '', commission_rate: 10,
    contact_email: '', contact_phone: '', is_demo: false,
  });
  const [savingHotel, setSavingHotel] = useState(false);

  // État édition hotel
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [editHotelForm, setEditHotelForm] = useState({
    name: '', password: '', commission_rate: 10,
    contact_email: '', contact_phone: '',
  });

  const loadReservations = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/reservations');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    if (data.reservations) setReservations(data.reservations);
    setLoading(false);
  }, [router]);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/hotels');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    if (data.hotels) setHotels(data.hotels);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadReservations();
    loadHotels();
  }, [loadReservations, loadHotels]);

  // ─── Sauvegarder prix final + statut ────────────────────────────────────────
  async function saveReservation(r: Reservation) {
    setSavingRes(true);
    const res = await fetch(`/api/admin/reservations/${r.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        final_price: editPrice !== '' ? Number(editPrice) : r.final_price,
        commission_rate: r.commission_rate,
        status: editStatus || r.status,
      }),
    });
    if (res.ok) {
      setEditingId(null);
      loadReservations();
    }
    setSavingRes(false);
  }

  // ─── Toggle commission payée ─────────────────────────────────────────────────
  async function toggleCommission(r: Reservation) {
    await fetch(`/api/admin/reservations/${r.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commission_paid: !r.commission_paid }),
    });
    loadReservations();
  }

  // ─── Créer un hotel ──────────────────────────────────────────────────────────
  async function createHotel(e: React.FormEvent) {
    e.preventDefault();
    setSavingHotel(true);
    const res = await fetch('/api/admin/hotels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotelForm),
    });
    if (res.ok) {
      setShowHotelForm(false);
      setHotelForm({ name: '', password: '', commission_rate: 10, contact_email: '', contact_phone: '', is_demo: false });
      loadHotels();
    }
    setSavingHotel(false);
  }

  // ─── Modifier un hotel ───────────────────────────────────────────────────────
  function startEditHotel(h: Hotel) {
    setEditingHotelId(h.id);
    setEditHotelForm({ name: h.name, password: '', commission_rate: h.commission_rate, contact_email: h.contact_email ?? '', contact_phone: h.contact_phone ?? '' });
  }

  async function saveHotel(id: string) {
    setSavingHotel(true);
    const body: Record<string, unknown> = {
      name: editHotelForm.name,
      commission_rate: editHotelForm.commission_rate,
      contact_email: editHotelForm.contact_email,
      contact_phone: editHotelForm.contact_phone,
    };
    if (editHotelForm.password) body.password = editHotelForm.password;

    await fetch(`/api/admin/hotels/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setEditingHotelId(null);
    loadHotels();
    setSavingHotel(false);
  }

  async function deleteHotel(id: string) {
    if (!confirm('Supprimer cet hôtel et toutes ses réservations ?')) return;
    await fetch(`/api/admin/hotels/${id}`, { method: 'DELETE' });
    loadHotels();
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  // ─── Calculs commissions ─────────────────────────────────────────────────────
  const totalCommissions = reservations.reduce((s, r) => s + (r.commission_amount ?? 0), 0);
  const paidCommissions = reservations.filter((r) => r.commission_paid).reduce((s, r) => s + (r.commission_amount ?? 0), 0);
  const pendingCommissions = totalCommissions - paidCommissions;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div>
          <p className="font-bold text-lg">🔐 Admin VTC Rachel</p>
          <p className="text-white/50 text-xs">Tableau de bord partenaires B2B</p>
        </div>
        <button onClick={handleLogout} className="text-white/60 hover:text-white text-sm transition-colors">
          Déconnexion
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1 max-w-6xl mx-auto">
          {([
            { key: 'reservations', label: '🚖 Réservations' },
            { key: 'hotels', label: '🏨 Hôtels' },
            { key: 'commissions', label: '💰 Commissions' },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* ─── Onglet Réservations ──────────────────────────────────── */}
        {tab === 'reservations' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Toutes les réservations B2B</h2>
              <button onClick={loadReservations} disabled={loading} className="text-xs text-gray-500 hover:text-gray-800">
                {loading ? 'Chargement...' : '↻ Actualiser'}
              </button>
            </div>

            {reservations.length === 0 && !loading ? (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">Aucune réservation.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {reservations.map((r) => (
                  <div key={r.id} className="px-6 py-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      {/* Infos principales */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-gray-900">{r.client_name}</span>
                          <a href={`tel:${r.client_phone}`} className="text-[#0F4C3A] text-sm hover:underline">{r.client_phone}</a>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">🏨 {r.hotel_name}</span>
                          {r.staff_role && <span className="text-xs text-gray-400">{r.staff_role}</span>}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{r.departure} → {r.arrival}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {r.date} à {r.time} · {r.passengers} passager{r.passengers > 1 ? 's' : ''} · {r.luggage} bagage{r.luggage > 1 ? 's' : ''}
                          {r.comment && ` · "${r.comment}"`}
                        </p>
                      </div>

                      {/* Prix + statut */}
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABEL[r.status] ?? r.status}
                        </span>
                        <p className="text-xs text-gray-400">
                          Estimé : {r.estimated_price ?? '—'}€
                          {r.final_price != null && <span className="ml-2 font-semibold text-gray-800">· Final : {r.final_price}€</span>}
                        </p>
                        {r.commission_amount != null && (
                          <p className="text-xs text-[#0F4C3A] font-medium">
                            Commission : {Number(r.commission_amount).toFixed(2)}€ ({r.commission_rate}%)
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Zone d'édition */}
                    {editingId === r.id ? (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Prix final (€)</label>
                            <input
                              type="number" step="0.01" value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              placeholder={String(r.estimated_price ?? '')}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveReservation(r)}
                            disabled={savingRes}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                          >
                            {savingRes ? 'Sauvegarde...' : 'Sauvegarder'}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            setEditingId(r.id);
                            setEditPrice(String(r.final_price ?? ''));
                            setEditStatus(r.status);
                          }}
                          className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          ✏️ Modifier le prix / statut
                        </button>
                        <button
                          onClick={() => toggleCommission(r)}
                          className={`px-3 py-1.5 text-xs border rounded-lg transition-colors ${
                            r.commission_paid
                              ? 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {r.commission_paid ? '✓ Commission réglée' : '○ Marquer comme réglée'}
                        </button>
                        <a
                          href={`tel:${r.client_phone}`}
                          className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-[#0F4C3A] hover:bg-gray-50 transition-colors"
                        >
                          📞 Appeler le client
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Onglet Hôtels ────────────────────────────────────────── */}
        {tab === 'hotels' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">{hotels.length} hôtel{hotels.length > 1 ? 's' : ''} partenaire{hotels.length > 1 ? 's' : ''}</h2>
              <button
                onClick={() => setShowHotelForm(!showHotelForm)}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                + Ajouter un hôtel
              </button>
            </div>

            {/* Formulaire ajout */}
            {showHotelForm && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Nouvel hôtel partenaire</h3>
                <form onSubmit={createHotel} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Nom de l'hôtel *</label>
                      <input
                        type="text" required value={hotelForm.name}
                        onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                        placeholder="Hôtel du Louvre"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe *</label>
                      <input
                        type="text" required value={hotelForm.password}
                        onChange={(e) => setHotelForm({ ...hotelForm, password: e.target.value })}
                        placeholder="Code d'accès unique"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Commission (%)</label>
                      <input
                        type="number" min={0} max={50} step={0.5} value={hotelForm.commission_rate}
                        onChange={(e) => setHotelForm({ ...hotelForm, commission_rate: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email contact</label>
                      <input
                        type="email" value={hotelForm.contact_email}
                        onChange={(e) => setHotelForm({ ...hotelForm, contact_email: e.target.value })}
                        placeholder="contact@hotel.fr"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Téléphone contact</label>
                      <input
                        type="tel" value={hotelForm.contact_phone}
                        onChange={(e) => setHotelForm({ ...hotelForm, contact_phone: e.target.value })}
                        placeholder="+33 1 00 00 00 00"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox" id="is_demo" checked={hotelForm.is_demo}
                        onChange={(e) => setHotelForm({ ...hotelForm, is_demo: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="is_demo" className="text-sm text-gray-600">Compte démo</label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={savingHotel} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors">
                      {savingHotel ? 'Création...' : "Créer l'hôtel"}
                    </button>
                    <button type="button" onClick={() => setShowHotelForm(false)} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Liste hôtels */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {hotels.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-400 text-sm">Aucun hôtel. Ajoutez-en un ci-dessus.</div>
              ) : hotels.map((h) => (
                <div key={h.id} className="px-6 py-5">
                  {editingHotelId === h.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Nom</label>
                          <input value={editHotelForm.name} onChange={(e) => setEditHotelForm({ ...editHotelForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Nouveau mot de passe (laisser vide = inchangé)</label>
                          <input type="text" value={editHotelForm.password} onChange={(e) => setEditHotelForm({ ...editHotelForm, password: e.target.value })}
                            placeholder="Nouveau code..."
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Commission (%)</label>
                          <input type="number" step={0.5} value={editHotelForm.commission_rate} onChange={(e) => setEditHotelForm({ ...editHotelForm, commission_rate: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Email</label>
                          <input type="email" value={editHotelForm.contact_email} onChange={(e) => setEditHotelForm({ ...editHotelForm, contact_email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Téléphone</label>
                          <input type="tel" value={editHotelForm.contact_phone} onChange={(e) => setEditHotelForm({ ...editHotelForm, contact_phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => saveHotel(h.id)} disabled={savingHotel} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50">
                          {savingHotel ? 'Sauvegarde...' : 'Sauvegarder'}
                        </button>
                        <button onClick={() => setEditingHotelId(null)} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{h.name}</p>
                          {h.is_demo && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Démo</span>}
                          <span className="text-xs bg-[#0F4C3A]/10 text-[#0F4C3A] px-2 py-0.5 rounded-full font-medium">{h.commission_rate}%</span>
                        </div>
                        <div className="mt-1 flex gap-3 text-sm text-gray-500 flex-wrap">
                          {h.contact_email && <a href={`mailto:${h.contact_email}`} className="hover:text-[#0F4C3A]">✉ {h.contact_email}</a>}
                          {h.contact_phone && <a href={`tel:${h.contact_phone}`} className="hover:text-[#0F4C3A]">📞 {h.contact_phone}</a>}
                          {!h.contact_email && !h.contact_phone && <span className="text-gray-400 text-xs">Aucun contact renseigné</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEditHotel(h)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                          ✏️ Modifier
                        </button>
                        <button onClick={() => deleteHotel(h.id)} className="px-3 py-1.5 text-xs border border-red-200 rounded-lg text-red-600 hover:bg-red-50">
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Onglet Commissions ───────────────────────────────────── */}
        {tab === 'commissions' && (
          <div className="space-y-6">
            {/* Totaux */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total commissions dues', value: totalCommissions, color: 'text-gray-900' },
                { label: 'Déjà réglées', value: paidCommissions, color: 'text-green-600' },
                { label: 'En attente de règlement', value: pendingCommissions, color: 'text-[#D4AF37]' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
                  <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                  <p className={`text-3xl font-bold ${s.color}`}>{s.value.toFixed(2)}€</p>
                </div>
              ))}
            </div>

            {/* Tableau détaillé par hotel */}
            {hotels.map((h) => {
              const hotelRes = reservations.filter((r) => r.hotel_name === h.name);
              if (hotelRes.length === 0) return null;
              const hotelTotal = hotelRes.reduce((s, r) => s + (r.commission_amount ?? 0), 0);
              const hotelPaid = hotelRes.filter((r) => r.commission_paid).reduce((s, r) => s + (r.commission_amount ?? 0), 0);

              return (
                <div key={h.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{h.name}</p>
                      <p className="text-xs text-gray-400">{h.commission_rate}% de commission</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{hotelTotal.toFixed(2)}€ total</p>
                      <p className="text-xs text-gray-400">{hotelPaid.toFixed(2)}€ réglé · {(hotelTotal - hotelPaid).toFixed(2)}€ en attente</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Client</th>
                          <th className="px-4 py-3 text-right">Prix final</th>
                          <th className="px-4 py-3 text-right">Commission</th>
                          <th className="px-4 py-3 text-center">Réglée</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {hotelRes.map((r) => (
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                              {new Date(r.created_at).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900">{r.client_name}</p>
                              <p className="text-xs text-gray-400">{r.departure} → {r.arrival}</p>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold">
                              {r.final_price != null ? `${r.final_price}€` : <span className="text-gray-400 font-normal">—</span>}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-[#0F4C3A]">
                              {r.commission_amount != null ? `${Number(r.commission_amount).toFixed(2)}€` : '—'}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => toggleCommission(r)}
                                className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${
                                  r.commission_paid
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                              >
                                {r.commission_paid ? '✓ Réglée' : 'En attente'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
