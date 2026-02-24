import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export type TagProps<E extends React.ElementType> = {
    as?: E;
    asChild?: boolean;
    children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

export default function Tag<E extends React.ElementType = "div">({
    as,
    asChild = false,
    children,
    ...props
}: TagProps<E>) {
    const Comp = as ?? (asChild ? Slot : "div");

    return React.createElement(
        Comp,
        props as React.ComponentPropsWithoutRef<typeof Comp>,
        children
    );
}
