import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: taskId } = await params; 
    
    const body = await request.json();
    const { completed } = body;

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'El estado completed es obligatorio y debe ser booleano' }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    if (task.userId !== userId) {
      return NextResponse.json({ error: 'No tienes permiso para modificar esta tarea' }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed: completed }
    });

    return NextResponse.json(updatedTask, { status: 200 });

  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    return NextResponse.json({ error: 'Error al actualizar la tarea' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
          return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }
    
        const { id: taskId } = await params; 
        
        const task = await prisma.task.findUnique({
          where: { id: taskId }
        });
    
        if (!task) {
          return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
        }
    
        if (task.userId !== userId) {
          return NextResponse.json({ error: 'No tienes permiso para eliminar esta tarea' }, { status: 403 });
        }
    
        await prisma.task.delete({
          where: { id: taskId }
        });
    
        return NextResponse.json({ mensaje: 'Tarea eliminada' }, { status: 200 });
    
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return NextResponse.json({ error: 'Error al eliminar la tarea' }, { status: 500 });
      }
}