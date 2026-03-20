interface PrimaryButtonProps {
    text: string;
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
}

interface PrimaryButtonProps {
    text: string;
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
    glow?: boolean;
}

export default function PrimaryButton({ 
    text, 
    theme = "primary", 
    glow = false 
}: PrimaryButtonProps) {

    const themeStyles = {
        primary: "bg-primary-container text-on-primary-container",
        secondary: "bg-secondary-container text-on-secondary-container",
        tertiary: "bg-tertiary-container text-on-tertiary-container",
        destructive: "bg-error text-on-error",
    };

    const glowStyles = {
        primary: "shadow-xl shadow-primary-container/20 hover:shadow-xl hover:shadow-primary-container/70",
        secondary: "shadow-lg shadow-secondary-container/50 hover:shadow-xl hover:shadow-secondary-container/70",
        tertiary: "shadow-lg shadow-tertiary-container/50 hover:shadow-xl hover:shadow-tertiary-container/70",
        destructive: "shadow-lg shadow-error/50 hover:shadow-xl hover:shadow-error/70",
    };

    return (
        <button 
            className={`
                inline-flex items-center justify-center rounded-full px-4 py-2 text-lg font-medium tracking-tight transition-all duration-300
                ${themeStyles[theme]} 
                ${glow ? glowStyles[theme] : ""}
            `}
        >
            {text}
        </button>
    );
}