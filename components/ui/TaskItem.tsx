'use client'

import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { toggleTask } from "@/lib/api/tasks";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import DeleteTaskButton from "./Buttons/DeleteTaskButton";

interface TaskItemProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  completed: boolean;
}

export default function TaskItem({ id, title, completed, ...props }: TaskItemProps) {
  const router = useRouter();

  const [isCompleted, setIsCompleted] = useState(completed);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEstado = e.target.checked;
    setIsCompleted(nuevoEstado);

    try {
      setIsLoading(true);
      await toggleTask(id, nuevoEstado);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsCompleted(!nuevoEstado);
    } finally {
      setIsLoading(false);
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

  if (isDeleting) return null;

  return (
    <motion.li
      variants={itemVariants}
      className="flex items-center gap-x-4 w-fit max-w-3/5 group"
    >
      <label className={`flex items-center gap-x-3 w-fit ${isLoading || isDeleting ? 'cursor-wait opacity-80' : 'cursor-pointer'}`}>
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isCompleted}
          onChange={handleToggle}
          disabled={isLoading || isDeleting}
          {...props}
        />

        <div className="shrink-0 size-[1.5em] flex items-center justify-center rounded-full ring-2 ring-outline-variant
         peer-checked:bg-primary peer-checked:ring-primary 
         transition-all duration-200 ease-in-out">
          {isCompleted && (
            <Check className="text-white size-4 stroke-3" />
          )}
        </div>

        <span className="text-lg font-medium tracking-tight line-clamp-2 leading-tight first-letter:capitalize
       peer-checked:text-gray-400 peer-checked:line-through select-none first-letter:select-none
       transition-all duration-200">
          {title}
        </span>
      </label>

      <DeleteTaskButton
        id={id}
        isLoading={isLoading || isDeleting}
        onDeleteStart={() => setIsDeleting(true)}
      />
    </motion.li>
  );
}