"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { NavigationRoutesEntry } from "@types";
import { AnchorHTMLAttributes } from "react";

const normalize = (path: string) => {
    return path === "/"
        ? "/"
        : path.startsWith("/")
          ? path.replace("/", "")
          : path;
};

const checkActive = (target: string, current: string, exact: boolean) => {
    return exact
        ? current === target
        : current === target || current.startsWith(`${target}/`);
};

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    route: NavigationRoutesEntry;
    className?: string;
    activeClassName?: string;
    ctaClassName?: string;
    onClick?: (e: React.MouseEvent) => void;
    text?: string;
}

export default function NavLink({
    href,
    text,
    className,
    activeClassName,
    ctaClassName,
    onClick,
}: NavLinkProps) {
    const pathname = usePathname();
    const target = normalize(route.link);
    const current = normalize(pathname ?? "");
    const isActive = checkActive(target, current, route.exact || false);
    const isCTA = route.cta;

    return (
        <Link
            onClick={onClick}
            href={href}
            className={cn(
                className,
                isActive && activeClassName,
                isCTA && ctaClassName
            )}
        >
            {text}
        </Link>
    );
}
