import { BasicComponentProps } from "@/lib/types";
import { cva, VariantProps } from "class-variance-authority";

const iconContainerVariants = cva("border", {
    variants: {
        size: {
            sm: "size-8",
            md: "size-10",
            lg: "size-14",
        },
        variant: {
            default:
                "text-brand bg-accent p-2 flex items-center justify-center rounded-lg",
        },
    },
    defaultVariants: {
        size: "lg",
        variant: "default",
    },
});

const iconVariants = cva("", {
    variants: {
        size: {
            sm: "size-4",
            md: "size-6",
            lg: "size-8",
        },
    },
    defaultVariants: {
        size: "lg",
    },
});

interface IconContainerProps
    extends BasicComponentProps, VariantProps<typeof iconContainerVariants> {
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    IconComp?: React.ReactNode;
}

export default function IconContainer({
    children,
    Icon,
    IconComp,
    className,
    size,
    variant,
}: IconContainerProps) {
    const output = Icon ? (
        <Icon className={iconVariants({ size })} />
    ) : IconComp ? (
        IconComp
    ) : (
        children
    );
    return (
        <div className={iconContainerVariants({ className, size, variant })}>
            {output}
        </div>
    );
}
