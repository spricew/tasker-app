interface PrimaryButtonProps {
    text: string;
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
    extraclass?: string;
}

interface PrimaryButtonProps {
    text: string;
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
    glow?: boolean;
}

export default function PrimaryButton({ 
    text, 
    theme = "primary", 
    glow = false,
    extraclass = "",
}: PrimaryButtonProps) {

    const themeStyles = {
        primary: "bg-primary-container text-on-primary-container",
        secondary: "bg-secondary text-on-secondary",
        tertiary: "bg-tertiary text-on-tertiary",
        destructive: "bg-error text-on-error",
    };

    const glowStyles = {
        primary: "shadow-xl shadow-primary-container/20 hover:shadow-xl hover:shadow-primary-container/30",
        secondary: "shadow-xl shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30",
        tertiary: "shadow-xl shadow-tertiary/20 hover:shadow-xl hover:shadow-tertiary/30",
        destructive: "shadow-xl shadow-error/20 hover:shadow-xl hover:shadow-error/30",
    };

    return (
        <button 
            className={`
                squircle inline-flex items-center justify-center w-fit h-fit rounded-full px-3 py-1.5
                text-lg font-medium tracking-tight 
                hover:scale-105 cursor-pointer
                ${themeStyles[theme]} 
                ${glow ? glowStyles[theme] : ""}
                ${extraclass}
            `}
            style={{ transition: "box-shadow 0.3s ease, scale 0.3s cubic-bezier(0.16,1,0.3,1)" }}
        >
            {text}
        </button>
    );
}