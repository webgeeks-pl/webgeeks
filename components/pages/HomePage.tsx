import { getArrayFromMessages } from "@/lib/utils/array";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Clock,
    DollarSign,
    TrendingDown,
    TrendingUp,
    X,
    Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Animate from "../animations/Animate";
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

import { z } from "zod";
import { ScrollReveal } from "../animations/parallaxEffects";

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

export default function HomePage() {
    const t = useTranslations("pages.home");
    const cards = getArrayFromMessages(t.raw("cards"), CardSchema);

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
                    <div className="flex flex-col gap-2 md:flex-row">
                        <Badge className="gap-2" variant="ghost">
                            <div className="bg-success h-1.5 w-1.5 rounded-full" />
                            <span>{t("hero.badges.first")}</span>
                        </Badge>
                        <Badge className="gap-2" variant="ghost">
                            <div className="bg-success h-1.5 w-1.5 rounded-full" />
                            <span>{t("hero.badges.second")}</span>
                        </Badge>
                        <Badge className="gap-2" variant="ghost">
                            <div className="bg-success h-1.5 w-1.5 rounded-full" />
                            <span>{t("hero.badges.third")}</span>
                        </Badge>
                    </div>
                </SectionContent>
            </Section>

            <Section
                className="pb-size-xl sm:pb-size-2xl"
                shouldRender={cards.length > 0}
            >
                <SectionContent>
                    <ScrollReveal delay={2}>
                        <Grid cols={cards.length}>
                            {cards.map((card, index) => {
                                return (
                                    <Card className="" key={index}>
                                        <CardContent className="flex flex-col items-center text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <IconContainer
                                                    Icon={getLucideIcon(
                                                        card.icon
                                                    )}
                                                />
                                                <Text
                                                    intent="var"
                                                    className="text-4xl"
                                                >
                                                    {card.value}
                                                </Text>
                                            </div>
                                            <div>
                                                <Text intent="h3">
                                                    {card.title}
                                                </Text>
                                                <Text intent="small" muted>
                                                    {card.description}
                                                </Text>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Grid>
                    </ScrollReveal>
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
                                            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-100">
                                                <metric.before.icon className="size-4 text-red-600" />
                                            </div>
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
                                            <div className="flex h-8 w-8 items-center justify-center rounded bg-green-100">
                                                <metric.after.icon className="size-4 text-green-600" />
                                            </div>
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
        </Page>
    );
}
