import { BasicComponentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Text from "../typography/text";
import Section, { SectionContent } from "./section";

export default function Page({ children, className }: BasicComponentProps) {
    return <div className={cn("overflow-x-hidden", className)}>{children}</div>;
}

export function PageHeader({ className, children }: BasicComponentProps) {
    return (
        <Section as={"header"} className={cn("py-size-xl", className)}>
            {children}
        </Section>
    );
}

export function PageHeaderContent({ className, children }: BasicComponentProps) {
    return (
        <SectionContent className={cn("gap-size-xs text-center", className)}>
            {children}
        </SectionContent>
    );
}

export function PageTitle({
    className,
    children,
    text,
}: BasicComponentProps & { text?: string }) {
    return (
        <Text intent="h1" className={cn("font-heading text-3xl", className)}>
            {text ?? children}
        </Text>
    );
}

export function PageLead({
    className,
    children,
    text,
}: BasicComponentProps & { text?: string }) {
    return (
        <Text intent="lead" muted className={cn("max-w-2xl", className)}>
            {text ?? children}
        </Text>
    );
}
