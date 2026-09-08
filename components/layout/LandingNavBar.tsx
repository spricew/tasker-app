import { NAV_LINKS } from "@/lib/landing";

export function LandingNavBar() {
    return (
        <div className="fixed top-0 z-50 flex justify-center w-full h-24 py-4">
            <nav className="flex justify-between px-6 items-center h-full w-160 rounded-full border border-outline-variant/20 shadow-2xl shadow-black/10 bg-white/40 backdrop-blur-lg backdrop-brightness-105">

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

                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-10 rounded-full text-charcoal-primary transition-colors duration-200 hover:bg-surface-container-high hover:text-midnight"
                >
                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </a>
            </nav>
        </div>
    );
}