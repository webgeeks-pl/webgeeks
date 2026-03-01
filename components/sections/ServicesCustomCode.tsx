import LucideIcon from "@/components/ui/lucideIcons";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";

export function ServicesCustomCode() {
    const benefits = [
        {
            icon: "Zap",
            title: "Błyskawiczna Wydajność",
            description: "Serwisy wczytują się natychmiast",
        },
        {
            icon: "Code2",
            title: "Kod na Miarę",
            description: "Całkowicie dostosowany bez żadnych zbędnych bibliotek",
        },
        {
            icon: "Shield",
            title: "Maksymalna Bezpieczeństwo",
            description: "Nie ma szans na włamania",
        },
    ];

    return (
        <Section className="py-size-xl md:py-size-2xl">
            <SectionContent className="gap-size-lg">
                <div className="space-y-4">
                    <Text
                        as="h2"
                        intent="h2"
                        className="font-heading text-3xl md:text-5xl"
                    >
                        Profesjonalny Projekt i Rozwój Stron
                    </Text>
                    <Text intent="lead" className="max-w-3xl">
                        Kod na Miarę – BEZ Konstruktorów Stron i Wordpress
                    </Text>
                    <Text className="max-w-3xl text-base leading-relaxed md:text-lg">
                        W WebGeeks robimy rzeczy inaczej. Zamiast używać konstruktorów
                        stron czy Wordpressa, ręcznie piszemy cały kod dla naszych witryn
                        od góry do dołu. Dzięki temu możemy tworzyć niezwykle
                        spersonalizowane projekty, mieć ZERO zbędnego kodu, wczytują się
                        błyskawicznie, osiągają idealne wyniki w Google PageSpeed
                        Insights, są bezpieczniejsze i praktycznie niemożliwe do włamania,
                        a my nie musimy ciągle aktualizować wtyczek czy wersji Wordpressa,
                        aby zapobiec hakowaniu.
                    </Text>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="bg-brand/50 backdrop-blur-sm">
                            <CardContent className="flex flex-col items-center gap-3 text-center">
                                <LucideIcon
                                    name={benefit.icon}
                                    className="bg-brand bg-transparent"
                                />
                                <div>
                                    <Text
                                        intent="h4"
                                        className="font-heading font-semibold"
                                        text={benefit.title}
                                    />
                                    <Text
                                        intent="small"
                                        className="text-muted-foreground"
                                        text={benefit.description}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionContent>
        </Section>
    );
}
