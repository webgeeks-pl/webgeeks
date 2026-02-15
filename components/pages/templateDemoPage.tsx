"use client";

import { ResizableDevice } from "@/components/ui/resizable-device";
import { useNavigation } from "@/context/navigationContext";
import { cn } from "@/lib/utils";
import { ExternalLink, Fullscreen, Monitor, Smartphone } from "lucide-react";
import { useLocale } from "next-intl";
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
import { Item, ItemActions, ItemContent, ItemTitle } from "../ui/item";
import { ScrollArea } from "../ui/scroll-area";
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
    const locale = useLocale();
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
    const [isMobile] = useState(() => {
        // Check only once on initial mount
        if (typeof window !== "undefined") {
            return window.innerWidth < 768;
        }
        return false;
    });

    const [isMobileScreen, setIsMobileScreen] = useState(false);

    const [isLargeScreen, setIsLargeScreen] = useState(true);

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    const currentDemoUrl = selectedTemplate?.demoUrl || "";

    // Check screen size for lg breakpoint (1024px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
            setIsMobileScreen(window.innerWidth < 768);
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
    useEffect(() => {
        if (isMobile && currentDemoUrl) {
            window.location.href = currentDemoUrl;
        }
    }, [isMobile, currentDemoUrl]);

    const deviceDimensions = {
        desktop: { width: 1200, height: 800 },
        mobile: { width: 400, height: 800 }, // iPhone 8 dimensions as an example
    };

    // Show loading on mobile while redirecting
    if (isMobile) {
        return (
            <Page>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="space-y-4 text-center">
                        <p className="text-lg">Przekierowanie do demo...</p>
                        <p className="text-muted-foreground text-sm">{currentDemoUrl}</p>
                    </div>
                </div>
            </Page>
        );
    }

    // if (isMobileScreen) {
    //     redirect({ href: "/templates", locale });
    // }

    return (
        <Page>
            <div className="relative flex flex-col" ref={demoContainerRef}>
                {/* Main Content */}
                <div className="flex h-full min-h-0 flex-1">
                    {/* Left Sidebar - Domain List */}
                    <aside
                        className="bg-muted/30 flex min-h-0 w-64 flex-col border-r p-4"
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
                                <TabsList className="bg-sidebar-accent border-border relative mx-auto gap-1 rounded-2xl border p-1 ring-0">
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
                        >
                            <div className="flex flex-col gap-2">
                                {templates.map((template) => {
                                    const isActive = selectedTemplateId === template.id;

                                    return (
                                        <Item
                                            size={"xs"}
                                            key={template.id}
                                            variant={"outline"}
                                            className={cn(
                                                "flex cursor-pointer bg-white transition-all",
                                                !template.demoUrl && "opacity-50",
                                                isActive &&
                                                    "border-foreground/20 bg-brand-300"
                                            )}
                                            onClick={() =>
                                                setSelectedTemplateId(template.id)
                                            }
                                        >
                                            <ItemContent>
                                                <ItemTitle
                                                    className={cn("", isActive && "")}
                                                >
                                                    {template.name}
                                                </ItemTitle>
                                            </ItemContent>
                                            <ItemActions className="flex w-full justify-end">
                                                <Button
                                                    size="sm"
                                                    variant={"ghost"}
                                                    disabled={!template.demoUrl}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (template.demoUrl) {
                                                            window.open(
                                                                template.demoUrl,
                                                                "_blank"
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <span>Link</span>
                                                    <ExternalLink />
                                                </Button>
                                                {/* <Button
                                                    variant={
                                                        template.demoUrl
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    disabled={!template.demoUrl}
                                                >
                                                    <span>Demo</span>
                                                </Button> */}
                                            </ItemActions>
                                        </Item>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </aside>

                    {/* Main Content - Iframe */}

                    <div className="from-muted/30 to-muted/10 w-[calc(100%-256px)] flex-1 bg-linear-to-br p-0">
                        <div className="flex h-full items-center justify-center">
                            {currentDemoUrl ? (
                                deviceType === "fullscreen" ? (
                                    <iframe
                                        src={currentDemoUrl}
                                        title="Device Preview"
                                        className="size-full border-0"
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
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
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Brak dostępnego demo dla tego szablonu
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Section className="py-size-2xl bg-brand-darker/50">
                <SectionContent className="gap-size-md">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={"Rozpocznij projekt"} />
                            <SectionLead
                                text={
                                    "Skorzystaj z naszych szablonów, aby szybko wystartować z projektem. Każdy szablon jest w pełni konfigurowalny i gotowy do rozbudowy."
                                }
                                muted={false}
                                className="text-black"
                            />
                        </SectionHeaderContent>
                    </SectionHeader>

                    <div className="flex gap-4">
                        <Button variant="secondary" className="flex-1">
                            {"learn more"}
                        </Button>
                        <Button variant="default" className="flex-1">
                            {"get started"}
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
