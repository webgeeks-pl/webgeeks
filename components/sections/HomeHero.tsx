import { useTrans } from "@/hooks/useTrans";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Grainient from "../Grainient";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { EncryptedText } from "../ui/encrypted-text";
import { Safari } from "../ui/safari";
import { TextShimmer } from "../ui/text-shimmer";

export function HomeHero() {
    const t = useTrans("pages.home");
    const tHero = useTrans("pages.home.hero");
    // const heroBadges = tHero.obj("badges.bottom")

    return (
        <Section
            as="header"
            id="hero"
            className="py-size-lg xs:pt-size-xl xs:pb-size-lg relative"
        >
            <div className="absolute inset-0 -z-5 [background:linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,.3)_15%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.3)_85%,rgba(255,255,255,1)_100%)]" />
            {/* <div className="pointer-events-none absolute inset-0 -z-5 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_55%,rgba(255,255,255,1)_100%)]" /> */}
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
            <SectionContent className="gap-size-sm sm:gap-size-md mt-size-lg z-10 items-start text-start">
                {/* <Badge className="p-3" variant="secondary">
                    <span className="flex items-center">
                        <Zap className="h-3.5 w-3.5 text-yellow-400" />
                    </span>
                    <span>{t("hero.badges.top")}</span>
                </Badge> */}

                <Text
                    as="span"
                    intent="h1"
                    className="font-heading xs:text-4xl! relative max-w-[950px] text-3xl! font-normal tracking-wide md:text-7xl!"
                >
                    <EncryptedText
                        startDelayMs={1000}
                        text={t("hero.title")}
                        className="absolute"
                    />
                    <span className="invisible">{t("hero.title")}</span>
                </Text>

                <Text intent="lead" className="max-w-2xl">
                    {t("hero.leadStart")}
                    <TextShimmer
                        as="span"
                        className="font-bold [--base-color:var(--color-sky-800)] [--base-gradient-color:var(--color-sky-300)]"
                    >
                        {t("hero.leadHighlight")}
                    </TextShimmer>
                    {t("hero.leadEnd")}
                </Text>

                <div className="mb-size-lg relative flex gap-4">
                    <Button asChild variant="secondary">
                        <Link href={t("hero.buttons.secondary.href")}>
                            <span>{t("hero.buttons.secondary.text")}</span>
                        </Link>
                    </Button>
                    <Button asChild variant="default">
                        <Link href={t("hero.buttons.primary.href")}>
                            <span>{t("hero.buttons.primary.text")}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>

                <Safari
                    url="https:\\"
                    imageSrc="/cafe-luna.png"
                    className="mt-4 w-full"
                />
            </SectionContent>
        </Section>
    );
}
