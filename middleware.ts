import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/sessions',
    '/analysis', // If you want to protect analysis routes
  ];
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Check for access token
  const accessToken = request.cookies.get('sc_access')?.value;
  const refreshToken = request.cookies.get('sc_refresh')?.value;
  
  // If no access token, try to refresh
  if (!accessToken && refreshToken) {
    try {
      // Attempt to refresh the token
      const refreshResponse = await fetch(new URL('/api/auth/refresh', request.url), {
        method: 'POST',
        headers: {
          'Cookie': request.headers.get('cookie') || '',
        },
      });
      
      if (refreshResponse.ok) {
        // Token was refreshed, continue with the request
        const response = NextResponse.next();
        
        // Copy the new cookies from the refresh response
        const setCookieHeader = refreshResponse.headers.get('set-cookie');
        if (setCookieHeader) {
          response.headers.set('set-cookie', setCookieHeader);
        }
        
        return response;
      }
    } catch (error) {
      console.error('Token refresh failed in middleware:', error);
    }
  }
  
  // If we have an access token or refresh succeeded, continue
  if (accessToken || refreshToken) {
    return NextResponse.next();
  }
  
  // No valid tokens, redirect to login
  const loginUrl = new URL('/', request.url);
  loginUrl.searchParams.set('login', 'true');
  loginUrl.searchParams.set('redirect', pathname);
  
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
