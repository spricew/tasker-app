import { getUserFromToken } from "@/lib/auth";
import { getTasksByUserId } from "@/lib/data/tasks";

import CreateTaskButton from "@/components/ui/Buttons/CreateTaskbutton";
import DynamicIsland from "@/components/ui/DynamicIsland";
import LogoutButton from "@/components/ui/Buttons/LogoutButton";
import StudentHeader from "@/components/layout/StudentHeader";

interface StudentTask {
    id: string;
    title: string;
    completed: boolean;
}

export default async function Student() {
    const user = await getUserFromToken();
    
    const loggedInUserName = user?.nombre as string;
    const userId = user?.id;

    let tasks: StudentTask[] = [];

    try {
        if (userId) {
            tasks = await getTasksByUserId(userId);
        }
    } catch (error) {
        console.error("Error obteniendo tareas");
    }

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
                    <StudentHeader tasks={tasks} />
                </div>

                <div className="relative flex flex-col gap-y-2">
                    <span className="self-end font-medium tracking-tight first-letter:capitalize text-nowrap">{dateString}</span>

                    <DynamicIsland studentName={loggedInUserName}>
                        {/* <TertiaryButton
                            text="Editar perfil"
                            Icon={<Pencil className="size-[1em] stroke-2" />}
                            iconPosition="left"
                            theme="secondary"
                        /> */}
                        <LogoutButton />
                    </DynamicIsland>
                </div>
            </header>

            <CreateTaskButton />
        </div>
    );
}