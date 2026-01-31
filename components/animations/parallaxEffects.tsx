"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function ParallaxSection({
    children,
    speed = 0.5,
    className = "",
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [100 * speed, -100 * speed]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
}

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function FadeInSection({
    children,
    delay = 0,
    className = "",
}: FadeInSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            transition={{ delay }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
}

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
    move?: [number, number];
    opacity?: [number, number];
    moveOn?: [number, number];
    opacityOn?: [number, number];
}

export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    moveOn = [0, 0.5],
    opacityOn = [0, 1],
    move = [150, 0],
    opacity = [0, 1],
    className = "",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const directionMap = {
        up: { axis: "y" },
        down: { axis: "y" },
        left: { axis: "x" },
        right: { axis: "x" },
    };

    const { axis } = directionMap[direction];

    const adjustedMove = axis === "x" || axis === "y" ? move[0] * -1 : move[0];
    const values = [adjustedMove, move[1]];

    const animationValue = useTransform(scrollYProgress, moveOn, values);
    const opacityValue = useTransform(scrollYProgress, opacityOn, opacity);

    return (
        <motion.div
            ref={ref}
            style={{
                [axis]: animationValue,
                opacity: opacityValue,
            }}
            initial={{ opacity: 0, [axis]: values[0] }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
}
