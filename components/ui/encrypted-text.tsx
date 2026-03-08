"use client";
import { cn } from "@/lib/utils/index";
import { motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

type EncryptedTextProps = {
    text: string;
    className?: string;
    /**
     * Time in milliseconds between revealing each subsequent real character.
     * Lower is faster. Defaults to 50ms per character.
     */
    revealDelayMs?: number;
    /** Optional custom character set to use for the gibberish effect. */
    charset?: string;
    /**
     * Time in milliseconds between gibberish flips for unrevealed characters.
     * Lower is more jittery. Defaults to 50ms.
     */
    flipDelayMs?: number;
    /** CSS class for styling the encrypted/scrambled characters */
    encryptedClassName?: string;
    /** CSS class for styling the revealed characters */
    revealedClassName?: string;
    /** Time in milliseconds before the animation starts. Defaults to 0. */
    startDelayMs?: number;
};

const DEFAULT_CHARSET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
    const index = Math.floor(Math.random() * charset.length);
    return charset.charAt(index);
}

function generateGibberishPreservingSpaces(original: string, charset: string): string {
    if (!original) return "";
    let result = "";
    for (let i = 0; i < original.length; i += 1) {
        const ch = original[i];
        result += ch === " " ? " " : generateRandomCharacter(charset);
    }
    return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
    text,
    className,
    revealDelayMs = 50,
    charset = DEFAULT_CHARSET,
    flipDelayMs = 50,
    encryptedClassName,
    revealedClassName,
    startDelayMs = 0,
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    // Track if window has loaded
    const [windowLoaded, setWindowLoaded] = useState(
        () => typeof window !== "undefined" && document.readyState === "complete"
    );

    useEffect(() => {
        // If already loaded, nothing to do
        if (windowLoaded) return;

        // Listen for load event
        const handleLoad = () => setWindowLoaded(true);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
    }, [windowLoaded]);

    const [revealCount, setRevealCount] = useState<number>(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeoutRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const initialScrambleChars = text ? generateGibberishPreservingSpaces(text, charset).split("") : [];
    const scrambleCharsRef = useRef<string[]>(initialScrambleChars);
    const [scrambleChars, setScrambleChars] = useState<string[]>(initialScrambleChars);

    useEffect(() => {
        // Only start animation when window is loaded and element is in view
        if (!isInView || !windowLoaded) return;

        // Generate scramble once and keep it stable
        const initial = text ? generateGibberishPreservingSpaces(text, charset) : "";
        scrambleCharsRef.current = initial.split("");
        setScrambleChars(scrambleCharsRef.current);
        setRevealCount(0);

        let isCancelled = false;

        const update = (now: number) => {
            if (isCancelled) return;

            const elapsedMs = now - startTimeRef.current;
            const totalLength = text.length;
            const currentRevealCount = Math.min(
                totalLength,
                Math.floor(elapsedMs / Math.max(1, revealDelayMs))
            );

            setRevealCount(currentRevealCount);

            if (currentRevealCount >= totalLength) {
                return;
            }

            animationFrameRef.current = requestAnimationFrame(update);
        };

        const start = () => {
            if (isCancelled) return;
            startTimeRef.current = performance.now();
            animationFrameRef.current = requestAnimationFrame(update);
        };

        if (startDelayMs > 0) {
            startTimeoutRef.current = window.setTimeout(start, Math.max(0, startDelayMs));
        } else {
            start();
        }

        return () => {
            isCancelled = true;
            if (startTimeoutRef.current !== null) {
                clearTimeout(startTimeoutRef.current);
            }
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isInView, windowLoaded, text, revealDelayMs, charset, flipDelayMs, startDelayMs]);

    if (!text) return null;

    return (
        <motion.span ref={ref} className={cn(className)} aria-label={text} role="text">
            {text.split("").map((char, index) => {
                const isRevealed = index < revealCount;
                const displayChar = isRevealed
                    ? char
                    : char === " "
                      ? " "
                      : (scrambleChars[index] ?? char);

                return (
                    <span
                        key={index}
                        className={cn(
                            isRevealed ? revealedClassName : encryptedClassName
                        )}
                    >
                        {displayChar}
                    </span>
                );
            })}
        </motion.span>
    );
};
