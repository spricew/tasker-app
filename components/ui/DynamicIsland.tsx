'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type IslandSize = 'idle' | 'expanded';

export default function DynamicIsland({ children, studentName }: { children: React.ReactNode, studentName: string }) {
    const [variant, setVariant] = useState<IslandSize>('idle');

    return (
        <div className="absolute right-0 top-8 z-50 cursor-pointer">
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="squircle bg-black text-white overflow-hidden flex items-center justify-center shadow-lg"
                onClick={() => setVariant(variant === 'idle' ? 'expanded' : 'idle')}
            >
                <div className="p-4 flex items-center justify-center min-h-[45px] min-w-30">
                    
                        {variant === 'idle' && (
                            <motion.p 
                                key="idle-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, filter: "blur(0)" }}
                                exit={{ opacity: 0, filter: "blur(12px)" }}
                                transition={{ duration: 0.2 }}
                                className="text-nowrap select-none"
                            >
                                {studentName}
                            </motion.p>
                        )}
                        
                        {variant === 'expanded' && (
                            <motion.div
                                key="expanded-content"
                                initial={{ opacity: 0, filter: "blur(12px)"}}
                                animate={{ opacity: 1, filter: "blur(0)"}}
                                exit={{ opacity: 0, filter: "blur(12px)" }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-2 w-72 p-2"
                            >
                                {children}
                            </motion.div>
                        )}
                </div>
            </motion.div>
        </div>
    );
}