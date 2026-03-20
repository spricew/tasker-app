import PrimaryInput from "@/app/components/ui/PrimaryInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-col gap-2 p-12 rounded-3xl bg-surface-container">
        <div className="flex flex-col">
          <div className="size-20 bg-zinc-900 rounded-full mb-2" />
          <span className="text-3xl font-semibold tracking-tighter">
            Tasklist
          </span>
          <span className="text-base font-light tracking-tight">Eleva tu productividad</span>
        </div>
        <form className="flex flex-col w-100 gap-2" action="">
          <PrimaryInput label="email" />
          <PrimaryInput label="contraseña" />
          <PrimaryButton text="Iniciar sesión" />
          <span className="text-sm text-zinc-500">¿Nuevo en Tasker? <a href="/SignUp" className="text-primary">Crea una cuenta</a></span>
        </form>
      </main>
    </div>
  );
}