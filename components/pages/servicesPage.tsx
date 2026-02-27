import { ServicesCustomCode } from "../sections/ServicesCustomCode";
import { ServicesWhyMatters } from "../sections/ServicesWhyMatters";
import { ServicesSEO } from "../sections/ServicesSEO";
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";

export default function ServicesPage() {
    return (
        <Page>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Usługi</PageTitle>
                    <PageLead>
                        Wszystkie nasze usługi zaprojektowane z myślą o Twoim sukcesie w
                        sieci.
                    </PageLead>
                </PageHeaderContent>
            </PageHeader>
            <ServicesCustomCode />
            <ServicesWhyMatters />
            <ServicesSEO />
        </Page>
    );
}
