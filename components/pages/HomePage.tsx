import { getArrayFromMessages } from "@/lib/utils/array";
import {
    AlertTriangle,
    ArrowRight,
    Award,
    CheckCircle2,
    Clock,
    CloudCog,
    Code2,
    DollarSign,
    Heart,
    Lock,
    Rocket,
    Search,
    Smartphone,
    TrendingDown,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { z } from "zod";
import Animate from "../animations/Animate";
import AnimateMany from "../animations/AnimateMany";
import { FadeInSection, ScrollReveal } from "../animations/parallaxEffects";
import Grid from "../layout/grid";
import { Page } from "../layout/page";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";
import { Separator } from "../ui/separator";

const CardSchema = z.object({
    icon: z.string(),
    value: z.string(),
    title: z.string(),
    description: z.string(),
});
type Card = z.infer<typeof CardSchema>;

const metrics = [
    {
        label: "Czas ładowania",
        before: { value: "4.2s", icon: Clock, status: "bad" },
        after: { value: "0.8s", icon: Zap, status: "good" },
        improvement: "-81%",
    },
    {
        label: "PageSpeed Score",
        before: { value: "32/100", icon: TrendingDown, status: "bad" },
        after: { value: "98/100", icon: TrendingUp, status: "good" },
        improvement: "+206%",
    },
    {
        label: "Koszt miesięczny",
        before: { value: "890 zł", icon: DollarSign, status: "bad" },
        after: { value: "120 zł", icon: DollarSign, status: "good" },
        improvement: "-87%",
    },
    {
        label: "Bounce Rate",
        before: { value: "68%", icon: TrendingDown, status: "bad" },
        after: { value: "31%", icon: TrendingUp, status: "good" },
        improvement: "-54%",
    },
];

const beforeFeatures = [
    { text: "Ciągłe aktualizacje wtyczek", hasIt: false },
    { text: "Problemy z bezpieczeństwem", hasIt: false },
    { text: "Wolne ładowanie (3-5s)", hasIt: false },
    { text: "Wysokie koszty hostingu", hasIt: false },
    { text: "Awarie przy dużym ruchu", hasIt: false },
    { text: "Trudne skalowanie", hasIt: false },
];

const afterFeatures = [
    { text: "Automatyczne aktualizacje", hasIt: true },
    { text: "Bezpieczeństwo na najwyższym poziomie", hasIt: true },
    { text: "Błyskawiczne ładowanie (<1s)", hasIt: true },
    { text: "Niskie koszty hostingu", hasIt: true },
    { text: "99.99% uptime", hasIt: true },
    { text: "Nieograniczone skalowanie", hasIt: true },
];

const values = [
    {
        icon: Rocket,
        title: "Innowacja",
        description: "Zawsze na czele technologii webowych",
    },
    {
        icon: Users,
        title: "Partnerstwo",
        description: "Twój sukces to nasz sukces",
    },
    {
        icon: Award,
        title: "Jakość",
        description: "Perfekcja w każdym detalu",
    },
    {
        icon: Heart,
        title: "Pasja",
        description: "Kochamy to, co robimy",
    },
];

const benefits = [
    {
        icon: Zap,
        title: "Błyskawiczna szybkość",
        description:
            "Strony ładują się w ułamku sekundy dzięki statycznej generacji i optymalizacji obrazów. Użytkownicy nie czekają, konwersje rosną.",
    },
    {
        icon: Search,
        title: "SEO na najwyższym poziomie",
        description:
            "Next.js to gwarancja wysokich pozycji w Google. Server-side rendering, meta tagi, sitemapy - wszystko wbudowane i działające od pierwszego dnia.",
    },
    {
        icon: DollarSign,
        title: "Niskie koszty utrzymania",
        description:
            "Zapomnij o drogim hostingu i comiesięcznych opłatach za wtyczki. Strony Next.js hostujemy za grosze, często za darmo na Vercel.",
    },
    {
        icon: Lock,
        title: "Bezpieczeństwo bez zmartwień",
        description:
            "Zero luk w zabezpieczeniach WordPress. Brak bazy danych do zhackowania. Automatyczne aktualizacje bez ryzyka awarii strony.",
    },
    {
        icon: Smartphone,
        title: "Mobilne doświadczenie",
        description:
            "Responsywność w DNA. Perfekcyjne działanie na każdym urządzeniu. Google to docenia i wyżej pozycjonuje strony mobile-friendly.",
    },
    {
        icon: CloudCog,
        title: "Skalowalna infrastruktura",
        description:
            "Od startupu do milionów użytkowników - strona rośnie z Twoim biznesem. CDN, cache'owanie, edge computing - technologia najwyższej klasy.",
    },
    {
        icon: Code2,
        title: "Nowoczesna technologia",
        description:
            "React, TypeScript, najnowsze standardy web development. Kod, który jest łatwy do rozwijania i utrzymania przez lata.",
    },
    {
        icon: Users,
        title: "Lepsza konwersja",
        description:
            "Szybsze strony = więcej klientów. Badania pokazują, że każda sekunda opóźnienia to 7% mniej konwersji. My dajemy Ci przewagę.",
    },
];

export default function HomePage() {
    const t = useTranslations("pages.home");
    const tHero = useTranslations("pages.home.hero");
    const heroCards = getArrayFromMessages(tHero.raw("cards"), CardSchema);
    const heroBadges = getArrayFromMessages(
        tHero.raw("badges.bottom"),
        z.string()
    );

    return (
        <Page>
            <Section as="header" className="py-size-xl sm:py-size-2xl">
                <SectionContent className="text-center" gapped="md">
                    <Animate>
                        <Badge className="p-3" variant="secondary">
                            <span className="flex items-center">
                                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                            </span>
                            <span>{t("hero.badges.top")}</span>
                        </Badge>
                    </Animate>
                    <Text
                        as="span"
                        intent="h1"
                        className="max-w-3xl text-3xl sm:text-5xl"
                    >
                        {t("hero.title")}
                    </Text>
                    <Text intent="lead" muted className="max-w-2xl">
                        {t("hero.lead")}
                    </Text>
                    <div className="flex gap-4">
                        <Button asChild variant="default">
                            <Link href="/">
                                <span>{t("hero.buttons.primary")}</span>
                                <ArrowRight />
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">
                                <span>{t("hero.buttons.secondary")}</span>
                            </Link>
                        </Button>
                    </div>
                    <Separator className="max-w-xl" decorative />

                    {heroBadges.length > 0 && (
                        <div className="flex flex-col gap-2 md:flex-row">
                            <AnimateMany variant="blurIn" delay={0.3}>
                                {heroBadges.map((badge, index) => (
                                    <Badge
                                        className="gap-2"
                                        variant="ghost"
                                        key={index}
                                    >
                                        <div className="bg-success h-1.5 w-1.5 rounded-full" />
                                        <span>{badge}</span>
                                    </Badge>
                                ))}
                            </AnimateMany>
                        </div>
                    )}
                </SectionContent>
            </Section>

            <Section
                className="pb-size-xl sm:pb-size-2xl pt-0.5"
                shouldRender={heroCards.length > 0}
            >
                <SectionContent>
                    <Grid cols={heroCards.length}>
                        {heroCards.map(
                            ({ icon, value, title, description }, index) => {
                                return (
                                    <ScrollReveal delay={2} key={index}>
                                        <Card>
                                            <CardContent className="flex flex-col items-center text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <IconContainer
                                                        Icon={getLucideIcon(
                                                            icon
                                                        )}
                                                    />
                                                    <Text
                                                        intent="var"
                                                        className="text-4xl"
                                                        text={value}
                                                    />
                                                </div>
                                                <div>
                                                    <Text
                                                        intent="h3"
                                                        text={title}
                                                    />
                                                    <Text
                                                        intent="small"
                                                        muted
                                                        text={description}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </ScrollReveal>
                                );
                            }
                        )}
                    </Grid>
                </SectionContent>
            </Section>

            <Separator decorative />

            <Section className="bg-clr-50 py-size-xl sm:py-size-2xl">
                <SectionContent className="text-center" gapped="lg">
                    <SectionHeader
                        title="Transformacja Twojej strony"
                        description="Zobacz jak zmienia się wszystko po migracji z WordPress na Next.js"
                    />

                    {/* Main Comparison */}
                    <div className="mb-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* BEFORE - WordPress */}
                        <Card className="relative h-full overflow-hidden border-2 border-red-200 bg-red-50">
                            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-red-200 opacity-20"></div>
                            <CardContent className="relative z-10 p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-200">
                                        <AlertTriangle className="size-6 text-red-700" />
                                    </div>
                                    <div>
                                        <Badge className="mb-2 bg-red-600">
                                            PRZED
                                        </Badge>
                                        <h3 className="text-2xl text-gray-900">
                                            WordPress
                                        </h3>
                                    </div>
                                </div>

                                {/* Browser mockup */}
                                <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                    <div className="flex items-center gap-2 border-b border-gray-300 bg-gray-200 px-4 py-2">
                                        <div className="flex gap-1.5">
                                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                        </div>
                                        <div className="flex-1 rounded bg-white px-3 py-1 text-xs text-gray-600">
                                            twojastrona.pl
                                        </div>
                                    </div>
                                    <div className="flex h-48 items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6">
                                        <div className="text-center">
                                            <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-700"></div>
                                                <span className="text-sm text-gray-600">
                                                    Ładowanie...
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Średnio 4.2 sekundy
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3">
                                    {beforeFeatures.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <X className="mt-0.5 size-5 flex-shrink-0 text-red-600" />
                                            <span className="text-gray-700">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* AFTER - Next.js */}
                        <Card className="relative h-full overflow-hidden border-2 border-green-200 bg-green-50">
                            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-green-200 opacity-20"></div>
                            <CardContent className="relative z-10 p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-200">
                                        <Zap className="size-6 text-green-700" />
                                    </div>
                                    <div>
                                        <Badge className="mb-2 bg-green-600">
                                            PO
                                        </Badge>
                                        <h3 className="text-2xl text-gray-900">
                                            Next.js
                                        </h3>
                                    </div>
                                </div>

                                {/* Browser mockup */}
                                <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-lg">
                                    <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2">
                                        <div className="flex gap-1.5">
                                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                        </div>
                                        <div className="flex flex-1 items-center gap-2 rounded bg-gray-800 px-3 py-1 text-xs text-gray-300">
                                            🔒 twojastrona.pl
                                            <Badge
                                                variant="outline"
                                                className="border-green-500 text-xs text-green-500"
                                            >
                                                Secure
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex h-48 items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
                                        <div className="text-center">
                                            <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2">
                                                <CheckCircle2 className="size-5 text-green-600" />
                                                <span className="text-sm text-green-800">
                                                    Załadowano!
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                W 0.8 sekundy ⚡
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <ScrollReveal delay={2}>
                                    <div className="space-y-3">
                                        {afterFeatures.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-green-600" />
                                                <span className="text-gray-700">
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Metrics Comparison */}
                    <div className="mb-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((metric, index) => (
                            <Card className="border-gray-200" key={index}>
                                <CardContent className="p-6">
                                    <div className="mb-4 text-sm text-gray-600">
                                        {metric.label}
                                    </div>

                                    {/* Before */}
                                    <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
                                        <div className="flex items-center gap-2">
                                            <IconContainer
                                                variant="destructive"
                                                Icon={metric.before.icon}
                                                size={"sm"}
                                            />
                                            <span className="text-lg text-gray-900">
                                                {metric.before.value}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="border-red-300 text-xs text-red-700"
                                        >
                                            WP
                                        </Badge>
                                    </div>

                                    {/* After */}
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <IconContainer
                                                variant="success"
                                                Icon={metric.after.icon}
                                                size={"sm"}
                                            />
                                            <span className="text-lg text-gray-900">
                                                {metric.after.value}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="border-green-300 text-xs text-green-700"
                                        >
                                            Next.js
                                        </Badge>
                                    </div>

                                    {/* Improvement */}
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 py-2">
                                            <TrendingUp className="size-4 text-green-600" />
                                            <span className="text-sm text-green-600">
                                                {metric.improvement}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="w-full rounded-2xl bg-gray-900 p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
                            <div>
                                <div className="mb-2 text-4xl text-white">
                                    5-10x
                                </div>
                                <div className="text-sm text-gray-400">
                                    Szybsze ładowanie
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl text-white">
                                    -70%
                                </div>
                                <div className="text-sm text-gray-400">
                                    Niższe koszty
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl text-white">
                                    +85%
                                </div>
                                <div className="text-sm text-gray-400">
                                    Lepsze SEO
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl text-white">
                                    99.9%
                                </div>
                                <div className="text-sm text-gray-400">
                                    Uptime
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContent>
            </Section>

            <Section className="bg-white py-20">
                <SectionContent>
                    <FadeInSection className="mb-16 text-center">
                        <SectionHeader
                            title="Dlaczego Next.js?"
                            description="Nie tylko szybkość. To kompletna przewaga
                            technologiczna, która przekłada się na realne
                            korzyści biznesowe."
                        />
                    </FadeInSection>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit, index) => {
                            return (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.05}
                                    direction="right"
                                >
                                    <Card className="h-full">
                                        <CardContent className="flex flex-col gap-2">
                                            <IconContainer
                                                variant={"default"}
                                                Icon={benefit.icon}
                                            />
                                            <h3 className="text-gray-900">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-gray-600">
                                                {benefit.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </SectionContent>
            </Section>

            <Section className="bg-clr-100 py-size-xl">
                <SectionContent>
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <FadeInSection>
                            <div>
                                <Text
                                    intent="sectionHeader"
                                    className="mb-size-md"
                                >
                                    O nas
                                </Text>
                                <div className="font space-y-4">
                                    <Text>
                                        NextSpeed to zespół pasjonatów
                                        nowoczesnych technologii webowych. Od
                                        2020 roku pomagamy firmom porzucać
                                        przestarzałe rozwiązania i przechodzić
                                        na szybkie, skalowalne strony oparte na
                                        Next.js.
                                    </Text>
                                    <Text className="text-clr-600">
                                        Zrealizowaliśmy ponad 150 projektów dla
                                        klientów z różnych branż - od startupów
                                        po duże korporacje. Każda migracja z
                                        WordPress kończyła się dramatyczną
                                        poprawą wydajności i wzrostem konwersji.
                                    </Text>
                                    <Text className="text-clr-600">
                                        Specjalizujemy się nie tylko w
                                        technologii, ale przede wszystkim w
                                        rozumieniu biznesu naszych klientów. Nie
                                        budujemy tylko stron - tworzymy
                                        narzędzia, które generują realną wartość
                                        i przewagę konkurencyjną.
                                    </Text>
                                </div>

                                <div className="mt-12 grid grid-cols-2 gap-6">
                                    <div className="border-l-4 border-gray-900 pl-4">
                                        <div className="mb-1 text-4xl text-gray-900">
                                            150+
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Zrealizowanych projektów
                                        </div>
                                    </div>
                                    <div className="border-l-4 border-gray-900 pl-4">
                                        <div className="mb-1 text-4xl text-gray-900">
                                            98%
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Zadowolonych klientów
                                        </div>
                                    </div>
                                    <div className="border-l-4 border-gray-900 pl-4">
                                        <div className="mb-1 text-4xl text-gray-900">
                                            5 lat
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Doświadczenia
                                        </div>
                                    </div>
                                    <div className="border-l-4 border-gray-900 pl-4">
                                        <div className="mb-1 text-4xl text-gray-900">
                                            24/7
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Wsparcie techniczne
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-cols-2 gap-6">
                            {values.map((value, index) => {
                                return (
                                    <ScrollReveal
                                        key={index}
                                        delay={index * 0.1}
                                        direction="up"
                                    >
                                        <Card className="h-full">
                                            <CardContent className="flex flex-col gap-1">
                                                <IconContainer
                                                    Icon={value.icon}
                                                    variant="opposite"
                                                    size="lg"
                                                    color="opposite"
                                                />

                                                <Text
                                                    intent="h3"
                                                    text={value.title}
                                                />

                                                <Text
                                                    text={value.description}
                                                    muted
                                                />
                                            </CardContent>
                                        </Card>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </SectionContent>
            </Section>

            <Section className="py-size-2xl bg-brand-darker/50">
                <SectionContent gapped={"md"}>
                    <SectionHeader
                        descriptionClassName="text-black"
                        title="Section Title"
                        descMuted={false}
                        description="This is the section description that gives more details about the section content."
                    />
                    <Grid
                        cols={0}
                        className="w-fit items-center gap-4 sm:grid-cols-2"
                    >
                        {[...heroBadges, heroBadges[0]].map((badge, index) => (
                            <Badge
                                className="gap-2"
                                variant="ghost"
                                key={index}
                            >
                                <div className="bg-clr-700 h-1.5 w-1.5 rounded-full" />
                                <span>{badge}</span>
                            </Badge>
                        ))}
                    </Grid>
                    <div className="flex gap-4">
                        <Button variant="secondary" className="flex-1">
                            Learn More
                        </Button>
                        <Button variant="default" className="flex-1">
                            Get Started
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
