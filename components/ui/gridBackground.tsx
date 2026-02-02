import { cn } from "@/lib/utils";

export function GridBackground() {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0",
                "[background-size:10px_10px]",
                "bg-[linear-gradient(to_right,var(--color-clr-300)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-clr-300)_1px,transparent_1px)]"
                // "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}
        >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,black_20%,transparent)]"></div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
}
//  {/* Radial gradient for the container to give a faded look */}
//
