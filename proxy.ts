import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('tasker_token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            const decodedJson = atob(payloadBase64); // atob convierte Base64 a texto
            const usuario = JSON.parse(decodedJson); // Lo convertimos a objeto de JavaScript

            if (pathname.startsWith('/admin') && usuario.rol !== 'ADMIN') {
                return NextResponse.redirect(new URL('/student', request.url));
            }

            // if (isAuthRoute) {
            //     const redirectUrl = usuario.rol === 'ADMIN' ? '/admin' : '/student';
            //     return NextResponse.redirect(new URL(redirectUrl, request.url));
            // }

        } catch (error) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('tasker_token');
            return response;
        }
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