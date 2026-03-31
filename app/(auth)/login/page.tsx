"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth";
import { sileo } from "sileo";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const respuesta = await loginUser({ email, password });

      sileo.success({
        title: "Sesión iniciada correctamente",
        duration: 3000,
        autopilot: {
          expand: 0,
          collapse: 2000,
        },
      });

      if (respuesta.usuario.rol === 'ADMIN') {
        router.push("/admin");
      } else {
        router.push("/student");
      }

    } catch (error: any) {
      sileo.error({
        title: "Error al iniciar sesión",
        duration: 4500,
        autopilot: {
          expand: 0,
          collapse: 3500,
        },
        description: (
          <span className="text-white font-medium">
            {error.message}
          </span>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="squircle flex flex-col gap-4 p-12 w-130 rounded-3xl bg-surface-container-low">
        <header className="flex flex-col">
          <div className="flex flex-col gap-2">
            <img src="/logo.png" alt="tasklist logo" className="w-16 object-center" />
            <span className="text-3xl font-semibold tracking-tighter">
              Tasker
            </span>
          </div>

          <span className="text-base font-light">Eleva tu productividad</span>
        </header>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <PrimaryInput name="email" label="Correo Electrónico" placeholder="admin@example.com" />
          <PrimaryInput name="password" label="Contraseña" type="password" placeholder="••••••••" />
          <TertiaryButton
            text="¿Olvidaste tu contraseña?"
            href="/recover"
            extraclass="text-sm text-ref-palette-neutral-40"
          />
          <PrimaryButton text={isLoading ? "Cargando..." : "Iniciar sesión"} extraclass="w-full" />
        </form>
        <div>
          <span className="text-sm text-ref-palette-neutral-50">
            ¿Nuevo en Tasker?
          </span>
          <TertiaryButton text="Crea una cuenta" theme="primary" href="/register" extraclass="text-sm" />
        </div>
      </main>
    </div>
  );
}