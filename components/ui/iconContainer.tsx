import { BasicComponentProps } from "@/lib/types";
import { cva, VariantProps } from "class-variance-authority";

const iconContainerVariants = cva(
    " aspect-square p-2 flex items-center justify-center rounded-lg",
    {
        variants: {
            size: {
                sm: "size-8",
                md: "size-10",
                lg: "size-14",
            },
            variant: {
                brand: "border bg-brand/15 border-brand/30",
                default: "border bg-accent",
                opposite: " border bg-clr-950",
                success: " border text-success bg-success/15 border-success/30",
                destructive:
                    "border text-destructive bg-destructive/15 border-destructive/30",
                ghost: "bg-transparent",
                outline: "border bg-transparent border border-border",
            },
            color: {
                brand: "",
                default: "",
                muted: "",
                opposite: "",
            },
        },
        defaultVariants: {
            size: "lg",
            variant: "default",
        },
    }
);

const iconVariants = cva("", {
    variants: {
        size: {
            sm: "size-4",
            md: "size-6",
            lg: "size-8",
        },
        color: {
            brand: "text-brand",
            default: "",
            muted: "text-muted-foreground",
            opposite: "text-clr-100",
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
    color,
}: IconContainerProps) {
    const output = Icon ? (
        <Icon className={iconVariants({ size, color })} />
    ) : IconComp ? (
        IconComp
    ) : (
        children
    );
    return (
        <div
            className={iconContainerVariants({
                className,
                size,
                variant,
            })}
        >
            {output}
        </div>
    );
}
