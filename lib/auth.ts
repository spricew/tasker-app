import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface SessionUser {
    id: string;
    rol: 'ADMIN' | 'USER';
    nombre: string;
}

// Verifica la FIRMA del token y devuelve el payload. Nunca confiar en el
// payload sin verificar. Devuelve null si no hay token o la firma es inválida.
export function verifyToken(token: string | undefined | null): SessionUser | null {
    if (!token) return null;

    try {
        return jwt.verify(token, JWT_SECRET) as SessionUser;
    } catch {
        // Token expirado, manipulado o firma inválida
        return null;
    }
}

export async function getSessionUser() {
    const cookieStore = await cookies();
    return verifyToken(cookieStore.get('tasker_token')?.value);
}

export async function requireAdmin() {
    const user = await getSessionUser();

    if (!user) {
        return NextResponse.json({ error: 'No autorizado, por favor inicia sesión.' }, { status: 401 });
    }

    if (user.rol !== 'ADMIN') {
        return NextResponse.json({ error: 'Acceso denegado. Se requieren permisos de Administrador.' }, { status: 403 });
    }

    // Devolvemos 'null' para indicar que no hay ningún error y puede pasar.
    return null;
}

export async function getUserFromToken() {
    return getSessionUser();
}