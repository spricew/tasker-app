import { deleteTask } from "@/lib/data/tasks";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const taskId = resolvedParams.id;

        await deleteTask(taskId);

        return NextResponse.json({ mensaje: 'Usuario eliminado correctamente' }, { status: 200 });
    } catch (error) {
        console.error("Fallo al eliminar:", error);
        return NextResponse.json({ error: 'Error al eliminar, puede que el usuario no exista.' }, { status: 500 });
    }
}
