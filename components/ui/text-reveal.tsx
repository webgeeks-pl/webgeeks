"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils/index";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
    children: string;
    header?: ReactNode;
    textClassName?: string;
    revealStart?: number;
    revealEnd?: number;
}

export const TextReveal: FC<TextRevealProps> = ({
    children,
    header,
    className,
    textClassName,
    revealStart = 0.3,
    revealEnd = 0.7,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    if (typeof children !== "string") {
        throw new Error("TextReveal: children must be a string");
    }

    const words = children.split(" ");

    return (
        <div ref={targetRef} className={cn("relative z-0 h-full", className)}>
            <motion.div
                className={"flex h-full flex-col justify-center bg-transparent px-[1rem]"}
            >
                {header}
                <span
                    className={cn(
                        "flex flex-wrap text-2xl font-bold text-black/20 md:text-3xl lg:text-4xl xl:text-5xl dark:text-white/20",
                        textClassName
                    )}
                >
                    {words.map((word, i) => {
                        const start =
                            revealStart + (i / words.length) * (revealEnd - revealStart);
                        const end = start + (revealEnd - revealStart) / words.length;
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </span>
            </motion.div>
        </div>
    );
};

interface WordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
            <span className="absolute opacity-30">{children}</span>
            <motion.span
                style={{ opacity: opacity }}
                className={"text-black dark:text-white"}
            >
                {children}
            </motion.span>
        </span>
    );
};
