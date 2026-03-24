"use client";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

interface BaseProps {
    text?: string;
    Icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    theme?: "primary" | "secondary" | "tertiary" | "destructive";
    glow?: boolean;
    extraclass?: string;
}

// Button defintion with conditional types to allow both button and link behavior
type ButtonAsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: never };
type ButtonAsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

type PrimaryButtonProps = ButtonAsButton | ButtonAsLink;

export default function PrimaryButton({ 
    text, 
    Icon,
    iconPosition = "left",
    theme = "primary", 
    glow = false,
    extraclass = "",
    ...props
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

    const combinedClasses = `
        squircle inline-flex items-center justify-center gap-x-1.5
        w-fit h-fit rounded-full px-3 py-1.5
        text-lg font-medium tracking-tight 
        hover:scale-105 cursor-pointer
        ${themeStyles[theme]} 
        ${glow ? glowStyles[theme] : ""}
        ${extraclass}
        ${(props as ButtonHTMLAttributes<HTMLButtonElement>).disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    `.trim();

    const inlineStyles = { transition: "box-shadow 0.3s ease, scale 0.3s cubic-bezier(0.16,1,0.3,1)" };

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
                style={inlineStyles} 
                {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {innerContent}
            </Link>
        );
    }

    return (
        <button 
            className={combinedClasses} 
            style={inlineStyles} 
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {innerContent}
        </button>
    );
}