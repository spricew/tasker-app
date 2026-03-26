'use client';
import { useState } from "react";

import UsersTable from "@/components/layout/UsersTable";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup, SelectableCardOption } from "@/components/ui/SelectOption";

import { Plus, CircleUserRound, ShieldUser } from "lucide-react";

export default function Admin() {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('estudiante');

    const roleOptions: SelectableCardOption[] = [
        {
            id: 'role-estudiante',
            value: 'estudiante',
            title: 'Estudiante',
            description: 'Acciones limitadas',
            icon: CircleUserRound,
        },
        {
            id: 'role-admin',
            value: 'admin',
            title: 'Administrador',
            description: 'Permisos ilimitados',
            icon: ShieldUser,
        },
    ];

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowModal(false);
        console.log("Rol seleccionado:", role);
    };


    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">

            {showModal && (
                <div className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100">
                    <div className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low">
                        <header className="flex flex-col">
                            <span className="text-3xl font-semibold tracking-tighter">
                                Crear usuario
                            </span>
                            <span className="text-base font-light">Ingresa los datos para crear un nuevo usuario</span>
                        </header>

                        <form className="flex flex-col w-full gap-3">
                            <SelectableCardGroup
                                name="userRole"
                                options={roleOptions}
                                selectedValue={role}
                                onChange={setRole}
                            />

                            <PrimaryInput name="nombre" label="usuario" placeholder="userexample" />
                            <PrimaryInput name="email" label="email" placeholder="email@example.com" />
                            <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" />
                            <PrimaryButton text="Crear usuario" extraclass="w-full" onClick={handleSubmit} />
                        </form>
                    </div>
                </div>
            )}

            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl tracking-tighter font-semibold">Admin Dashboard</h1>
                    <p>Gestión completa de estudiantes y administradores del sistema.</p>
                </div>

                <PrimaryButton
                    text="Crear usuario"
                    Icon={<Plus strokeWidth={3} className="size-[1.02em]" />}
                    glow
                    onClick={handleShowModal}
                />
            </header>
            {/* <UsersTable /> */}
        </div>
    );
}