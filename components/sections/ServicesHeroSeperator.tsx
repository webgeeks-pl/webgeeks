import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionTitle,
} from "../layout/section";

export default function ServicesHeroSeperator() {
    return (
        <Section className="py-size-lg sm:py-size-xl bg-brand">
            <SectionContent>
                <SectionHeader>
                    <SectionHeaderContent>
                        <SectionTitle className="text-center">
                            Kompleksowa usługa
                        </SectionTitle>
                    </SectionHeaderContent>
                </SectionHeader>
            </SectionContent>
        </Section>
    );
}
