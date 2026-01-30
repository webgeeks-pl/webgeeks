"use client";

import { routes as mainRoutes } from "@/config/routes";
import { usePathname } from "@/i18n/navigation";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { NavigationRoutes } from "@types";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { HeaderContainer } from "./navigation.client";

interface NavigationProps {
    navigation?: NavigationRoutes;
}

export default function Navigation({ navigation }: NavigationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const t = useTranslations("common.navigation");
    const tRoutes = useTranslations("common.navigation.routes");

    const routes = navigation ?? mainRoutes;
    const defaultRoutes = routes.filter((route) => !route.cta);
    const ctaRoute = routes.find((route) => route.cta);

    const pathname = usePathname();

    const isActiveRoute = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <HeaderContainer className="sticky top-0 z-1000 border-b bg-white/50 backdrop-blur-md">
            <nav
                aria-label={t("navigation")}
                className="mx-auto flex max-w-384 items-center justify-between p-2 xl:px-6"
            >
                <div className="flex xl:flex-1">
                    <span>Logo</span>
                </div>
                <div className="flex xl:hidden">
                    <Button
                        onClick={() => setMobileMenuOpen(true)}
                        variant="ghost"
                        size="icon"
                        className="z-5000"
                    >
                        <span className="sr-only">{t("openNav")}</span>
                        <Menu aria-hidden="true" className="size-5" />
                    </Button>
                </div>
                <PopoverGroup className="hidden xl:flex xl:gap-x-2">
                    {defaultRoutes.map((route) => {
                        return (
                            <Button
                                key={route.link}
                                variant="link"
                                asChild
                                className={
                                    isActiveRoute(route.link)
                                        ? "bg-accent text-brand"
                                        : ""
                                }
                            >
                                <Link href={route.link}>
                                    {tRoutes(route.link)}
                                </Link>
                            </Button>
                        );
                    })}
                </PopoverGroup>
                <div className="hidden items-center gap-2 xl:flex xl:flex-1 xl:justify-end">
                    {ctaRoute && (
                        <Button variant="cta" asChild size="sm">
                            <Link href={ctaRoute?.link || "#"}>
                                {tRoutes("cta")}
                            </Link>
                        </Button>
                    )}
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="xl:hidden"
            >
                <div className="fixed inset-0 z-5000" />
                <DialogPanel className="fixed inset-y-0 right-0 z-5000 w-full overflow-y-auto bg-white/90 p-2 backdrop-blur-md sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/#"
                            className={"flex items-center justify-center"}
                        >
                            <span>Logo</span>
                        </Link>
                        <Button
                            onClick={() => setMobileMenuOpen(false)}
                            variant="ghost"
                            size="icon"
                            className="z-5000"
                        >
                            <span className="sr-only">{t("closeNav")}</span>
                            <X
                                aria-hidden="true"
                                className="text-clr-brand-red size-6"
                            />
                        </Button>
                    </div>
                    <div className="mt-10 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="flex flex-col gap-4 space-y-2 py-6">
                                {defaultRoutes.map((route) => {
                                    return (
                                        <Button
                                            variant="link"
                                            asChild
                                            key={route.link}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className={
                                                isActiveRoute(route.link)
                                                    ? "bg-accent text-brand"
                                                    : ""
                                            }
                                        >
                                            <Link href={route.link}>
                                                {tRoutes(route.link)}
                                            </Link>
                                        </Button>
                                    );
                                })}
                            </div>
                            <div className="py-6">
                                {ctaRoute && (
                                    <Button
                                        variant="cta"
                                        asChild
                                        className="text-clr-brand-red"
                                    >
                                        <Link href={ctaRoute?.link || "#"}>
                                            {tRoutes("cta")}
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </HeaderContainer>
    );
}
