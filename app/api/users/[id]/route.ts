import { NextResponse } from 'next/server';
import { deleteUser, updateUser } from '@/lib/data/users';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const resolvedParams = await params;
    const userId = resolvedParams.id;

    await deleteUser(userId);

    return NextResponse.json({ mensaje: 'Usuario eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error("Fallo al eliminar:", error);
    return NextResponse.json({ error: 'Error al eliminar, puede que el usuario no exista.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const resolvedParams = await params;
    const userId = resolvedParams.id;

    const body = await request.json();

    const updatedUser = await updateUser(userId, body);

    return NextResponse.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: updatedUser
    }, { status: 200 });

  } catch (error: any) {
    if (error.message === "El correo ya está en uso por otro usuario") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}