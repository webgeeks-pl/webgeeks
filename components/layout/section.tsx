import type { BasicComponentProps } from "@types";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const section = cva("flex w-full flex-col items-center", {
    variants: {
        padded: {
            xs: "pt-size-xs pb-size-xs",
            sm: "pt-size-sm pb-size-sm",
            md: "pt-size-md pb-size-md",
            lg: "pt-size-lg pb-size-lg",
            xl: "pt-size-xl pb-size-xl",
            "2xl": "pt-size-2xl pb-size-2xl",
            "3xl": "pt-size-3xl pb-size-3xl",
            "4xl": "pt-size-4xl pb-size-4xl",
            "5xl": "pt-size-5xl pb-size-5xl",
            "6xl": "pt-size-6xl pb-size-6xl",
            none: "",
        },
        paddedTop: {
            xs: "pt-size-xs",
            sm: "pt-size-sm",
            md: "pt-size-md",
            lg: "pt-size-lg",
            xl: "pt-size-xl",
            "2xl": "pt-size-2xl",
            "3xl": "pt-size-3xl",
            "4xl": "pt-size-4xl",
            "5xl": "pt-size-5xl",
            "6xl": "pt-size-6xl",
            none: "",
        },
        paddedBottom: {
            xs: "pb-size-xs",
            sm: "pb-size-sm",
            md: "pb-size-md",
            lg: "pb-size-lg",
            xl: "pb-size-xl",
            "2xl": "pb-size-2xl",
            "3xl": "pb-size-3xl",
            "4xl": "pb-size-4xl",
            "5xl": "pb-size-5xl",
            "6xl": "pb-size-6xl",
            none: "",
        },
    },
    defaultVariants: {
        padded: "none",
        paddedTop: "none",
        paddedBottom: "none",
    },
});

const content = cva("flex flex-col items-center px-5 w-full xs:container", {
    variants: {
        gapped: {
            xs: "gap-size-xs",
            sm: "gap-size-sm",
            md: "gap-size-md",
            lg: "gap-size-lg",
            xl: "gap-size-xl",
            "2xl": "gap-size-2xl",
            "3xl": "gap-size-3xl",
            "4xl": "gap-size-4xl",
            "5xl": "gap-size-5xl",
            "6xl": "gap-size-6xl",
            none: "",
        },
    },
    defaultVariants: {
        gapped: "md",
    },
});

interface SectionProps
    extends
        BasicComponentProps,
        HTMLAttributes<HTMLElement>,
        VariantProps<typeof section>,
        VariantProps<typeof content> {
    contentClassName?: string;
    Wrapper?: React.ElementType;
    Overlay?: React.ElementType;
    OverlayPosition?: "top" | "bottom";
    contentEnabled?: boolean;
}

export default function Section({
    children,
    className,
    contentClassName,
    padded,
    paddedTop,
    paddedBottom,
    gapped,
    Wrapper,
    Overlay,
    OverlayPosition = "bottom",
    contentEnabled = true,
    ...props
}: SectionProps) {
    const sectionStyleProps = { padded, paddedTop, paddedBottom, className };
    const contentStyleProps = { className: contentClassName, gapped };

    const output = contentEnabled ? (
        <div className={content(contentStyleProps)}>{children}</div>
    ) : (
        children
    );

    return (
        <section className={section(sectionStyleProps)} {...props}>
            {/* Overlay Top */}
            {Overlay && OverlayPosition === "top" && <Overlay />}

            {/* Content */}
            {Wrapper ? <Wrapper>{output}</Wrapper> : output}

            {/* Overlay Bottom */}
            {Overlay && OverlayPosition === "bottom" && <Overlay />}
        </section>
    );
}
