"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserByAdmin } from "@/lib/api/users";
import { sileo } from "sileo";

import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup, SelectableCardOption } from "@/components/ui/SelectOption";
import { CircleUserRound, ShieldUser, Plus } from "lucide-react";

export default function CreateUserModal() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('estudiante');
    const [error, setError] = useState('');

    const roleOptions: SelectableCardOption[] = [
        { id: 'role-estudiante', value: 'estudiante', title: 'Estudiante', description: 'Acciones limitadas', icon: CircleUserRound },
        { id: 'role-admin', value: 'admin', title: 'Administrador', description: 'Permisos ilimitados', icon: ShieldUser },
    ];

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const nombre = formData.get("nombre");
        const email = formData.get("email");
        const password = formData.get("password");

        const rolFormateado = role === 'admin' ? 'ADMIN' : 'USER';

        try {
            await createUserByAdmin({
                nombre: String(nombre),
                email: String(email),
                password: String(password),
                rol: rolFormateado
            });

            setShowModal(false);
            router.refresh();

            sileo.success({
                title: "Usuario registrado",
                position: "top-center",
                fill: "#171717",
                autopilot: {
                    expand: 0,
                    collapse: 3000,
                },
                description: (
                    <span className="text-white font-medium">
                        ¡El usuario ha sido creado exitosamente!
                    </span>
                ),
            });

        } catch (error: any) {
            setError(error.message);
            sileo.error({
                title: "Error al crear usuario",
                position: "top-center",
                fill: "#171717",
                autopilot: {
                    expand: 0,
                    collapse: 3000,
                },
                description: (
                    <span className="text-white font-medium">
                        ¡Ocurrió un error al crear el usuario!
                    </span>
                ),
            }); 
        }
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
                <div className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100">
                    <div className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low">
                        <header className="flex flex-col">

                            <div className="flex justify-between items-start">
                                <span className="text-3xl font-semibold tracking-tighter">Crear usuario</span>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">
                                    ✕
                                </button>
                            </div>

                            <span className="text-base font-light">Ingresa los datos para crear un nuevo usuario</span>
                        </header>
                        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                            <SelectableCardGroup name="userRole" options={roleOptions} selectedValue={role} onChange={setRole} />
                            <PrimaryInput name="nombre" label="usuario" placeholder="userexample" />
                            <PrimaryInput name="email" label="email" placeholder="email@example.com" />
                            <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" />
                            {error && <p className=" p-2 rounded-lg text-sm text-center bg-error-container text-on-error-container">{error}</p>}
                            <PrimaryButton text="Crear usuario" extraclass="w-full" type="submit" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}