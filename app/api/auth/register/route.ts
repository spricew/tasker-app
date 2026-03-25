import { NextResponse } from 'next/server';
import { createUser } from '@/lib/data/users';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.nombre) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newUser = await createUser(body);

    return NextResponse.json({ 
        mensaje: 'Registro exitoso', 
        usuario: newUser 
    }, { status: 201 });

  } catch (error: any) {
    if (error.message === "El correo ya está registrado") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    
    return NextResponse.json({ error: 'Hubo un error en el servidor' }, { status: 500 });
  }
}