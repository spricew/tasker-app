"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from "lucide-react";
import TertiaryButton from '@/components/ui/Buttons/TertiaryButton';

interface AnimatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function AnimatedModal({ isOpen, onClose, title, description, children }: AnimatedModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 grid place-items-center w-full h-full overflow-y-hidden bg-black/50 z-100"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        exit={{
                            scale: 0.95,
                            opacity: 0,
                            transition: { type: "tween", duration: 0.1, ease: "easeOut" }
                        }}
                        className="squircle flex flex-col gap-4 w-130 p-10 rounded-3xl bg-surface-container-low"
                    >
                        <header className="flex flex-col">
                            <div className="flex justify-between items-start">
                                <span className="text-3xl font-semibold tracking-tighter">
                                    {title}
                                </span>
                                <TertiaryButton
                                    Icon={<X strokeWidth={2.4} className="size-[1.1em]" />}
                                    onClick={onClose}
                                    extraclass="text-ref-palette-neutral-50"
                                />
                            </div>

                            {description && (<span className="text-base font-light">{description}</span>)}
                        </header>

                        {children}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}