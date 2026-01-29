import { Slot } from "radix-ui";

interface TagProps {
    asChild?: boolean;
    as?: keyof HTMLElementTagNameMap;
}

export default function Tag({ asChild, as, ...props }: TagProps) {
    const Comp = asChild ? Slot.Root : (as ?? "div");

    return <Comp {...props} />;
}
