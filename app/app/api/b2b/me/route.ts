import { NextResponse } from 'next/server';
import { getB2BSession } from '@/app/lib/auth';

export async function GET() {
  const session = await getB2BSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  return NextResponse.json({ hotelId: session.hotelId, hotelName: session.hotelName });
}
