import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Create response with pathname header for layout
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        // Check for session cookie
        const session = request.cookies.get('session');

        // If no session, redirect to login
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

