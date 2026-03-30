import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;

        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        const cookieStore = await cookies();
        cookieStore.set('tasker_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 8,
            path: '/',
        });

        return NextResponse.json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error en login:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}