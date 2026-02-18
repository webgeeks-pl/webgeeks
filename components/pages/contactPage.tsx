import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

import ContactForm from "@/components/forms/contactForm";
import { FileText, Mail, Send } from "lucide-react";
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
        name: "Formularz kontaktowy",
        description: "Wypełnij formularz, a my skontaktujemy się z Tobą.",
        Icon: FileText,
        contact: "Zjedz nizej",
        info: "Tutaj najszybciej odpowiadamy",
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
            <Section className="py-size-xl bg-clr-50" id="contact-form">
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
                    <div className="flex w-full max-w-5xl flex-col md:flex-row">
                        <div className="bg-clr-950 flex flex-col justify-between p-8 max-md:rounded-t-2xl md:col-span-2 md:rounded-l-2xl md:p-10">
                            <div className="">
                                <div>
                                    <span className="bg-clr-800 text-clr-50 mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1">
                                        <Send className="h-3.5 w-3.5" />
                                        <Text intent="small" className="text-clr-50!">
                                            Skontaktuj się
                                        </Text>
                                    </span>
                                    <Text intent="h1" className="text-clr-50! pb-4">
                                        Masz pomysł?
                                        <br />
                                        Porozmawiajmy.
                                    </Text>
                                    <Text intent="large" className="text-clr-400!">
                                        Opisz swój projekt, a razem dobierzemy rozwiązanie
                                        dla Twojego biznesu.
                                    </Text>
                                </div>
                            </div>
                            <div className="">
                                <Separator className="bg-clr-600" />
                                <div className="grid grid-cols-2 gap-4 pt-6">
                                    <div>
                                        <Text className="text-clr-50!" intent="h2">
                                            200+
                                        </Text>
                                        <Text intent="small" className="text-clr-400!">
                                            Zrealizowanych projektów
                                        </Text>
                                    </div>
                                    <div>
                                        <Text className="text-clr-50!" intent="h2">
                                            98%
                                        </Text>
                                        <Text intent="small" className="text-clr-400!">
                                            Zadowolonych klientów
                                        </Text>
                                    </div>
                                </div>
                                <Separator className="bg-clr-600 mt-6" />

                                <Text intent="small" className="text-clr-400! mt-6">
                                    Odpowiadamy zazwyczaj w ciągu 24h.
                                    <br />
                                    Żadnego spamu, obiecujemy.
                                </Text>
                            </div>
                        </div>
                        <div className="rounded-b-2xl bg-white p-8 md:w-[120%] md:rounded-r-2xl md:p-10">
                            <ContactForm />
                        </div>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
