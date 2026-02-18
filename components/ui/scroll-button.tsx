"use client";

import { Link, redirect } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Tag, { TagProps } from "../base/tag";

type ScrollAsButton = {
    as?: "button" | undefined;
    href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement> & { target?: string };

type ScrollAsLink = {
    as: "link";
    href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement> & { target?: string };

export type ScrollButtonProps = (ScrollAsButton | ScrollAsLink) & {
    children?: ReactNode;
    className?: string;
    text?: string;
} & Partial<TagProps<any>>;

export default function ScrollButton({
    as = "button",
    href,
    target,
    children,
    className,
    text,
    ...props
}: ScrollButtonProps) {
    const locale = useLocale();

    function onClick(e: MouseEvent) {
        const element = document.querySelector(target ?? "");
        if (as === "link" && href) {
            redirect({ href, locale });
        }
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    if (as === "link" && href) {
        const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <Link
                href={href}
                className={["scroll-smooth", className].filter(Boolean).join(" ")}
                onClick={(e) => {
                    onClick(e);
                    if (typeof anchorProps.onClick === "function")
                        anchorProps.onClick(e as any);
                }}
                {...anchorProps}
            >
                {children ?? text}
            </Link>
        );
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <Tag
            as={(as as any) ?? "button"}
            className={className}
            onClick={onClick}
            {...(buttonProps as any)}
        >
            {children ?? text}
        </Tag>
    );
}
