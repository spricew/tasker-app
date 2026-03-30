// src/components/ui/Buttons/EditUserModal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateUserByAdmin } from "@/lib/api/users";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup, SelectableCardOption } from "@/components/ui/SelectOption";
import { CircleUserRound, ShieldUser, Pencil } from "lucide-react";

interface EditProps {
    id: string;
    currentName: string;
    currentEmail: string;
    currentRole: string;
}

export default function EditUserButton({ id, currentName, currentEmail, currentRole }: EditProps) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    // Inicializamos el estado con el rol que ya tiene el usuario en la BD
    const initialRole = currentRole === 'ADMIN' ? 'admin' : 'estudiante';
    const [role, setRole] = useState(initialRole);

    const roleOptions: SelectableCardOption[] = [
        { id: 'edit-estudiante', value: 'estudiante', title: 'Estudiante', description: 'Acciones limitadas', icon: CircleUserRound },
        { id: 'edit-admin', value: 'admin', title: 'Administrador', description: 'Permisos ilimitados', icon: ShieldUser },
    ];

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const nombre = formData.get("nombre") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rolFormateado = role === 'admin' ? 'ADMIN' : 'USER';

        try {
            await UpdateUserByAdmin(id, {
                nombre,
                email,
                rol: rolFormateado,
                password: password || undefined // Solo lo enviamos si escribió algo
            });

            setShowModal(false);
            router.refresh(); // Magia: Recargamos la tabla
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al actualizar");
        }
    };

    return (
        <>
            {/* El botón del lápiz */}
            <div onClick={() => setShowModal(true)} className="cursor-pointer">
                <TertiaryButton Icon={<Pencil strokeWidth={2.6} className="size-6" />} theme="secondary" />
            </div>

            {/* El Modal (Se parece mucho al de crear, pero con defaultValue) */}
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

                            {/* defaultValue pone el texto actual para que el admin no tenga que escribir todo de nuevo */}
                            <PrimaryInput name="nombre" label="usuario" defaultValue={currentName} />
                            <PrimaryInput name="email" label="email" defaultValue={currentEmail} />
                            <PrimaryInput name="password" label="nueva contraseña (opcional)" placeholder="Dejar en blanco para no cambiar" type="password" />

                            <PrimaryButton text="Guardar cambios" extraclass="w-full" type="submit" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}