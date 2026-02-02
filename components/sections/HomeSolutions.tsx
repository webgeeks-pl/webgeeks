import {
    BarChart3,
    Blocks,
    Code2,
    Database,
    Globe2,
    Lock,
    Mail,
    Search,
    ShoppingCart,
    Zap,
} from "lucide-react";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";

const solutions = [
    {
        icon: Database,
        title: "Headless CMS",
        description:
            "Sanity, Contentful lub Strapi - łatwe zarządzanie treścią bez znajomości kodu. Panel administracyjny dostosowany do Twoich potrzeb.",
    },
    {
        icon: ShoppingCart,
        title: "E-commerce",
        description:
            "Sklepy internetowe z Stripe, Shopify API lub WooCommerce. Szybkie, bezpieczne płatności i pełna kontrola nad produktami.",
    },
    {
        icon: Zap,
        title: "API & Integracje",
        description:
            "Połączenia z CRM (HubSpot, Salesforce), narzędziami marketingowymi, systemami płatności i dowolnymi zewnętrznymi serwisami.",
    },
    {
        icon: Lock,
        title: "Autentykacja",
        description:
            "Bezpieczne logowanie użytkowników z Auth0, NextAuth lub Supabase. Social login (Google, Facebook) i role użytkowników.",
    },
    {
        icon: Globe2,
        title: "Multi-język",
        description:
            "Strony wielojęzyczne z automatycznym wykrywaniem lokalizacji. SEO zoptymalizowane dla każdego języka osobno.",
    },
    {
        icon: Code2,
        title: "PWA",
        description:
            "Progressive Web Apps - strony działające jak natywne aplikacje mobilne. Offline mode, powiadomienia push i instalacja.",
    },
    {
        icon: Blocks,
        title: "Page Builder",
        description:
            "Wizualne edytory stron dla klientów. Twórz i edytuj strony bez developera - drag & drop, komponenty, preview.",
    },
    {
        icon: BarChart3,
        title: "Analytics & Tracking",
        description:
            "Google Analytics 4, Facebook Pixel, hotmaps i A/B testing. Pełna kontrola nad konwersjami i ruchem na stronie.",
    },
    {
        icon: Mail,
        title: "Email Marketing",
        description:
            "Integracje z Mailchimp, SendGrid, Klaviyo. Automatyczne kampanie, newslettery i powiadomienia transakcyjne.",
    },
    {
        icon: Search,
        title: "Wyszukiwanie",
        description:
            "Zaawansowane wyszukiwarki z Algolia lub ElasticSearch. Błyskawiczne wyniki, filtry i autocomplete.",
    },
];

export function HomeSolutions() {
    return (
        <Section className="py-size-xl md:py-size-2xl bg-clr-50">
            <SectionContent className="gap-size-lg">
                <SectionHeader
                    title="Rozwiązania technologiczne"
                    description="Oferujemy kompleksowe rozwiązania dopasowane do potrzeb Twojego biznesu. Od prostych stron po zaawansowane platformy z pełną integracją."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {solutions.map((solution, index) => {
                        return (
                            <Card className="h-full gap-2" key={index}>
                                <CardHeader>
                                    <IconContainer Icon={solution.icon} />
                                    <Text intent="h3" text={solution.title} />
                                </CardHeader>
                                <CardContent>
                                    <Text muted text={solution.description} />
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="mb-6 text-gray-600">
                        Nie widzisz rozwiązania, którego potrzebujesz?
                        <br className="hidden sm:block" />
                        Zbudujemy dedykowaną integrację pod Twoje wymagania.
                    </p>
                </div>
            </SectionContent>
        </Section>
    );
}
