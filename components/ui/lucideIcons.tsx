import { FileQuestionMarkIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { ComponentProps } from "react";

type DynamicIconProps = ComponentProps<typeof DynamicIcon>;

type LucideIconProps = Omit<DynamicIconProps, "name"> & {
    name: string;
};

export default function LucideIcon(props: LucideIconProps) {
    // `DynamicIcon` expects a narrow union for `name` (literal icon names).
    // We accept `string` here (to allow runtime values) and cast when
    // forwarding to avoid the incompatible assignment error.
    try {
        return <DynamicIcon {...(props as DynamicIconProps)} />;
    } catch (error) {
        console.error(`Error rendering icon '${props.name}':`, error);
        return <FileQuestionMarkIcon color={"red"} />;
    }
}

// import { FileQuestionMarkIcon } from "lucide-react";
// import { DynamicIcon } from "lucide-react/dynamic";
// import type { ComponentProps } from "react";

// let dynamicIconImports: Record<string, unknown> | undefined;

// if (process.env.NODE_ENV === "development") {
//     dynamicIconImports = require("lucide-react/dynamicIconImports").default;
// }

// type DynamicIconProps = ComponentProps<typeof DynamicIcon>;

// type LucideIconProps = Omit<DynamicIconProps, "name"> & {
//     name: string;
// };

// export default function LucideIcon(props: LucideIconProps) {
//     const name = props.name;

//     if (!name) {
//         console.error("LucideIcon: invalid name", name);
//         return <FileQuestionMarkIcon color={"red"} />;
//     }

//     if (process.env.NODE_ENV === "development") {
//         const imports = dynamicIconImports as Record<string, unknown>;

//         if (!(name in imports)) {
//             console.warn(`Lucide icon '${name}' not found, rendering fallback.`);
//             return <FileQuestionMarkIcon color={"red"} />;
//         }
//     }

//     try {
//         return <DynamicIcon {...({ ...props, name } as DynamicIconProps)} />;
//     } catch (error) {
//         console.error(`Error rendering icon '${props.name}':`, error);
//         return <FileQuestionMarkIcon color={"red"} />;
//     }
// }
