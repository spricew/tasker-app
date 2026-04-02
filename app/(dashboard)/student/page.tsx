import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { Plus } from "lucide-react";
export default function Student() {

    const dateString = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">
            <header className="flex justify-between">
                <div>
                    <h1 className="text-5xl font-bold tracking-tighter">Today</h1>
                    <p>Tienes 8 tareas pendientes hoy</p>
                </div>

                <span>{dateString}</span>
            </header>

            <ul>
                <li>Tarea 1</li>
            </ul>

            <TertiaryButton text="Agregar tarea" iconPosition="left" Icon={<Plus strokeWidth={2.6} className="size-6" />} />
        </div>
    );
}