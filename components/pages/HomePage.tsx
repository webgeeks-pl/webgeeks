import { cn } from "@/lib/utils";
import { getArrayFromMessages } from "@/lib/utils/array";
import {
    AlertTriangle,
    ArrowRight,
    Award,
    Check,
    CheckCircle2,
    CloudCog,
    Code2,
    CornerLeftUp,
    DollarSign,
    Heart,
    Lock,
    Rocket,
    Search,
    Smartphone,
    Star,
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
import { Card, CardContent, CardHeader } from "../ui/card";
import { EncryptedText } from "../ui/encrypted-text";
import { Globe } from "../ui/globe";
import { GridBackground } from "../ui/gridBackground";
import IconContainer from "../ui/iconContainer";
import { Iphone } from "../ui/iphone";
import { getLucideIcon } from "../ui/lucideIcons";
import { Safari } from "../ui/safari";
import { Separator } from "../ui/separator";
import { TextShimmer } from "../ui/text-shimmer";
import { Tilt } from "../ui/tilt";

const CardSchema = z.object({
    icon: z.string(),
    value: z.string(),
    title: z.string(),
    description: z.string(),
});
type Card = z.infer<typeof CardSchema>;

const packages = [
    {
        name: "Starter",
        icon: Zap,
        price: "od 4 999 zł",
        description: "Idealne rozwiązanie dla małych firm i startupów",
        features: [
            "Do 5 podstron",
            "Responsywny design",
            "Podstawowe SEO",
            "Formularz kontaktowy",
            "Google Analytics",
            "30 dni wsparcia",
            "Hosting przez 12 miesięcy",
        ],
        popular: false,
        color: "gray",
    },
    {
        name: "Business",
        icon: Star,
        price: "od 8 999 zł",
        description: "Kompleksowe rozwiązanie dla rozwijających się firm",
        features: [
            "Do 15 podstron",
            "Zaawansowany design",
            "Pełne SEO + sitemap",
            "Blog / Aktualności",
            "Integracje (CRM, email)",
            "Panel administracyjny",
            "90 dni wsparcia",
            "Hosting przez 12 miesięcy",
            "Optymalizacja obrazów",
        ],
        popular: true,
        color: "green",
    },
    {
        name: "Enterprise",
        icon: Rocket,
        price: "od 15 999 zł",
        description: "Dla firm wymagających maksymalnej wydajności",
        features: [
            "Nielimitowane podstrony",
            "Premium design + animacje",
            "Zaawansowane SEO",
            "E-commerce / Portal",
            "API + Integracje",
            "Dedykowany CMS",
            "Multi-język",
            "6 miesięcy wsparcia premium",
            "CDN + Premium hosting",
            "Audyt bezpieczeństwa",
        ],
        popular: false,
        color: "gray",
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

const mobileFriendlyItems = [
    {
        number: "1",
        title: "Ogromny rynek mobilny",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
        number: "2",
        title: "Ogromny rynek mobilny",
        description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae hic alias illo eos dolor provident sequi reiciendis quasi animi",
    },
    {
        number: "3",
        title: "Ogromny rynek mobilny",
        description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae hic alias illo eos dolor",
    },
];

export default function HomePage() {
    const t = useTranslations("pages.home");
    const tHero = useTranslations("pages.home.hero");
    const heroCards = getArrayFromMessages(tHero.raw("cards"), CardSchema);
    const heroBadges = getArrayFromMessages(tHero.raw("badges.bottom"), z.string());

    return (
        <Page>
            {/* ------------------ Hero ------------------ */}
            <Section as="header" className="py-size-xl sm:py-size-2xl">
                <SectionContent className="gap-size-md text-center">
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
                        className="font-heading max-w-3xl text-3xl sm:text-5xl"
                    >
                        {t("hero.title")}
                    </Text>
                    <Text intent="lead" muted className="max-w-2xl">
                        {t("hero.leadStart")}
                        <TextShimmer
                            as="span"
                            className="font-bold [--base-color:var(--color-sky-500)] [--base-gradient-color:var(--color-sky-300)]"
                        >
                            {t("hero.leadHighlight")}
                        </TextShimmer>
                        {t("hero.leadEnd")}
                    </Text>
                    <div className="relative flex gap-4">
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
                        <div className="absolute top-full mt-3 flex gap-2 md:left-1/5">
                            {/* <ArrowUp size={18} strokeWidth={3.5} /> */}
                            <CornerLeftUp size={18} strokeWidth={3.5} />
                            <EncryptedText
                                startDelayMs={1000}
                                text="Nie zwlekaj, zacznij już dziś!"
                                className="font-heading font-bold text-nowrap"
                            />
                            {/* <CornerRightUp size={18} strokeWidth={3.5} /> */}
                        </div>
                    </div>
                    <Separator className="mt-4 max-w-xl" decorative />

                    {heroBadges.length > 0 && (
                        <div className="flex flex-col gap-2 md:flex-row">
                            <AnimateMany variant="blurIn" delay={0.3}>
                                {heroBadges.map((badge, index) => (
                                    <Badge className="gap-2" variant="ghost" key={index}>
                                        <div className="bg-success h-1.5 w-1.5 rounded-full" />
                                        <Text intent="small" muted text={badge} />
                                    </Badge>
                                ))}
                            </AnimateMany>
                        </div>
                    )}
                </SectionContent>
            </Section>
            {/* ---------------- Features ---------------- */}
            <Section
                className="pb-size-xl sm:pb-size-2xl pt-0.5"
                shouldRender={heroCards.length > 0}
            >
                <SectionContent>
                    <Grid
                        cols={heroCards.length + 1}
                        className="items-stretch max-sm:grid-rows-4"
                    >
                        {heroCards.map(({ icon, value, title, description }, index) => {
                            return (
                                <ScrollReveal delay={2} key={index} className="h-full">
                                    <Card className="h-full">
                                        <CardContent className="flex h-full flex-col items-center justify-between text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <IconContainer
                                                    Icon={getLucideIcon(icon)}
                                                />
                                                <Text
                                                    intent="var"
                                                    className="text-4xl"
                                                    text={value}
                                                />
                                            </div>
                                            <div>
                                                <Text intent="h3" text={title} />
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
                        })}
                        <ScrollReveal delay={2} className="h-full">
                            <Card className="h-full">
                                <CardContent className="relative flex h-full flex-col justify-between">
                                    <Text
                                        intent="h3"
                                        className="from-clr-900 to-clr-400 z-10 bg-linear-to-b bg-clip-text text-center font-semibold text-transparent"
                                    >
                                        Docieraj na cały świat
                                    </Text>
                                    <Globe />
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    </Grid>
                </SectionContent>
            </Section>

            {/* ---------------- About Us ---------------- */}
            <Section className="bg-clr-100 py-size-xl">
                <SectionContent>
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <FadeInSection>
                            <div>
                                <Text intent="sectionHeader" className="mb-size-md">
                                    O nas
                                </Text>
                                <div className="font space-y-4">
                                    <Text>
                                        NextSpeed to zespół pasjonatów nowoczesnych
                                        technologii webowych. Od 2020 roku pomagamy firmom
                                        porzucać przestarzałe rozwiązania i przechodzić na
                                        szybkie, skalowalne strony oparte na Next.js.
                                    </Text>
                                    <Text className="text-clr-600">
                                        Zrealizowaliśmy ponad 150 projektów dla klientów z
                                        różnych branż - od startupów po duże korporacje.
                                        Każda migracja z WordPress kończyła się
                                        dramatyczną poprawą wydajności i wzrostem
                                        konwersji.
                                    </Text>
                                    <Text className="text-clr-600">
                                        Specjalizujemy się nie tylko w technologii, ale
                                        przede wszystkim w rozumieniu biznesu naszych
                                        klientów. Nie budujemy tylko stron - tworzymy
                                        narzędzia, które generują realną wartość i
                                        przewagę konkurencyjną.
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

                                                <Text intent="h3" text={value.title} />

                                                <Text text={value.description} muted />
                                            </CardContent>
                                        </Card>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </SectionContent>
            </Section>

            <Section className="pt-size-xl sm:pt-size-2xl pb-size-sm sm:pb-size-md relative">
                <SectionContent className="gap-size-xl">
                    <GridBackground />
                    <SectionHeader
                        title="Nowoczesny design i funkcjonalność"
                        description="Tworzymy strony, które nie tylko wyglądają świetnie, ale są też intuicyjne i łatwe w obsłudze dla Twoich użytkowników."
                    />
                    <Safari
                        url="https:\\"
                        imageSrc="/template-hero.webp"
                        className="max-w-7xl"
                    />
                </SectionContent>
            </Section>
            <Separator decorative />
            {/* ---------------- Mobile Friendly ---------------- */}
            <Section className="pb-size-xl pt-size-sm sm:pt-size-md sm:pb-size-2xl bg-white">
                <SectionContent className="gap-size-md sm:gap-size-xl">
                    <SectionHeader
                        title="Dopasowane na urządzenia mobilne"
                        description=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                            hic alias illo eos dolor provident sequi reiciendis quasi
                            animi sunt delectus cum"
                    />

                    <div className="gap-size-md grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3">
                        <Tilt
                            rotationFactor={6}
                            isRevese
                            style={{
                                transformOrigin: "center center",
                            }}
                            springOptions={{
                                stiffness: 26.7,
                                damping: 4.1,
                                mass: 0.2,
                            }}
                            className="group relative h-full w-full max-w-md rounded-lg max-md:mx-auto md:col-start-2 md:row-span-3"
                        >
                            <Iphone src="/strona.jpeg" className="" />
                        </Tilt>
                        {mobileFriendlyItems.map((item, index) => (
                            <div
                                className={cn(
                                    "flex flex-col md:col-start-1 md:justify-center md:text-end",
                                    index === 0 && "md:row-start-1",
                                    index === 1 &&
                                        "md:row-start-2 lg:col-start-3 lg:text-start",
                                    index === 2 && "md:row-start-3"
                                )}
                                key={index}
                            >
                                <Text intent="var" className="text-4xl sm:text-6xl">
                                    {item.number}
                                </Text>
                                <Text intent="h3">{item.title}</Text>
                                <Text muted size="small">
                                    {item.description}
                                </Text>
                            </div>
                        ))}
                    </div>
                </SectionContent>
            </Section>
            <Separator decorative />
            {/* ---------------- Why Next.js ---------------- */}
            <Section className="py-size-xl sm:py-size-2xl bg-white">
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
                                            <Text
                                                intent="h4"
                                                as="h3"
                                                text={benefit.title}
                                            />
                                            <Text muted text={benefit.description} />
                                        </CardContent>
                                    </Card>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="py-size-xl sm:py-size-2xl bg-white">
                <SectionContent className="gap-size-lg">
                    <FadeInSection className="mb-16 text-center">
                        <SectionHeader
                            title="Nasza Oferta"
                            description="Wybierz pakiet dopasowany do potrzeb Twojego biznesu. Każdy
                            projekt realizujemy indywidualnie."
                        />
                    </FadeInSection>

                    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                        {packages.map((pkg, index) => {
                            return (
                                <Card
                                    key={index}
                                    className={cn(
                                        "relative flex h-full flex-col overflow-visible transition-all duration-300",
                                        pkg.popular &&
                                            "border-brand scale-105 border-2 shadow-xl"
                                    )}
                                >
                                    {pkg.popular && (
                                        <div className="bg-brand absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1">
                                            <Text intent="small" color="opposite">
                                                Najpopularniejszy
                                            </Text>
                                        </div>
                                    )}

                                    <CardHeader className="overflow-auto pb-4 text-center">
                                        <IconContainer
                                            Icon={pkg.icon}
                                            className="mx-auto"
                                            color={pkg.popular ? "opposite" : "default"}
                                            variant={
                                                pkg.popular ? "brandSolid" : "outline"
                                            }
                                        />

                                        <Text
                                            intent="h3"
                                            className="mb-2"
                                            text={pkg.name}
                                        />

                                        <Text
                                            intent="var"
                                            className="text-3xl"
                                            text={pkg.price}
                                        />
                                        <Text muted text={pkg.description} />
                                    </CardHeader>

                                    <CardContent className="flex flex-1 flex-col">
                                        <ul className="mb-6 flex-1 space-y-3">
                                            {pkg.features.map((feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                                    <Text>{feature}</Text>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button
                                            size="lg"
                                            variant={pkg.popular ? "cta" : "outline"}
                                        >
                                            Wybierz pakiet
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </SectionContent>
            </Section>

            <Separator decorative />

            {/* ---------------- Custom Offer ---------------- */}

            <Section className="py-size-lg sm:py-size-xl bg-brand-darker/50">
                <SectionContent className="gap-size-sm">
                    <SectionHeader
                        title="Potrzebujesz czegoś więcej?"
                        description="Skontaktuj się z nami, aby omówić indywidualne potrzeby Twojego projektu."
                        descMuted={false}
                    />

                    <div className="flex gap-4">
                        <Button variant="default" size="lg">
                            Indywidualna wycena
                        </Button>
                        <Button variant="secondary" size="lg">
                            Zobacz cennik usług
                        </Button>
                    </div>
                </SectionContent>
            </Section>

            <Separator decorative />

            <Separator decorative />

            {/* ---------------- Comparison ---------------- */}
            <Section className="bg-clr-50 py-size-xl sm:py-size-2xl">
                <SectionContent className="gap-size-lg text-center">
                    <SectionHeader
                        title="Transformacja Twojej strony"
                        description="Zobacz jak zmienia się wszystko po migracji z WordPress na Next.js"
                    />

                    {/* Main Comparison */}
                    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* BEFORE - WordPress */}
                        <Card className="relative h-full overflow-hidden border-2 border-red-200 bg-red-50">
                            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-red-200 opacity-20"></div>
                            <CardContent className="relative z-10 p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-200">
                                        <AlertTriangle className="size-6 text-red-700" />
                                    </div>
                                    <div>
                                        <Badge className="mb-2 bg-red-600">PRZED</Badge>
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
                                    <div className="flex h-48 items-center justify-center bg-linear-to-b from-gray-100 to-gray-200 p-6">
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
                                            <X className="mt-0.5 size-5 shrink-0 text-red-600" />
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
                                        <Badge className="mb-2 bg-green-600">PO</Badge>
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
                                    <div className="flex h-48 items-center justify-center bg-linear-to-b from-white to-gray-50 p-6">
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
                                                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />
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

                    {/* Stats Bar */}
                    <div className="bg-clr-900 w-full rounded-2xl p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
                            <div>
                                <div className="mb-2 text-4xl text-white">5-10x</div>
                                <div className="text-clr-400 text-sm">
                                    Szybsze ładowanie
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl text-white">-70%</div>
                                <div className="text-clr-400 text-sm">Niższe koszty</div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl text-white">+85%</div>
                                <div className="text-clr-400 text-sm">Lepsze SEO</div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl text-white">99.9%</div>
                                <div className="text-clr-400 text-sm">Uptime</div>
                            </div>
                        </div>
                    </div>
                </SectionContent>
            </Section>

            {/* <Section className="py-size-xl md:py-size-2xl bg-clr-300">
                <SectionContent>
                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                            <div className="flex-1 text-center lg:text-left">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                                    <Sparkles className="size-5 text-yellow-400" />
                                    <span className="text-sm text-white">
                                        Limitowana oferta
                                    </span>
                                </div>

                                <h2 className="mb-4 text-3xl text-white sm:text-4xl lg:text-5xl">
                                    Darmowy audyt Twojej strony
                                </h2>

                                <p className="mb-6 max-w-2xl text-lg text-gray-300">
                                    Sprawdzimy wydajność, SEO i bezpieczeństwo Twojej
                                    obecnej strony. Otrzymasz szczegółowy raport z
                                    rekomendacjami i potencjałem oszczędności.
                                </p>

                                <div className="mb-6 flex flex-wrap justify-center gap-4 lg:mb-0 lg:justify-start">
                                    {[
                                        "PageSpeed Analysis",
                                        "SEO Score",
                                        "Koszty utrzymania",
                                        "Plan migracji",
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-gray-300"
                                        >
                                            <CheckCircle2 className="size-4 text-green-400" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="shrink-0">
                                <Button
                                    size="lg"
                                    className="group bg-white px-8 py-6 text-lg text-gray-900 shadow-xl hover:bg-gray-100"
                                >
                                    Zamów darmowy audyt
                                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <p className="mt-3 text-center text-xs text-gray-400">
                                    ⚡ Raport w 24h · Bez zobowiązań
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionContent>
            </Section> */}

            <Separator decorative />
            <Section className="py-size-2xl bg-brand-darker/50">
                <SectionContent className="gap-size-md">
                    <SectionHeader
                        descriptionClassName="text-black"
                        title="Section Title"
                        descMuted={false}
                        description="This is the section description that gives more details about the section content."
                    />
                    <Grid cols={0} className="w-fit items-center gap-4 sm:grid-cols-2">
                        {[...heroBadges, heroBadges[0]].map((badge, index) => (
                            <Badge className="gap-2" variant="ghost" key={index}>
                                <div className="bg-clr-700 h-1.5 w-1.5 rounded-full" />
                                <Text intent="small" text={badge} />
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
