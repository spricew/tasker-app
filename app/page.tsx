import PrimaryInput from "@/app/components/ui/PrimaryInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-col gap-4 p-12 rounded-3xl bg-surface-container-low">
        <header className="flex flex-col">
          <div className="flex flex-col gap-2">
            <img src="/logo.png" alt="tasklist logo" className="w-16 object-center" />
            <span className="text-3xl font-semibold tracking-tighter">
              Tasker
            </span>
          </div>

          <span className="text-base font-light">Eleva tu productividad</span>
        </header>
        <form className="flex flex-col w-100 gap-3" action="">
          <PrimaryInput label="email" placeholder="email@example.com" />
          <PrimaryInput label="contraseña" placeholder="••••••••" type="password" />
          <PrimaryButton text="Iniciar sesión" />
        </form>
        <span className="text-sm text-zinc-500">¿Nuevo en Tasker? <a href="/SignUp" className="text-primary">Crea una cuenta</a></span>
      </main>
    </div>
  );
}