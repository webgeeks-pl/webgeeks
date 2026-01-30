import { cn } from "@/lib/utils/cn";
import type { BasicComponentProps } from "@types";
import React from "react";
import { AnimateConfigProps } from "../animations/Animate";
import AnimateMany from "../animations/AnimateMany";

interface GridProps extends BasicComponentProps {
    animate?: boolean;
    animateProps?: AnimateConfigProps;
    custom?: boolean;
    cols?: number | "auto";
}

const colsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
};

function getColsClass(cols: number): string {
    if (cols <= 0) return colsMap[1];
    if (cols > 6) return colsMap[6];
    return colsMap[cols] || colsMap[4];
}

export default function Grid({
    custom = false,
    className,
    children,
    animate,
    animateProps,
    cols = "auto",
}: GridProps) {
    const childCount = React.Children.count(children);
    const resolvedCols = cols === "auto" ? childCount : cols;
    const colsClass = getColsClass(resolvedCols);

    return (
        <div
            className={cn(
                "gap-size-sm grid w-full",
                custom ? "" : colsClass,
                className
            )}
        >
            {animate ? (
                <AnimateMany {...animateProps}>{children}</AnimateMany>
            ) : (
                children
            )}
        </div>
    );
}
