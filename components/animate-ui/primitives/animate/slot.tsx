"use client";

import { cn } from "@/lib/utils/index";
import { isMotionComponent, motion, type HTMLMotionProps } from "motion/react";
import * as React from "react";

// Cache motion-wrapped components at module level to avoid creating them during render
const motionComponentCache = new Map<React.ElementType, React.ElementType>();

function getMotionComponent(type: React.ElementType): React.ElementType {
    if (isMotionComponent(type)) return type;
    let cached = motionComponentCache.get(type);
    if (!cached) {
        cached = motion.create(type);
        motionComponentCache.set(type, cached);
    }
    return cached;
}

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
    HTMLMotionProps<keyof HTMLElementTagNameMap>,
    "ref"
> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> =
    | (Base & { asChild: true; children: React.ReactElement })
    | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any;
} & DOMMotionProps<T>;

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): (node: T | null) => void {
    return (node: T | null) => {
        refs.forEach((ref) => {
            if (!ref) return;
            if (typeof ref === "function") {
                ref(node);
            } else {
                (ref as React.RefObject<T | null>).current = node;
            }
        });
    };
}

function mergeProps<T extends HTMLElement>(
    childProps: AnyProps,
    slotProps: DOMMotionProps<T>
): AnyProps {
    const merged: AnyProps = { ...childProps, ...slotProps };

    if (childProps.className || slotProps.className) {
        merged.className = cn(
            childProps.className as string,
            slotProps.className as string
        );
    }

    if (childProps.style || slotProps.style) {
        merged.style = {
            ...(childProps.style as React.CSSProperties),
            ...(slotProps.style as React.CSSProperties),
        };
    }

    return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({
    children,
    ref,
    ...props
}: SlotProps<T>) {
    if (!React.isValidElement(children)) return null;

    const Base = getMotionComponent(children.type as React.ElementType);

    const { ref: childRef, ...childProps } = children.props as AnyProps;

    const mergedProps = mergeProps(childProps, props);

    // Use createElement to avoid eslint react-hooks/static-components false positive
    // The component is cached at module level via getMotionComponent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.createElement(Base as any, {
        ...mergedProps,
        ref: mergeRefs(childRef as React.Ref<T>, ref),
    });
}

export { Slot, type AnyProps, type DOMMotionProps, type SlotProps, type WithAsChild };
