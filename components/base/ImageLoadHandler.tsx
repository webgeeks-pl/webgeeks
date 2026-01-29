"use client";

import { ImageProps } from "next/image";
import { cloneElement, ReactElement } from "react";

interface ImageLoadHandlerProps {
    children: ReactElement<ImageProps>;
}

export default function ImageLoadHandler({ children }: ImageLoadHandlerProps) {
    const injected = cloneElement(children, {
        onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
            const wrapper = e.currentTarget.parentElement;
            if (wrapper) {
                wrapper.setAttribute("data-loaded", "true");
            }
        },
    });

    return injected;
}
