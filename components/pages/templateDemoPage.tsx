"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Page from "../layout/page";
import { Card } from "../ui/card";
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
    const [iframeWidth, setIframeWidth] = useState<number | null>(null);
    const [iframeHeight, setIframeHeight] = useState<number | null>(null);
    const [isResizing, setIsResizing] = useState<"width" | "height" | null>(null);
    const iframeRef = useRef<HTMLDivElement>(null);
    const startPosRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

    const handleMouseDown = useCallback(
        (type: "width" | "height", e: React.MouseEvent) => {
            e.preventDefault();
            if (!iframeRef.current) return;

            const rect = iframeRef.current.getBoundingClientRect();
            startPosRef.current = {
                x: e.clientX,
                y: e.clientY,
                width: rect.width,
                height: rect.height,
            };
            setIsResizing(type);
        },
        []
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return;

            if (isResizing === "width") {
                const deltaX = e.clientX - startPosRef.current.x;
                const newWidth = startPosRef.current.width + deltaX;
                setIframeWidth(Math.max(320, newWidth));
            } else if (isResizing === "height") {
                const deltaY = e.clientY - startPosRef.current.y;
                const newHeight = startPosRef.current.height + deltaY;
                setIframeHeight(Math.max(400, newHeight));
            }
        },
        [isResizing]
    );

    const handleMouseUp = useCallback(() => {
        setIsResizing(null);
    }, []);

    // Reset dimensions when device type changes
    useEffect(() => {
        setIframeWidth(null);
        setIframeHeight(null);
    }, [deviceType]);

    // Add event listeners
    useEffect(() => {
        if (isResizing) {
            // Prevent text selection during resize
            document.body.style.userSelect = "none";

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                // Re-enable text selection
                document.body.style.userSelect = "";
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    const currentDemoUrl = selectedTemplate?.demoUrl || "";

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
                            <TabsTrigger value="desktop">Komputery</TabsTrigger>
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
                    <main className="from-muted/30 to-muted/10 flex-1 bg-linear-to-br p-8">
                        <div className="mx-auto h-full">
                            {currentDemoUrl ? (
                                <div
                                    ref={iframeRef}
                                    style={{
                                        width: iframeWidth
                                            ? `${iframeWidth}px`
                                            : undefined,
                                        height: iframeHeight
                                            ? `${iframeHeight}px`
                                            : undefined,
                                    }}
                                    className={cn(
                                        "bg-background border-primary/20 ring-primary/10 group relative mx-auto overflow-hidden rounded-xl border-4 shadow-2xl ring-4",
                                        deviceType === "mobile" &&
                                            !iframeWidth &&
                                            "max-w-[500px]",
                                        !iframeHeight && "h-full"
                                    )}
                                >
                                    {/* Visual indicator bar */}
                                    <div className="bg-primary/10 border-primary/20 flex items-center justify-between border-b-2 px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-red-500" />
                                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                            <div className="h-3 w-3 rounded-full bg-green-500" />
                                        </div>
                                        <div className="bg-background/80 text-muted-foreground rounded px-3 py-1 text-xs font-medium">
                                            Podgląd szablonu
                                        </div>
                                    </div>
                                    <iframe
                                        src={currentDemoUrl}
                                        className="h-[calc(100%-40px)] w-full"
                                        title={`Demo: ${selectedTemplate?.name}`}
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                    />

                                    {/* Overlay to prevent iframe from capturing mouse during resize */}
                                    {isResizing && (
                                        <div className="absolute inset-0 z-50" />
                                    )}

                                    {/* Right resize handle */}
                                    <div
                                        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize opacity-0 transition-opacity group-hover:opacity-50 hover:opacity-100"
                                        onMouseDown={(e) => handleMouseDown("width", e)}
                                        style={{
                                            background:
                                                "linear-gradient(90deg, transparent, rgba(var(--primary), 0.5))",
                                        }}
                                    />

                                    {/* Bottom resize handle */}
                                    <div
                                        className="absolute bottom-0 left-0 h-2 w-full cursor-ns-resize opacity-0 transition-opacity group-hover:opacity-50 hover:opacity-100"
                                        onMouseDown={(e) => handleMouseDown("height", e)}
                                        style={{
                                            background:
                                                "linear-gradient(180deg, transparent, rgba(var(--primary), 0.5))",
                                        }}
                                    />
                                </div>
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
