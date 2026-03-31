import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El correo es obligatorio' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ mensaje: 'Solicitud procesada' }, { status: 200 });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;
    const resetToken = jwt.sign(
      { id: user.id, proposito: 'recuperacion' }, 
      JWT_SECRET, 
      { expiresIn: '15m' }
    );

    // reemplazar el url en .env cuando se despliegue
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const resetLink = `${baseUrl}/reset?token=${resetToken}`;

    await resend.emails.send({
      from: 'Tasker App <onboarding@resend.dev>',
      to: email,
      subject: 'Recuperación de contraseña - Tasker',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Hola ${user.nombre},</h2>
            <p>Hemos recibido una solicitud para restablecer tu contraseña en Tasker.</p>
            <p>Haz clic en el botón de abajo para crear una nueva contraseña. <b>Este enlace expirará en 15 minutos.</b></p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0056b3; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">
                Restablecer mi contraseña
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">Si no solicitaste este cambio, ignora este correo.</p>
        </div>
      `
    });

    return NextResponse.json({ mensaje: 'Correo enviado correctamente' }, { status: 200 });

  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
    return NextResponse.json({ error: 'Hubo un problema al procesar la solicitud' }, { status: 500 });
  }
}