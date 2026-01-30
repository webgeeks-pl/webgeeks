"use client";

import useOnMount from "@/hooks/useOnMount";
import useOnResize from "@/hooks/useOnResize";
import useOnScroll from "@/hooks/useOnScroll";
import { BREAKPOINT_VALUES } from "@/lib/constants";
import type { BasicComponentProps, ScreenBreakpoint } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { useNavigation } from "@context/navigationContext";
import Hamburger from "hamburger-react";
import { useTranslations } from "next-intl";
import Link from "next/dist/client/link";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";

interface HeaderContainerProps {
    children: ReactNode;
    className?: string;
}

export function HeaderContainer({ children, className }: HeaderContainerProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { headerRef, isNavOpen } = useNavigation();

    const checkNavHeight = () => {
        if (!headerRef.current) return;
        const navHeight = headerRef.current.getBoundingClientRect().height;
        if (navHeight < window.scrollY || isNavOpen) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    // Mount check
    useOnMount(() => {
        if (!headerRef.current) {
            setIsScrolled(true);
            return;
        }
        checkNavHeight();
    });
    // Nav open check
    useEffect(() => {
        // eslint-disable-next-line
        if (isNavOpen) setIsScrolled(true);
        else setIsScrolled(false);
    }, [isNavOpen]);
    // Scroll check
    useOnScroll(checkNavHeight);

    return (
        <header
            ref={headerRef}
            data-scrolled={isScrolled ? "true" : "false"}
            className={cn("group/header", className)}
        >
            {children}
        </header>
    );
}

interface HeaderHeightProps {
    className?: string;
}

export function HeaderHeightPadding({ className }: HeaderHeightProps) {
    const { headerRef } = useNavigation();
    const paddingRef = useRef<HTMLDivElement | null>(null);

    const resizeHandler = () => {
        if (headerRef.current && paddingRef.current) {
            const { height } = headerRef.current.getBoundingClientRect();
            paddingRef.current.style.height = height.toString() + "px";
        }
    };

    useOnMount(resizeHandler);
    useOnResize(resizeHandler, headerRef);

    return <div ref={paddingRef} className={className} />;
}

interface HeaderNavigationProps extends BasicComponentProps {
    isOpened?: boolean;
    classNameOnOpen?: string;
    classNameOnClose?: string;
    breakpoint: ScreenBreakpoint;
    classNameOverlay?: string;
}
export function NavigationContainer({
    children,
    breakpoint,
    className,
    classNameOnClose,
    classNameOnOpen,
    classNameOverlay,
}: HeaderNavigationProps) {
    const { isNavOpen, closeNav } = useNavigation();
    const [isMobile, setIsMobile] = useState(true);
    const targetBreakpointValue = BREAKPOINT_VALUES[breakpoint];

    useOnResize(() => {
        const { width } = window.document.body.getBoundingClientRect();
        if (width >= targetBreakpointValue) {
            closeNav();
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    });

    return (
        <nav
            className={cn(
                className,
                isNavOpen ? classNameOnOpen : classNameOnClose
            )}
        >
            {isNavOpen &&
                createPortal(
                    <Overlay
                        onClick={closeNav}
                        isOpen={isMobile && isNavOpen}
                        className={classNameOverlay}
                    />,
                    document.body
                )}
            {children}
        </nav>
    );
}

function Overlay({
    onClick,
    className,
    isOpen,
}: {
    onClick: () => void;
    className?: string;
    isOpen: boolean;
}) {
    return (
        <div
            className={cn(
                "fixed inset-0 z-1000 xl:hidden",
                isOpen ? "" : "hidden",
                className
            )}
            style={{
                visibility: isOpen ? "visible" : "hidden",
                pointerEvents: isOpen ? "auto" : "none",
                opacity: isOpen ? "1" : "0",
                zIndex: isOpen ? "" : "-10",
                display: isOpen ? "block" : "hidden",
            }}
            onClick={onClick}
        />
    );
}

interface NavigationToggleButton {
    className?: string;
    size?: number;
}

export function NavigationToggleButton({
    className,
    size = 24,
}: NavigationToggleButton) {
    const { isNavOpen, toggleNav } = useNavigation();
    const t = useTranslations("aria");
    return (
        <button
            type="button"
            className={cn("", className)}
            aria-label={isNavOpen ? t("closeMenu") : t("openMenu")}
        >
            <Hamburger
                size={size}
                rounded
                color="oklch(0.8835 0.0668 355.93)"
                toggled={isNavOpen}
                onToggle={toggleNav}
            />
        </button>
    );
}

type ClickableChild = React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
}>;

export default function CloseNavigationWrapper({
    children,
    Component,
}: {
    children?: React.ReactElement;
    Component?: React.ReactElement;
}) {
    const { closeNav } = useNavigation();
    const target = Component ?? children;
    if (!React.isValidElement(target)) return null;

    const child = target as ClickableChild;
    const handleClick = (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        closeNav();
    };

    // Zachowaj wszystkie oryginalne propsy i dodaj/nadpisz tylko onClick
    return React.cloneElement(child, {
        onClick: handleClick,
        ...child.props,
    });
}

interface CTAButtonProps extends BasicComponentProps {
    text: string;
    href: string;
}
export function CTAButton({ className, text, href }: CTAButtonProps) {
    const { closeNav } = useNavigation();
    return (
        <Button
            asChild
            variant="outline"
            onClick={closeNav}
            className={cn("px-8 py-4 transition-colors", className)}
        >
            <Link href={href}>{text}</Link>
        </Button>
    );
}
