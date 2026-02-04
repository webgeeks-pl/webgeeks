import { Packages } from "../content/Packages";
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

import { Separator } from "../ui/separator";

export default function offerPage() {
    return (
        <Page>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Nasza oferta</PageTitle>
                    <PageLead>Znajdz odpowiednia dla siebie oferte</PageLead>
                </PageHeaderContent>
            </PageHeader>
            <Separator decorative />
            <Section className="py-size-xl">
                <SectionContent className="gap-size-xl">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle>Odkryj nasze pakiety</SectionTitle>
                            <SectionLead>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Porro, minus amet? Unde!
                            </SectionLead>
                        </SectionHeaderContent>
                    </SectionHeader>
                    <Packages />
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="py-size-xl">
                <SectionContent className="gap-size-lg">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle>Cennik usług</SectionTitle>
                            <SectionLead>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Porro, minus amet? Unde!
                            </SectionLead>
                        </SectionHeaderContent>
                    </SectionHeader>
                    {/* Cennik usług */}
                </SectionContent>
            </Section>
        </Page>
    );
}
