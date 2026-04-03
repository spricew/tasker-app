import { InputHTMLAttributes } from "react";

interface TaskItemProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export default function TaskItem({ title, ...props }: TaskItemProps) {
  return (
    <li className="max-w-3/5">
      <label className="flex items-center gap-x-3 w-fit cursor-pointer">
        <input
          type="checkbox"
          className="peer sr-only"
          {...props}
        />

        <div className="shrink-0 size-[1.5em] rounded-full ring-2 ring-outline-variant
         peer-checked:bg-primary peer-checked:ring-primary 
         transition-all duration-200 ease-in-out"></div>

        <span className="text-lg font-medium tracking-tight line-clamp-2 leading-tight first-letter:capitalize
       peer-checked:text-gray-400 peer-checked:line-through select-none
       transition-all duration-200">
          {title}
        </span>
      </label>
    </li>
  );
}