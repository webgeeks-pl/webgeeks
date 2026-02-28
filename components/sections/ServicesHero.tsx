import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

export function ServicesHero() {
    return (
        <Section className="py-size-2xl min-h-[80vh] items-center justify-center">
            <SectionContent className="gap-size-lg">
                <SectionHeader>
                    <SectionHeaderContent>
                        <div>
                            <SectionTitle>
                                Zobacz jak tworzę strony internetowe
                            </SectionTitle>
                            {/* <Text muted intent="large" className="mt-1">
                                który napędza Twoją stronę internetową
                            </Text> */}
                        </div>

                        <SectionLead>
                            Jako freelancer specjalizujący się w&nbsp;tworzeniu
                            marketingowych stron internetowych w&nbsp;technologii Next.js,
                            pracuję inaczej niż większość agencji. Nie korzystam
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>
            </SectionContent>
        </Section>
    );
}
