import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import { family } from "@/lib/landing";

export function Hero() {
    return (
        <header className="relative">
            <div className="relative flex flex-col items-center justify-center h-screen pb-20 text-center bg-surface-container-low z-0">
                <div className="absolute inset-0 overflow-hidden min-h-screen bg-surface-container-low -z-10">
                    <div
                        className="absolute inset-0 pointer-events-none opacity-80"
                        style={{
                            background: "linear-gradient(rgba(15, 93, 219, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                            mixBlendMode: "normal",
                        }}
                        aria-hidden="true"
                    ></div>
                    <div
                        className="absolute inset-0 pointer-events-none blur-[163px] md:blur-[234px] opacity-84"
                        style={{
                            background: "radial-gradient(ellipse 60% 45% at 48% 45%, rgba(81, 54, 217, 0.22) 0%, transparent 75%)",
                            mixBlendMode: "normal",
                        }}
                        aria-hidden="true"
                    ></div>
                    <div
                        className="absolute inset-0 pointer-events-none blur-[125px] md:blur-[180px]"
                        style={{
                            background: "radial-gradient(circle at 75% 24%, rgba(15, 113, 240, 0.18) 0%, transparent 35%)",
                            mixBlendMode: "normal",
                        }}
                        aria-hidden="true"
                    ></div>
                    <div className="relative z-[1]">
                    </div>
                </div>

                <h1 className={`${family.className} mx-auto max-w-4xl leading-[1.09] tracking-tight text-ref-palette-secondary-60
                text-5xl md:text-6xl lg:text-7xl`}>

                    Organiza tu día
                    <br className="hidden md:block" /> como una{" "}
                    <span className="text-primary-container">aventura</span>
                </h1>

                <p className="mx-auto mt-8 max-w-120 text-base leading-[1.47] text-graphite md:text-base">
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