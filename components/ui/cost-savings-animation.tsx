"use client";
import { motion } from "motion/react";

export function CostSavingsAnimation() {
    return (
        <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
            <style jsx>{`
                @keyframes float-down {
                    0% {
                        transform: translateY(-100%) rotateZ(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100%) rotateZ(360deg);
                        opacity: 0;
                    }
                }

                @keyframes float-pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.15);
                    }
                }
            `}</style>

            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-brand font-bold text-2xl"
                    style={{
                        left: `${20 + i * 15}%`,
                        animation: `float-down ${3 + i * 0.4}s ease-in infinite`,
                        animationDelay: `${i * 0.4}s`,
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                        }}
                    >
                        $
                    </motion.div>
                </motion.div>
            ))}

            {/* Center pulsing text */}
            <motion.div
                className="absolute text-center z-10"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="text-3xl font-bold text-brand">↓</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1">
                    Oszczędzaj
                </div>
            </motion.div>
        </div>
    );
}
