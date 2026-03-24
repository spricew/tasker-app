import Image from "next/image";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import PrimaryInput from "@/components/ui/PrimaryInput";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";

export default function Register() {
    return (
        <div className="relative flex flex-1 items-center px-50 z-1">
            <Image src='/images/background-auth.jpg' alt="tasker background" width={1200} height={1200}
                className="absolute inset-0 w-full h-full object-cover z-[-1]" />

            <main className="squircle flex flex-col justify-center items-center
            gap-2 w-120 h-140 p-10 rounded-3xl ">
                <header className="mb-2">
                    <h1 className="text-3xl text-center font-semibold tracking-tighter">Crear cuenta</h1>
                    <span className="text-sm text-ref-palette-neutral-50">
                        ¿Ya tienes una cuenta?
                    </span>
                    <TertiaryButton text="Inicia sesión" theme="primary" href="/login" extraclass="text-sm" />
                </header>
                <form className="flex flex-col gap-3 w-full">
                    <PrimaryInput label="usuario" placeholder="userexample" />
                    <PrimaryInput label="email" placeholder="email@example.com" />
                    <PrimaryInput label="contraseña" placeholder="••••••••" type="password" />
                    <PrimaryInput label="Teléfono" placeholder="999 123 4567" type="tel" />
                    <PrimaryButton text="Crear cuenta" glow extraclass="w-full" />
                </form>

            </main>
        </div>
    );
}