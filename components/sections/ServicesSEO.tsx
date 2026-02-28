import { Code2, Database, Gauge, Globe, LayoutList, Tag } from "lucide-react";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

const seoPoints = [
    {
        icon: Code2,
        title: "Poprawna struktura HTML",
    },
    {
        icon: Gauge,
        title: "Szybkie ładowanie (Core Web Vitals)",
    },
    {
        icon: Tag,
        title: "Optymalizacja meta tagów",
    },
    {
        icon: Database,
        title: "Dane strukturalne",
    },
    {
        icon: LayoutList,
        title: "Logiczna architektura treści",
    },
    {
        icon: Globe,
        title: "Przygotowanie pod indeksację w Google",
    },
];

export function ServicesSEO() {
    return (
        <Section className="py-size-2xl bg-clr-50">
            <SectionContent className="gap-size-lg items-start">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <SectionTitle>SEO wbudowane </SectionTitle>
                        <SectionLead>
                            Dobra strona to nie tylko wygląd. To również techniczna
                            optymalizacja pod wyszukiwarki. Strony, które tworzę, mają
                            poprawną strukturę HTML, szybko się ładują i&nbsp;są
                            przygotowane do&nbsp;skutecznego pozycjonowania organicznego.
                            Dzięki temu Twoja strona będzie miała solidne podstawy
                            do&nbsp;budowania widoczności w&nbsp;Google
                            i&nbsp;przyciągania klientów.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="py-size-xl mx-auto grid w-full max-w-5xl grid-cols-3 gap-x-4 gap-y-12">
                    {seoPoints.map(({ icon: Icon, title }, index) => (
                        <ClientCard key={index} icon={Icon} title={title} />
                    ))}
                </div>

                {/* <Text muted className="mx-auto max-w-3xl text-center">
                    Nie zajmuję się prowadzeniem kampanii reklamowych. Skupiam się
                    na&nbsp;tym, aby Twoja strona była maksymalnie zoptymalizowana
                    technicznie i&nbsp;gotowa do&nbsp;skutecznego pozycjonowania
                    organicznego.
                </Text> */}
            </SectionContent>
        </Section>
    );
}

function ClientCard({
    icon: Icon,
    title,
}: {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    title: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <Icon size={32} />
            <h3 className="mt-size-xs text-sm font-medium">{title}</h3>
        </div>
    );
}
