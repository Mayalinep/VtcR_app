import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const B2B_SECRET = new TextEncoder().encode(process.env.B2B_JWT_SECRET!);
const ADMIN_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export type B2BSession = {
  hotelId: string;
  hotelName: string;
};

export type AdminSession = {
  role: 'admin';
};

export async function signB2BToken(payload: B2BSession): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(B2B_SECRET);
}

export async function verifyB2BToken(token: string): Promise<B2BSession | null> {
  try {
    const { payload } = await jwtVerify(token, B2B_SECRET);
    return payload as unknown as B2BSession;
  } catch {
    return null;
  }
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' } as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(ADMIN_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function getB2BSession(): Promise<B2BSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('b2b_session')?.value;
  if (!token) return null;
  return verifyB2BToken(token);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
