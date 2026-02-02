import { cn } from "@/lib/utils";
import { Check, Rocket, Star, Zap } from "lucide-react";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";

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

export function HomePackages() {
    return (
        <Section className="py-size-xl sm:py-size-2xl bg-white">
            <SectionContent className="gap-size-lg">
                <div className="mb-16 text-center">
                    <SectionHeader
                        title="Nasza Oferta"
                        description="Wybierz pakiet dopasowany do potrzeb Twojego biznesu. Każdy projekt realizujemy indywidualnie."
                    />
                </div>

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
                                        variant={pkg.popular ? "brandSolid" : "outline"}
                                    />

                                    <Text intent="h3" className="mb-2" text={pkg.name} />

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

                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                    <Card className="relative flex h-full flex-col overflow-visible transition-all duration-300 lg:grid lg:grid-cols-2">
                        <CardHeader className="overflow-auto pb-4 text-center lg:text-start">
                            <IconContainer
                                Icon={Rocket}
                                className="max-lg:mx-auto"
                                color="default"
                                variant="outline"
                            />

                            <Text intent="h3" className="mb-2" text="E-commerce" />

                            <Text intent="var" className="text-3xl" text="od 11 999 zł" />
                            <Text
                                muted
                                text="Sklep online z pełnym procesem zakupowym i integracjami płatności."
                            />
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col">
                            <ul className="mb-6 flex-1 space-y-3">
                                {[
                                    "Katalog produktów",
                                    "Płatności online",
                                    "Koszyk i zamówienia",
                                    "Panel administracyjny",
                                    "Automatyczne maile",
                                    "Optymalizacja pod SEO",
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                        <Text>{feature}</Text>
                                    </li>
                                ))}
                            </ul>

                            <Button size="lg" variant="outline">
                                Wybierz pakiet
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="relative flex h-full flex-col overflow-visible transition-all duration-300 lg:grid lg:grid-cols-2">
                        <CardHeader className="overflow-auto pb-4 text-center lg:text-start">
                            <IconContainer
                                Icon={Star}
                                className="max-lg:mx-auto"
                                color="default"
                                variant="outline"
                            />

                            <Text intent="h3" className="mb-2" text="Aplikacja webowa" />

                            <Text intent="var" className="text-3xl" text="od 14 999 zł" />
                            <Text
                                muted
                                text="Dedykowana aplikacja webowa dopasowana do procesów w Twojej firmie."
                            />
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col">
                            <ul className="mb-6 flex-1 space-y-3">
                                {[
                                    "Indywidualny projekt UX/UI",
                                    "Role i uprawnienia",
                                    "Integracje z systemami",
                                    "Panel administracyjny",
                                    "Analityka i raporty",
                                    "Wysoka wydajność",
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                        <Text>{feature}</Text>
                                    </li>
                                ))}
                            </ul>

                            <Button size="lg" variant="outline">
                                Wybierz pakiet
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </SectionContent>
        </Section>
    );
}
