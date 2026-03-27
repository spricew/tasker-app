import { NextResponse } from 'next/server';
import { deleteUser } from '@/lib/data/users';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    
    await deleteUser(userId);
    
    return NextResponse.json({ mensaje: 'Usuario eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error("Fallo al eliminar:", error); 
    return NextResponse.json({ error: 'Error al eliminar. Puede que el usuario no exista.' }, { status: 500 });
  }
}