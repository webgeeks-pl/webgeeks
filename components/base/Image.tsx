// import NextImage, { ImageProps as NextImageProps } from "next/image";
// import ImageBase from "./ImageBase";

// export default function Image({ alt, ...props }: NextImageProps) {
//     return (
//         <ImageBase
//             Image={<NextImage alt={alt} {...props} />}
//             Wrapper={<div data-loaded="false" className="bg-black" />}
//         />
//     );
// }

import { cn } from "@/lib/utils/cn";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { ElementType } from "react";
import Animate, { AnimateConfigProps } from "../animations/Animate";

interface ImageProps extends NextImageProps {
    className?: string;
    imageClassName?: string;
    Overlay?: ElementType;
    animate?: boolean;
    sizes?: string;
    animateProps?: Omit<AnimateConfigProps, "className">;
}

export default function Image({
    alt,
    className,
    imageClassName,
    Overlay,
    animate,
    animateProps,
    sizes,
    ...props
}: ImageProps) {
    const FinalWrapper = animate ? Animate : "div";
    return (
        <FinalWrapper
            data-loaded="false"
            className={cn("", className)}
            {...animateProps}
        >
            <NextImage
                alt={alt}
                className={cn(
                    imageClassName
                        ? imageClassName
                        : "h-full w-full object-cover"
                )}
                sizes={sizes}
                {...props}
            />
            {Overlay && <Overlay />}
        </FinalWrapper>
    );

    // return (
    //     <FinalWrapper
    //         data-loaded="false"
    //         className={cn("image-skeleton", className)}
    //         {...animateProps}
    //     >
    //         <ImageLoadHandler>
    //             <NextImage
    //                 alt={alt}
    //                 className={cn(
    //                     imageClassName
    //                         ? imageClassName
    //                         : "h-full w-full object-cover"
    //                 )}
    //                 {...props}
    //             />
    //         </ImageLoadHandler>
    //         {Overlay && <Overlay />}
    //     </FinalWrapper>
    // );
}
