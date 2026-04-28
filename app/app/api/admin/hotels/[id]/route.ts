import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/app/lib/supabase';
import { getAdminSession } from '@/app/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const updates: Record<string, unknown> = {};

  if (body.name) updates.name = body.name;
  if (body.commission_rate !== undefined) updates.commission_rate = body.commission_rate;
  if (body.contact_email !== undefined) updates.contact_email = body.contact_email;
  if (body.contact_phone !== undefined) updates.contact_phone = body.contact_phone;
  if (body.password) updates.password_hash = await bcrypt.hash(body.password, 12);

  const { data, error } = await supabaseAdmin
    .from('hotels')
    .update(updates)
    .eq('id', id)
    .select('id, name, commission_rate, contact_email, contact_phone, is_demo, created_at')
    .single();

  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });

  return NextResponse.json({ success: true, hotel: data });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;

  const { error } = await supabaseAdmin.from('hotels').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });

  return NextResponse.json({ success: true });
}
