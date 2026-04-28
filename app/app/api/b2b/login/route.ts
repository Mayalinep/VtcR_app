import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/app/lib/supabase';
import { signB2BToken } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { hotelName, password } = await request.json();
    const normalizedHotelName = String(hotelName ?? '').trim();

    if (!normalizedHotelName || !password) {
      return NextResponse.json({ error: 'Nom de l’hôtel et mot de passe requis' }, { status: 400 });
    }

    const { data: hotel, error } = await supabaseAdmin
      .from('hotels')
      .select('id, name, password_hash, commission_rate')
      .ilike('name', normalizedHotelName)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }

    if (!hotel) {
      return NextResponse.json({ error: 'Hôtel introuvable' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, hotel.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    const token = await signB2BToken({
      hotelId: hotel.id,
      hotelName: hotel.name,
    });

    const response = NextResponse.json({
      success: true,
      hotel: { id: hotel.id, name: hotel.name },
    });

    response.cookies.set('b2b_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8h
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
