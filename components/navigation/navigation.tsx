import { navigationRoutes, Route } from "@/config/routes";
import { useTrans } from "@/hooks/useTrans";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import ScrollButton from "../ui/scroll-button";
import {
    ActiveLink,
    Header,
    MobileDialog,
    MobileOverlay,
    NavbarMobileButton,
} from "./navigation.client";

export default function Navigation() {
    return (
        <Header
            className={cn("sticky top-0 mx-auto w-full bg-white/60 backdrop-blur-md")}
        >
            <div
                className={cn(
                    "navbar:px-6 mx-auto flex h-full max-w-384 items-center justify-between gap-10 p-2"
                )}
            >
                <NavbarLogoContainer className="py-1">
                    <Logo />
                </NavbarLogoContainer>
                <nav className="navbar:flex hidden">
                    <ul className="flex list-none gap-x-2">
                        {navigationRoutes.main.map((route) => (
                            <NavLink key={route.link} route={route} />
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-2">
                    <div className="xs:flex hidden">
                        {navigationRoutes.cta.map((route) => (
                            <NavLink key={route.link} route={route} isCta />
                        ))}
                    </div>
                    <div className="navbar:hidden">
                        <Button asChild variant="ghost" size="icon">
                            <NavbarMobileButton role="open">
                                <span className="sr-only">open</span>
                                <Menu aria-hidden="true" className="size-5" />
                            </NavbarMobileButton>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <MobileNav />
        </Header>
    );
}

function MobileNav() {
    return (
        <MobileDialog className="z-navbar-dialog relative">
            <MobileOverlay
                role="close"
                className="fixed inset-0 z-10 bg-white/80 backdrop-blur-sm"
            />

            <DialogPanel
                className={cn(
                    "fixed inset-y-0 right-0 z-5000 w-full overflow-y-auto bg-white/90 p-2 backdrop-blur-md sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
                )}
            >
                <div className="flex items-center justify-between">
                    <NavbarLogoContainer>
                        <Logo />
                    </NavbarLogoContainer>
                    <Button asChild variant="ghost" size="icon" className="navbar:hidden">
                        <NavbarMobileButton role="close">
                            <span className="sr-only">close</span>
                            <X aria-hidden="true" className="text-destructive size-6" />
                        </NavbarMobileButton>
                    </Button>
                </div>
                <div className="mt-10 flex flex-col items-end gap-4">
                    {navigationRoutes.main.map((route) => (
                        <NavLink key={route.link} route={route} isMobile />
                    ))}
                    {navigationRoutes.cta.map((route) => (
                        <NavLink key={route.link} route={route} isCta isMobile />
                    ))}
                </div>
            </DialogPanel>
        </MobileDialog>
    );
}

function NavbarLogoContainer({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <ScrollButton
            as="link"
            href="/"
            target="#navigation-top"
            options={{ behavior: "smooth", block: "start" }}
            className={cn("flex items-center justify-center", className)}
        >
            {children}
        </ScrollButton>
    );
}

export function NavLink({
    route,
    className,
    isCta,
    isMobile,
}: {
    route: Route;
    className?: string;
    isCta?: boolean;
    isMobile?: boolean;
}) {
    const t = useTrans("common.navigation.routes");

    return (
        <ActiveLink href={route.link}>
            <Button
                variant={isCta ? "cta" : "link"}
                asChild
                className={cn(
                    !isCta &&
                        "group-data-[active=true]/navlink:text-brand-dark group-data-[active=true]/navlink:border-clr-200 group-data-[active=true]/navlink:bg-accent group-data-[active=true]/navlink:border",
                    className
                )}
            >
                {isMobile ? (
                    <NavbarMobileButton role="close">
                        <Link href={route.link}>{isCta ? t("cta") : t(route.link)}</Link>
                    </NavbarMobileButton>
                ) : (
                    <Link href={route.link}>{isCta ? t("cta") : t(route.link)}</Link>
                )}
            </Button>
        </ActiveLink>
    );
}
