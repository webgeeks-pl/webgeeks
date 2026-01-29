"use client";

import { routes as mainRoutes } from "@/app/[locale]/routes";
import { cn } from "@/lib/utils/cn";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Animate from "../animations/Animate";
import AnimateMany from "../animations/AnimateMany";
import NavLink from "../base/NavLink";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { SelectLanguage } from "../ui/SelectLanguage";
import { HeaderContainer } from "./Header.client";

const startDelay = 0.2;
const delay = 0.04;
const durationPerItem = 0.07;

interface NavigationProps {
    navigation?: NavigationRoutes;
}

export default function Navigation({ navigation }: NavigationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const routes = navigation ?? mainRoutes;

    const defaultRoutes = routes.filter((route) => !route.cta);
    const ctaRoute = routes.find((route) => route.cta);

    const mainNavDuration = defaultRoutes.length * durationPerItem;
    const durations = [0.1, mainNavDuration, 0.2];
    const totals = durations.map((d, i) =>
        i == 0 ? d + startDelay : d + delay
    );
    const totalsCumulative: number[] = totals.map((d, i, arr) =>
        i == 0 ? d : d + arr[i - 1]
    );

    return (
        <HeaderContainer className="bg-clr-brand-red sticky top-0 z-1000 rounded-b-4xl">
            <nav
                aria-label={t("navigation")}
                className="mx-auto flex max-w-[1536px] items-center justify-between p-6 xl:px-6"
            >
                <div className="flex xl:flex-1">
                    <Animate delay={startDelay} duration={durations[0]}>
                        <Link
                            href="/"
                            className={"flex items-center justify-center"}
                        >
                            <Logo
                                type="rose"
                                width={0}
                                height={30}
                                loading="eager"
                                className={cn("h-[25px] w-auto sm:h-[30px]")}
                            />
                        </Link>
                    </Animate>
                </div>
                <div className="flex xl:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="z-5000 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">{t("openMenu")}</span>
                        <Bars3Icon
                            aria-hidden="true"
                            className="text-clr-brand-rose size-8"
                        />
                    </button>
                </div>
                <PopoverGroup className="hidden xl:flex xl:gap-x-6">
                    <AnimateMany
                        delay={totalsCumulative[0]}
                        duration={durations[1]}
                    >
                        {defaultRoutes.map((route) => {
                            return (
                                <NavLink
                                    key={route.name + route.link}
                                    route={route}
                                    className="text-clr-brand-rose"
                                />
                            );
                        })}
                    </AnimateMany>
                </PopoverGroup>
                <div className="hidden items-center gap-2 xl:flex xl:flex-1 xl:justify-end">
                    <AnimateMany
                        delay={totalsCumulative[1]}
                        duration={durations[2]}
                    >
                        <SelectLanguage className="bg-clr-brand-rose/30 border-transparent" />
                        {ctaRoute && (
                            <Button
                                variant="opposite"
                                as="link"
                                size="sm"
                                text={ctaRoute?.name || ""}
                                href={ctaRoute?.link || "#"}
                                className="bg-clr-brand-red hover:bg-clr-brand-red-light"
                            />
                        )}
                    </AnimateMany>
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="xl:hidden"
            >
                <div className="fixed inset-0 z-5000" />
                <DialogPanel className="fixed inset-y-0 right-0 z-5000 w-full overflow-y-auto bg-white/90 p-6 backdrop-blur-md sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className={"flex items-center justify-center"}
                        >
                            <Logo
                                type="red"
                                width={0}
                                height={30}
                                loading="eager"
                                className={cn("h-[25px] w-auto sm:h-[30px]")}
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">{t("closeMenu")}</span>
                            <XMarkIcon
                                aria-hidden="true"
                                className="text-clr-brand-red size-6"
                            />
                        </button>
                    </div>
                    <div className="mt-10 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="flex flex-col gap-4 space-y-2 py-6">
                                {defaultRoutes.map((route) => {
                                    return (
                                        <NavLink
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            key={route.name + route.link}
                                            route={route}
                                            className="text-clr-brand-red"
                                        />
                                    );
                                })}
                                <SelectLanguage className="bg-clr-brand-rose/40 border-transparent" />
                            </div>
                            <div className="py-6">
                                {ctaRoute && (
                                    <Button
                                        variant="opposite"
                                        as="link"
                                        text={ctaRoute?.name || ""}
                                        href={ctaRoute?.link || "#"}
                                        className="text-clr-brand-red"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </HeaderContainer>
    );
}
