import Tag from "@/components/base/tag";
import { cn } from "@/lib/utils";
import type { BasicComponentProps } from "@types";
import { ElementType } from "react";
import Text from "../typography/text";

interface SectionProps extends BasicComponentProps {
    shouldRender?: boolean;
    as?: ElementType;
    asChild?: boolean;
}

export default function Section({
    children,
    className,
    as,
    shouldRender = true,
    ...props
}: SectionProps) {
    if (!shouldRender) {
        return null;
    }

    return (
        <Tag
            as={as ?? "section"}
            className={cn("flex w-full flex-col items-center", className)}
            {...props}
        >
            {children}
        </Tag>
    );
}

export function SectionContent({ children, className, ...props }: BasicComponentProps) {
    return (
        <Tag
            className={cn(
                "xs:container flex w-full max-w-7xl! flex-col items-center px-5",
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

interface SectionHeaderProps extends BasicComponentProps {
    title: string;
    description: string;
    className?: string;
    descriptionClassName?: string;
    titleClassName?: string;
    descMuted?: boolean;
    color?: "primary" | "opposite";
}

export function SectionHeader({
    title,
    description,
    className,
    descriptionClassName,
    titleClassName,
    descMuted = true,
    color = "primary",
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex-start mx-auto flex max-w-2xl flex-col gap-2 sm:text-center",
                className
            )}
        >
            <Text color={color} intent="sectionHeader" className={cn("", titleClassName)}>
                {title}
            </Text>
            <Text
                color={color}
                muted={descMuted}
                intent="lead"
                className={descriptionClassName}
            >
                {description}
            </Text>
        </div>
    );
}
