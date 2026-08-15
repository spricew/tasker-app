import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import { family } from "@/lib/landing";

export function Hero() {
    return (
        <header className="relative">
            <div className="relative flex flex-col items-center justify-center h-screen pb-20 text-center bg-surface-container-low">
                <h1 className={`${family.className} mx-auto max-w-4xl leading-[1.09] tracking-tight text-charcoal-primary
                text-5xl  md:text-6xl lg:text-7xl`}>

                    Organiza tu día
                    <br className="hidden md:block" /> como una{" "}
                    <span className="text-primary-container">aventura</span>
                </h1>

                <p className="mx-auto mt-8 max-w-120 text-base leading-[1.47] text-graphite md:text-[17px]">
                    Tasker es la lista de tareas que se siente como un juego. Crea,
                    completa y celebra. Hecha para estudiantes, sin curva de
                    aprendizaje.
                </p>

                <div className="flex flex-col items-center justify-center gap-x-2 sm:flex-row mt-10">
                    <PrimaryButton
                        text="Crear Cuenta gratis"
                        href="/register"
                        theme="primary"
                        glow
                    />

                    <PrimaryButton
                        text="Iniciar Sesión"
                        href="/login"
                        theme="secondary"
                        glow
                    />
                </div>
            </div>
        </header>
    );
}