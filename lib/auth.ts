import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function requireAdmin() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('tasker_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'No autorizado, por favor inicia sesión.' }, { status: 401 });
        }

        const desencriptado = jwt.verify(token, JWT_SECRET) as { id: string, rol: string };

        if (desencriptado.rol !== 'ADMIN') {
            return NextResponse.json({ error: 'Acceso denegado. Se requieren permisos de Administrador.' }, { status: 403 }); // 403 = Prohibido
        }

        // Devolvemos 'null' para indicar que no hay ningún error y puede pasar.
        return null;

    } catch (error) {
        // Si el token expiró o fue manipulado
        return NextResponse.json({ error: 'Sesión inválida o expirada' }, { status: 401 });
    }
}

export async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('tasker_token')?.value;

    if (!token) return null;

    try {
        // Asegúrate de usar "nombre" o "name" según lo que hayas definido al firmar el token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, nombre: string }; 
        return decoded; 
    } catch (error) {
        return null;
    }
}