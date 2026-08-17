import { NAV_LINKS } from "@/lib/landing";

export function LandingNavBar() {
    return (
        <nav className="sticky top-0 z-50 bg-warm-canvas/90 shadow-nav-line backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-300 items-center justify-between px-6">
                <a href="#top" className="flex items-center">
                    <span className="text-2xl tracking-tighter font-semibold text-charcoal-primary">
                        Tasker
                    </span>
                </a>

                <div className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-base font-medium tracking-tight text-charcoal-primary transition-colors duration-200 hover:text-midnight"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}