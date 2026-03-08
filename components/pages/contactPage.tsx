// UNDER NO CIRCUMSTANCE SHOULD THIS FILE BE A CLIENT COMPONENT.
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, { SectionContent } from "../layout/section";

import ContactForm2 from "@/components/forms/contactForm2";
import LucideIcon from "@/components/ui/lucideIcons";
import CreateInputs from "@/lib/utils/form";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export default function ContactPage() {
    const t = useTranslations("pages.contact");
    const contactMethodsData = t.raw("contactMethods");

    // Map icons to contact methods
    const iconMap: { [key: string]: string } = {
        Email: "Mail",
        "Formularz kontaktowy": "FileText",
    };

    const contactMethods = contactMethodsData.map((method: any) => ({
        ...method,
        icon: iconMap[method.name] || "Mail",
    }));

    const inputs = CreateInputs();

    return (
        <Page>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>{t("pageTitle")}</PageTitle>
                    <PageLead> {t("pageLead")}</PageLead>
                </PageHeaderContent>
            </PageHeader>
            <Section className="pb-size-xl">
                <SectionContent className="gap-size-lg">
                    <div className="gap-size-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
                        {contactMethods.map(
                            ({ name, description, icon, contact, info }: any) => (
                                <Card key={name}>
                                    <CardContent className="flex flex-col gap-2">
                                        <Text intent="h3">{name}</Text>
                                        <Text muted>{description}</Text>
                                        <div className="xs:flex-row flex flex-col items-center gap-2">
                                            <LucideIcon name={icon} />
                                            <Text>{contact}</Text>
                                        </div>
                                        <Text muted intent="small">
                                            {info}
                                        </Text>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>

                    <Text intent="small" className="text-center" muted>
                        {t("responseGuarantee")}
                    </Text>
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="py-size-xl bg-clr-50" id="contact-form">
                <SectionContent className="gap-size-lg">
                    {/* <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle>{t("formSection.title")}</SectionTitle>
                            <SectionLead>{t("formSection.subtitle")}</SectionLead>
                        </SectionHeaderContent>
                    </SectionHeader> */}
                    <Suspense fallback={<div aria-hidden />}>
                        <div className="flex w-full max-w-5xl flex-col md:flex-row">
                            <div className="bg-clr-950 flex flex-col justify-between p-8 max-md:rounded-t-2xl md:col-span-2 md:rounded-l-2xl md:p-10">
                                <div className="">
                                    <div>
                                        <span className="bg-clr-800 text-clr-50 mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1">
                                            <Send className="h-3.5 w-3.5" />
                                            <Text intent="small" className="text-clr-50!">
                                                {t("formSection.sidebarBadge")}
                                            </Text>
                                        </span>
                                        <Text
                                            intent="h1"
                                            as="h2"
                                            className="text-clr-50! pb-4"
                                        >
                                            {t("formSection.sidebarTitle")}
                                            <br />
                                            {t("formSection.sidebarTitleContinued")}
                                        </Text>
                                        <Text intent="large" className="text-clr-400!">
                                            {t("formSection.sidebarDescription")}
                                        </Text>
                                    </div>
                                </div>
                                <div className="">
                                    {/* <Text intent="small" className="text-clr-400! mt-6">
                                        {t("formSection.responseNote")}
                                    </Text> */}
                                </div>
                            </div>
                            <div className="rounded-b-2xl bg-white p-8 md:w-[120%] md:rounded-r-2xl md:p-10">
                                {/* <Suspense fallback={<div aria-hidden /> }> */}

                                <ContactForm2 inputs={inputs} id={"contact-form"} />
                                {/* </Suspense> */}
                            </div>
                        </div>
                    </Suspense>
                </SectionContent>
            </Section>
        </Page>
    );
}
