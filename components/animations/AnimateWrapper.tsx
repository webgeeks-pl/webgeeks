import type { BasicComponentProps } from "@types";
import Animate from "./Animate";
import AnimateMany from "./AnimateMany";

interface AnimateWrapperProps extends BasicComponentProps {
    animate?: boolean;
    animateProps?: React.ComponentProps<typeof Animate>;
    many?: boolean;
}

export default function AnimateWrapper({
    children,
    animate,
    animateProps,
    many,
}: AnimateWrapperProps) {
    if (!animate) return children;
    const Wrapper = many ? AnimateMany : Animate;
    return <Wrapper {...animateProps}>{children}</Wrapper>;
}
