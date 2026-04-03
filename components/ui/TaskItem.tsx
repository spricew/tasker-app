'use client'

import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";

interface TaskItemProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  completed: boolean;
}

export default function TaskItem({ title, completed, ...props }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
  };

  return (
    <li className="max-w-3/5">
      <label className="flex items-center gap-x-3 w-fit cursor-pointer">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isCompleted}
          onChange={handleToggle}
          {...props}
        />

        <div className="flex items-center justify-center shrink-0 size-[1.5em] rounded-full ring-2 ring-outline-variant
         peer-checked:bg-primary peer-checked:ring-primary 
         transition-all duration-200">
            {isCompleted && (
              <Check className="text-white size-4 stroke-3"/>
            )}
         </div>

        <span className="text-lg font-medium tracking-tight line-clamp-2 leading-tight first-letter:capitalize
       peer-checked:text-gray-400 peer-checked:line-through select-none
       transition-all duration-200">
          {title}
        </span>
      </label>
    </li>
  );
}