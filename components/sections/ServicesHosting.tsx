import { Activity, ArrowUpCircle, Globe, Headphones, Server } from "lucide-react";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

const hostingPoints = [
    {
        icon: Server,
        title: "Szybki i bezpieczny hosting",
    },
    {
        icon: Globe,
        title: "Konfiguracja domeny i certyfikatu SSL",
    },
    {
        icon: Activity,
        title: "Monitoring działania strony",
    },
    {
        icon: Headphones,
        title: "Wsparcie techniczne",
    },
    {
        icon: ArrowUpCircle,
        title: "Rozwój strony w przyszłości",
    },
    {
        icon: ArrowUpCircle,
        title: "Regularne aktualizacje i optymalizacje",
    },
];

export function ServicesHosting() {
    return (
        <Section className="py-size-2xl">
            <SectionContent className="gap-size-lg items-start">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <SectionTitle as="h2">Hosting i&nbsp;stała opieka</SectionTitle>
                        <SectionLead as="p">
                            Strona internetowa to nie jednorazowy projekt, ale narzędzie
                            biznesowe. Oferuję kompleksową opiekę nad stroną po jej
                            uruchomieniu, w tym hosting, regularne aktualizacje,
                            monitoring i&nbsp;wsparcie techniczne. Dzięki temu masz
                            pewność, że Twoja strona działa stabilnie, jest bezpieczna
                            i&nbsp;zawsze dostępna dla klientów.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="py-size-xl mx-auto grid w-full max-w-5xl grid-cols-3 gap-x-4 gap-y-12">
                    {hostingPoints.map(({ icon: Icon, title }, index) => (
                        <ClientCard key={index} icon={Icon} title={title} />
                    ))}
                </div>

                {/* <Text muted className="mx-auto max-w-3xl text-center">
                    Dzięki temu masz pewność, że Twoja strona działa stabilnie, jest
                    bezpieczna i&nbsp;zawsze dostępna dla klientów.
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
