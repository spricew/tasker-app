import PrimaryInput from "@/components/ui/PrimaryInput";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="squircle flex flex-col gap-4 p-12 rounded-3xl bg-surface-container-low">
        <header className="flex flex-col">
          <div className="flex flex-col gap-2">
            <img src="/logo.png" alt="tasklist logo" className="w-16 object-center" />
            <span className="text-3xl font-semibold tracking-tighter">
              Tasker
            </span>
          </div>

          <span className="text-base font-light">Eleva tu productividad</span>
        </header>
        <form className="flex flex-col w-100 gap-3">
          <PrimaryInput label="email" placeholder="email@example.com" />
          <PrimaryInput label="contraseña" placeholder="••••••••" type="password" />
          <PrimaryButton text="Iniciar sesión" extraclass="w-full"/>
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