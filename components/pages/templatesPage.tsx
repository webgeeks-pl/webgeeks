"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Page from "../layout/page";
import Section, { SectionContent, SectionLead, SectionTitle } from "../layout/section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

// Template data structure
interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    desktopImage: string;
    mobileImage?: string;
    demoUrl?: string;
    features: string[];
}

// Sample templates - you can move this to a constants file later
export const templates: Template[] = [
    {
        id: "modern-business",
        name: "Nowoczesny Biznes",
        description:
            "Elegancka i profesjonalna strona biznesowa z nowoczesnymi wzorcami projektowania",
        category: "Biznes",
        tags: ["Profesjonalny", "Nowoczesny", "Korporacyjny"],
        desktopImage: "/template-hero.webp",
        mobileImage: "/strona.jpeg",
        demoUrl: "https://cafe-luna-template.vercel.app/",
        features: [
            "Responsywny Design",
            "Optymalizacja SEO",
            "Szybkie Ładowanie",
            "Formularze Kontaktowe",
        ],
    },
    {
        id: "e-commerce",
        name: "Sklep E-Commerce",
        description:
            "W pełni funkcjonalny sklep internetowy z koszykiem i systemem płatności",
        category: "E-Commerce",
        tags: ["Sklep", "Produkty", "Płatności"],
        desktopImage: "/template-hero.webp",
        mobileImage: "/strona.jpeg",
        demoUrl: "http://127.0.0.1:3000/",
        features: [
            "Katalog Produktów",
            "Koszyk",
            "Bezpieczne Płatności",
            "Panel Administracyjny",
        ],
    },
    {
        id: "portfolio",
        name: "Portfolio Kreatywne",
        description:
            "Zaprezentuj swoją pracę dzięki temu wspaniałemu szablonowi portfolio",
        category: "Portfolio",
        tags: ["Kreatywny", "Galeria", "Prezentacja"],
        desktopImage: "/template-hero.webp",
        mobileImage: "/strona.jpeg",
        features: [
            "Galeria Zdjęć",
            "Szczegóły Projektów",
            "Formularz Kontaktowy",
            "Animacje",
        ],
    },
    {
        id: "restaurant",
        name: "Restauracja i Kawiarnia",
        description: "Piękny szablon dla restauracji z menu i systemem rezerwacji",
        category: "Biznes",
        tags: ["Jedzenie", "Menu", "Rezerwacje"],
        desktopImage: "/template-hero.webp",
        mobileImage: "/strona.jpeg",
        features: [
            "Wyświetlanie Menu",
            "Rezerwacje Online",
            "Galeria",
            "Mapa Lokalizacji",
        ],
    },
    {
        id: "landing-page",
        name: "Landing Page SaaS",
        description: "Wysoko konwertująca strona docelowa dla produktów SaaS",
        category: "Marketing",
        tags: ["SaaS", "Konwersja", "Marketing"],
        desktopImage: "/template-hero.webp",
        mobileImage: "/strona.jpeg",
        features: [
            "Sekcja Hero",
            "Prezentacja Funkcji",
            "Tabele Cenowe",
            "Opinie Klientów",
        ],
    },
    {
        id: "blog",
        name: "Nowoczesny Blog",
        description:
            "Czysty i minimalistyczny szablon bloga z doskonałym doświadczeniem czytania",
        category: "Blog",
        tags: ["Treść", "Artykuły", "Pisanie"],
        desktopImage: "/template-hero.webp",
        mobileImage: "/strona.jpeg",
        features: ["Układy Artykułów", "Kategorie", "Wyszukiwarka", "Komentarze"],
    },
];

const categories = [
    "Wszystkie",
    "Biznes",
    "E-Commerce",
    "Portfolio",
    "Marketing",
    "Blog",
];

export default function TemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
    const isMobile = useIsMobile();

    const filteredTemplates =
        selectedCategory === "Wszystkie"
            ? templates
            : templates.filter((t) => t.category === selectedCategory);

    return (
        <Page>
            {/* Templates Gallery */}
            <Section className="py-size-xl">
                <SectionContent className="gap-size-xl">
                    <div className="space-y-3 text-center">
                        <SectionTitle>Nasze Szablony</SectionTitle>
                        <SectionLead className="mx-auto max-w-2xl">
                            Gotowe rozwiązania dostosowane do Twoich potrzeb - od
                            wizytówek po sklepy internetowe
                        </SectionLead>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={
                                    selectedCategory === category ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Templates Grid */}
                    <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTemplates.map((template) => (
                            <Card
                                key={template.id}
                                size="sm"
                                className="w-full overflow-hidden pt-0!"
                            >
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <Image
                                        fill
                                        src={template.desktopImage}
                                        alt={template.name}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0" /> */}
                                </div>
                                <CardHeader className="space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <CardTitle className="text-xl">
                                            {template.name}
                                        </CardTitle>
                                        <Badge variant="outline" className="shrink-0">
                                            {template.category}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {template.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="w-full space-y-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {template.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                {template.demoUrl && (
                                    <CardFooter className="w-full">
                                        <div className="xs:flex-row flex w-full flex-col gap-2">
                                            <Button
                                                asChild
                                                variant="secondary"
                                                className="xs:flex-1"
                                            >
                                                <Link
                                                    href={template.demoUrl}
                                                    target="_blank"
                                                >
                                                    Link{" "}
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            {!isMobile && (
                                                <Button
                                                    className="xs:flex-1 w-full"
                                                    asChild
                                                >
                                                    <a
                                                        href={`/templates/demo?template=${template.id}`}
                                                    >
                                                        Demo
                                                        <ArrowRight className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-muted-foreground py-12 text-center">
                            Nie znaleziono szablonów w tej kategorii.
                        </div>
                    )}
                </SectionContent>
            </Section>

            <Separator decorative />

            {/* CTA Section */}
            <Section className="py-size-2xl">
                <SectionContent className="gap-size-lg text-center">
                    <div className="mx-auto max-w-3xl space-y-4">
                        <SectionTitle className="text-3xl sm:text-4xl">
                            Potrzebujesz Czegoś Wyjątkowego?
                        </SectionTitle>
                        <SectionLead className="text-lg">
                            Tworzymy w pełni niestandardowe strony internetowe dostosowane
                            do Twoich specyficznych potrzeb, identyfikacji marki i celów
                            biznesowych.
                        </SectionLead>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/contact">
                                Rozpocznij Projekt
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/offer">Zobacz Usługi</Link>
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
