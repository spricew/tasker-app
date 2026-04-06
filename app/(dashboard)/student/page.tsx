import CreateTaskButton from "@/components/ui/Buttons/CreateTaskbutton";
import TaskItem from "@/components/ui/TaskItem";
import { getTasksByUserId } from "@/lib/data/tasks";
import { getUserIdFromToken } from "@/lib/auth";
import DynamicIsland from "@/components/ui/DynamicIsland";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { LogOut, Pencil } from "lucide-react";

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

                <div className="relative flex flex-col gap-y-2">
                    <span className="self-end text-nowrap">{dateString}</span>

                    <DynamicIsland studentName="Heyder manuel">
                        <TertiaryButton
                            text="Editar perfil"
                            Icon={<Pencil className="size-[1em] stroke-2" />}
                            iconPosition="left"
                            theme="secondary"
                        />
                        <TertiaryButton
                            text="Cerrar sesión"
                            theme="destructive"
                            Icon={<LogOut className="size-[1em] stroke-2" />}
                            iconPosition="left"
                        />
                    </DynamicIsland>
                </div>
            </header>

            <ul className="flex flex-col gap-y-4">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                    />
                ))}
            </ul>

            <CreateTaskButton />

        </div>
    );
}