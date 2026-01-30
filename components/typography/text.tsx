import type { BasicComponentProps } from "@types";
import { applyHardSpaceBreaks } from "@utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import Tag from "../base/tag";

const textCva = cva("", {
    variants: {
        intent: {
            h1: "text-4xl scroll-m-20 font-extrald tracking-tight text-balance",
            h2: "scroll-m-20  text-3xl font-semild tracking-tight ",
            h3: "text-2xl scroll-m-20 font-semild tracking-tight",
            h4: "text-xl scroll-m-20 font-semild tracking-tight",
            p: "leading-7",
            blockquote: "mt-6 rder-l-2 rder-clr-brand-red/20 pl-6 italic",
            lead: "text-xl",
            large: "text-lg font-semild",
            small: "text-sm leading-5 font-medium",
        },

        color: {
            primary: "",
            opposite: "",
            // secondary: "text-clr-900",
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
            className: "text-clr-500",
        },
        {
            color: "primary",
            muted: false,
            className: "text-clr-900",
        },
        // {
        //     color: "secondary",
        //     muted: true,
        //     className: "text-clr-brand-rose-light",
        // },
        { color: "opposite", muted: true, className: "text-clr-200" },
        { color: "opposite", muted: false, className: "text-clr-50" },

        // { intent: "lead", color: "opposite", className: "text-clr-bg-dark" },
        // {
        //     intent: "lead",
        //     color: "primary",
        //     className: "text-clr-brand-red-dark",
        // },
        // {
        //     intent: "lead",
        //     color: "secondary",
        //     className: "text-clr-brand-rose-light",
        // },
    ],
    defaultVariants: {
        intent: "p",
        color: "primary",
        spaced: "none",
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
    extends
        BasicComponentProps,
        // varies for text styles
        VariantProps<typeof textCva> {
    as?: keyof HTMLElementTagNameMap;
    text?: ReactNode;
}

type TextProps<E extends keyof HTMLElementTagNameMap> = BaseTextProps & {
    as?: E;
    shouldAddHardBreaks?: boolean;
} & React.ComponentPropsWithoutRef<E> &
    React.ComponentPropsWithoutRef<typeof Tag>;

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

    return (
        <Tag
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
        </Tag>
    );
}
