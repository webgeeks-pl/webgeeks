import React from "react";

type TagProps<E extends keyof HTMLElementTagNameMap> = {
    as?: E;
} & React.ComponentPropsWithoutRef<E>;

export default function Tag<E extends keyof HTMLElementTagNameMap = "div">({
    as,
    ...props
}: TagProps<E>) {
    const Component = as || "div";
    return React.createElement(Component, props);
}
