import LucideIcon from "@/components/ui/lucideIcons";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";

export function ServicesWhyMatters() {
    const reasons = [
        {
            icon: "Zap",
            title: "Szybsze Ładowanie",
            description:
                "Jeśli strona wczytuje się dłużej niż 3 sekundy, możesz stracić aż 50% ruchu. Nasze strony ładują się tak szybko, że użytkownicy nie mają szans opuścić Twoją stronę zanim się załaduje.",
        },
        {
            icon: "TrendingUp",
            title: "Lepsza Konwersja",
            description:
                "Szybciej ładujące się strony konwertują lepiej. Szybsze strony również mają niższy koszt za klik w Google Ads, co może zaoszczędzić Ci setki złotych miesięcznie.",
        },
        {
            icon: "Lock",
            title: "Większe Bezpieczeństwo",
            description:
                "WordPress i konstruktory mają wiele luk w zabezpieczeniach. Nasz kod to statyczne pliki HTML i CSS – nie ma bazy danych ani żadnych punktów wejścia dla hakerów.",
        },
        {
            icon: "Search",
            title: "Lepsza Pozycja w Google",
            description:
                "Google preferuje strony, które wczytują się szybko. Lepsze wyniki PageSpeed i Core Vitals mogą poprawić Twoją pozycję w wyszukiwarce.",
        },
        {
            icon: "MapPin",
            title: "Wzmocnienie Google Business",
            description:
                "Szybko ładująca się strona wraz z pełnym profilem i 5-gwiazdkowymi opiniami może znacznie zwiększyć widoczność w Google Maps.",
        },
        {
            icon: "MessageSquare",
            title: "Więcej Potencjalnych Klientów",
            description:
                "Gdy strona ładuje się szybciej, więcej osób ją osiąga. Wyższy ruch i lepszy czas spędzony na stronie to więcej okazji do konwersji.",
        },
    ];

    return (
        <Section className="py-size-xl md:py-size-2xl">
            <SectionContent>
                <SectionHeader className="mb-size-lg">
                    <SectionHeaderContent>
                        <SectionTitle text="Dlaczego To Się Liczy" />
                        <SectionLead text="Konkurencja online jest zaciętą. Potrzebujesz każdej możliwej przewagi, aby wyróżnić się i pokonać konkurencję." />
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, index) => (
                        <Card
                            key={index}
                            className="border-brand/20 bg-white transition-shadow hover:shadow-lg"
                        >
                            <CardContent className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <LucideIcon
                                        name={reason.icon}
                                        className="bg-brand/10 flex-shrink-0 bg-transparent"
                                    />

                                    <div className="flex-1">
                                        <Text
                                            intent="h4"
                                            className="font-heading mb-2 font-semibold"
                                            text={reason.title}
                                        />
                                        <Text
                                            intent="small"
                                            className="text-muted-foreground leading-relaxed"
                                            text={reason.description}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionContent>
        </Section>
    );
}
