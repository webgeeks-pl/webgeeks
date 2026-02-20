"use client";

import { ResizableDevice } from "@/components/ui/resizable-device";
import { useNavigation } from "@/context/navigationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    ExternalLink,
    Fullscreen,
    Loader2,
    Monitor,
    Smartphone,
} from "lucide-react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useEffectEvent, useRef, useState } from "react";
import Page from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { templates } from "./templatesPage";

type DeviceType = "desktop" | "mobile" | "fullscreen";

export default function TemplateDemoPage() {
    return (
        <Suspense
            fallback={
                <Page>
                    <div className="flex min-h-screen items-center justify-center">
                        Ładowanie...
                    </div>
                </Page>
            }
        >
            <TemplateDemoContent />
        </Suspense>
    );
}

function TemplateDemoContent() {
    const tDemo = useTranslations("pages.demo");
    const searchParams = useSearchParams();
    const initialTemplateId = searchParams.get("template") || templates[0]?.id;
    const demoContainerRef = useRef<HTMLDivElement>(null);
    const asideRef = useRef<HTMLDivElement>(null);
    const asideHeaderRef = useRef<HTMLDivElement>(null);
    const asideScrollRef = useRef<HTMLDivElement>(null);
    const { headerRef } = useNavigation();
    const [selectedTemplateId, setSelectedTemplateId] =
        useState<string>(initialTemplateId);
    const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useIsMobile();

    const [isLargeScreen, setIsLargeScreen] = useState(true);

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    const currentDemoUrl = selectedTemplate?.demoUrl || "";

    const selectTemplate = (id: string) => {
        if (id !== selectedTemplateId) {
            setIsLoading(true);
            setSelectedTemplateId(id);
        }
    };

    const handleIframeLoad = () => setIsLoading(false);

    // Check screen size for lg breakpoint (1024px)
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.document.body.getBoundingClientRect().width;

            setIsLargeScreen(width >= 1024);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Force mobile view on smaller screens
    useEffect(() => {
        if (!isLargeScreen && deviceType === "desktop") {
            setDeviceType("mobile");
        }
    }, [isLargeScreen, deviceType]);

    // adjusting available height for demo iframe to fill the screen without overflow

    const handleResize = useEffectEvent(() => {
        if (!demoContainerRef.current) return;

        const windowHeight = window.innerHeight;
        const headerHeight = headerRef.current?.getBoundingClientRect().height || 0;

        const asideHeaderHeight =
            asideHeaderRef.current?.getBoundingClientRect().height || 0;

        const availableHeight = windowHeight - headerHeight;

        // ustawiamy główną wysokość
        demoContainerRef.current.style.height = `${availableHeight}px`;
        asideRef.current?.style.setProperty("height", `${availableHeight}px`);

        // obliczamy height scrolla poprawnie
        const asideAvailableHeight = availableHeight - asideHeaderHeight;

        if (asideScrollRef.current) {
            asideScrollRef.current.style.height = `${asideAvailableHeight}px`;
        }
    });
    useEffect(() => {
        if (!window) return;
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Redirect to demo URL on mobile

    const deviceDimensions = {
        desktop: { width: 1200, height: 800 },
        mobile: { width: 400, height: 800 }, // iPhone 8 dimensions as an example
    };

    if (isMobile) {
        return (
            <Page>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="space-y-4 text-center">
                        <p className="text-lg">
                            Widok demo niedostępny na urządzeniach mobilnych
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Otwórz demo na komputerze, aby zobaczyć podgląd szablonu. Lub
                            wejdź na ten link z telefonu, aby otworzyć demo bezpośrednio:{" "}
                            {currentDemoUrl}
                        </p>
                        <div className="xs:flex-row flex flex-col items-center justify-center gap-2">
                            <Button asChild variant="secondary">
                                <Link href="/templates">Wróć do listy szablonów</Link>
                            </Button>
                            <Button asChild className="">
                                <a
                                    href={currentDemoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Otwórz demo{" "}
                                    <ExternalLink className="inline-block h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

    return (
        <Page>
            <div className="relative flex flex-col border-y" ref={demoContainerRef}>
                {/* Main Content */}
                <div className="flex h-full min-h-0 flex-1">
                    {/* Left Sidebar - Domain List */}
                    <aside
                        className="bg-muted/30 flex min-h-0 w-64 flex-col border-r border-b border-b-transparent p-4"
                        ref={asideRef}
                    >
                        <div
                            className="mb-4 flex items-center justify-between"
                            ref={asideHeaderRef}
                        >
                            <h1 className="text-lg font-semibold">Szablony</h1>

                            <Tabs
                                value={deviceType}
                                onValueChange={(value) =>
                                    setDeviceType(value as DeviceType)
                                }
                                className=""
                            >
                                <TabsList
                                    suppressHydrationWarning
                                    className="bg-sidebar-accent border-border relative mx-auto gap-1 rounded-2xl border p-1 ring-0"
                                >
                                    <TabsTrigger value="fullscreen" asChild>
                                        <Button
                                            size="icon"
                                            variant={"secondary"}
                                            className="aspect-square"
                                        >
                                            <Fullscreen className="" />
                                        </Button>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        disabled={!isLargeScreen}
                                        value="desktop"
                                        asChild
                                    >
                                        <Button
                                            size="icon"
                                            variant={"secondary"}
                                            className="aspect-square"
                                        >
                                            <Monitor className="text-inherit" />
                                        </Button>
                                    </TabsTrigger>
                                    <TabsTrigger value="mobile" asChild>
                                        <Button
                                            size="icon"
                                            variant={"secondary"}
                                            className="aspect-square"
                                        >
                                            <Smartphone className="text-inherit" />
                                        </Button>
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <ScrollArea
                            type="always"
                            className="h-full min-h-0 flex-1"
                            ref={asideScrollRef}
                            suppressHydrationWarning
                        >
                            <LayoutGroup>
                                <div
                                    suppressHydrationWarning
                                    className="flex flex-col gap-1"
                                >
                                    {templates.map((template) => {
                                        const isActive =
                                            selectedTemplateId === template.id;
                                        const hasDemo = !!template.demoUrl;

                                        return (
                                            <motion.button
                                                key={template.id}
                                                type="button"
                                                layout
                                                layoutDependency={[selectedTemplateId]}
                                                initial={false}
                                                animate={{
                                                    opacity: hasDemo ? 1 : 0.45,
                                                }}
                                                transition={{
                                                    layout: {
                                                        duration: 0.3,
                                                        ease: [0.25, 0.1, 0.25, 1],
                                                    },
                                                    opacity: { duration: 0.2 },
                                                }}
                                                className={cn(
                                                    "group/item relative flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors duration-150",
                                                    isActive
                                                        ? "bg-clr-950 text-clr-50"
                                                        : hasDemo
                                                          ? "text-clr-700 hover:bg-clr-100"
                                                          : "text-clr-400 cursor-default"
                                                )}
                                                onClick={() => {
                                                    if (hasDemo)
                                                        selectTemplate(template.id);
                                                }}
                                                disabled={!hasDemo}
                                            >
                                                {/* Active indicator bar */}
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="active-bar"
                                                        className="bg-clr-50 absolute top-1/2 left-1 h-8 w-0.75 -translate-y-1/2 rounded-full"
                                                        transition={{
                                                            layout: {
                                                                duration: 0.3,
                                                                ease: [
                                                                    0.25, 0.1, 0.25, 1,
                                                                ],
                                                            },
                                                        }}
                                                    />
                                                )}

                                                {/* Content */}
                                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                    <span
                                                        className={cn(
                                                            "font-heading truncate text-sm font-medium",
                                                            isActive
                                                                ? "text-clr-50"
                                                                : "text-clr-800"
                                                        )}
                                                    >
                                                        {template.name}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "truncate text-xs",
                                                            isActive
                                                                ? "text-clr-400"
                                                                : "text-clr-500"
                                                        )}
                                                    >
                                                        {hasDemo
                                                            ? template.category
                                                            : "Brak demo"}
                                                    </span>
                                                </div>

                                                {/* Link & arrow */}
                                                {hasDemo && (
                                                    <div className="flex shrink-0 items-center gap-1">
                                                        {isActive && template.demoUrl && (
                                                            <a
                                                                href={template.demoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-clr-400 hover:text-clr-200 flex items-center rounded-md p-1 transition-colors"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                <ExternalLink className="size-3.5" />
                                                            </a>
                                                        )}
                                                        <ArrowRight
                                                            className={cn(
                                                                "size-4 transition-opacity duration-150",
                                                                isActive
                                                                    ? "text-clr-400"
                                                                    : "text-clr-300 opacity-0 group-hover/item:opacity-100"
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </LayoutGroup>
                        </ScrollArea>
                    </aside>

                    {/* Main Content - Iframe */}

                    <div className="relative w-[calc(100%-256px)] flex-1 p-0">
                        {/* Loading overlay */}
                        <AnimatePresence>
                            {isLoading && currentDemoUrl && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="text-clr-400 size-8 animate-spin" />
                                        <span className="text-clr-500 text-sm">
                                            Ładowanie szablonu...
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex h-full items-center justify-center">
                            {currentDemoUrl ? (
                                deviceType === "fullscreen" ? (
                                    <iframe
                                        src={currentDemoUrl}
                                        title="Device Preview"
                                        className="size-full border-0"
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
                                        onLoad={handleIframeLoad}
                                    />
                                ) : (
                                    <div className="flex h-[calc(100%-1rem)] w-[calc(100%-1rem)] items-center justify-center p-4">
                                        <ResizableDevice
                                            iframeSrc={currentDemoUrl}
                                            startWidth={
                                                deviceDimensions[deviceType].width
                                            }
                                            startHeight={
                                                deviceDimensions[deviceType].height
                                            }
                                            onLoad={handleIframeLoad}
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">
                                        {tDemo("noDemo")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Separator decorative />

            <Section className="py-size-2xl bg-brand">
                <SectionContent className="gap-size-md">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={tDemo("cta.title")} />
                            <SectionLead
                                text={tDemo("cta.description")}
                                muted={false}
                                className="text-black"
                            />
                        </SectionHeaderContent>
                    </SectionHeader>

                    <div className="flex gap-4">
                        <Button variant="secondary" className="flex-1">
                            {tDemo("cta.buttons.secondary")}
                        </Button>
                        <Button variant="default" className="flex-1">
                            {tDemo("cta.buttons.primary")}
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
