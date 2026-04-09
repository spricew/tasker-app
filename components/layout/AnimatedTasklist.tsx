'use client'

import { motion, Variants } from "framer-motion";
import TaskItem from "@/components/ui/TaskItem";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AnimatedTaskList({ tasks }: { tasks: any[] }) {
    if (!tasks || tasks.length === 0) return null;

    return (
        <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-y-4"
        >
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    completed={task.completed}
                />
            ))}
        </motion.ul>
    );
}