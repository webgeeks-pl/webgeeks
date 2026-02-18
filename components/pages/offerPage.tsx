import {
    AdditionalFeature,
    useAllPackages,
    type Feature,
    type Package,
} from "@/hooks/useAllPackages";
import { cn } from "@/lib/utils";
import { ArrowDown, Check, ChevronUp, Plus, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "../ui/table";

interface Service {
    name: string;
    description: string;
    price: string;
}

export default function OfferPage() {
    const packages = useAllPackages();
    const marketingPackages = packages.filter((pkg) => pkg.category === "marketing");
    const specialPackages = packages.filter((pkg) => pkg.category === "special");
    const pageT = useTranslations("pages.offer");
    const offerT = useTranslations("offer");
    const services = offerT.raw("services") as unknown as Service[];

    return (
        <Page>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle text={pageT("pageHeader.title")} />
                    <PageLead text={pageT("pageHeader.description")} />
                </PageHeaderContent>
            </PageHeader>
            <Separator decorative />
            <Section className="py-size-xl">
                <SectionContent className="gap-size-xl">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={pageT("packages.sectionHeader.title")} />
                            <SectionLead
                                text={pageT("packages.sectionHeader.description")}
                            />
                        </SectionHeaderContent>
                    </SectionHeader>

                    <div className="flex w-full flex-col gap-4">
                        <Text
                            intent="h3"
                            as="h4"
                            text={pageT("packages.marketingPackagesTitle")}
                        />

                        <Accordion className="flex w-full flex-col gap-4">
                            {marketingPackages.map((pkg, i) => {
                                const isPopular = i === 1;

                                return (
                                    <div key={i} className="relative size-full">
                                        <PackageCard pkg={pkg} isPopular={isPopular} />
                                        {isPopular && (
                                            <div className="bg-brand absolute -top-1 right-1/2 z-10 translate-x-1/2 rounded-full px-4 py-1 md:right-8 md:translate-x-0">
                                                <Text intent="small" color="opposite">
                                                    {pageT("packages.popularBadge")}
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </Accordion>
                    </div>

                    <div className="flex w-full flex-col gap-4">
                        <Text
                            intent="h3"
                            as="h4"
                            text={pageT("packages.specialPackagesTitle")}
                        />
                        <Accordion className="flex w-full flex-col gap-4">
                            {specialPackages.map((pkg, i) => (
                                <PackageCard pkg={pkg} key={i} isPopular={false} />
                            ))}
                        </Accordion>
                    </div>
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="py-size-xl">
                <SectionContent className="gap-size-lg">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={pageT("services.sectionHeader.title")} />
                            <SectionLead
                                text={pageT("services.sectionHeader.description")}
                            />
                        </SectionHeaderContent>
                    </SectionHeader>
                    {/* Cennik usług */}

                    <Table>
                        <TableCaption>{pageT("services.tableCaption")}</TableCaption>

                        <TableBody className="grid gap-x-4 lg:grid-cols-2">
                            {services.map((service) => (
                                <TableRow key={service.name} className="w-full">
                                    <TableCell className="w-full font-medium">
                                        <Text text={service.name} />
                                        <Text
                                            text={service.description}
                                            intent="small"
                                            muted
                                        />
                                    </TableCell>
                                    <TableCell className="w-full text-right">
                                        {service.price}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionContent>
            </Section>

            <Section className="py-size-2xl bg-brand-darker/50">
                <SectionContent className="gap-size-md">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={pageT("cta.title")} />
                            <SectionLead
                                text={pageT("cta.description")}
                                muted={false}
                                className="text-black"
                            />
                        </SectionHeaderContent>
                    </SectionHeader>

                    <div className="flex gap-4">
                        <Button variant="secondary" className="flex-1">
                            {pageT("cta.buttons.secondary")}
                        </Button>
                        <Button variant="default" className="flex-1">
                            {pageT("cta.buttons.primary")}
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}

function PackageCard({ pkg, isPopular }: { pkg: Package; isPopular: boolean }) {
    const pageT = useTranslations("pages.offer");

    return (
        <AccordionItem
            value={pkg.name}
            className={cn(
                "border-border/70 relative flex w-full flex-col overflow-hidden rounded-lg border-2",
                isPopular && "border-brand my-2"
            )}
        >
            <AccordionTrigger className="flex w-full items-center gap-2 p-4 text-start">
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex w-full items-center gap-4">
                        <IconContainer
                            Icon={getLucideIcon(pkg.icon)}
                            variant={isPopular ? "brandSolid" : "default"}
                            color={isPopular ? "opposite" : "default"}
                        />
                        <div className="flex w-full flex-col items-start">
                            <div className="flex w-full flex-col items-start justify-between sm:flex-row">
                                <Text intent="h4" as="h5" text={pkg.name} />
                                <Text
                                    intent={"var"}
                                    text={pkg.price}
                                    className="block text-xl sm:hidden"
                                />
                            </div>
                            <Text text={pkg.description} className="hidden sm:block" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Text
                            intent={"var"}
                            text={pkg.price}
                            className="hidden text-2xl text-nowrap sm:block"
                        />
                    </div>
                </div>
                <ChevronUp className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-zinc-50" />
            </AccordionTrigger>
            <AccordionContent className="flex w-full flex-col p-0">
                <div className="p-4">
                    <Text text={pkg.description} className="block px-2 pt-4 sm:hidden" />
                    <ul className="grid w-full gap-4 py-4 sm:grid-cols-2">
                        {pkg.features.main.map((feature: Feature, j: number) => (
                            <li key={j} className="flex items-center gap-2">
                                <Check />
                                <div>
                                    <Text
                                        text={feature.name}
                                        className="text-base sm:text-lg"
                                    />
                                    <Text
                                        text={feature.description}
                                        intent="small"
                                        muted
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator decorative className="" />
                <div className="bg-clr-50 flex w-full flex-col items-center p-4">
                    <Text
                        text={pageT("packages.additionalFeaturesTitle")}
                        intent="h3"
                        as="h6"
                        className="mb-4 w-full text-center"
                    />

                    <ul className="grid h-fit w-full gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {pkg.features.additional.map(
                            (feature: AdditionalFeature, j: number) => (
                                <li key={j} className={cn("flex items-center gap-2 p-1")}>
                                    <Plus className="shrink-0" />
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Text text={feature.name} />
                                            {feature.recommended && (
                                                // <CircleStar className="text-brand" />
                                                <>
                                                    <Sparkles className="text-brand size-4" />
                                                    <Text
                                                        text={"polecane"}
                                                        intent="small"
                                                        className="text-brand! font-semibold"
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <Text
                                            text={feature.description}
                                            intent="small"
                                            muted
                                        />
                                        <Text
                                            intent="var"
                                            text={feature.price}
                                            className="ml-auto"
                                        />
                                    </div>
                                </li>
                            )
                        )}
                    </ul>

                    <Button variant="ghost" className="mx-auto mt-4">
                        {"wszystkie dodatkowe funkcje"} <ArrowDown className="size-4" />
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
