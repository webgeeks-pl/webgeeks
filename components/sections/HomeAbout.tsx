import { useTrans } from "@/hooks/useTrans";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";

export function HomeAbout() {
    const t = useTrans("pages.home.about");
    const values = t.obj("values");
    const stats = t.obj("stats");
    const paragraphs = t.obj("paragraphs");

    return (
        <Section className="py-size-4xl relative">
            {/* <div className="absolute inset-0 -z-5 [background:linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,.5)_15%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.5)_85%,rgba(255,255,255,1)_100%)]" />
            <div className="pointer-events-none absolute inset-0 -z-5 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_55%,rgba(255,255,255,1)_100%)]" />
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
            </div> */}
            <SectionContent className="flex h-full flex-col items-start justify-center">
                <Text intent="sectionHeader" className="mb-size-sm">
                    {t("sectionHeader")}
                </Text>
                <Text variant="lead" className="max-w-3xl text-2xl! leading-relaxed">
                    {paragraphs[0]}
                </Text>
            </SectionContent>
        </Section>
    );
}
