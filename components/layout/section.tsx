import Tag from "@/components/base/tag";
import { cn } from "@/lib/utils";
import type { BasicComponentProps } from "@types";
import { ElementType } from "react";
import Text, { TextProps } from "../typography/text";

interface SectionProps extends BasicComponentProps {
    shouldRender?: boolean;
    as?: ElementType;
    asChild?: boolean;
}

type SectionTextProps = TextProps<keyof HTMLElementTagNameMap> & {
    text?: React.ReactNode;
};

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
    className?: string;
}

export function SectionHeader({ className, children }: SectionHeaderProps) {
    return <div className={cn("w-full", className)}>{children}</div>;
}

export function SectionHeaderContent({ children, className }: BasicComponentProps) {
    return (
        <div
            className={cn(
                "flex-start mx-auto flex max-w-4xl flex-col gap-4 sm:gap-6 sm:text-center",
                className
            )}
        >
            {children}
        </div>
    );
}

export function SectionTitle({
    text,
    children,
    className,
    color = "primary",
    as = "p",
}: SectionTextProps) {
    return (
        <Text as={as} color={color} intent="sectionHeader" className={cn("", className)}>
            {text ?? children}
        </Text>
    );
}

export function SectionLead({
    text,
    children,
    className,
    muted = true,
    color = "primary",
    as = "h1",
}: SectionTextProps) {
    return (
        <Text as={as} color={color} muted={muted} intent="lead" className={className}>
            {text ?? children}
        </Text>
    );
}
