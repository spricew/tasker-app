'use client'

import { useState } from "react";
import { sileo } from "sileo";
import { createTask } from "@/lib/api/tasks";
import PrimaryButton from "./PrimaryButton";
import TertiaryButton from "./TertiaryButton";
import PrimaryInput from "../PrimaryInput";
import { Plus } from "lucide-react";

export default function CreateTaskButton() {

    const [showModal, setShowModal] = useState(false);
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

    }

    return (
        <>
            <TertiaryButton
                text="Agregar tarea..."
                iconPosition="left"
                Icon={<Plus strokeWidth={2.4} className="size-[1em]" />}
                onClick={() => setShowModal(true)}
            />

            {showModal && (
                <div className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100">
                    <div className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low">
                        <header className="flex flex-col">

                            <div className="flex justify-between items-start">
                                <span className="text-3xl font-semibold tracking-tighter">Agregar tarea</span>
                                <button onClick={() => (setShowModal(false))} className="text-gray-500 hover:text-gray-800">
                                    ✕
                                </button>
                            </div>

                            <span className="text-base font-light">Ingresa los datos para crear una nueva tarea</span>
                        </header>
                        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                            <PrimaryInput name="title" label="Nombre de la tarea" placeholder="Nueva tarea" />
                            <PrimaryButton text="Crear usuario" extraclass="w-full" type="submit" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}