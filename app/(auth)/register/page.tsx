"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/auth";

import Image from "next/image";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const nombre = formData.get("nombre");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            await registerUser({ nombre: String(nombre), email: String(email), password: String(password) });
            router.push("/login");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="relative flex flex-1 items-center px-50 z-1">
            <Image src='/images/background-auth.jpg' alt="tasker background" width={1200} height={1200}
                className="absolute inset-0 w-full h-full object-cover z-[-1]" />

            <main className="squircle flex flex-col justify-center items-center gap-2 w-120 h-140 p-10 rounded-3xl">
                <header className="mb-2">
                    <h1 className="text-3xl text-center font-semibold tracking-tighter">Crear cuenta</h1>
                    <span className="text-sm text-ref-palette-neutral-50">¿Ya tienes una cuenta?</span>
                    <TertiaryButton text="Inicia sesión" theme="primary" href="/login" extraclass="text-sm" />
                </header>

                <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
                    <PrimaryInput name="nombre" label="usuario" placeholder="userexample" />
                    <PrimaryInput name="email" label="email" placeholder="email@example.com" />
                    <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" />

                    {error && <p className=" p-2 rounded-lg text-sm text-center bg-error-container text-on-error-container">{error}</p>}

                    <PrimaryButton type="submit" text="Crear cuenta" glow extraclass="w-full" />
                </form>
            </main>
        </div>
    );
}