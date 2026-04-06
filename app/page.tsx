import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main-background.png"
          alt="Fondo de la aplicación"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className="squircle relative z-10 flex flex-col items-center text-center px-6 py-16 md:px-12 md:py-20
       bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl max-w-3xl mx-4 
       transform transition-all duration-500 hover:scale-[1.01]">

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 drop-shadow-sm">
          Tasker.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-lg font-light leading-snug">
          Diseñado para fluir con tu día. Organiza tus tareas con una elegancia y simplicidad inigualables.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">

          <Link
            href="/login"
            className="w-full sm:w-40 px-6 py-3.5 rounded-full
             bg-white/10 hover:bg-white/20 text-white text-sm font-medium tracking-wide 
             transition-all duration-300 backdrop-blur-md border border-white/20 text-center"
          >
            Iniciar Sesión
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-40 px-6 py-3.5 rounded-full bg-white text-black hover:bg-gray-200 text-sm font-medium tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] text-center"
          >
            Crear Cuenta
          </Link>

        </div>
      </div>
    </main>
  );
}