
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="size-20 bg-zinc-900 rounded-full mb-2" />
          <span className="text-3xl font-semibold tracking-tighter">
            Tasklist
          </span>
        <span className="text-base font-light tracking-tight">Eleva tu productividad</span>
        </div>
        <form className="flex flex-col w-100 gap-2" action="">
          <label htmlFor="" className="text-base tracking-wider font-medium uppercase">EMAIL</label>
          <input type="text" placeholder="@example.com" className="block rounded-full border-2 border-zinc-300 px-4 py-2 text-lg outline-none focus:border-zinc-500" />
          <label htmlFor="" className="text-base tracking-wider font-medium uppercase">Contraseña</label>
          <input type="text" placeholder="password" className="block rounded-full border-2 border-zinc-300 px-4 py-2 text-lg outline-none focus:border-zinc-500" />
          <button className="bg-zinc-900 text-white rounded-full px-4 py-2 text-lg font-medium tracking-wider uppercase">Iniciar sesion</button>
          <span className="text-sm text-zinc-500">¿No tienes una cuenta? <a href="#" className="text-zinc-900">Crear cuenta</a></span>
        </form>
      </main>
    </div>
  );
}
