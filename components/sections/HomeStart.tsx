import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

const points = [
    {
        title: "Profesjonalna strona internetowa",
        description:
            "Nowoczesny design i funkcjonalność zapewniają lepsze doświadczenie użytkownika.",
    },
    {
        title: "Wyróżnienie w sieci",
        description:
            "Zwiększ swoją widoczność i atrakcyjność w porównaniu do konkurencji.",
    },
    {
        title: "Zwiększenie zysków",
        description:
            "Strona internetowa to narzędzie, które przyciąga klientów i zwiększa sprzedaż.",
    },
    {
        title: "Najnowsze technologie",
        description:
            "Korzystamy z nowoczesnych rozwiązań, które zapewniają szybkość i niezawodność.",
    },
];

export default function HomeStart() {
    return (
        <Section className="max-md:pb-size-2xl py-size-xl relative">
            <SectionContent className="gap-size-xl flex h-full w-full flex-col xl:flex-row">
                <SectionHeader className="relative z-10 xl:max-w-prose">
                    <SectionHeaderContent className="mx-0 items-start text-start!">
                        <SectionTitle>Zwiększ obecność swojej firmy</SectionTitle>
                        <SectionLead>
                            Zainwestuj w profesjonalną stronę internetową i wyróżnij się w
                            sieci. Postaw na najnowsze technologie, nowoczesny design i
                            niezawodność, które przyciągną klientów i zwiększą Twoje
                            zyski.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="w-full xl:max-w-prose">
                    {points.map((point, index) => (
                        <div key={index} className="mb-size-lg">
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
