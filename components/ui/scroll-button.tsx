"use client";

import { Link, redirect, usePathname } from "@/i18n/navigation";
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
    options?: ScrollIntoViewOptions;
    onRoute?: string;
    routeMatchMode?: "exact" | "pathname" | "full";
} & Partial<TagProps<any>>;

export default function ScrollButton({
    as = "button",
    options,
    href,
    target,
    children,
    className,
    onRoute,
    text,
    routeMatchMode = "pathname",
    ...props
}: ScrollButtonProps) {
    const locale = useLocale();
    const pathname = usePathname();

    // Determine if on the same route based on mode
    const isSameRoute = href
        ? (() => {
              if (routeMatchMode === "exact") {
                  // Exact pathname match only
                  return pathname === href;
              } else if (routeMatchMode === "full") {
                  // Full URL including query and hash
                  const fullUrl =
                      typeof window !== "undefined"
                          ? window.location.pathname +
                            window.location.search +
                            window.location.hash
                          : pathname;
                  return fullUrl === href;
              } else {
                  // pathname mode (default) - pathname match, ignoring query and hash
                  return pathname === href;
              }
          })()
        : true;

    function onClick() {
        if (!target) return;

        const element = document.querySelector(target);

        if (as === "link" && href && !isSameRoute) {
            redirect({ href, locale });
        }
        if (element && isSameRoute) {
            element.scrollIntoView(options ?? { behavior: "smooth" });
        }
    }

    if (as === "link" && href) {
        const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <Link
                href={href}
                className={["scroll-smooth", className].filter(Boolean).join(" ")}
                onClick={(e) => {
                    onClick();
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
