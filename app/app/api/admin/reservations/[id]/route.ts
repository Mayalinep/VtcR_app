import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import { getAdminSession } from '@/app/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.estimated_price !== undefined) {
    updates.estimated_price = body.estimated_price;
    if (body.commission_rate !== undefined) {
      updates.commission_amount = (body.estimated_price * body.commission_rate) / 100;
    }
  }
  if (body.final_price !== undefined) {
    updates.final_price = body.final_price;
    // Recalculer la commission sur le prix final
    if (body.commission_rate !== undefined) {
      updates.commission_amount = (body.final_price * body.commission_rate) / 100;
    }
  }
  if (body.commission_paid !== undefined) updates.commission_paid = body.commission_paid;
  if (body.status !== undefined) updates.status = body.status;

  const { data, error } = await supabaseAdmin
    .from('b2b_reservations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });

  return NextResponse.json({ success: true, reservation: data });
}
