'use client'

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
}

function AnimatedDigit({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(value);
    const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current === value) return;

        setPhase("exit");

        const exitTimer = setTimeout(() => {
            setDisplayValue(value);
            setPhase("enter");
        }, 150);

        const resetTimer = setTimeout(() => {
            setPhase("idle");
        }, 400);

        prevValue.current = value;

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(resetTimer);
        };
    }, [value]);

    return (
        <span className="relative inline-flex overflow-hidden h-[1.2em] align-bottom">
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={`${phase}-${displayValue}`}
                    initial={
                        phase === "enter"
                            ? { y: "100%", filter: "blur(4px)", opacity: 0 }
                            : phase === "exit"
                                ? { y: 0, filter: "blur(0px)", opacity: 1 }
                                : false
                    }
                    animate={
                        phase === "exit"
                            ? { y: "-100%", filter: "blur(4px)", opacity: 0 }
                            : { y: 0, filter: "blur(0px)", opacity: 1 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="inline-block"
                >
                    {displayValue}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
    const digits = String(value).split("");

    return (
        <span className="inline-flex">
            {digits.map((d, i) => (
                <AnimatedDigit key={i} value={Number(d)} />
            ))}
        </span>
    );
}
