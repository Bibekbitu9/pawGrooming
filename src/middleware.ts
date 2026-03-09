import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Read city from Vercel's edge headers
  const city = request.headers.get('x-vercel-ip-city') || '';

  // Set as cookie for client-side consumption
  if (city) {
    response.cookies.set('x-detected-city', city, {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all pages except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
