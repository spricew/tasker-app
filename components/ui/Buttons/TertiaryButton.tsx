"use client";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

interface BaseProps {
    text: string;
    Icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
    extraclass?: string;
}

// Button defintion with conditional types to allow both button and link behavior
type ButtonAsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: never };
type ButtonAsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

type TertiaryButtonProps = ButtonAsButton | ButtonAsLink;

export default function TertiaryButton({
    text,
    Icon,
    iconPosition = "right",
    theme = "primary",
    extraclass = "",
    ...props
}: TertiaryButtonProps) {

    const themeStyles = {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
        destructive: "text-error",
    };

    const combinedClasses = `
        inline-flex items-center justify-center w-fit h-fit px-2 py-1
        text-lg font-medium tracking-tight
        hover:scale-105 cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${themeStyles[theme]} 
        ${extraclass}
        ${(props as ButtonHTMLAttributes<HTMLButtonElement>).disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    `.trim();

    const innerContent = (
        <>
            {Icon && iconPosition === "left" && Icon}
            {text && <span>{text}</span>}
            {Icon && iconPosition === "right" && Icon}
        </>
    );

     // Conditionally render as Link or button based on presence of href
    if (props.href) {
        return (
            <Link 
                href={props.href}
                className={combinedClasses} 
                {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {innerContent}
            </Link>
        );
    }

    return (
        <button
            className={combinedClasses}
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {innerContent}
        </button>
    );
}