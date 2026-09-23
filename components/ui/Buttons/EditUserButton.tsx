"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateUserByAdmin } from "@/lib/api/users";
import { sileo } from "sileo";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup, SelectableCardOption } from "@/components/ui/SelectOption";
import { CircleUserRound, ShieldUser, Pencil, Loader2 } from "lucide-react";

interface EditProps {
    id: string;
    currentName: string;
    currentEmail: string;
    currentRole: string;
}

export default function EditUserButton({ id, currentName, currentEmail, currentRole }: EditProps) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const initialRole = currentRole === 'ADMIN' ? 'admin' : 'estudiante';
    const [role, setRole] = useState(initialRole);

    const roleOptions: SelectableCardOption[] = [
        { id: 'edit-estudiante', value: 'estudiante', title: 'Estudiante', description: 'Acciones limitadas', icon: CircleUserRound },
        { id: 'edit-admin', value: 'admin', title: 'Administrador', description: 'Permisos ilimitados', icon: ShieldUser },
    ];

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const nombre = formData.get("nombre") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rolFormateado = role === 'admin' ? 'ADMIN' : 'USER';

        try {
            await sileo.promise(
                () => UpdateUserByAdmin(id, {
                    nombre,
                    email,
                    rol: rolFormateado,
                    password: password || undefined // Solo lo enviamos si escribió algo
                }),
                {
                    loading: {
                        title: "Guardando cambios...",
                    },
                    success: {
                        title: "Usuario actualizado",
                        duration: 3000,
                        autopilot: {
                            expand: 0,
                            collapse: 2000,
                        },
                        description: "¡El usuario ha sido actualizado exitosamente!",
                    },
                    error: (err) => ({
                        title: "Error al actualizar el usuario",
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
            // sileo.promise ya muestra el toast de error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div onClick={() => setShowModal(true)} className="cursor-pointer">
                <TertiaryButton Icon={<Pencil strokeWidth={2.6} className="size-6" />} theme="secondary" extraclass="text-brand-yellow" />
            </div>

            {showModal && (
                <div className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100">
                    <div className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low">
                        <header className="flex flex-col">
                            <div className="flex justify-between items-start">
                                <span className="text-3xl font-semibold tracking-tighter">Editar usuario</span>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">✕</button>
                            </div>
                            <span className="text-base font-light">Modifica los datos del usuario seleccionado</span>
                        </header>
                        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                            <SelectableCardGroup name="userRole" options={roleOptions} selectedValue={role} onChange={setRole} />
                            <PrimaryInput name="nombre" label="usuario" defaultValue={currentName} required minLength={8} disabled={isLoading} />
                            <PrimaryInput name="email" label="email" defaultValue={currentEmail} required minLength={16} disabled={isLoading} />
                            <PrimaryInput name="password" label="nueva contraseña (opcional)" placeholder="Dejar en blanco para no cambiar" type="password" minLength={8} disabled={isLoading} />

                            <PrimaryButton
                                text={isLoading ? "Guardando..." : "Guardar cambios"}
                                Icon={isLoading ? <Loader2 className="animate-spin" /> : undefined}
                                extraclass="w-full"
                                type="submit"
                                disabled={isLoading}
                            />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}