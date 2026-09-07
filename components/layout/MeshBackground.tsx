


export function MeshBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden min-h-screen bg-surface-container-low -z-10">
            <div
                className="absolute inset-0 pointer-events-none opacity-80"
                style={{
                    background: "linear-gradient(rgba(15, 93, 219, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    mixBlendMode: "normal",
                }}
                aria-hidden="true"
            ></div>
            <div
                className="absolute inset-0 pointer-events-none blur-[163px] md:blur-[234px] opacity-84"
                style={{
                    background: "radial-gradient(ellipse 60% 45% at 48% 45%, rgba(81, 54, 217, 0.22) 0%, transparent 75%)",
                    mixBlendMode: "normal",
                }}
                aria-hidden="true"
            ></div>
            <div
                className="absolute inset-0 pointer-events-none blur-[125px] md:blur-[180px]"
                style={{
                    background: "radial-gradient(circle at 75% 24%, rgba(15, 113, 240, 0.18) 0%, transparent 35%)",
                    mixBlendMode: "normal",
                }}
                aria-hidden="true"
            ></div>
            <div className="relative z-1">
            </div>
        </div>
    );
}