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
    children?: React.ReactNode;
}) {
    const { isNavOpen, setIsNavOpen } = useNavigation();
    return (
        <Dialog open={isNavOpen} onClose={setIsNavOpen} className={cn("", className)}>
            {children}
        </Dialog>
    );
}

export function NavbarMobileButton({
    children,
    type,
}: {
    children: React.ReactNode | React.ReactNode[];
    type: "open" | "close" | "toggle";
}) {
    const { closeNav, openNav, toggleNav } = useNavigation();
    return (
        <button
            onClick={type === "open" ? openNav : type === "close" ? closeNav : toggleNav}
            className="navbar:hidden z-1000"
        >
            {children}
        </button>
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
    }, [isNavOpen]);

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
