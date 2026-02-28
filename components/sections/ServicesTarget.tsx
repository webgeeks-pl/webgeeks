import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

export function ServicesTarget() {
    return (
        <Section className="py-size-2xl bg-clr-900 min-h-[80vh]">
            <SectionContent className="gap-size-lg">
                <SectionHeader>
                    <SectionHeaderContent>
                        <SectionTitle>Dla kogo tworzę strony?</SectionTitle>
                        <SectionLead muted={false} className="text-black">
                            Współpracuję z&nbsp;firmami z&nbsp;wielu branż — oto
                            przykłady:
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>
            </SectionContent>
        </Section>
    );
}
