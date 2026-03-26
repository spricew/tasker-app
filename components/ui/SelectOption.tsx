import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

export interface SelectableCardOption {
  id: string;
  value: string;
  title: string;
  description: string;
  icon: LucideIcon | React.ElementType;
}

interface SelectableCardGroupProps {
  name: string;
  options: SelectableCardOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const SelectableCardGroup = ({
  name,
  options,
  selectedValue,
  onChange,
}: SelectableCardGroupProps) => {
  return (
    <fieldset className="w-full">

      <div className="grid grid-cols-2 w-full gap-2">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <div key={option.id} className="relative">
              <input
                type="radio"
                id={option.id}
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="peer sr-only"
              />

              <label
                htmlFor={option.id}
                className="squircle inline-flex flex-col w-full p-5 rounded-2xl
                           bg-surface-container-high text-ref-palette-neutral-35
                           cursor-pointer transition-all duration-200 hover:brightness-95
                           peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary
                           peer-checked:ring peer-checked:ring-inset peer-checked:ring-primary
                           peer-checked:bg-primary-background peer-checked:text-primary"
              >
                <Icon className="size-[1.5em] mb-2" />
                <span className="block w-full font-semibold text-base tracking-tight">
                  {option.title}
                </span>
                <span className="w-full text-sm opacity-80">
                  {option.description}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};