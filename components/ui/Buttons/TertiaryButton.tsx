interface TertiaryButtonProps {
    text: string;
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
    extraclass?: string;
}

export default function TertiaryButton({ 
    text, 
    theme = "primary", 
    extraclass = "",
}: TertiaryButtonProps) {

    const themeStyles = {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
        destructive: "text-error",
    };

    return (
        <button 
            className={`
                inline-flex items-center justify-center w-fit h-fit px-2 py-1
                text-lg font-medium tracking-tight
                hover:scale-105 cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${themeStyles[theme]}
                ${extraclass}
            `}
        >
            {text}
        </button>
    );
}