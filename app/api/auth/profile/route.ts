import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { updateUser, getUserById } from '@/lib/data/users';
import { getUserFromToken } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado, por favor inicia sesión.' }, { status: 401 });
    }

    const body = await request.json();
    const { nombre, password } = body;

    if (!nombre) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    // El email es inmutable: se conserva el actual de la BD para mantener su unicidad
    const currentUser = await getUserById(user.id);
    if (!currentUser) {
      return NextResponse.json({ error: 'No se encontró el usuario' }, { status: 404 });
    }

    const updatedUser = await updateUser(user.id, {
      nombre,
      email: currentUser.email,
      rol: user.rol,
      password,
    });

    // Re-emitir el token para reflejar el nuevo nombre sin necesidad de re-login
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = jwt.sign(
      { id: updatedUser.id, rol: updatedUser.rol, nombre: updatedUser.nombre },
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
      mensaje: 'Perfil actualizado correctamente',
      usuario: updatedUser
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error && error.message === "El correo ya está en uso por otro usuario") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}