'use client'

import { useState, useMemo } from "react";
import TaskFilters, { FilterOption } from "@/components/ui/TaskFilters";
import AnimatedTaskList from "@/components/layout/AnimatedTasklist";

interface TaskSectionProps {
    tasks: { id: string; title: string; completed: boolean }[];
}

export default function TaskSection({ tasks }: TaskSectionProps) {
    const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

    const counts = useMemo(() => ({
        all: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
    }), [tasks]);

    const filteredTasks = useMemo(() => {
        switch (activeFilter) {
            case 'pending':
                return tasks.filter(t => !t.completed);
            case 'completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
        }
    }, [tasks, activeFilter]);

    return (
        <div className="flex flex-col gap-y-4">
            {tasks.length > 0 && (
                <TaskFilters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    counts={counts}
                />
            )}

            <AnimatedTaskList tasks={filteredTasks} />
        </div>
    );
}
