import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' || 
    path === '/auth/signin' || 
    path === '/auth/signup' || 
    path === '/about' || 
    path === '/features' || 
    path === '/contact';

  // Check if the path is for API routes
  const isApiPath = path.startsWith('/api');
  
  // Check if the path is for dashboard routes
  const isDashboardPath = path.startsWith('/dashboard');

  // Get the token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (isPublicPath) {
    // If user is already logged in and tries to access public paths like login/register
    if (token) {
      // Redirect to the appropriate dashboard based on user role
      const role = token.role as string;
      let redirectPath = '/dashboard';
      
      if (role === 'PATIENT') {
        redirectPath = '/dashboard/patient';
      } else if (role === 'NURSE') {
        redirectPath = '/dashboard/nurse';
      } else if (role === 'FACILITY_ADMIN') {
        redirectPath = '/dashboard/facility';
      }
      
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    
    return NextResponse.next();
  }

  // Allow API routes to be handled by their own authentication
  if (isApiPath) {
    return NextResponse.next();
  }

  // Protected routes (dashboard)
  if (isDashboardPath && !token) {
    // Redirect to login if trying to access dashboard without being logged in
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Role-based access control for dashboard routes
  if (isDashboardPath && token) {
    const role = token.role as string;
    
    // Check if user is trying to access a route they don't have permission for
    if (path.startsWith('/dashboard/patient') && role !== 'PATIENT' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (path.startsWith('/dashboard/nurse') && role !== 'NURSE' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (path.startsWith('/dashboard/facility') && role !== 'FACILITY_ADMIN' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
