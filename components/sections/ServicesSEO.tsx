import { FileText, BarChart3, Link2, Activity, Users } from "lucide-react";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
import IconContainer from "../ui/iconContainer";

export function ServicesSEO() {
    const seoServices = [
        {
            icon: FileText,
            title: "Tworzenie Treści",
            description:
                "Starannie napisane artykuły i treści, które pokazują Google, że jesteś ekspertem w Twojej branży.",
        },
        {
            icon: Link2,
            title: "Budowanie Odnośników",
            description:
                "Strategiczne linkowanie z wysokowartościowych źródeł, aby wzmocnić autorytet Twojej domeny.",
        },
        {
            icon: BarChart3,
            title: "Monitoring i Raporty",
            description:
                "Regularne śledzenie wyników, rankingów i metryk, aby wiedzieć co działa.",
        },
        {
            icon: Activity,
            title: "Optymalizacja Core Vitals",
            description:
                "Zapewniamy, że Twoja strona spełnia wszystkie kryteria Core Web Vitals Google.",
        },
    ];

    return (
        <Section className="py-size-xl md:py-size-2xl bg-gradient-to-b from-transparent via-brand/5 to-transparent">
            <SectionContent>
                <SectionHeader className="mb-size-lg">
                    <SectionHeaderContent>
                        <SectionTitle text="Specjaliści SEO dla Małych Biznesów" />
                        <SectionLead text="Projektowanie stron i SEO idą w parze. Dobrze zbudowana strona to zawsze coś więcej niż dobrze zbudowana strona – potrzebna jest aktywna strategia SEO." />
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <Text
                            as="h3"
                            intent="h3"
                            className="font-heading text-2xl md:text-3xl"
                        >
                            Zapomnij o Modnych Słowach
                        </Text>
                        <Text className="text-base leading-relaxed md:text-lg max-w-3xl">
                            "Optymalizuj doświadczenie użytkownika, prześlij mapę witryny,
                            optymalizuj metaznaczniki i opisy" – to wszystko powinno robić
                            każdy deweloper standardowo. To nie są usługi SEO.
                        </Text>
                        <Text className="text-base leading-relaxed md:text-lg max-w-3xl font-semibold text-brand">
                            SEO to aktywny i zaangażowany proces tworzenia treści, budowania
                            odnośników, blogowania i monitorowania.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {seoServices.map((service, index) => (
                            <Card
                                key={index}
                                className="bg-white hover:shadow-lg transition-shadow border-brand/20"
                            >
                                <CardContent className="gap-4 flex flex-col">
                                    <div className="flex items-start gap-4">
                                        <IconContainer
                                            variant="ghost"
                                            Icon={service.icon}
                                            className="flex-shrink-0 bg-brand/10"
                                        />
                                        <div className="flex-1">
                                            <Text
                                                intent="h4"
                                                className="font-heading font-semibold mb-2"
                                                text={service.title}
                                            />
                                            <Text
                                                intent="small"
                                                className="text-muted-foreground leading-relaxed"
                                                text={service.description}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="bg-brand/10 border-brand">
                        <CardContent className="gap-4">
                            <Text
                                intent="h4"
                                className="font-heading font-semibold"
                                text="Chcesz Wiedzieć Więcej?"
                            />
                            <Text className="text-base">
                                Chętnie umawiamy się na rozmowę, aby wyjaśnić szczegółowo każdy
                                element naszej strategii SEO i jak to wszystko działa. Skontaktuj
                                się z nami, aby dowiedzieć się, jak możemy pomóc w zwiększeniu
                                widoczności Twojego biznesu w sieci.
                            </Text>
                        </CardContent>
                    </Card>
                </div>
            </SectionContent>
        </Section>
    );
}
