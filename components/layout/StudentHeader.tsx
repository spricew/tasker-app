'use client'

import { useMemo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TaskSection from "@/components/layout/TaskSection";

interface StudentHeaderProps {
    tasks: { id: string; title: string; completed: boolean }[];
}

export default function StudentHeader({ tasks }: StudentHeaderProps) {
    const pendingTasks = useMemo(
        () => tasks.filter(t => !t.completed).length,
        [tasks]
    );

    return (
        <>
            <p className="text-lg">
                Tienes <strong className="font-semibold"><AnimatedCounter value={pendingTasks} /></strong> tareas pendientes hoy.
            </p>
            <TaskSection tasks={tasks} />
        </>
    );
}
