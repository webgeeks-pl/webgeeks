import { cn } from "@/lib/utils";

export default function DotBackground() {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0",
                "[background-size:10px_10px]",
                "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]"
            )}
        >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,black_20%,transparent)]"></div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
}
