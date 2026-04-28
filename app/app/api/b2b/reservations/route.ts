import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import { getB2BSession } from '@/app/lib/auth';

export async function GET() {
  const session = await getB2BSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('b2b_reservations')
    .select('*')
    .eq('hotel_id', session.hotelId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });

  return NextResponse.json({ reservations: data });
}

export async function POST(request: NextRequest) {
  const session = await getB2BSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      client_name, client_phone, departure, arrival,
      distance, duration, date, time, passengers,
      luggage, comment, estimated_price, staff_role,
    } = body;

    if (!client_name || !departure || !arrival || !date || !time) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    // Récupérer le taux de commission de l'hotel
    const { data: hotel } = await supabaseAdmin
      .from('hotels')
      .select('commission_rate')
      .eq('id', session.hotelId)
      .single();

    const commissionRate = hotel?.commission_rate ?? 0;

    const { data, error } = await supabaseAdmin
      .from('b2b_reservations')
      .insert({
        hotel_id: session.hotelId,
        hotel_name: session.hotelName,
        client_name,
        client_phone,
        departure,
        arrival,
        distance,
        duration,
        date,
        time,
        passengers: passengers ?? 1,
        luggage: luggage ?? 0,
        comment,
        estimated_price,
        commission_rate: commissionRate,
        staff_role,
        status: 'pending',
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });

    // Notifier Rachel par email
    const resendApiKey = process.env.RESEND_API_KEY;
    const rachelEmail = process.env.RACHEL_EMAIL;

    if (resendApiKey && rachelEmail) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'VTC Rachel B2B <onboarding@resend.dev>',
          to: [rachelEmail],
          subject: `🏨 Réservation B2B — ${session.hotelName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0F4C3A;">🏨 Nouvelle réservation B2B</h2>
              <p><strong>Hôtel :</strong> ${session.hotelName}</p>
              <hr/>
              <p><strong>Client :</strong> ${client_name} — ${client_phone}</p>
              <p><strong>Trajet :</strong> ${departure} → ${arrival}</p>
              <p><strong>Date :</strong> ${date} à ${time}</p>
              <p><strong>Passagers :</strong> ${passengers} | Bagages : ${luggage}</p>
              ${comment ? `<p><strong>Commentaire :</strong> ${comment}</p>` : ''}
              <div style="background: #0F4C3A; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <strong>Prix estimé : ${estimated_price}€</strong><br/>
                Commission hôtel (${commissionRate}%) : ${((estimated_price ?? 0) * commissionRate / 100).toFixed(2)}€
              </div>
              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" style="background: #D4AF37; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                  Voir dans l'admin →
                </a>
              </p>
            </div>
          `,
        }),
      }).catch(() => null);
    }

    return NextResponse.json({ success: true, reservation: data });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
