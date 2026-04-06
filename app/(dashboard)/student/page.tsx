import { getUserFromToken } from "@/lib/auth";
import { getTasksByUserId } from "@/lib/data/tasks";

import CreateTaskButton from "@/components/ui/Buttons/CreateTaskbutton";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import DynamicIsland from "@/components/ui/DynamicIsland";
import TaskItem from "@/components/ui/TaskItem";
import { LogOut, Pencil } from "lucide-react";
import LogoutButton from "@/components/ui/Buttons/LogoutButton";

export default async function Student() {
    const user = await getUserFromToken();
    
    const loggedInUserName = user?.nombre as string;
    const userId = user?.id;

    let tasks: any[] = [];

    try {
        if (userId) {
            tasks = await getTasksByUserId(userId);
        }
    } catch (error) {
        console.error("Error obteniendo tareas");
    }

    const pendingTasks = tasks?.filter(task => !task.completed).length || 0;

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
                    <span className="self-end font-medium tracking-tight first-letter:capitalize text-nowrap">{dateString}</span>

                    <DynamicIsland studentName={loggedInUserName}>
                        <TertiaryButton
                            text="Editar perfil"
                            Icon={<Pencil className="size-[1em] stroke-2" />}
                            iconPosition="left"
                            theme="secondary"
                        />
                        <LogoutButton />
                    </DynamicIsland>
                </div>
            </header>

            <ul className="flex flex-col gap-y-4">
                {tasks?.map((task) => (
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