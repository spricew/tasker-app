import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string, proposito: string };
    } catch (err) {
      return NextResponse.json({ error: 'El enlace es inválido o ha expirado. Solicita uno nuevo.' }, { status: 401 });
    }

    // se verifica que este token se haya fabricado específicamente para recuperar
    if (decoded.proposito !== 'recuperacion') {
      return NextResponse.json({ error: 'Token no autorizado para esta acción' }, { status: 403 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ mensaje: 'Contraseña actualizada correctamente' }, { status: 200 });

  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return NextResponse.json({ error: 'Ocurrió un error interno' }, { status: 500 });
  }
}