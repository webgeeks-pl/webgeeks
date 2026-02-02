"use client";
import {
    CloudCog,
    Code2,
    DollarSign,
    Lock,
    Search,
    Smartphone,
    Users,
    Zap,
} from "lucide-react";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { AnimatedBackgroundSwitcher } from "../ui/animatedBackgroundSwitcher";
import { Card, CardContent } from "../ui/card";
import { FlickeringGrid } from "../ui/flickering-grid";
import IconContainer from "../ui/iconContainer";
import { Iphone } from "../ui/iphone";
import { Ripple } from "../ui/ripple";
import RotatingText from "../ui/RotatingText";
import { Safari } from "../ui/safari";
import { TypingAnimation } from "../ui/typing-animation";
import { WarpBackground } from "../ui/warp-background";

const benefits = {
    speed: {
        icon: Zap,
        title: "Pacjenci czekają mniej",
        description: "Twoja strona otwiera się natychmiast.",
    },
    seo: {
        icon: Search,
        title: "Pojawisz się w Google",
        description: "Pojawisz się na pierwszej stronie Google, zanim konkurencja.",
    },
    costs: {
        icon: DollarSign,
        title: "Niższe koszty utrzymania",
        description: "Zapomnij o corocznych opłatach za pluginy i drogi hosting.",
    },
    security: {
        icon: Lock,
        title: "Bezpieczna strona",
        description: "Nie martwisz się o hakowanie ani wycieki danych.",
    },
    mobile: {
        icon: Smartphone,
        title: "Responsywny design",
        description: "Twoja strona wygląda pięknie na każdym ekranie.",
    },
    scalability: {
        icon: CloudCog,
        title: "Strona rośnie z Tobą",
        description: " Strona bez problemu obsługuje wzrost ruchu i nowych funkcji.",
    },
    easy: {
        icon: Code2,
        title: "Łatwa do zmian",
        description: "Szybkie aktualizacje treści i funkcji.",
    },
    conversions: {
        icon: Users,
        title: "Większa konwersja",
        description: "Profesjonalna strona buduje zaufanie i przyciąga więcej pacjentów.",
    },
    rise: {
        icon: Users,
        title: "Przyspiesz rozwój twojego biznesu",
        description: "Strona to inwestycja, która się zwraca.",
    },
};

const chartData = [
    { label: "1", value: 12 },
    { label: "2", value: 18 },
    { label: "3", value: 26 },
    { label: "4", value: 35 },
    { label: "5", value: 47 },
    { label: "6", value: 62 },
];

const chartConfig = {
    value: {
        label: "Wzrost",
        color: "hsl(var(--chart-1))",
    },
};

export function HomeWhyUs() {
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
                                        Icon={benefits.speed.icon}
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
                                        Icon={benefits.security.icon}
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
                                        Icon={benefits.costs.icon}
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
                                            texts={[
                                                "Strona",
                                                "Internet",
                                                "Webgeeks",
                                                "Design",
                                            ]}
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
                                        Icon={benefits.easy.icon}
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
                            {/* <IconContainer
                                variant={"ghost"}
                                color={"default"}
                                size={"md"}
                                Icon={benefits.rise.icon}
                            />

                            <Text
                                intent="h4"
                                as="h3"
                                className="font-heading"
                                text={benefits.rise.title}
                            />
                            <Text
                                text={benefits.rise.description}
                                className="text-center"
                            /> */}
                            <SectionHeader
                                title="Dlaczego nasza strona?"
                                descMuted={false}
                                description="Wiemy jak przekuć technologię w realne korzyści dla Twojego biznesu."
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
                                        Icon={benefits.mobile.icon}
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
                            <div className="h-full"></div>
                            <div className="h-fit">
                                <div className="mb-0.5 flex items-center gap-1">
                                    <IconContainer
                                        variant={"ghost"}
                                        color={"brand"}
                                        size={"md"}
                                        Icon={benefits.conversions.icon}
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
                                {/* mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8, */}
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
                                {/* <TextShimmer
                                    duration={5}
                                    as="span"
                                    className="font-heading text-5xl font-bold [--base-color:var(--color-sky-500)] [--base-gradient-color:var(--color-sky-300)]"
                                >
                                    SEO
                                </TextShimmer> */}
                                <TypingAnimation
                                    startOnView
                                    loop
                                    words={[
                                        "Fryzjer",
                                        "Salon kosmetyczny",
                                        "Gabinet masażu",
                                    ]}
                                />
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
