"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Page from "../layout/page";
import { Card } from "../ui/card";
import { Iphone } from "../ui/iphone";
import { Safari } from "../ui/safari";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

// Template data structure (same as templatesPage)
interface Template {
    id: string;
    name: string;
    demoUrl?: string;
}

// Sample templates - should match the ones from templatesPage
const templates: Template[] = [
    {
        id: "modern-business",
        name: "Nowoczesny Biznes",
        demoUrl: "https://cafe-luna-template.vercel.app/",
    },
    {
        id: "e-commerce",
        name: "Sklep E-Commerce",
        demoUrl: "https://example.com/shop",
    },
    {
        id: "portfolio",
        name: "Portfolio Kreatywne",
        demoUrl: "https://example.com/portfolio",
    },
    {
        id: "restaurant",
        name: "Restauracja i Kawiarnia",
        demoUrl: "https://example.com/restaurant",
    },
    {
        id: "landing-page",
        name: "Landing Page SaaS",
        demoUrl: "https://example.com/saas",
    },
    {
        id: "blog",
        name: "Nowoczesny Blog",
        demoUrl: "https://example.com/blog",
    },
];

type DeviceType = "desktop" | "mobile";

function TemplateDemoContent() {
    const searchParams = useSearchParams();
    const initialTemplateId = searchParams.get("template") || templates[0]?.id;

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
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    const currentDemoUrl = selectedTemplate?.demoUrl || "";

    // Check screen size for lg breakpoint (1024px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
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

    // Redirect to demo URL on mobile
    useEffect(() => {
        if (isMobile && currentDemoUrl) {
            window.location.href = currentDemoUrl;
        }
    }, [isMobile, currentDemoUrl]);

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

    return (
        <Page>
            <div className="flex min-h-screen flex-col">
                {/* Device Toggle Buttons */}
                <div className="bg-background/95 supports-backdrop-filter:bg-background/60 border-b backdrop-blur">
                    <Tabs
                        value={deviceType}
                        onValueChange={(value) => setDeviceType(value as DeviceType)}
                        className="gap-size-md flex w-full flex-col"
                    >
                        <TabsList className="relative mx-auto my-4">
                            <TabsTrigger value="desktop" disabled={!isLargeScreen}>
                                Komputery
                            </TabsTrigger>
                            <TabsTrigger value="mobile">Urządzenia mobilne</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Main Content */}
                <div className="flex flex-1">
                    {/* Left Sidebar - Domain List */}
                    <aside className="bg-muted/30 w-64 border-r p-4">
                        <h2 className="mb-4 text-lg font-semibold">Szablony</h2>
                        <div className="space-y-2">
                            {templates.map((template) => (
                                <Card
                                    key={template.id}
                                    className={cn(
                                        "cursor-pointer p-3 transition-all hover:shadow-md",
                                        selectedTemplateId === template.id &&
                                            "border-primary bg-primary/5"
                                    )}
                                    onClick={() => setSelectedTemplateId(template.id)}
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm leading-none font-medium">
                                            {template.name}
                                        </p>
                                        {template.demoUrl && (
                                            <p className="text-muted-foreground truncate text-xs">
                                                {template.demoUrl}
                                            </p>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content - Iframe */}
                    <main className="from-muted/30 to-muted/10 flex-1 bg-linear-to-br p-0 sm:p-2 md:p-8">
                        <div className="mx-auto flex h-full items-start justify-center">
                            {currentDemoUrl ? (
                                deviceType === "desktop" ? (
                                    <Safari
                                        url={currentDemoUrl}
                                        iframeSrc={currentDemoUrl}
                                        className="max-w-[75vw]"
                                    />
                                ) : (
                                    <Iphone
                                        iframeSrc={currentDemoUrl}
                                        className="w-full sm:max-w-md"
                                    />
                                )
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Brak dostępnego demo dla tego szablonu
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </Page>
    );
}

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
