import * as React from "react";

import { cn } from "@/lib/utils/index";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "w-full resize-none rounded-xl border-2 px-4 py-3.5 pl-11 text-sm transition-all",
                "aria-invalid:border-destructive focus:border-brand border-clr-200 hover:border-clr-300 focus:ring-clr-900/10 focus:ring-0 focus:outline-none",
                "bg-clr-50 text-clr-900 placeholder:text-clr-400 focus:bg-white max-lg:h-60!",
                className
            )}
            {...props}
        />
    );
}

export { Textarea };
