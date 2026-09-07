'use client'

export type FilterOption = 'all' | 'pending' | 'completed';

interface TaskFiltersProps {
    activeFilter: FilterOption;
    onFilterChange: (filter: FilterOption) => void;
    counts: { all: number; pending: number; completed: number };
}

const filters: { key: FilterOption; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: 'Pendientes' },
    { key: 'completed', label: 'Completadas' },
];

export default function TaskFilters({ activeFilter, onFilterChange, counts }: TaskFiltersProps) {
    return (
        <div className="flex gap-x-2">
            {filters.map(({ key, label }) => {
                const isActive = activeFilter === key;
                const count = counts[key];

                return (
                    <button
                        key={key}
                        onClick={() => onFilterChange(key)}
                        className={`flex items-center gap-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                            transition-colors duration-200
                            ${isActive
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                            }`}
                    >
                        {label}
                        <span className={`text-xs ${isActive ? 'text-on-primary/70' : 'text-outline'}`}>
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
