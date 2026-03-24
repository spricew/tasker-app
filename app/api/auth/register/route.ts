import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, password, rol } = body;

    if (!email || !password || !nombre) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // verification of existing user in the db
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 409 });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creation of the new user in the db
    const newUser = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: rol === 'ADMIN' ? 'ADMIN' : 'USER', // secure assignment of role
      }
    });

    // return the created user data
    return NextResponse.json({ 
      mensaje: 'Usuario creado exitosamente',
      usuario: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol }
    }, { status: 201 });

  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}