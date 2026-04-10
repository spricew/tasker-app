"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserByAdmin } from "@/lib/api/users";
import { sileo } from "sileo";

import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import { SelectableCardGroup, SelectableCardOption } from "@/components/ui/SelectOption";
import { CircleUserRound, ShieldUser } from "lucide-react";

interface CreateUserFormProps {
    onSuccess: () => void;
}

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
    const router = useRouter();
    const [role, setRole] = useState('estudiante');
    const [isLoading, setIsLoading] = useState(false);

    const roleOptions: SelectableCardOption[] = [
        { id: 'role-estudiante', value: 'estudiante', title: 'Estudiante', description: 'Acciones limitadas', icon: CircleUserRound },
        { id: 'role-admin', value: 'admin', title: 'Administrador', description: 'Permisos ilimitados', icon: ShieldUser },
    ];

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

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

            onSuccess();
            router.refresh();

            sileo.success({
                title: "Usuario registrado",
                duration: 3000,
                autopilot: { expand: 0, collapse: 2000 },
                description: <span className="text-white font-medium">¡El usuario ha sido creado exitosamente!</span>,
            });

        } catch (error: any) {
            sileo.error({
                title: "Error al crear usuario",
                duration: 4500,
                autopilot: { expand: 0, collapse: 3500 },
                description: <span className="text-white font-medium">{error.message}</span>,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
            <SelectableCardGroup name="userRole" options={roleOptions} selectedValue={role} onChange={setRole} />
            <PrimaryInput name="nombre" label="usuario" placeholder="userexample" required minLength={8} disabled={isLoading} />
            <PrimaryInput name="email" label="email" placeholder="email@example.com" required minLength={16} disabled={isLoading} />
            <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" required minLength={8} disabled={isLoading} />
            <PrimaryButton text={isLoading ? "Guardando..." : "Crear usuario"} extraclass="w-full" type="submit" disabled={isLoading} />
        </form>
    );
}