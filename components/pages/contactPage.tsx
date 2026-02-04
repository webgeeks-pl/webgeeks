import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

import { FileText, Mail, Phone, Share2 } from "lucide-react";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { Separator } from "../ui/separator";

const contactMethods = [
    {
        name: "Email",
        description: "Napisz do nas maila, a odpowiemy najszybciej jak to możliwe.",
        Icon: Mail,
        contact: "webgeeks@proton.me",
        info: "",
    },
    {
        name: "Telefon",
        description: "Zadzwoń do nas, aby porozmawiać bezpośrednio z naszym zespołem.",
        Icon: Phone,
        contact: "+48 123 456 789",
        info: "Dostępni od poniedziałku do piątku, 8:00 - 15:00",
    },
    {
        name: "Formularz kontaktowy",
        description: "Wypełnij formularz, a my skontaktujemy się z Tobą.",
        Icon: FileText,
        contact: "Zjedz nizej",
        info: "Tutaj najszybciej odpowiadamy",
    },
    {
        name: "Media społecznościowe",
        description: "Znajdź nas na Facebooku, Twitterze i LinkedInie.",
        Icon: Share2,
        contact: "",
    },
];

export default function ContactPage() {
    return (
        <Page>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Kontakt</PageTitle>
                    <PageLead>
                        {" "}
                        Skontaktuj się z nami i stwórzmy coś wyjątkowego razem.
                    </PageLead>
                </PageHeaderContent>
            </PageHeader>
            <Section className="pb-size-xl">
                <SectionContent className="gap-size-lg">
                    <div className="gap-size-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
                        {contactMethods.map(
                            ({ name, description, Icon, contact, info }) => (
                                <Card key={name}>
                                    <CardContent className="flex flex-col gap-2">
                                        <Text intent="h3">{name}</Text>
                                        <Text muted>{description}</Text>
                                        <div className="flex items-center gap-2">
                                            <IconContainer Icon={Icon} />
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
                        Gwarantujemy odpowiedź w ciągu 24 godzin w dni robocze.
                    </Text>
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="py-size-xl bg-clr-50">
                <SectionContent className="gap-size-lg">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle>Pozwól nam poznać twój biznes</SectionTitle>
                            <SectionLead>
                                Uzupełnij formularz, a my dostosujemy ofertę do Twoich
                                potrzeb tak aby strona spełniała Twoje oczekiwania.
                            </SectionLead>
                        </SectionHeaderContent>
                    </SectionHeader>
                    <div className="w-full max-w-2xl bg-white">
                        <div className="flex h-50 w-full items-center justify-center">
                            formularz zamiast tego diva
                        </div>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
