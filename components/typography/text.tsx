import type { BasicComponentProps } from "@types";
import { applyHardSpaceBreaks } from "@utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import Tag from "../base/Tag";



const textCva = cva("", {
    variants: {
        intent: {
            h1: "text-4xl scroll-m-20 font-extrald tracking-tight text-balance",
            h2: "scroll-m-20 pb-2 text-3xl font-semild tracking-tight first:mt-0",
            h3: "text-2xl scroll-m-20 font-semild tracking-tight",
            h4: "text-xl scroll-m-20 font-semild tracking-tight",
            p: "leading-7",
            blockquote: "mt-6 rder-l-2 rder-clr-brand-red/20 pl-6 italic",
            lead: "text-xl",
            large: "text-lg font-semild",
            small: "text-sm leading-5 font-medium",
        },

        color: {
            primary: "text-clr-brand-red-dark",
            secondary: "text-clr-brand-rose",
            base: "text-clr-text",
            opposite: "text-clr-bg-light",
        },

        spaced: {
            xs: "[&:not(:first-child)]:mt-size-xs",
            sm: "[&:not(:first-child)]:mt-size-sm",
            md: "[&:not(:first-child)]:mt-size-md",
            lg: "[&:not(:first-child)]:mt-size-lg",
            xl: "[&:not(:first-child)]:mt-size-xl",
            "2xl": "[&:not(:first-child)]:mt-size-2xl",
            "3xl": "[&:not(:first-child)]:mt-size-3xl",
            "4xl": "[&:not(:first-child)]:mt-size-4xl",
            "5xl": "[&:not(:first-child)]:mt-size-5xl",
            "6xl": "[&:not(:first-child)]:mt-size-6xl",
            none: "",
        },

        muted: {
            true: "",
            false: "",
        },
    },
    compoundVariants: [
        // Muted variants
        {
            color: "primary",
            muted: true,
            className: "text-clr-brand-red-dark",
        },
        {
            color: "secondary",
            muted: true,
            className: "text-clr-brand-rose-light",
        },
        { color: "opposite", muted: true, className: "text-clr-bg-dark" },

        { intent: "lead", color: "opposite", className: "text-clr-bg-dark" },
        {
            intent: "lead",
            color: "primary",
            className: "text-clr-brand-red-dark",
        },
        {
            intent: "lead",
            color: "secondary",
            className: "text-clr-brand-rose-light",
        },
    ],
    defaultVariants: {
        intent: "p",
        color: "primary",
    },
});
type TextIntent = NonNullable<VariantProps<typeof textCva>["intent"]>;

const defaultTags: Record<TextIntent, keyof HTMLElementTagNameMap> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    p: "p",
    blockquote: "blockquote",
    lead: "p",
    large: "p",
    small: "p",
};

interface BaseTextProps
    extends BasicComponentProps,
        // varies for text styles
        VariantProps<typeof textCva> {
    as?: keyof HTMLElementTagNameMap;
    text?: ReactNode;
}

type TextProps<E extends keyof HTMLElementTagNameMap> = BaseTextProps & {
    as?: E;
    shouldAddHardBreaks?: boolean;
} & React.ComponentPropsWithoutRef<E>;

export default function Text<E extends keyof HTMLElementTagNameMap = "p">({
    children,
    className,
    text,
    spaced,
    as,
    intent,
    color,
    shouldAddHardBreaks = true,

    muted = false,
    ...props
}: TextProps<E>) {
    const asTag = as ?? (intent && defaultTags[intent]) ?? "p";
    const output = text || children;
    const processedOutput =
        shouldAddHardBreaks && typeof output === "string"
            ? applyHardSpaceBreaks(output)
            : output;

    const FinalTag = Tag;
    return (
        <FinalTag
            as={asTag}
            className={textCva({
                intent,
                color,
                muted,
                spaced,
                className,
            })}
            {...props}
        >
            {processedOutput}
        </FinalTag>
    );
}
