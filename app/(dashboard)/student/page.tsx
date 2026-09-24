import { getUserFromToken } from "@/lib/auth";
import { getTasksByUserId } from "@/lib/data/tasks";
import { getUserById } from "@/lib/data/users";

import CreateTaskButton from "@/components/ui/Buttons/CreateTaskbutton";
import DynamicIsland from "@/components/ui/DynamicIsland";
import LogoutButton from "@/components/ui/Buttons/LogoutButton";
import EditProfileButton from "@/components/ui/Buttons/EditProfileButton";
import StudentHeader from "@/components/layout/StudentHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mis tareas",
    description: "Organiza, haz seguimiento y completa las tareas de tu día.",
};

interface StudentTask {
    id: string;
    title: string;
    completed: boolean;
}

export default async function Student() {
    const user = await getUserFromToken();
    
    const userId = user?.id;

    let currentUser: { id: string; nombre: string; email: string; rol: 'ADMIN' | 'USER' } | null = null;
    try {
        if (userId) {
            currentUser = await getUserById(userId);
        }
    } catch {
        console.error("Error obteniendo el usuario");
    }

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

                    <DynamicIsland studentName={currentUser?.nombre ?? ''}>
                        {currentUser && (
                            <EditProfileButton
                                currentName={currentUser.nombre}
                            />
                        )}
                        <LogoutButton />
                    </DynamicIsland>
                </div>
            </header>

            <CreateTaskButton />
        </div>
    );
}