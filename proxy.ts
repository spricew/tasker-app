import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('tasker_token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname === '/login' || pathname === '/register';

    // Verificación optimista: la FIRMA del token se valida aquí,
    // pero la autorización real se hace también en cada página/ruta API.
    const decoded = verifyToken(token);

    if (!decoded && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (decoded && pathname.startsWith('/admin') && decoded.rol !== 'ADMIN') {
        return NextResponse.redirect(new URL('/student', request.url));
    }

    if (decoded && isAuthRoute) {
        const redirectUrl = decoded.rol === 'ADMIN' ? '/admin' : '/student';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/student/:path*',
        '/login',
        '/register'
    ],
};