import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryInput from "../components/ui/PrimaryInput";

export default function SignUp() {
    return (
        <div className="flex justify-center items-center">
            <main className="flex flex-col w-120 h-140 p-12 rounded-3xl bg-surface-container">
                <h1 className="text-3xl font-semibold tracking-tighter">Crear una cuenta</h1>
                <form>
                    <PrimaryInput label="usuario" />
                    <PrimaryInput label="email" />
                    <PrimaryInput label="contraseña" />
                    <PrimaryButton text="Registrarse" />
                </form>
            </main>
        </div>
    );
}