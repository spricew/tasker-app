"use client";

import { useState } from "react";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup, SelectableCardOption } from "@/components/ui/SelectOption";
import { CircleUserRound, ShieldUser, Plus } from "lucide-react";

export default function CreateUserModal() {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('estudiante');

    const roleOptions: SelectableCardOption[] = [
        { id: 'role-estudiante', value: 'estudiante', title: 'Estudiante', description: 'Acciones limitadas', icon: CircleUserRound },
        { id: 'role-admin', value: 'admin', title: 'Administrador', description: 'Permisos ilimitados', icon: ShieldUser },
    ];

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(false);
        console.log("Rol seleccionado:", role);
    };

    return (
        <>
            <PrimaryButton
                text="Crear usuario"
                Icon={<Plus strokeWidth={3} className="size-[1.02em]" />}
                glow
                onClick={() => setShowModal(true)}
            />

            {showModal && (
                // TODO: IMPLEMENTAR BOTON PARA CERRAR MODAL
                <div className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100">
                    <div className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low">
                        <header className="flex flex-col">
                            <span className="text-3xl font-semibold tracking-tighter">Crear usuario</span>
                            <span className="text-base font-light">Ingresa los datos para crear un nuevo usuario</span>
                        </header>
                        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                            <SelectableCardGroup name="userRole" options={roleOptions} selectedValue={role} onChange={setRole} />
                            <PrimaryInput name="nombre" label="usuario" placeholder="userexample" />
                            <PrimaryInput name="email" label="email" placeholder="email@example.com" />
                            <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" />
                            <PrimaryButton text="Crear usuario" extraclass="w-full" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}