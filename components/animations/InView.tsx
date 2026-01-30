"use client";
import { usePathname } from "@/i18n/navigation";
import {
    motion,
    Transition,
    useInView,
    UseInViewOptions,
    Variant,
} from "motion/react";

import { ReactNode, useEffect, useRef, useState } from "react";

export type InViewProps = {
    children: ReactNode;
    variants?: {
        hidden: Variant;
        visible: Variant;
    };
    transition?: Transition;
    viewOptions?: UseInViewOptions;
    as?: React.ElementType;
    once?: boolean;
    className?: string;
};

const defaultVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export function InView({
    children,
    variants = defaultVariants,
    transition,
    viewOptions,
    as = "div",
    className,
    once = true,
}: InViewProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewOptions);

    const [hasStartedAnimation, setHasStartedAnimation] = useState(false);
    const pathname = usePathname();

    const [forceVisible, setForceVisible] = useState(false);
    useEffect(() => {
        if (!pathname) return;
        // eslint-disable-next-line
        setForceVisible(true);
        const t = window.setTimeout(() => setForceVisible(false), 700);
        return () => window.clearTimeout(t);
    }, [pathname]);

    // Mark as started when element enters view for the first time
    useEffect(() => {
        if (once && isInView && !hasStartedAnimation) {
            // eslint-disable-next-line
            setHasStartedAnimation(true);
        }
    }, [isInView, once, hasStartedAnimation]);

    const MotionComponent = motion[as as keyof typeof motion] as typeof as;

    return (
        <MotionComponent
            className={className}
            ref={ref}
            initial="hidden"
            animate={
                isInView || hasStartedAnimation || forceVisible
                    ? "visible"
                    : "hidden"
            }
            variants={variants}
            transition={transition}
        >
            {children}
        </MotionComponent>
    );
}
// "use client";

// import { usePathname } from "@/i18n/navigation";
// import {
//     motion,
//     Transition,
//     useInView,
//     UseInViewOptions,
//     Variant,
// } from "motion/react";
// import type { ComponentType, ElementType } from "react";
// import { ReactElement, useEffect, useRef, useState } from "react";

// export type InViewProps = {
//     children: ReactElement<any>;
//     variants?: {
//         hidden: Variant;
//         visible: Variant;
//     };
//     transition?: Transition;
//     viewOptions?: UseInViewOptions;
//     once?: boolean;
// };

// const defaultVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
// };
// const motionCache = new Map<ElementType, ComponentType<any>>();

// function getMotionComponent(type: ElementType) {
//     if (!motionCache.has(type)) {
//         motionCache.set(type, motion(type));
//     }
//     return motionCache.get(type)!;
// }

// export function InView({
//     children,
//     variants = defaultVariants,
//     transition,
//     viewOptions,
//     once = true,
// }: InViewProps) {
//     const ref = useRef<HTMLElement | null>(null);
//     const isInView = useInView(ref, viewOptions);

//     const [hasStartedAnimation, setHasStartedAnimation] = useState(false);
//     const [forceVisible, setForceVisible] = useState(false);

//     const pathname = usePathname();

//     useEffect(() => {
//         // eslint-disable-next-line
//         setForceVisible(true);
//         const t = setTimeout(() => setForceVisible(false), 700);
//         return () => clearTimeout(t);
//     }, [pathname]);

//     useEffect(() => {
//         if (once && isInView && !hasStartedAnimation) {
//             // eslint-disable-next-line
//             setHasStartedAnimation(true);
//         }
//     }, [isInView, once, hasStartedAnimation]);
//     const MotionChild = getMotionComponent(children.type as ElementType);

//     return (
//         // eslint-disable-next-line react-hooks/static-components
//         <MotionChild
//             {...children.props}
//             ref={ref}
//             initial="hidden"
//             animate={
//                 isInView || hasStartedAnimation || forceVisible
//                     ? "visible"
//                     : "hidden"
//             }
//             variants={variants}
//             transition={transition}
//         />
//     );
// }
