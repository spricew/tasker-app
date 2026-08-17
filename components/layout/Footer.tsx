import Link from "next/link";

export function Footer() {
    return (
        <footer id="contacto"
        className="mx-auto mt-30 md:mt-40 px-10 md:px-14 pb-12 pt-20 bg-surface-container-high">

            <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                <div className="max-w-xs">
                    <a href="#top" className="flex items-center">
                        <span className="text-2xl font-semibold tracking-tight text-charcoal-primary">
                            Tasker
                        </span>
                    </a>
                    <p className="mt-4 text-sm leading-[1.47] text-ash">
                        Organiza tus tareas con una elegancia y simplicidad inigualables.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                    <div>
                        <p className="text-sm font-medium tracking-tight text-charcoal-primary">
                            Producto
                        </p>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#features" className="text-sm tracking-tight text-ash transition-colors duration-200 hover:text-charcoal-primary">Características</a></li>
                            <li><a href="#como-funciona" className="text-sm tracking-tight text-ash transition-colors duration-200 hover:text-charcoal-primary">Cómo funciona</a></li>
                            <li><Link href="/register" className="text-sm tracking-tight text-ash transition-colors duration-200 hover:text-charcoal-primary">Crear cuenta</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-medium tracking-tight text-charcoal-primary">
                            Cuenta
                        </p>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="/login" className="text-sm tracking-tight text-ash transition-colors duration-200 hover:text-charcoal-primary">Iniciar sesión</Link></li>
                            <li><Link href="/recover" className="text-sm tracking-tight text-ash transition-colors duration-200 hover:text-charcoal-primary">Recuperar contraseña</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-medium tracking-tight text-charcoal-primary">
                            Redes sociales
                        </p>
                        <ul className="mt-4 space-y-3">
                            <li><a href="https://github.com/spricew" className="text-sm tracking-tight text-ash transition-colors duration-200 hover:text-charcoal-primary">Github</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="mt-12 text-xs leading-[1.58] tracking-tight text-outline-variant">
                © 2026 Tasker. Hecho con calidez.
            </p>
        </footer>
    );
}