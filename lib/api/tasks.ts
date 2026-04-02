export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

export async function getTasks(): Promise<Task[]> {
    const res = await fetch("/api/tasks", {
        method: "GET",
        // esta linea asegura que nextjs no guarde en caché y siempre traiga las tareas recientes
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Error al obtener las tareas");
    }

    return res.json();
}

export async function createTask(title: string): Promise<Task> {
    const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear la tarea");
    }

    return res.json();
}