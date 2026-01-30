import { BasicComponentProps } from "@/lib/types";

export default function Main({ children, className }: BasicComponentProps) {
    return <main className={className}>{children}</main>;
}
