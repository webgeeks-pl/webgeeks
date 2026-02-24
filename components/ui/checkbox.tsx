"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils/index";
import { CheckIcon } from "lucide-react";

function Checkbox({
    className,
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                "peer relative flex size-5 shrink-0 items-center justify-center rounded-[6px] border-2 transition-shadow outline-none",
                "aria-invalid:border-destructive border-clr-200 hover:border-clr-300 focus:ring-clr-900/10 focus:ring-0 focus:outline-none",
                "bg-clr-50 text-clr-900 placeholder:text-clr-400 focus:bg-white",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="text-brand-dark grid h-5! place-content-center transition-none [&>svg]:size-4.5"
            >
                <CheckIcon />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
