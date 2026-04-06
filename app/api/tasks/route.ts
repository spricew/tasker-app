import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { getTasksByUserId } from "@/lib/data/tasks";
import { getUserFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getUserFromToken();
        const userId = user?.id;
        if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

        const tasks = await getTasksByUserId(userId);

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener las tareas' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getUserFromToken();
        const userId = user?.id;
        if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

        const body = await request.json();
        const { title } = body;

        if (!title || title.trim() === '') {
            return NextResponse.json({ error: 'El título de la tarea es obligatorio' }, { status: 400 });
        }

        const newTask = await prisma.task.create({
            data: {
                title: title.trim(),
                userId: userId,
            }
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error al crear tarea:", error);
        return NextResponse.json({ error: 'Error al crear la tarea' }, { status: 500 });
    }
}