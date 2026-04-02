import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import TaskItem from "@/components/ui/TaskItem";
import { Plus } from "lucide-react";
import { getTasksByUserId } from "@/lib/data/tasks";
import { getUserIdFromToken } from "@/lib/auth";

export default async function Student() {
    let tasks: any[] = [];

    try {
        const userId = await getUserIdFromToken();

        if (userId) {
            tasks = await getTasksByUserId(userId);
        }

    } catch (error) {
        console.error("Error obteniendo tareas");
    }

    const pendingTasks = tasks.filter(task => !task.completed).length;

    const dateString = new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">
            <header className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-6xl font-bold tracking-tighter">Today</h1>
                    <p>Tienes {pendingTasks} tareas pendientes hoy.</p>
                </div>

                <span className="capitalize">{dateString}</span>
            </header>

            <ul className="flex flex-col gap-y-2">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        title={task.title}
                    />
                ))}
            </ul>

            <TertiaryButton
                text="Agregar tarea..."
                iconPosition="left"
                Icon={<Plus strokeWidth={2.4} className="size-[1.1em]" />}
            />
        </div>
    );
}