"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/api/users";
import { sileo } from "sileo";

import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import AnimatedModal from "@/components/ui/AnimatedModal";
import { Pencil, Loader2 } from "lucide-react";

interface EditProfileButtonProps {
    currentName: string;
}

export default function EditProfileButton({ currentName }: EditProfileButtonProps) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const nombre = formData.get("nombre") as string;
        const password = formData.get("password") as string;

        try {
            await sileo.promise(
                () => updateProfile({
                    nombre,
                    password: password || undefined // Solo lo enviamos si escribió algo
                }),
                {
                    loading: {
                        title: "Guardando cambios...",
                    },
                    success: {
                        title: "Perfil actualizado",
                        duration: 3000,
                        autopilot: {
                            expand: 0,
                            collapse: 2000,
                        },
                        description: "¡Tu perfil ha sido actualizado exitosamente!",
                    },
                    error: (err) => ({
                        title: "Error al actualizar el perfil",
                        duration: 4500,
                        autopilot: {
                            expand: 0,
                            collapse: 3500,
                        },
                        description: err instanceof Error ? err.message : "Ocurrió un error inesperado",
                    }),
                }
            );

            setShowModal(false);
            router.refresh();
        } catch {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
<TertiaryButton
                text="Editar perfil"
                Icon={<Pencil className="size-[1em] stroke-2" />}
                iconPosition="left"
                theme="tertiary"
                extraclass="text-yellow-500"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                }}
            />

            <AnimatedModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Editar perfil"
                description="Modifica tus datos personales"
            >
                <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                    <PrimaryInput name="nombre" label="usuario" defaultValue={currentName} required minLength={8} disabled={isLoading} />
                    <PrimaryInput name="password" label="nueva contraseña (opcional)" placeholder="Dejar en blanco para no cambiar" type="password" minLength={8} disabled={isLoading} />

                    <PrimaryButton
                        text={isLoading ? "Guardando..." : "Guardar cambios"}
                        Icon={isLoading ? <Loader2 className="animate-spin" /> : undefined}
                        extraclass="w-full"
                        type="submit"
                        disabled={isLoading}
                    />
                </form>
            </AnimatedModal>
        </>
    );
}