import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const B2B_SECRET = new TextEncoder().encode(process.env.B2B_JWT_SECRET!);
const ADMIN_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection des routes /b2b/dashboard
  if (pathname.startsWith('/b2b/dashboard')) {
    const token = request.cookies.get('b2b_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/b2b/login', request.url));
    }
    try {
      await jwtVerify(token, B2B_SECRET);
    } catch {
      return NextResponse.redirect(new URL('/b2b/login', request.url));
    }
  }

  // Protection des routes /admin/dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      await jwtVerify(token, ADMIN_SECRET);
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/b2b/dashboard/:path*', '/admin/dashboard/:path*'],
};
