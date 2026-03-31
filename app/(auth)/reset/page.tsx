"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api/auth";
import Image from "next/image";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";

function ResetForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!token) {
            setError("No se encontró un token válido en la URL.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(token, newPassword);
            setSuccess(true);

            setTimeout(() => {
                router.push("/login");
            }, 10013000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-xl font-semibold text-red-500">Enlace inválido</span>
                <p>Asegúrate de haber hecho clic en el enlace correcto de tu correo.</p>
                <TertiaryButton text="Ir a Login" href="/login" theme="primary" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="squircle flex flex-col items-center gap-4 text-center">
                <Image src={"/images/verification.png"} alt="forgot password image" width={130} height={130} className="squircle p-4 bg-primary-background rounded-2xl drop-shadow-xl" />
                <span className="text-2xl tracking-tighter font-semibold text-primary">¡Contraseña actualizada!</span>
                <p>Tu contraseña ha sido cambiada correctamente. Redirigiendo al inicio de sesión...</p>
            </div>
        );
    }

    return (
        <>
            <header className="flex flex-col">
                <div className="flex flex-col gap-2">
                    <Image src={"/images/reset-password.png"} alt="forgot password image" width={130} height={130} className="squircle p-4 bg-primary-background rounded-2xl drop-shadow-xl" />
                    <span className="text-3xl font-semibold tracking-tighter">
                        Crear nueva contraseña
                    </span>
                </div>

                <span className="text-base font-light">
                    Escribe tu nueva contraseña de acceso.
                </span>
            </header>

            <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                <PrimaryInput
                    name="newPassword"
                    label="Nueva Contraseña"
                    placeholder="••••••••"
                    type="password"
                    required
                />
                <PrimaryInput
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    placeholder="••••••••"
                    type="password"
                    required
                />

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <PrimaryButton
                    text={isLoading ? "Guardando..." : "Actualizar contraseña"}
                    extraclass="w-full mt-2"
                    type="submit"
                />
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <main className="squircle flex flex-col gap-4 p-12 rounded-4xl bg-surface-container-low w-130">
                <Suspense fallback={<div className="text-center">Cargando...</div>}>
                    <ResetForm />
                </Suspense>
            </main>
        </div>
    );
}