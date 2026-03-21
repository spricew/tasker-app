import PrimaryButton from "@/app/components/ui/PrimaryButton";
import PrimaryInput from "@/app/components/ui/PrimaryInput";

export default function SignUp() {
    return (
        <div className="flex justify-center flex-1 items-center">
            <main className="squircle flex flex-col justify-center items-center gap-2 w-120 h-140 p-10 rounded-3xl bg-surface-container-low">
                <header className="mb-2">
                    <h1 className="text-3xl text-center font-semibold tracking-tighter">Crear cuenta</h1>
                    <span className="text-sm text-ref-palette-neutral-50 mr-1">
                        ¿Ya tienes una cuenta?
                    </span>
                    <a href="/" className="text-sm text-primary font-medium tracking-tight">Inicia sesión</a>
                </header>
                <form className="flex flex-col gap-3 w-full">
                    <PrimaryInput label="usuario" placeholder="userexample"/>
                    <PrimaryInput label="email" placeholder="email@example.com"/>
                    <PrimaryInput label="contraseña" placeholder="••••••••" type="password"/>
                    <PrimaryInput label="Teléfono" placeholder="999 123 4567" type="tel" />
                    <PrimaryButton text="Crear cuenta" glow/>
                </form>

            </main>
        </div>
    );
}