import { BasicComponentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Grainient from "../Grainient";
import Text, { TextProps } from "../typography/text";
import Section, { SectionContent } from "./section";

export default function Page({ children, className, id }: BasicComponentProps) {
    return (
        <div id={id} className={cn("overflow-x-hidden", className)}>
            {children}
        </div>
    );
}

type PageTextProps = TextProps<keyof HTMLElementTagNameMap> & {
    text?: React.ReactNode;
};

export function PageHeader({ className, children }: BasicComponentProps) {
    return (
        <Section as={"header"} className={cn("py-size-2xl relative", className)}>
            {children}
            <div className="absolute inset-0 -z-5 [background:linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,.3)_15%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.3)_85%,rgba(255,255,255,1)_100%)]" />
            <div className="absolute inset-0 -z-10">
                <Grainient
                    color1="#ffffff"
                    color2="#8ad7ff"
                    color3="#ffffff"
                    timeSpeed={0.25}
                    colorBalance={0}
                    warpStrength={1}
                    warpFrequency={5}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.05}
                    rotationAmount={500}
                    noiseScale={2}
                    grainAmount={0.1}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.9}
                />
            </div>
        </Section>
    );
}

export function PageHeaderContent({ className, children }: BasicComponentProps) {
    return (
        <SectionContent className={cn("gap-size-xs text-center", className)}>
            {children}
        </SectionContent>
    );
}

export function PageTitle({
    className,
    children,
    text,
    as = "p",
    ...props
}: PageTextProps) {
    return (
        <Text
            intent="pageHeader"
            as={as}
            className={cn("font-heading text-3xl", className)}
            {...props}
        >
            {text ?? children}
        </Text>
    );
}

export function PageLead({
    className,
    children,
    text,
    as = "h1",
    ...props
}: PageTextProps) {
    return (
        <Text
            intent="lead"
            as={as}
            muted
            className={cn("max-w-2xl", className)}
            {...props}
        >
            {text ?? children}
        </Text>
    );
}
