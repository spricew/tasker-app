import { InputHTMLAttributes } from "react";

interface TaskCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TaskCheckbox({ label, ...props }: TaskCheckboxProps) {
  return (
    <label className="flex items-center gap-x-3 cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
        {...props}
      />

      <div className="size-[1.4em] rounded-full ring-2 ring-outline-variant
         peer-checked:bg-primary peer-checked:ring-primary 
         transition-all duration-200 ease-in-out"></div>

      <span className="text-lg font-medium tracking-tight
       peer-checked:text-gray-400 peer-checked:line-through select-none
        transition-all duration-200">
        {label}
      </span>
    </label>
  );
}