import { BasicComponentProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Page({ children, className }: BasicComponentProps) {
    return <div className={cn("overflow-x-hidden", className)}>{children}</div>;
}
