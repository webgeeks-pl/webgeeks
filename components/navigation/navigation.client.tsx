"use client";

import { useNavigation } from "@/context/navigationContext";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";

interface HeaderProps {
    children?: React.ReactNode | React.ReactNode[];
    className?: string;
    scrollActive?: boolean;
}

export function MobileDialog({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
}) {
    const { isNavOpen, setIsNavOpen } = useNavigation();
    return (
        <Dialog open={isNavOpen} onClose={setIsNavOpen} className={cn("", className)}>
            {children}
        </Dialog>
    );
}

function useNavAction(role?: "open" | "close" | "toggle") {
    const { closeNav, openNav, toggleNav } = useNavigation();
    return role === "open" ? openNav : role === "close" ? closeNav : toggleNav;
}

export function NavbarMobileButton({
    children,
    role,
    className,
    ...rest
}: {
    children?: React.ReactNode;
    role?: "open" | "close" | "toggle";
} & Omit<React.ComponentProps<"button">, "role">) {
    const onClick = useNavAction(role);
    return (
        <button {...rest} onClick={onClick} className={cn("z-1000", className)}>
            {children}
        </button>
    );
}

export function MobileOverlay({
    children,
    role,
    className,
    ...rest
}: {
    children?: React.ReactNode;
    role?: "open" | "close" | "toggle";
} & Omit<React.ComponentProps<"div">, "role">) {
    const onClick = useNavAction(role);
    return (
        <div {...rest} onClick={onClick} className={cn("z-1000", className)}>
            {children}
        </div>
    );
}

export function ActiveLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <span data-active={isActive} className="group/navlink contents">
            {children}
        </span>
    );
}

export function Header({ className, children, scrollActive }: HeaderProps) {
    const { headerRef, isNavOpen } = useNavigation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!scrollActive) return;
        const SCROLL_THRESHOLD = 200;

        const checkScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD || isNavOpen);
        };

        checkScroll();

        window.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [isNavOpen, scrollActive]);

    return (
        <>
            <div id="navigation-top" className="h-0" />
            <header
                ref={headerRef}
                data-scrolled={isScrolled}
                className={cn("group z-navbar", className)}
            >
                {children}
            </header>
        </>
    );
}
