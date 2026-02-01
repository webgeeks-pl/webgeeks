import { cn } from "@/lib/utils";

export function GridBackground() {
    return (
        <div
            className={cn(
                "absolute inset-0",
                "[background-size:40px_40px]",
                "[background-image:linear-gradient(to_right,var(--color-clr-bg-extra-dark)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-clr-bg-extra-dark)_1px,transparent_1px)]"
                // "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}
        >
            <div className="bg-clr-bg-light pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent)]"></div>
            <div className="bg-clr-bg-light pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
}
//  {/* Radial gradient for the container to give a faded look */}
//
