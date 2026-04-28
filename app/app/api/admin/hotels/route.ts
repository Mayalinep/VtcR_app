import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/app/lib/supabase';
import { getAdminSession } from '@/app/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('hotels')
    .select('id, name, commission_rate, contact_email, contact_phone, is_demo, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });

  return NextResponse.json({ hotels: data });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { name, password, commission_rate, contact_email, contact_phone, is_demo } = await request.json();

    if (!name || !password) {
      return NextResponse.json({ error: 'Nom et mot de passe requis' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { data, error } = await supabaseAdmin
      .from('hotels')
      .insert({ name, password_hash, commission_rate: commission_rate ?? 10, contact_email, contact_phone, is_demo: is_demo ?? false })
      .select('id, name, commission_rate, contact_email, contact_phone, is_demo, created_at')
      .single();

    if (error) return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });

    return NextResponse.json({ success: true, hotel: data });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
