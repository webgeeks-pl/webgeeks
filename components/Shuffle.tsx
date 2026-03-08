"use client";

import { animate, inView } from "motion";
import type { Easing } from "motion-utils";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";

type AnimControls = ReturnType<typeof animate>;

export interface ShuffleProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    shuffleDirection?: "left" | "right" | "up" | "down";
    duration?: number;
    maxDelay?: number;
    ease?: Easing;
    threshold?: number;
    rootMargin?: string;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    textAlign?: React.CSSProperties["textAlign"];
    onShuffleComplete?: () => void;
    shuffleTimes?: number;
    animationMode?: "random" | "evenodd";
    loop?: boolean;
    loopDelay?: number;
    stagger?: number;
    scrambleCharset?: string;
    colorFrom?: string;
    colorTo?: string;
    triggerOnce?: boolean;
    respectReducedMotion?: boolean;
    triggerOnHover?: boolean;
}

/**
 * Splits an element's text content into per-character `<span>`s
 * wrapped in per-word containers (replaces GSAP SplitText).
 */
function splitTextIntoChars(el: HTMLElement): HTMLElement[] {
    const raw = el.textContent || "";
    el.textContent = "";
    const chars: HTMLElement[] = [];
    const segments = raw.split(/(\s+)/);

    for (const seg of segments) {
        if (/^\s+$/.test(seg)) {
            el.appendChild(document.createTextNode(seg));
            continue;
        }
        const wordWrap = document.createElement("span");
        wordWrap.className = "shuffle-word";
        wordWrap.style.display = "inline-block";
        wordWrap.style.whiteSpace = "nowrap";

        for (const ch of seg) {
            const span = document.createElement("span");
            span.className = "shuffle-char";
            span.textContent = ch;
            span.style.display = "inline-block";
            wordWrap.appendChild(span);
            chars.push(span);
        }
        el.appendChild(wordWrap);
    }
    return chars;
}

