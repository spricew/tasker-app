import { NextResponse } from 'next/server';
import { getAllUsers, createUser } from '@/lib/data/users';

export async function GET() {
  try {
    const usuarios = await getAllUsers();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.nombre) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newUser = await createUser(body);

    return NextResponse.json({
      mensaje: 'Usuario creado exitosamente',
      usuario: newUser
    }, { status: 201 });

  } catch (error: any) {
    if (error.message === "El correo ya está registrado") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json({ error: 'Hubo un error en el servidor' }, { status: 500 });
  }
}