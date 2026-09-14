export default function Navbar() {
    return (
        <header className="flex justify-between items-center min-h-21 w-full px-18 bg-surface-container-lowest">

            <a href="/" className="flex items-center gap-x-2 cursor-pointer">
                <img
                    src="/logo.png"
                    width={800}
                    height={800}
                    alt="Logo"
                    className="size-9 object-center object-cover" />

                <span className="text-3xl tracking-tighter font-semibold text-onSurface">Tasker</span>
            </a>
        </header>
    );
}