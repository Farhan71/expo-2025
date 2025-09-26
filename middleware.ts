import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const cookieStore = cookies();
    const adminAuth = cookieStore.get('admin-auth');

    // Allow access to login page
    if (pathname === '/admin' && !adminAuth) {
      return NextResponse.next();
    }

    // Redirect to login if not authenticated
    if (!adminAuth || adminAuth.value !== 'authenticated') {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
