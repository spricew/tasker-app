import Link from "next/link";

export default function Navbar() {
    return (
        <header className="flex justify-between items-center h-25 w-full px-20 py-6 box-content bg-surface-container-low">

            <div className="flex items-center gap-x-2">
                <img
                    src="/logo.png"
                    width={800}
                    height={800}
                    alt="Logo"
                    className="size-10 object-center object-cover" />

                <span className="text-2xl tracking-tighter font-semibold text-onSurface">Logotype</span>
            </div>

            <nav>
                <ul className="flex gap-x-8 items-center text-xl tracking-tight font-medium text-onSurface">
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <Link href="/">Soporte</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}