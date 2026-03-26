// 'use client';
// import { useState } from "react";
import UsersTable from "@/components/layout/UsersTable";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup } from "@/components/ui/SelectOption";
import { Plus, CircleUserRound, ShieldUser } from "lucide-react";

export default function Admin() {
    // const [showModal, setShowModal] = useState(false);

    const handleCreateUser = () => {
        // setShowModal(true);
    }

    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">

            <div className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100">
                <div className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low">
                    <header className="flex flex-col">
                        <span className="text-3xl font-semibold tracking-tighter">
                            Crear usuario
                        </span>
                        <span className="text-base font-light">Ingresa los datos para crear un nuevo usuario</span>
                    </header>

                    <form className="flex flex-col w-full gap-3">
                        <ul className="grid grid-cols-2 w-full gap-2">
                            <li>
                                {/* componente seleccionado por defecto */}
                                <input type="radio" name="" value="" className="hidden" required />
                                <label htmlFor="" className="squircle inline-flex flex-col w-full p-5 
                            rounded-2xl ring ring-inset ring-primary
                            bg-primary-background text-primary cursor-pointer">
                                    <CircleUserRound className="size-[1.5em]" />
                                    <span className="block w-full font-semibold text-base tracking-tight">Estudiante</span>
                                    <span className="w-full text-sm ">Acciones limitadas</span>
                                </label>
                            </li>

                            <li>
                                {/* componente no seleccionado */}
                                <input type="radio" name="" value="" className="hidden" required />
                                <label htmlFor="" className="squircle inline-flex flex-col w-full p-5 
                            rounded-2xl bg-surface-container-high text-ref-palette-neutral-35 cursor-pointer">
                                    <ShieldUser className="size-[1.5em] peer-[]:" />
                                    <span className="block w-full font-semibold text-base tracking-tight">Administrador</span>
                                    <span className="w-full text-sm text-ref-palette-neutral-40">Permisos ilimitados</span>
                                </label>
                            </li>

                        </ul>

                        <PrimaryInput name="nombre" label="usuario" placeholder="userexample" />
                        <PrimaryInput name="email" label="email" placeholder="email@example.com" />
                        <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" />
                        <PrimaryButton text="Crear usuario" extraclass="w-full" />
                    </form>
                </div>
            </div>

            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl tracking-tighter font-semibold">Admin Dashboard</h1>
                    <p>Gestión completa de estudiantes y administradores del sistema.</p>
                </div>

                <PrimaryButton
                    text="Crear usuario"
                    Icon={<Plus strokeWidth={3} className="size-[1.02em]" />}
                    glow
                // onClick={handleCreateUser}
                />
            </header>
            <UsersTable />
        </div>
    );
}