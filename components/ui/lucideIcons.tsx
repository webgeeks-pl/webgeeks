import { FileQuestionMarkIcon, type LucideProps } from "lucide-react";
import dynamic from "next/dynamic";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface IconProps extends LucideProps {
    name: keyof typeof import("lucide-react") | string;
}

export function LucideIcon({ name, ...props }: IconProps) {
    try {
        const Icon = dynamic<LucideProps>(() =>
            import("lucide-react").then((mod) => mod[name] as LucideIcon)
        );

        return <Icon {...props} />;
    } catch (error: any) {
        console.error(`Error while retrieving LucideIcon '${name}'`, error);
        return <FileQuestionMarkIcon {...props} />;
    }
}

export function getLucideIcon(name: string | null) {
    if (!name) {
        console.error("LucideIcon name is null");
        return FileQuestionMarkIcon;
    }

    try {
        const Icon = dynamic<LucideProps>(() =>
            import("lucide-react").then((mod) => mod[name] as LucideIcon)
        );
        return Icon;
    } catch (error: any) {
        console.error(`Error while retrieving LucideIcon '${name}'`, error);
        return FileQuestionMarkIcon;
    }
}
