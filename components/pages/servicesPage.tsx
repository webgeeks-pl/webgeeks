import { Link } from "@/i18n/navigation";
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import { ServicesHero } from "../sections/ServicesHero";
import { ServicesHosting } from "../sections/ServicesHosting";
import { ServicesPersonal } from "../sections/ServicesPersonal";
import { ServicesSEO } from "../sections/ServicesSEO";
import { ServicesSecurity } from "../sections/ServicesSecurity";
import { ServicesSpeed } from "../sections/ServicesSpeed";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function ServicesPage() {
    return (
        <Page>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Strona internetowa</PageTitle>
                    <PageLead>
                        Profesjonalne, szybkie i bezpieczne strony internetowe
                    </PageLead>
                </PageHeaderContent>
            </PageHeader>
            <ServicesHero />
            <ServicesPersonal />
            <Separator decorative />
            <ServicesSpeed />
            <Separator decorative />
            <ServicesSecurity />
            <Separator decorative />
            <ServicesSEO />
            <Separator decorative />
            <ServicesHosting />
            <Section className="py-size-2xl bg-brand">
                <SectionContent className="gap-size-md">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={"Postaw na profesjonalną stronę"} />
                            <SectionLead
                                text={"Zaufaj mi i zyskaj stronę, która naprawdę działa"}
                                muted={false}
                                className="text-black"
                            />
                        </SectionHeaderContent>
                    </SectionHeader>

                    <div className="flex gap-4">
                        <Button asChild variant="secondary" className="flex-1">
                            <Link href="/offer">Zobacz cennik</Link>
                        </Button>
                        <Button asChild variant="default" className="flex-1">
                            <Link href="/contact">Zacznijmy współpracę</Link>
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
