import type { BasicComponentProps } from "@types";
import { Easing } from "motion";
import { InView } from "./InView";

const variants = {
    blurIn: {
        hidden: {
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)",
        },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            willChange: "auto",
        },
    },
    zoomIn: {
        hidden: {
            opacity: 0,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            scale: 1,
            willChange: "auto",
        },
    },

    fromLeft: {
        hidden: {
            opacity: 0,
            x: -30,
        },
        visible: {
            opacity: 1,
            x: 0,
            willChange: "auto",
        },
    },

    fromRight: {
        hidden: {
            opacity: 0,
            x: 30,
        },
        visible: {
            opacity: 1,
            x: 0,
            willChange: "auto",
        },
    },

    fromTop: {
        hidden: {
            opacity: 0,
            y: -30,
        },
        visible: {
            opacity: 1,
            y: 0,
            willChange: "auto",
        },
    },

    fromBottom: {
        hidden: {
            opacity: 0,
            y: 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            willChange: "auto",
        },
    },
};

export type AnimateConfigProps = {
    delay?: number;
    variant?: keyof typeof variants;
    animate?: boolean;
    duration?: number;
    ease?: Easing[] | Easing;
    once?: boolean;
    onceOnMount?: boolean;
    className?: string;
    viewOptions?: Parameters<typeof InView>[0]["viewOptions"];
    as?: keyof HTMLElementTagNameMap;
    id?: string;
};

interface AnimateProps extends BasicComponentProps, AnimateConfigProps {
    asChild?: boolean;
}

export default function Animate({
    children,
    delay = 0.1,
    className,
    duration = 0.3,
    variant = "fromBottom",
    ease = "linear",
    once = false,
    onceOnMount = true,
    viewOptions,
    as,
    id,
}: AnimateProps) {
    return (
        <>
            <InView
                as={as}
                transition={{ duration, ease, delay }}
                className={className}
                once={once}
                onceOnMount={onceOnMount}
                viewOptions={viewOptions}
                variants={variants[variant]}
                id={id}
            >
                {children}
            </InView>
        </>
    );
}
