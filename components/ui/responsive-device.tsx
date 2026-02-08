"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export interface ResponsiveDeviceProps {
    iframeSrc: string;
    className?: string;
}

export function ResponsiveDevice({ iframeSrc, className }: ResponsiveDeviceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Device always takes full available width and height
    const deviceWidth = dimensions.width;
    const deviceHeight = dimensions.height;

    // Fixed border sizes in pixels
    const BEZEL_SIZE = 8; // Outer bezel in pixels
    const INNER_MARGIN = 3; // Inner margin in pixels
    const RADIUS_PX = 30; // Consistent border radius

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex size-full items-center justify-center",
                className
            )}
        >
            <div
                className="relative size-full"
                style={{
                    width: deviceWidth,
                    height: deviceHeight,
                }}
            >
                {/* Device Body */}
                <div
                    className="absolute inset-0 bg-[#E5E5E5] dark:bg-[#404040]"
                    style={{
                        borderRadius: `${RADIUS_PX}px`,
                    }}
                >
                    {/* Inner Screen Bezel */}
                    <div
                        className="absolute bg-white dark:bg-[#262626]"
                        style={{
                            top: `${BEZEL_SIZE}px`,
                            left: `${BEZEL_SIZE}px`,
                            right: `${BEZEL_SIZE}px`,
                            bottom: `${BEZEL_SIZE}px`,
                            borderRadius: `${RADIUS_PX * 0.8}px`,
                        }}
                    >
                        {/* Screen (iframe container) */}
                        <div
                            className="absolute overflow-hidden"
                            style={{
                                top: `${INNER_MARGIN}px`,
                                left: `${INNER_MARGIN}px`,
                                right: `${INNER_MARGIN}px`,
                                bottom: `${INNER_MARGIN}px`,
                                borderRadius: `${RADIUS_PX * 0.7}px`,
                            }}
                        >
                            <iframe
                                src={iframeSrc}
                                title="Device Preview"
                                className="size-full border-0"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
                            />
                        </div>

                        {/* Notch/Camera at top */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 bg-[#F5F5F5] dark:bg-[#262626]"
                            style={{
                                top: "8px",
                                width: "120px",
                                height: "24px",
                                borderRadius: "999px",
                            }}
                        >
                            {/* Camera dot */}
                            <div
                                className="absolute top-1/2 right-[15%] -translate-y-1/2 rounded-full bg-[#E5E5E5] dark:bg-[#404040]"
                                style={{
                                    width: "8px",
                                    height: "8px",
                                }}
                            />
                        </div>

                        {/* Home Indicator at bottom */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 bg-[#E5E5E5] opacity-50 dark:bg-[#404040]"
                            style={{
                                bottom: "8px",
                                width: "140px",
                                height: "4px",
                                borderRadius: "999px",
                            }}
                        />
                    </div>

                    {/* Side Buttons */}
                    <>
                        {/* Left side buttons (volume) */}
                        <div
                            className="absolute left-0 rounded-r-sm bg-[#E5E5E5] dark:bg-[#404040]"
                            style={{
                                top: "20%",
                                width: "3px",
                                height: "50px",
                            }}
                        />
                        <div
                            className="absolute left-0 rounded-r-sm bg-[#E5E5E5] dark:bg-[#404040]"
                            style={{
                                top: "30%",
                                width: "3px",
                                height: "50px",
                            }}
                        />
                        {/* Right side button (power) */}
                        <div
                            className="absolute right-0 rounded-l-sm bg-[#E5E5E5] dark:bg-[#404040]"
                            style={{
                                top: "32%",
                                width: "3px",
                                height: "70px",
                            }}
                        />
                    </>
                </div>
            </div>
        </div>
    );
}
