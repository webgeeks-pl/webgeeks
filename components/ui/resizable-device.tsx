"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export interface ResizableDeviceProps {
    iframeSrc: string;
    className?: string;
}

export function ResizableDevice({ iframeSrc, className }: ResizableDeviceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 800 });
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

    // Initialize dimensions based on container size
    useEffect(() => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const maxWidth = containerRect.width - 40;
        const maxHeight = containerRect.height - 40;

        setDimensions({
            width: Math.min(400, maxWidth),
            height: Math.min(800, maxHeight),
        });
    }, []);

    const handleMouseDown = (e: React.MouseEvent, handle: string) => {
        e.preventDefault();
        setIsResizing(handle);
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
            width: dimensions.width,
            height: dimensions.height,
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const maxWidth = containerRect.width - 40; // 40px padding
            const maxHeight = containerRect.height - 40;

            const deltaX = e.clientX - startPos.current.x;
            const deltaY = e.clientY - startPos.current.y;

            let newWidth = dimensions.width;
            let newHeight = dimensions.height;

            switch (isResizing) {
                case "right":
                    newWidth = Math.max(
                        400,
                        Math.min(maxWidth, startPos.current.width + deltaX * 2)
                    );
                    break;
                case "left":
                    newWidth = Math.max(
                        400,
                        Math.min(maxWidth, startPos.current.width - deltaX * 2)
                    );
                    break;
                case "bottom":
                    newHeight = Math.max(
                        400,
                        Math.min(maxHeight, startPos.current.height + deltaY * 2)
                    );
                    break;
                case "top":
                    newHeight = Math.max(
                        400,
                        Math.min(maxHeight, startPos.current.height - deltaY * 2)
                    );
                    break;
                case "bottom-right":
                    newWidth = Math.max(
                        400,
                        Math.min(maxWidth, startPos.current.width + deltaX * 2)
                    );
                    newHeight = Math.max(
                        400,
                        Math.min(maxHeight, startPos.current.height + deltaY * 2)
                    );
                    break;
                case "bottom-left":
                    newWidth = Math.max(
                        400,
                        Math.min(maxWidth, startPos.current.width - deltaX * 2)
                    );
                    newHeight = Math.max(
                        400,
                        Math.min(maxHeight, startPos.current.height + deltaY * 2)
                    );
                    break;
                case "top-right":
                    newWidth = Math.max(
                        400,
                        Math.min(maxWidth, startPos.current.width + deltaX * 2)
                    );
                    newHeight = Math.max(
                        400,
                        Math.min(maxHeight, startPos.current.height - deltaY * 2)
                    );
                    break;
                case "top-left":
                    newWidth = Math.max(
                        400,
                        Math.min(maxWidth, startPos.current.width - deltaX * 2)
                    );
                    newHeight = Math.max(
                        400,
                        Math.min(maxHeight, startPos.current.height - deltaY * 2)
                    );
                    break;
            }

            setDimensions({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            setIsResizing(null);
            document.body.style.pointerEvents = "";
            document.body.style.userSelect = "";
        };

        if (isResizing) {
            document.body.style.pointerEvents = "none";
            document.body.style.userSelect = "none";
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, dimensions]);

    const BEZEL_SIZE = 8;
    const INNER_MARGIN = 3;
    const RADIUS_PX = 30;

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex size-full items-center justify-center",
                className
            )}
        >
            <div
                className="relative"
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                }}
            >
                {/* Device Body */}
                <div
                    className="absolute inset-0 z-100000 bg-[#E5E5E5] dark:bg-[#404040]"
                    style={{
                        borderRadius: `${RADIUS_PX}px`,
                    }}
                >
                    {/* Inner Screen Bezel */}
                    <div
                        className="absolute z-100000 bg-white dark:bg-[#262626]"
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

                {/* Resize Handles */}
                {/* Top */}
                <div
                    className="absolute top-0 left-1/2 h-3 w-24 -translate-x-1/2 -translate-y-1.5 cursor-n-resize"
                    onMouseDown={(e) => handleMouseDown(e, "top")}
                >
                    <div className="mx-auto mt-0.5 h-1.5 w-16 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Bottom */}
                <div
                    className="absolute bottom-0 left-1/2 flex h-3 w-24 -translate-x-1/2 translate-y-1.5 cursor-s-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "bottom")}
                >
                    <div className="h-1.5 w-16 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Left */}
                <div
                    className="absolute top-1/2 left-0 flex h-24 w-3 -translate-x-1.5 -translate-y-1/2 cursor-w-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "left")}
                >
                    <div className="h-16 w-1.5 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Right */}
                <div
                    className="absolute top-1/2 right-0 flex h-24 w-3 translate-x-1.5 -translate-y-1/2 cursor-e-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "right")}
                >
                    <div className="h-16 w-1.5 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Corners */}
                {/* Top-left */}
                <div
                    className="absolute top-0 left-0 flex size-5 -translate-x-2.5 -translate-y-2.5 cursor-nw-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "top-left")}
                >
                    <div className="size-2.5 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Top-right */}
                <div
                    className="absolute top-0 right-0 flex size-5 translate-x-2.5 -translate-y-2.5 cursor-ne-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "top-right")}
                >
                    <div className="size-2.5 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Bottom-left */}
                <div
                    className="absolute bottom-0 left-0 flex size-5 -translate-x-2.5 translate-y-2.5 cursor-sw-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
                >
                    <div className="size-2.5 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>

                {/* Bottom-right */}
                <div
                    className="absolute right-0 bottom-0 flex size-5 translate-x-2.5 translate-y-2.5 cursor-se-resize items-center justify-center"
                    onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
                >
                    <div className="size-2.5 rounded-full bg-gray-500/70 hover:bg-gray-600" />
                </div>
            </div>
        </div>
    );
}
