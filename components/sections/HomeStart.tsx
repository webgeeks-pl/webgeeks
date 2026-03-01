import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

const points = [
    {
        title: "Profesjonalny wizerunek",
        description:
            "Pierwsze wrażenie jest kluczowe. Profesjonalna strona internetowa buduje zaufanie i pokazuje, że Twoja firma jest wiarygodna.",
    },
    {
        title: "Lepsza widoczność",
        description:
            "Dobra strona internetowa jest zoptymalizowana pod kątem SEO, co pozwala Twojej firmie być łatwiej znalezioną przez potencjalnych klientów.",
    },
    {
        title: "Zwiększenie zysków",
        description:
            "Profesjonalna strona internetowa może przyciągnąć więcej klientów i zwiększyć sprzedaż, dzięki lepszej prezentacji oferty i łatwiejszemu kontaktowi.",
    },
    {
        title: "Konkurencyjność",
        description:
            "Profesjonalna strona internetowa pozwala Twojej firmie wyróżniać się na tle konkurencji i budować silny wizerunek marki.",
    },
];

export default function HomeStart() {
    return (
        <Section className="max-md:pb-size-2xl py-size-4xl relative">
            <SectionContent className="gap-size-xl flex h-full w-full flex-col xl:flex-row xl:items-center">
                <SectionHeader className="relative z-10 xl:max-w-prose">
                    <SectionHeaderContent className="mx-0 items-start justify-center text-start!">
                        <SectionTitle>
                            Czemu warto zainwestować w profesjonalną stronę internetową?
                        </SectionTitle>
                        <SectionLead>
                            W dzisiejszym cyfrowym świecie posiadanie profesjonalnej
                            strony internetowej jest kluczowe dla sukcesu każdej firmy. To
                            nie tylko wizytówka w sieci, ale także potężne narzędzie
                            marketingowe i sprzedażowe.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="flex w-full flex-col justify-center gap-8 xl:max-w-prose">
                    {points.map((point, index) => (
                        <div key={index} className="">
                            <h3 className="text-xl font-semibold">{point.title}</h3>
                            <p className="text-muted-foreground text-lg">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionContent>
        </Section>
    );
}
