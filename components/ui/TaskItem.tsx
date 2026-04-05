'use client'

import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { Check, Trash2 } from "lucide-react";
import { toggleTask, deleteTask } from "@/lib/api/tasks";
import { useRouter } from "next/navigation";
import TertiaryButton from "./Buttons/TertiaryButton";

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

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTask(id);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  if (isDeleting) return null;

  return (
    <li className="flex items-center gap-x-4 w-fit max-w-3/5 group">
      <label className={`flex items-center gap-x-3 w-fit ${isLoading ? 'cursor-wait opacity-80' : 'cursor-pointer'}`}>
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


      {/* TODO: CREAR COMPONENTE DELETETASK BUTTON> */}
      <TertiaryButton
        Icon={<Trash2 className="size-5" />}
        onClick={handleDelete}
        disabled={isLoading || isDeleting}
        theme="destructive"
        title="Eliminar tarea"
        extraclass="opacity-0 group-hover:opacity-100"
      />
    </li>
  );
}