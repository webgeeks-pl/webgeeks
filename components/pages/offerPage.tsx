import {
    AdditionalFeature,
    useAllPackages,
    type Feature,
    type Package,
} from "@/hooks/useAllPackages";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowDown, Check, ChevronUp, Plus, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Page, { PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";
import OfferAccordion from "../ui/offer-accordion";
import ScrollButton from "../ui/scroll-button";
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
    console.log(marketingPackages);
    const specialPackages = packages.filter((pkg) => pkg.category === "special");
    const pageT = useTranslations("pages.offer");
    const offerT = useTranslations("offer");
    const services = offerT.raw("services") as unknown as Service[];

    return (
        <Page>
            <Separator decorative />
            <Section className="py-size-xl">
                <SectionContent className="gap-size-xl">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <PageTitle text={pageT("packages.sectionHeader.title")} />
                            <SectionLead
                                as="h1"
                                text={pageT("packages.sectionHeader.description")}
                            />
                        </SectionHeaderContent>
                    </SectionHeader>

                    <div className="flex w-full flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <Text
                                intent="h3"
                                as="h2"
                                text={pageT("packages.marketingPackagesTitle")}
                            />
                            <Text
                                muted
                                text={pageT("packages.marketingPackagesDescription")}
                            />
                        </div>

                        <OfferAccordion className="flex w-full flex-col gap-4">
                            {marketingPackages.map((pkg, i) => {
                                return (
                                    <div key={i} className="relative size-full">
                                        <PackageCard pkg={pkg} />
                                        {pkg.isPopular && (
                                            <div className="bg-brand absolute -top-1 right-1/2 z-10 translate-x-1/2 rounded-full px-4 py-1 md:right-8 md:translate-x-0">
                                                <Text intent="small" color="opposite">
                                                    {pageT("packages.popularBadge")}
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </OfferAccordion>
                    </div>

                    <div className="flex w-full flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <Text
                                intent="h3"
                                as="h2"
                                text={pageT("packages.specialPackagesTitle")}
                            />
                            <Text
                                muted
                                text={pageT("packages.specialPackagesDescription")}
                            />
                        </div>
                        <OfferAccordion className="flex w-full flex-col gap-4">
                            {specialPackages.map((pkg, i) => (
                                <PackageCard key={pkg.key} pkg={pkg} />
                            ))}
                        </OfferAccordion>
                        {/* <Accordion
                            expandedValue={"business"}
                            className="flex w-full flex-col gap-4"
                        >
                            {specialPackages.map((pkg, i) => (
                                <PackageCard key={pkg.key} pkg={pkg} />
                            ))}
                        </Accordion> */}
                    </div>
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="py-size-xl" id="services">
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
                            {services.map((service, i) => (
                                <TableRow key={i} className="flex w-full justify-between">
                                    <TableCell className="mr-auto w-full font-medium text-wrap!">
                                        <div className="flex w-full flex-col justify-between sm:flex-row">
                                            <Text text={service.name} />
                                            <Text text={service.price} intent="var" />
                                        </div>
                                        <Text
                                            text={service.description}
                                            intent="small"
                                            muted
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionContent>
            </Section>

            <Section className="py-size-2xl bg-brand">
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

function PackageCard({ pkg }: { pkg: Package }) {
    const pageT = useTranslations("pages.offer");
    return (
        <AccordionItem
            value={pkg.key}
            id={pkg.key}
            className={cn(
                "border-border/70 relative flex w-full flex-col overflow-hidden rounded-lg border-2",
                pkg.isPopular && "border-brand my-2"
            )}
        >
            <AccordionTrigger className="flex w-full items-center gap-2 p-4 text-start">
                <div className="max-xs:gap-2 flex w-full items-center justify-between gap-4">
                    <div className="max-xs:gap-2 flex w-full items-center gap-4">
                        <IconContainer
                            className="max-xs:size-10"
                            Icon={getLucideIcon(pkg.icon)}
                            variant={pkg.isPopular ? "brandSolid" : "default"}
                            color={pkg.isPopular ? "opposite" : "default"}
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
                <ChevronUp className="h-4 w-4 shrink-0 text-zinc-950 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-zinc-50" />
            </AccordionTrigger>
            <AccordionContent className="flex w-full flex-col p-0">
                <div className="max-xs:px-2 px-4 py-4">
                    <Text text={pkg.description} className="block px-2 pt-4 sm:hidden" />
                    <ul className="grid w-full gap-4 py-4 sm:grid-cols-2">
                        {pkg.features.main.map((feature: Feature, j: number) => (
                            <li key={j} className="flex items-center gap-2">
                                <Check className="shrink-0" />
                                <div>
                                    <Text
                                        text={feature.name}
                                        className="text-base leading-tight sm:text-lg"
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

                {pkg.features.additional.length > 0 && (
                    <div className="bg-clr-50 max-xs:px-2 max-xs:py-4 flex w-full flex-col items-center p-4">
                        <Text
                            text={pageT("packages.additionalFeaturesTitle")}
                            intent="h3"
                            as="h6"
                            className="mb-4 w-full text-center"
                        />

                        <ul className="grid h-fit w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {pkg.features.additional.map(
                                (feature: AdditionalFeature, j: number) => (
                                    <li
                                        key={j}
                                        className={cn("flex items-center gap-2 p-1")}
                                    >
                                        <Plus className="shrink-0" />
                                        <div>
                                            <span className="flex flex-col items-center gap-1 max-sm:items-start sm:flex-row">
                                                <Text
                                                    text={feature.name}
                                                    className="leading-tight"
                                                />
                                                {feature.recommended && (
                                                    // <CircleStar className="text-brand" />
                                                    <div className="flex gap-1 max-sm:-order-1">
                                                        <Sparkles className="text-brand size-4" />
                                                        <Text
                                                            text={"polecane"}
                                                            intent="small"
                                                            className="text-brand! font-semibold"
                                                        />
                                                    </div>
                                                )}
                                            </span>

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
                    </div>
                )}
                <div
                    className={cn(
                        "max-xs:px-2 flex w-full flex-col items-center justify-center gap-2 px-4 pt-4 pb-4 sm:flex-row sm:gap-4 md:justify-end",
                        pkg.features.additional.length > 0 && "bg-clr-50"
                    )}
                >
                    <Button
                        variant="ghost"
                        asChild
                        className="max-sm:order-1 max-sm:w-full"
                    >
                        <ScrollButton target="#services">
                            {"wszystkie dodatki"} <ArrowDown className="size-4" />
                        </ScrollButton>
                    </Button>
                    <Button
                        variant={pkg.isPopular ? "cta" : "default"}
                        className="w-full max-sm:-order-1 sm:w-32"
                        asChild
                    >
                        <Link href={"/contact" + `?offer=${pkg.key}#scroll-contact-form`}>
                            {"zamów"}
                        </Link>
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
