'use client'

import { useState } from "react";
import { sileo } from "sileo";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/api/tasks";
import PrimaryButton from "./PrimaryButton";
import TertiaryButton from "./TertiaryButton";
import PrimaryInput from "../PrimaryInput";
import { Plus, X } from "lucide-react";

import { motion, AnimatePresence } from 'framer-motion';

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

            <AnimatePresence>
                {showModal && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}

                            exit={{
                                scale: 0,
                                opacity: 0,
                                transition: {
                                    type: "tween",
                                    duration: 0.15,
                                    ease: "easeOut"
                                }
                            }}

                            className="squircle flex flex-col gap-4 w-130 max-w-[90vw] p-10 rounded-3xl bg-surface-container-low"
                        >

                            <header className="flex flex-col">
                                <div className="flex justify-between items-start">
                                    <span className="text-3xl font-semibold tracking-tighter">Agregar tarea</span>
                                    <TertiaryButton
                                        Icon={<X strokeWidth={2.4} className="size-[1.1em]" />}
                                        onClick={() => setShowModal(false)}
                                        extraclass="text-ref-palette-neutral-50"
                                    />
                                </div>

                                <span className="text-base font-light">Ingresa el nombre para tu nueva tarea</span>
                            </header>

                            <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                                <PrimaryInput name="title" label="Nombre de la tarea" placeholder="Nueva tarea" required />

                                <PrimaryButton
                                    text={isLoading ? "Guardando..." : "Crear tarea"}
                                    extraclass="w-full"
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}