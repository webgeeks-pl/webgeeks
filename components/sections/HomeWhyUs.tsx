"use client";
import { ThumbsUp, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { AnimatedBackgroundSwitcher } from "../ui/animatedBackgroundSwitcher";
import { Card, CardContent } from "../ui/card";
import { FlickeringGrid } from "../ui/flickering-grid";
import IconContainer from "../ui/iconContainer";
import { Iphone } from "../ui/iphone";
import { getLucideIcon } from "../ui/lucideIcons";
import { Ripple } from "../ui/ripple";
import RotatingText from "../ui/RotatingText";
import { Safari } from "../ui/safari";
import { TypingAnimation } from "../ui/typing-animation";
import { WarpBackground } from "../ui/warp-background";

export function HomeWhyUs() {
    const t = useTranslations("pages.home.whyUs");
    const benefits = {
        speed: {
            icon: t("benefits.speed.icon"),
            title: t("benefits.speed.title"),
            description: t("benefits.speed.description"),
        },
        seo: {
            icon: t("benefits.seo.icon"),
            title: t("benefits.seo.title"),
            description: t("benefits.seo.description"),
        },
        costs: {
            icon: t("benefits.costs.icon"),
            title: t("benefits.costs.title"),
            description: t("benefits.costs.description"),
        },
        security: {
            icon: t("benefits.security.icon"),
            title: t("benefits.security.title"),
            description: t("benefits.security.description"),
        },
        mobile: {
            icon: t("benefits.mobile.icon"),
            title: t("benefits.mobile.title"),
            description: t("benefits.mobile.description"),
        },
        scalability: {
            icon: t("benefits.scalability.icon"),
            title: t("benefits.scalability.title"),
            description: t("benefits.scalability.description"),
        },
        easy: {
            icon: t("benefits.easy.icon"),
            title: t("benefits.easy.title"),
            description: t("benefits.easy.description"),
        },
        conversions: {
            icon: t("benefits.conversions.icon"),
            title: t("benefits.conversions.title"),
            description: t("benefits.conversions.description"),
        },
    };

    const rotatingTexts = t.raw("rotatingTexts") as string[];
    const typingWords = t.raw("typingWords") as string[];
    console.log("render");
    console.log(benefits.conversions.icon);
    return (
        <Section className="py-size-xl sm:py-size-2xl bg-clr-50 overflow-hidden">
            <SectionContent>
                {/* <div className="mb-16 text-center">
                    <SectionHeader
                        title="Dlaczego Next.js?"
                        description="Nie tylko szybkość. To kompletna przewaga technologiczna, która przekłada się na realne korzyści biznesowe."
                    />
                </div> */}

                <div className="grid grid-cols-1 grid-rows-[repeat(3,minmax(250px,1fr))] gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:ring-brand h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <WarpBackground beamDuration={5} className="m-0 h-full p-0">
                                <></>
                            </WarpBackground>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={getLucideIcon(benefits.speed.icon)}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.speed.title}
                                    />
                                </div>
                                <Text muted text={benefits.speed.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="relative h-full">
                                <FlickeringGrid />
                            </div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={getLucideIcon(benefits.security.icon)}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.security.title}
                                    />
                                </div>
                                <Text muted text={benefits.security.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand col-span-2 h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="h-full" />
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={getLucideIcon(benefits.costs.icon)}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.costs.title}
                                    />
                                </div>
                                <Text muted text={benefits.costs.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="relative flex h-full w-full items-center justify-center">
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <AnimatedBackgroundSwitcher />
                                </div>
                                <div className="relative z-10 overflow-hidden">
                                    <div className="h-9 w-fit">
                                        <RotatingText
                                            mainClassName="flex items-center justify-center px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg whitespace-nowrap h-full w-full "
                                            staggerFrom={"last"}
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            exit={{ y: "-120%" }}
                                            staggerDuration={0.025}
                                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 "
                                            elementLevelClassName="font-heading"
                                            transition={{
                                                type: "spring",
                                                damping: 30,
                                                stiffness: 400,
                                            }}
                                            rotationInterval={4000}
                                            texts={rotatingTexts}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={getLucideIcon(benefits.easy.icon)}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.easy.title}
                                    />
                                </div>
                                <Text muted text={benefits.easy.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand-darker ring-brand bg-brand/50 col-span-2 h-full">
                        <CardContent className="flex h-full flex-col items-center justify-center gap-2">
                            <SectionHeader
                                title={t("sectionHeader.title")}
                                descMuted={false}
                                description={t("sectionHeader.description")}
                            />
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="relative flex h-full justify-center gap-3">
                                <Safari className="max-h-24 max-w-30" />
                                <Iphone className="max-h-24 max-w-10" />
                            </div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={getLucideIcon(benefits.mobile.icon)}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.mobile.title}
                                    />
                                </div>
                                <Text muted text={benefits.mobile.description} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:ring-brand col-span-2 h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="h-full">
                                <div className="flex gap-1">
                                    <User size={18} />
                                    {/* <CountUp from={100} to={300} duration={2} /> */}
                                </div>
                                <div className="flex gap-1">
                                    <ThumbsUp size={18} />

                                    <ThumbsUp size={18} />
                                    {/* <CountUp from={100} to={300} duration={2} /> */}
                                </div>
                            </div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={getLucideIcon(benefits.conversions.icon)}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.conversions.title}
                                    />
                                </div>
                                <Text muted text={benefits.conversions.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="relative h-full">
                                <Ripple mainCircleSize={10} numCircles={4} />
                            </div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={benefits.scalability.icon}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.scalability.title}
                                    />
                                </div>
                                <Text muted text={benefits.scalability.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:ring-brand h-full">
                        <CardContent className="flex h-full flex-col justify-between gap-2">
                            <div className="flex h-full max-h-full flex-col items-center justify-center overflow-hidden">
                                <TypingAnimation startOnView loop words={typingWords} />
                            </div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={benefits.seo.icon}
                                    />
                                    <Text
                                        intent="h4"
                                        as="h3"
                                        className="font-heading"
                                        text={benefits.seo.title}
                                    />
                                </div>
                                <Text muted text={benefits.seo.description} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SectionContent>
        </Section>
    );
}
