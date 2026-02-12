import { Check, ChevronUp } from "lucide-react";
import { UseAllPackages } from "../content/Packages";
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";

export default function offerPage() {
    const packages = UseAllPackages();
    const marketingPackages = packages.filter((pkg) => pkg.category === "marketing");
    const specialPackages = packages.filter((pkg) => pkg.category === "special");

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

                    <div className="flex w-full flex-col gap-4">
                        <Text intent="h3" as="h4" text={"Pakiety marketingowe"} />

                        <Accordion className="flex w-full flex-col gap-4">
                            {marketingPackages.map((pkg, i) => (
                                <AccordionItem
                                    value={pkg.name}
                                    key={i}
                                    className="border-border flex w-full flex-col rounded-lg border p-4"
                                >
                                    <AccordionTrigger className="flex w-full items-center gap-2 text-start">
                                        <div className="flex w-full items-center justify-between gap-4">
                                            <div className="flex w-full items-center gap-4">
                                                <IconContainer
                                                    Icon={getLucideIcon(pkg.icon)}
                                                />
                                                <div className="flex w-full flex-col items-start">
                                                    <div className="flex w-full flex-col items-end justify-between sm:flex-row">
                                                        <Text
                                                            intent="h4"
                                                            as="h5"
                                                            text={pkg.name}
                                                        />
                                                        <Text
                                                            intent={"var"}
                                                            text={pkg.price}
                                                            className="block text-xl md:hidden"
                                                        />
                                                    </div>
                                                    <Text
                                                        text={pkg.description}
                                                        className="hidden sm:block"
                                                    />
                                                </div>
                                            </div>
                                            <Text
                                                intent={"var"}
                                                text={pkg.price}
                                                className="hidden text-2xl text-nowrap md:block"
                                            />
                                        </div>
                                        <ChevronUp className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-zinc-50" />
                                    </AccordionTrigger>
                                    <AccordionContent className="flex w-full flex-col">
                                        <Text
                                            text={pkg.description}
                                            className="block px-2 pt-4 sm:hidden"
                                        />
                                        <ul className="grid w-full gap-4 py-4 sm:grid-cols-2">
                                            {pkg.features.main.map((feature, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Check />
                                                    <div>
                                                        <Text
                                                            text={feature.name}
                                                            className="text-base sm:text-lg"
                                                        />
                                                        <Text
                                                            text={feature.details}
                                                            intent="small"
                                                            muted
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <Separator decorative className="" />
                                        <ul className="grid h-fit w-full gap-4 py-4 sm:grid-cols-2 md:grid-cols-3">
                                            {pkg.features.additional.map((feature, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Check />
                                                    <div>
                                                        <Text text={feature.name} />
                                                        <Text
                                                            text={feature.details}
                                                            intent="small"
                                                            muted
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div>
                        <Text intent="h3" as="h4" text={"Pakiety specjalne"} />
                        <div className="flex flex-col">
                            {specialPackages.map((pkg, i) => (
                                <div key={i} className="mb-size-lg"></div>
                            ))}
                        </div>
                    </div>
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
