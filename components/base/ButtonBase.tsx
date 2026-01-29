import { Link } from "@/i18n/navigation";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonAsButton = {
    as?: "button";
    href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
    as: "link";
    href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonBaseProps = (ButtonAsButton | ButtonAsLink) & {
    children?: ReactNode;
    className?: string;
    text?: string;
    capitalize?: boolean;
};

export default function ButtonBase({
    children,
    className,
    href,
    text,
    as = "button",
    ...props
}: ButtonBaseProps) {
    if (as === "link" && href) {
        //  Narrow the props to anchor-specific ones
        const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <Link
                href={href}
                className={className}
                style={linkProps.style}
                {...linkProps}
            >
                {text || children}
            </Link>
        );
    }

    // Narrow the props to button-specific ones
    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button className={className} {...buttonProps}>
            {text || children}
        </button>
    );
}
