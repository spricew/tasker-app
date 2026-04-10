'use client'

import { useState } from "react";
import { sileo } from "sileo";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/api/tasks";
import PrimaryButton from "./PrimaryButton";
import TertiaryButton from "./TertiaryButton";
import PrimaryInput from "../PrimaryInput";
import { Plus } from "lucide-react";
import AnimatedModal from "../AnimatedModal";

export default function CreateTaskButton() {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const taskName = formData.get("title") as string;

        try {
            await createTask(taskName);

            setShowModal(false);
            router.refresh();

            sileo.success({
                title: "Tarea creada",
                duration: 3000,
                autopilot: {
                    expand: 0,
                    collapse: 2000,
                },
                description: (
                    <span className="text-white font-medium">
                        ¡La tarea ha sido creada exitosamente!
                    </span>
                ),
            });
        } catch (error: any) {
            sileo.error({
                title: "Error al crear la tarea",
                duration: 4500,
                autopilot: {
                    expand: 0,
                    collapse: 3500,
                },
                description: (
                    <span className="text-white font-medium">
                        {error.message}
                    </span>
                ),
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <TertiaryButton
                text="Agregar tarea..."
                iconPosition="left"
                Icon={<Plus strokeWidth={2.4} className="size-[1.1em]" />}
                onClick={() => setShowModal(true)}
            />


            <AnimatedModal
                title="Añadir nueva tarea"
                description="Ingresa el nombre de la nueva tarea"
                onClose={() => setShowModal(false)}
                isOpen={showModal}
            >

                <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                    <PrimaryInput name="title" placeholder="Nueva tarea" required />

                    <PrimaryButton
                        text={isLoading ? "Guardando..." : "Crear tarea"}
                        extraclass="w-full"
                        type="submit"
                        disabled={isLoading}
                    />
                </form>
            </AnimatedModal>
        </>
    );
}