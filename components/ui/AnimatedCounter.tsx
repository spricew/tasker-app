'use client'

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
}

function Digit({ digit }: { digit: string }) {
    return (
        <span className="relative inline-flex overflow-hidden h-[1.2em] align-bottom">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={digit}
                    initial={{ y: "100%", filter: "blur(4px)", opacity: 0 }}
                    animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: "-100%", filter: "blur(4px)", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="inline-block"
                >
                    {digit}
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
                <Digit key={`${i}-${d}`} digit={d} />
            ))}
        </span>
    );
}
