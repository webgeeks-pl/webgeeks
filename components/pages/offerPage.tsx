import { useAllPackages } from "@/hooks/useAllPackages";
import { useTranslations } from "next-intl";
import Page, { PageHeader, PageHeaderContent, PageLead, PageTitle } from "../layout/page";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import { PackageCard } from "../sections/HomePackages";
import Text from "../typography/text";
import { Button } from "../ui/button";
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
                    <PageTitle>{pageT("pageHeader.title")}</PageTitle>
                    <PageLead>{pageT("pageHeader.description")}</PageLead>
                </PageHeaderContent>
            </PageHeader>
            <Section className="py-size-xl">
                <SectionContent className="gap-size-xl">
                    <div className="flex w-full flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <Text
                                intent="h3"
                                as="h2"
                                text={pageT("packages.marketingPackagesTitle")}
                            />
                            <Text
                                className="max-w-prose"
                                muted
                                text={pageT("packages.marketingPackagesDescription")}
                            />
                        </div>

                        <div className="grid w-full gap-6 md:grid-cols-2">
                            {marketingPackages.map((pkg, index) => {
                                return <PackageCard key={pkg.key} pkg={pkg} />;
                            })}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text intent="h3" as="h2" text={"Dodatki do strony"} />
                            <Text
                                className="max-w-prose"
                                muted
                                text={
                                    "Wybierz dodatkowe usługi, które uzupełnią Twoją stronę i zapewnią jej jeszcze lepszą funkcjonalność."
                                }
                            />
                        </div>

                        <Table>
                            <TableCaption>{pageT("services.tableCaption")}</TableCaption>

                            <TableBody className="grid gap-x-4 lg:grid-cols-2">
                                {services.map((service, i) => (
                                    <TableRow
                                        key={i}
                                        className="flex w-full justify-between"
                                    >
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
                    </div>

                    <div className="flex w-full flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <Text
                                intent="h3"
                                as="h2"
                                text={pageT("packages.specialPackagesTitle")}
                            />
                            <Text
                                className="max-w-prose"
                                muted
                                text={pageT("packages.specialPackagesDescription")}
                            />
                        </div>

                        <div className="grid w-full gap-6 md:grid-cols-2">
                            {specialPackages.map((pkg, index) => {
                                return <PackageCard key={pkg.key} pkg={pkg} />;
                            })}
                        </div>
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
