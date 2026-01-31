import { cn } from "@/lib/utils";
import type { BasicComponentProps } from "@types";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import Tag from "../base/tag";
import Text from "../typography/text";

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

const content = cva(
    "flex flex-col items-center px-5 w-full xs:container max-w-7xl! ",
    {
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
            gapped: "sm",
        },
    }
);

interface SectionProps
    extends
        BasicComponentProps,
        HTMLAttributes<HTMLElement>,
        VariantProps<typeof section>,
        VariantProps<typeof content> {
    Wrapper?: React.ElementType;
    Overlay?: React.ElementType;
    OverlayPosition?: "top" | "bottom";
    contentEnabled?: boolean;
    as?: keyof HTMLElementTagNameMap;
    asChild?: boolean;
    shouldRender?: boolean;
}

export default function Section({
    children,
    className,
    padded,
    paddedTop,
    asChild,
    as,
    shouldRender = true,
    paddedBottom,
    ...props
}: SectionProps) {
    const sectionStyleProps = {
        padded,
        paddedTop,
        paddedBottom,
        className,
    };
    if (!shouldRender) {
        return null;
    }

    return (
        <Tag
            as={as ?? "section"}
            asChild={asChild}
            className={section(sectionStyleProps)}
            {...props}
        >
            {children}
        </Tag>
    );
}

interface SectionContentProps
    extends BasicComponentProps, VariantProps<typeof content> {}

export function SectionContent({
    children,
    className,
    gapped,
    ...props
}: SectionContentProps) {
    return (
        <Tag className={content({ className, gapped })} {...props}>
            {children}
        </Tag>
    );
}

interface SectionHeaderProps extends BasicComponentProps {
    title: string;
    description: string;
    className?: string;
}

export function SectionHeader({
    title,
    description,
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex-start mx-auto flex max-w-2xl flex-col gap-2 sm:text-center",
                className
            )}
        >
            <Text intent="h2" className="text-3xl sm:text-4xl">
                {title}
            </Text>
            <Text intent="lead" muted>
                {description}
            </Text>
        </div>
    );
}