const Shuffle: React.FC<ShuffleProps> = ({
    text,
    className = "",
    style = {},
    shuffleDirection = "right",
    duration = 0.35,
    maxDelay = 0,
    ease = [0.22, 1, 0.36, 1] as [number, number, number, number],
    threshold = 0.1,
    rootMargin = "-100px",
    tag = "p",
    textAlign = "center",
    onShuffleComplete,
    shuffleTimes = 1,
    animationMode = "evenodd",
    loop = false,
    loopDelay = 0,
    stagger = 0.03,
    scrambleCharset = "",
    colorFrom,
    colorTo,
    triggerOnce = true,
    respectReducedMotion = true,
    triggerOnHover = true,
}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [ready, setReady] = useState(false);

    const wrappersRef = useRef<HTMLElement[]>([]);
    const animsRef = useRef<AnimControls[]>([]);
    const playingRef = useRef(false);
    const cancelledRef = useRef(false);
    const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);

    useEffect(() => {
        const set = () => setFontsLoaded(true);
        if ("fonts" in document) {
            document.fonts.ready.then(set);
        } else {
            set();
        }
    }, []);

    useEffect(() => {
        if (!ref.current || !text || !fontsLoaded) return;
        if (
            respectReducedMotion &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ) {
            onShuffleComplete?.();
            return;
        }

        const el = ref.current as HTMLElement;
        cancelledRef.current = false;

        /* ---- helpers ---- */

        const removeHover = () => {
            if (hoverHandlerRef.current && ref.current) {
                ref.current.removeEventListener("mouseenter", hoverHandlerRef.current);
                hoverHandlerRef.current = null;
            }
        };

        const stopAnimations = () => {
            animsRef.current.forEach((a) => a.stop());
            animsRef.current = [];
        };

        const teardown = () => {
            stopAnimations();
            cancelledRef.current = true;
            wrappersRef.current = [];
            el.textContent = text;
            playingRef.current = false;
        };

        /* ---- build character strips ---- */

        const build = () => {
            teardown();
            cancelledRef.current = false;

            const computedFont = getComputedStyle(el).fontFamily;
            const chars = splitTextIntoChars(el);
            wrappersRef.current = [];

            const rolls = Math.max(1, Math.floor(shuffleTimes));
            const rand = (set: string) =>
                set.charAt(Math.floor(Math.random() * set.length)) || "";

            const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

            chars.forEach((ch) => {
                const parent = ch.parentElement;
                if (!parent) return;

                const w = ch.getBoundingClientRect().width;
                const h = ch.getBoundingClientRect().height;
                if (!w) return;

                const wrap = document.createElement("span");
                wrap.className = "inline-block overflow-hidden text-left";
                Object.assign(wrap.style, {
                    width: w + "px",
                    height: isVertical ? h + "px" : "auto",
                    verticalAlign: "bottom",
                });

                const inner = document.createElement("span");
                inner.className =
                    "inline-block will-change-transform origin-left transform-gpu " +
                    (isVertical ? "whitespace-normal" : "whitespace-nowrap");

                parent.insertBefore(wrap, ch);
                wrap.appendChild(inner);

                const firstOrig = ch.cloneNode(true) as HTMLElement;
                firstOrig.className =
                    "text-left " + (isVertical ? "block" : "inline-block");
                Object.assign(firstOrig.style, {
                    width: w + "px",
                    fontFamily: computedFont,
                });

                ch.setAttribute("data-orig", "1");
                ch.className = "text-left " + (isVertical ? "block" : "inline-block");
                Object.assign(ch.style, {
                    width: w + "px",
                    fontFamily: computedFont,
                });

                inner.appendChild(firstOrig);
                for (let k = 0; k < rolls; k++) {
                    const c = ch.cloneNode(true) as HTMLElement;
                    if (scrambleCharset) c.textContent = rand(scrambleCharset);
                    c.className = "text-left " + (isVertical ? "block" : "inline-block");
                    Object.assign(c.style, {
                        width: w + "px",
                        fontFamily: computedFont,
                    });
                    inner.appendChild(c);
                }
                inner.appendChild(ch);

                const steps = rolls + 1;

                if (shuffleDirection === "right" || shuffleDirection === "down") {
                    const firstCopy = inner.firstElementChild as HTMLElement | null;
                    const real = inner.lastElementChild as HTMLElement | null;
                    if (real) inner.insertBefore(real, inner.firstChild);
                    if (firstCopy) inner.appendChild(firstCopy);
                }

                let startX = 0;
                let finalX = 0;
                let startY = 0;
                let finalY = 0;

                if (shuffleDirection === "right") {
                    startX = -steps * w;
                    finalX = 0;
                } else if (shuffleDirection === "left") {
                    startX = 0;
                    finalX = -steps * w;
                } else if (shuffleDirection === "down") {
                    startY = -steps * h;
                    finalY = 0;
                } else if (shuffleDirection === "up") {
                    startY = 0;
                    finalY = -steps * h;
                }

                if (!isVertical) {
                    inner.style.transform = `translate3d(${startX}px, 0px, 0px)`;
                    inner.setAttribute("data-start-x", String(startX));
                    inner.setAttribute("data-final-x", String(finalX));
                } else {
                    inner.style.transform = `translate3d(0px, ${startY}px, 0px)`;
                    inner.setAttribute("data-start-y", String(startY));
                    inner.setAttribute("data-final-y", String(finalY));
                }

                if (colorFrom) inner.style.color = colorFrom;
                wrappersRef.current.push(wrap);
            });
        };

        const inners = () =>
            wrappersRef.current.map((w) => w.firstElementChild as HTMLElement);

        const randomizeScrambles = () => {
            if (!scrambleCharset) return;
            wrappersRef.current.forEach((w) => {
                const strip = w.firstElementChild as HTMLElement;
                if (!strip) return;
                const kids = Array.from(strip.children) as HTMLElement[];
                for (let i = 1; i < kids.length - 1; i++) {
                    kids[i].textContent = scrambleCharset.charAt(
                        Math.floor(Math.random() * scrambleCharset.length)
                    );
                }
            });
        };

        const cleanupToStill = () => {
            wrappersRef.current.forEach((w) => {
                const strip = w.firstElementChild as HTMLElement;
                if (!strip) return;
                const real = strip.querySelector('[data-orig="1"]') as HTMLElement | null;
                if (!real) return;
                strip.replaceChildren(real);
                strip.style.transform = "none";
                strip.style.willChange = "auto";
            });
        };

        /* ---- animation ---- */

        const play = async () => {
            const strips = inners();
            if (!strips.length) return;

            playingRef.current = true;
            const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

            const animateOnce = async () => {
                stopAnimations();
                const anims: AnimControls[] = [];

                const addTween = (targets: HTMLElement[], baseDelay: number) => {
                    targets.forEach((strip, i) => {
                        if (cancelledRef.current) return;
                        const delay = baseDelay + i * stagger;
                        const target = isVertical
                            ? `translateY(${parseFloat(strip.getAttribute("data-final-y") || "0")}px)`
                            : `translateX(${parseFloat(strip.getAttribute("data-final-x") || "0")}px)`;

                        anims.push(
                            animate(
                                strip,
                                { transform: target },
                                { duration, ease, delay }
                            )
                        );

                        if (colorFrom && colorTo) {
                            anims.push(
                                animate(
                                    strip,
                                    { color: colorTo },
                                    { duration, ease, delay }
                                )
                            );
                        }
                    });
                };

                if (animationMode === "evenodd") {
                    const odd = strips.filter((_, i) => i % 2 === 1);
                    const even = strips.filter((_, i) => i % 2 === 0);
                    const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
                    const evenStart = odd.length ? oddTotal * 0.7 : 0;
                    if (odd.length) addTween(odd, 0);
                    if (even.length) addTween(even, evenStart);
                } else {
                    strips.forEach((strip) => {
                        if (cancelledRef.current) return;
                        const d = Math.random() * maxDelay;
                        const target = isVertical
                            ? `translateY(${parseFloat(strip.getAttribute("data-final-y") || "0")}px)`
                            : `translateX(${parseFloat(strip.getAttribute("data-final-x") || "0")}px)`;

                        anims.push(
                            animate(
                                strip,
                                { transform: target },
                                { duration, ease, delay: d }
                            )
                        );

                        if (colorFrom && colorTo) {
                            anims.push(
                                animate(
                                    strip,
                                    { color: colorTo },
                                    { duration, ease, delay: d }
                                )
                            );
                        }
                    });
                }

                animsRef.current = anims;
                await Promise.all(anims.map((a) => a.finished));
            };

            const resetPositions = () => {
                strips.forEach((strip) => {
                    if (isVertical) {
                        const sy = strip.getAttribute("data-start-y") || "0";
                        strip.style.transform = `translateY(${sy}px)`;
                    } else {
                        const sx = strip.getAttribute("data-start-x") || "0";
                        strip.style.transform = `translateX(${sx}px)`;
                    }
                    if (colorFrom) strip.style.color = colorFrom;
                });
            };

            try {
                await animateOnce();

                if (loop) {
                    onShuffleComplete?.();
                    while (!cancelledRef.current) {
                        await new Promise((r) => setTimeout(r, loopDelay * 1000));
                        if (cancelledRef.current) break;
                        if (scrambleCharset) randomizeScrambles();
                        resetPositions();
                        await animateOnce();
                        onShuffleComplete?.();
                    }
                } else {
                    playingRef.current = false;
                    cleanupToStill();
                    if (colorTo) strips.forEach((s) => (s.style.color = colorTo));
                    onShuffleComplete?.();
                    armHover();
                }
            } catch {
                /* animation was cancelled */
            }
        };

        const armHover = () => {
            if (!triggerOnHover || !ref.current) return;
            removeHover();
            const handler = () => {
                if (playingRef.current) return;
                build();
                if (scrambleCharset) randomizeScrambles();
                play();
            };
            hoverHandlerRef.current = handler;
            ref.current.addEventListener("mouseenter", handler);
        };

        const create = () => {
            build();
            if (scrambleCharset) randomizeScrambles();
            play();
            armHover();
            setReady(true);
        };

        /* ---- scroll trigger via inView ---- */

        const stopObserver = inView(
            el,
            () => {
                create();
                if (!triggerOnce) {
                    return () => {
                        teardown();
                        setReady(false);
                    };
                }
            },
            { amount: threshold, margin: rootMargin as `${number}px` }
        );

        return () => {
            stopObserver();
            removeHover();
            teardown();
            setReady(false);
        };
    }, [
        text,
        duration,
        maxDelay,
        ease,
        threshold,
        rootMargin,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
        onShuffleComplete,
    ]);

    const baseTw =
        "inline-block whitespace-normal break-words will-change-transform uppercase text-2xl leading-none";
    const userHasFont = useMemo(
        () => className && /font[-[]/i.test(className),
        [className]
    );

    const fallbackFont = useMemo(
        () => (userHasFont ? {} : { fontFamily: `'Press Start 2P', sans-serif` }),
        [userHasFont]
    );

    const commonStyle = useMemo(
        () => ({
            textAlign,
            ...fallbackFont,
            ...style,
        }),
        [textAlign, fallbackFont, style]
    );

    const classes = useMemo(
        () => `${baseTw} ${ready ? "visible" : "invisible"} ${className}`.trim(),
        [baseTw, ready, className]
    );
    const Tag = (tag || "p") as keyof JSX.IntrinsicElements;

    return React.createElement(
        Tag,
        // eslint-disable-next-line
        { ref: ref as any, className: classes, style: commonStyle },
        text
    );
};
export default Shuffle;
