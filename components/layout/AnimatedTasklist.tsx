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

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
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
                <motion.li key={task.id} variants={itemVariants}>
                    <TaskItem
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                    />
                </motion.li>
            ))}
        </motion.ul>
    );
}