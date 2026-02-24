"use client";

import { cn } from "@/lib/utils/index";
import { isMotionComponent, motion, type HTMLMotionProps } from "motion/react";
import * as React from "react";

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

// Cache motion components outside render to avoid "creating components during render"
const motionComponentCache = new Map<React.ElementType, React.ElementType>();

function getMotionComponent(type: React.ElementType): React.ElementType {
    if (!motionComponentCache.has(type)) {
        motionComponentCache.set(type, motion.create(type));
    }
    return motionComponentCache.get(type)!;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
    return (node) => {
        refs.forEach((ref) => {
            if (!ref) return;
            if (typeof ref === "function") {
                ref(node);
            } else {
                (ref as React.MutableRefObject<T | null>).current = node;
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

    const isAlreadyMotion =
        typeof children.type === "object" &&
        children.type !== null &&
        isMotionComponent(children.type);

    const { ref: childRef, ...childProps } = children.props as AnyProps;

    const mergedProps = mergeProps(childProps, props);
    const mergedRef = mergeRefs(childRef as React.Ref<T>, ref);

    // Use createElement instead of JSX to avoid "creating components during render" error
    if (isAlreadyMotion) {
        return React.createElement(children.type as React.ElementType, {
            ...mergedProps,
            ref: mergedRef,
        });
    }

    // For non-motion components, get or create the motion wrapper from cache
    return React.createElement(getMotionComponent(children.type as React.ElementType), {
        ...mergedProps,
        ref: mergedRef,
    });
}

export { Slot, type AnyProps, type DOMMotionProps, type SlotProps, type WithAsChild };
