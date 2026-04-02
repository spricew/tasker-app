"use client";

import { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { requestPasswordReset } from "@/lib/api/auth";
import { ChevronLeft } from "lucide-react";

export default function RecoverPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        try {
            await requestPasswordReset(email);

            setMessage("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña en los próximos minutos.");

        } catch (error) {
            setMessage("Ocurrió un error al procesar la solicitud. Inténtalo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <main className="squircle flex flex-col gap-4 p-12 w-130 rounded-3xl bg-surface-container-low">
                <header className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        <Image src={"/images/forgot-password-icon.png"} alt="forgot password image" width={130} height={130} className="squircle p-4 bg-primary-background rounded-2xl drop-shadow-xl" />
                        <span className="text-3xl font-semibold tracking-tighter">
                            Recuperar acceso
                        </span>
                    </div>

                    <span className="text-base font-light">
                        Ingresa tu correo para recibir un enlace de recuperación.
                    </span>
                </header>

                <form className="flex flex-col w-full gap-3 mt-4" onSubmit={handleSubmit}>
                    <PrimaryInput
                        name="email"
                        label="Correo Electrónico"
                        placeholder="admin@example.com"
                        type="email"
                        required
                    />

                    <PrimaryButton
                        text={isLoading ? "Enviando..." : "Enviar enlace"}
                        extraclass="w-full"
                        type="submit"
                    />
                </form>

                {message && (
                    <div className="squircle p-3 rounded-lg bg-primary-background text-primary text-sm text-center">
                        {message}
                    </div>
                )}

                <TertiaryButton
                    Icon={<ChevronLeft strokeWidth={1.6} className="size-[1.6em] -mr-1" />}
                    iconPosition="left"
                    text="Volver al inicio de sesión"
                    theme="primary"
                    href="/login"
                    extraclass="text-sm mt-2"
                />
            </main>
        </div>
    );
}