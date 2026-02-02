"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type Transition } from "motion/react";
import * as React from "react";

type PropType<T = React.ReactNode> = {
    slides: T[];
    options?: EmblaOptionsType;
    render?: (slide: T, index: number) => React.ReactNode;
    className?: string;
    labels?: string[];
};

type EmblaControls = {
    selectedIndex: number;
    scrollSnaps: number[];
    prevDisabled: boolean;
    nextDisabled: boolean;
    onDotClick: (index: number) => void;
    onPrev: () => void;
    onNext: () => void;
};

type DotButtonProps = {
    selected?: boolean;
    label: string;
    onClick: () => void;
};

const transition: Transition = {
    type: "spring",
    stiffness: 240,
    damping: 24,
    mass: 1,
};

const useEmblaControls = (emblaApi: EmblaCarouselType | undefined): EmblaControls => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const [prevDisabled, setPrevDisabled] = React.useState(true);
    const [nextDisabled, setNextDisabled] = React.useState(true);

    const onDotClick = React.useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    );

    const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const updateSelectionState = (api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap());
        setPrevDisabled(!api.canScrollPrev());
        setNextDisabled(!api.canScrollNext());
    };

    const onInit = React.useCallback((api: EmblaCarouselType) => {
        setScrollSnaps(api.scrollSnapList());
        updateSelectionState(api);
    }, []);

    const onSelect = React.useCallback((api: EmblaCarouselType) => {
        updateSelectionState(api);
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        emblaApi.on("reInit", onInit).on("select", onSelect);

        return () => {
            emblaApi.off("reInit", onInit).off("select", onSelect);
        };
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        prevDisabled,
        nextDisabled,
        onDotClick,
        onPrev,
        onNext,
    };
};

function MotionCarousel<T = React.ReactNode>(props: PropType<T>) {
    const { slides, options, render, className, labels } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const {
        selectedIndex,
        scrollSnaps,
        prevDisabled,
        nextDisabled,
        onDotClick,
        onPrev,
        onNext,
    } = useEmblaControls(emblaApi);

    return (
        <div
            className={cn(
                "w-full space-y-4 [--slide-height:9rem] [--slide-size:55%] [--slide-spacing:1.5rem]",
                className
            )}
        >
            <div className="overflow-hidden py-2" ref={emblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom">
                    {slides.map((slide, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <motion.div
                                key={index}
                                className="mr-[var(--slide-spacing)] flex h-[var(--slide-height)] min-w-0 flex-none basis-[var(--slide-size)]"
                            >
                                <motion.div
                                    className="flex size-full items-center justify-center select-none"
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1 : 0.9,
                                    }}
                                    transition={transition}
                                >
                                    {render
                                        ? render(slide, index)
                                        : (slide as React.ReactNode)}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between">
                <Button size="icon" onClick={onPrev} disabled={prevDisabled}>
                    <ChevronLeft className="size-5" />
                </Button>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            label={
                                labels && labels.length === slides.length
                                    ? labels[index]
                                    : `Slide ${index + 1}`
                            }
                            selected={index === selectedIndex}
                            onClick={() => onDotClick(index)}
                        />
                    ))}
                </div>

                <Button size="icon" onClick={onNext} disabled={nextDisabled}>
                    <ChevronRight className="size-5" />
                </Button>
            </div>
        </div>
    );
}

function DotButton({ selected = false, label, onClick }: DotButtonProps) {
    const labelWidth = Math.max(12, label.length * 8 + 24);

    return (
        <motion.button
            type="button"
            onClick={onClick}
            layout
            initial={false}
            className="bg-primary text-primary-foreground flex cursor-pointer items-center justify-center rounded-full border-none text-sm select-none"
            animate={{
                width: selected ? labelWidth : 12,
                height: selected ? 28 : 12,
            }}
            transition={transition}
        >
            <motion.span
                layout
                initial={false}
                className="block px-3 py-1 whitespace-nowrap"
                animate={{
                    opacity: selected ? 1 : 0,
                    scale: selected ? 1 : 0,
                    filter: selected ? "blur(0)" : "blur(4px)",
                }}
                transition={transition}
            >
                {label}
            </motion.span>
        </motion.button>
    );
}

export { MotionCarousel };
