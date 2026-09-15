export default function Navbar() {
    return (
        <header className="flex justify-between items-center min-h-18 w-full px-18 ">
            <a href="/" className="flex items-center gap-x-1.5 cursor-pointer">
                <img
                    src="/logo.png"
                    width={800}
                    height={800}
                    alt="Logo"
                    className="size-6 object-center object-cover" />

                <span className="text-2xl tracking-tighter font-semibold text-on-surface">Tasker</span>
            </a>
        </header>
    );
}