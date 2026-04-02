import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import TaskItem from "@/components/ui/TaskItem";
import { Plus } from "lucide-react";
export default function Student() {

    const dateString = new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">
            <header className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-6xl font-bold tracking-tighter">Today</h1>
                    <p>Tienes 8 tareas pendientes hoy.</p>
                </div>

                <span>{dateString}</span>
            </header>

            <ul className="flex flex-col gap-y-2">
                <TaskItem title="Tarea 1 Culpa ex in dolor voluptate aute officia quis dolore ipsum. Commodo et et reprehenderit ad in laborum dolore laborum. Lorem est cupidatat cillum laborum minim excepteur eu sunt ipsum exercitation. Tempor nostrud aute amet anim minim mollit consequat ipsum ipsum proident sit. Non aliqua proident ad esse. Cillum et do et quis proident duis consectetur officia." />
                <TaskItem title="Tarea 1232" />
                <TaskItem title="Tarea 1" />
            </ul>

            <TertiaryButton text="Agregar tarea..." iconPosition="left" Icon={<Plus strokeWidth={2.4} className="size-[1.1em]" />} />
        </div>
    );
}