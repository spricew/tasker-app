"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/auth";
import { sileo } from "sileo";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import backgroundAuth from "@/public/images/background-auth.jpg";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const nombre = formData.get("nombre");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            await sileo.promise(
                () => registerUser({ nombre: String(nombre), email: String(email), password: String(password) }),
                {
                    loading: {
                        title: "Creando cuenta...",
                    },
                    success: {
                        title: "Usuario registrado",
                        position: "top-center",
                        duration: 3000,
                        autopilot: {
                            expand: 0,
                            collapse: 2000,
                        },
                        description: "¡El usuario ha sido creado exitosamente!",
                    },
                    error: (err) => {
                        const message = err instanceof Error ? err.message : "Ocurrió un error inesperado";
                        setError(message);
                        return {
                            title: "Error al crear cuenta",
                            position: "top-center",
                            description: message,
                            duration: 4500,
                            autopilot: {
                                expand: 0,
                                collapse: 3500,
                            },
                        };
                    },
                }
            );

            router.push("/login");
        } catch {
            // sileo.promise ya muestra el toast de error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-1 items-center px-50 z-1">
            <Image
                src={backgroundAuth}
                alt=""
                preload
                fill
                sizes="100vw"
                placeholder="blur"
                className="object-cover z-[-1]"
            />

            <main className="squircle flex flex-col justify-center items-center gap-2 w-120 h-140 p-10 rounded-3xl">
                <header className="mb-2">
                    <h1 className="text-3xl text-center font-semibold tracking-tighter">Crear cuenta</h1>
                    <span className="text-sm text-ref-palette-neutral-50">¿Ya tienes una cuenta?</span>
                    <TertiaryButton text="Inicia sesión" theme="primary" href="/login" extraclass="text-sm" />
                </header>

                <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
                    <PrimaryInput name="nombre" label="usuario" placeholder="userexample" required minLength={8}/>
                    <PrimaryInput name="email" label="email" placeholder="email@example.com" required minLength={16}/>
                    <PrimaryInput name="password" label="contraseña" placeholder="••••••••" type="password" required minLength={8}/>

                    {error && <p className=" p-2 rounded-lg text-sm text-center bg-error-container text-on-error-container">{error}</p>}

                    <PrimaryButton
                        type="submit"
                        text={isLoading ? "Creando cuenta..." : "Crear cuenta"}
                        Icon={isLoading ? <Loader2 className="animate-spin" /> : undefined}
                        disabled={isLoading}
                        glow
                        extraclass="w-full"
                    />
                </form>
            </main>
        </div>
    );
}