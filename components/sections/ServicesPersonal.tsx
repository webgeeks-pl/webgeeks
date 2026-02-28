import {
    Camera,
    Car,
    Coffee,
    Dog,
    Dumbbell,
    Flower2,
    GraduationCap,
    Hammer,
    HandHeart,
    HeartPulse,
    Home,
    Music,
    Ruler,
    Scale,
    Scissors,
    ShoppingBag,
    Stethoscope,
    UtensilsCrossed,
} from "lucide-react";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

const targets = [
    {
        icon: Scissors,
        title: "Salon fryzjerski",
    },
    {
        icon: HandHeart,
        title: "Salon masażu",
    },
    {
        icon: Ruler,
        title: "Biuro architektoniczne",
    },
    {
        icon: Home,
        title: "Agencja nieruchomości",
    },
    {
        icon: HeartPulse,
        title: "Placówka medyczna",
    },
    {
        icon: Coffee,
        title: "Kawiarnia",
    },
    {
        icon: UtensilsCrossed,
        title: "Restauracja",
    },
    {
        icon: Dumbbell,
        title: "Siłownia / klub fitness",
    },
    {
        icon: Scale,
        title: "Kancelaria prawna",
    },
    {
        icon: GraduationCap,
        title: "Placówka edukacyjna",
    },
    {
        icon: Car,
        title: "Warsztat samochodowy",
    },
    {
        icon: Dog,
        title: "Gabinet weterynaryjny",
    },
    {
        icon: Flower2,
        title: "Kwiaciarnia",
    },
    {
        icon: Camera,
        title: "Studio fotograficzne",
    },

    {
        icon: Hammer,
        title: "Firma budowlana",
    },
    {
        icon: ShoppingBag,
        title: "Sklep lokalny",
    },

    {
        icon: Music,
        title: "Szkoła muzyczna",
    },
    {
        icon: Stethoscope,
        title: "Gabinet fizjoterapii",
    },
];

export function ServicesPersonal() {
    return (
        <Section className="py-size-4xl">
            <SectionContent className="gap-size-lg items-start">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <div>
                            <SectionTitle>Indywidualne podejście</SectionTitle>
                            {/* <Text muted intent="large" className="mt-1">
                                który napędza Twoją stronę internetową
                            </Text> */}
                        </div>

                        <SectionLead>
                            Jako freelancer specjalizujący się w&nbsp;tworzeniu
                            marketingowych stron internetowych w&nbsp;technologii Next.js,
                            pracuję inaczej niż większość agencji. Nie korzystam
                            z&nbsp;WordPressa ani gotowych kreatorów stron. Każdą stronę
                            tworzę od&nbsp;podstaw, pisząc czysty i&nbsp;zoptymalizowany
                            kod. Dzięki temu mogę dostosować się do&nbsp;unikalnych
                            potrzeb każdego klienta, tworząc rozwiązania idealnie
                            dopasowane do&nbsp;jego biznesu i&nbsp;celów marketingowych.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="pt-size-xl grid w-full grid-cols-6 gap-x-4 gap-y-12">
                    {targets.map((target) => (
                        <ClientCard
                            key={target.title}
                            icon={target.icon}
                            title={target.title}
                        />
                    ))}
                </div>
            </SectionContent>
        </Section>
    );
}

function ClientCard({
    icon: Icon,
    title,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <Icon className="h-8 w-8" />
            <h3 className="mt-size-xs text-sm font-medium">{title}</h3>
        </div>
    );
}
