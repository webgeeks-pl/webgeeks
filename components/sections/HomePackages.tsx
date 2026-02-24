import { useAllPackages } from "@/hooks/useAllPackages";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function HomePackages() {
    const t = useTranslations("pages.home.packages");
    const allPackages = useAllPackages();

    const marketingPackages = allPackages.filter(
        (pkg) => pkg.key === "oneMarketing" || pkg.key === "subscription"
    );

    const otherPackages = allPackages.filter(
        (pkg) => pkg.key !== "oneMarketing" && pkg.key !== "subscription"
    );

    return (
        <Section className="py-size-xl sm:py-size-2xl bg-white">
            <SectionContent className="gap-size-md">
                <div className="text-center lg:mb-8">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={t("sectionHeader.title")} />
                            <SectionLead text={t("sectionHeader.description")} />
                        </SectionHeaderContent>
                    </SectionHeader>
                </div>

                <Text
                    intent="h3"
                    text={"Strony marketingowe"}
                    className="font-heading uppercase"
                />

                <div className="grid w-full gap-6 md:grid-cols-2">
                    {marketingPackages.map((pkg, index) => {
                        return <PackageCard key={pkg.key} pkg={pkg} />;
                    })}
                </div>

                <Text
                    intent="h3"
                    text={"Inne strony"}
                    className="font-heading uppercase"
                />

                <div className="grid w-full gap-6 md:grid-cols-2">
                    {otherPackages.map((pkg, index) => {
                        return <PackageCard key={pkg.key} pkg={pkg} />;
                    })}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Text intent="h3" as="h4" text={"Potrzebujesz czegoś innego?"} />

                    <Text
                        intent="small"
                        muted
                        text={"Możesz dopasować pakiet do swoich potrzeb"}
                    />
                    <Button variant={"secondary"} asChild={!!t.raw("cta.href")}>
                        {t.raw("cta.href") ? (
                            <Link href={t("cta.href")}>{t("cta.text")}</Link>
                        ) : (
                            t("cta.text")
                        )}
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}

export function PackageCard({ pkg }: { pkg: ReturnType<typeof useAllPackages>[number] }) {
    const isPopular = pkg.isPopular === "true";
    const t = useTranslations("pages.home.packages");
    const isOther = pkg.key !== "oneMarketing" && pkg.key !== "subscription";

    return (
        <Card
            className={cn(
                "relative flex h-full flex-col overflow-visible transition-all duration-300",
                "gap-0 xl:grid xl:grid-cols-2",
                isPopular &&
                    "bg-brand-darker border-brand-darker **:text-clr-50 border-2",
                isOther && "bg-clr-50"
            )}
        >
            {/* <div className="lg:grid lg:grid-cols-2"> */}
            <CardHeader className={cn("flex-1 overflow-auto pb-4", "text-start")}>
                {/* <IconContainer
                                        Icon={getLucideIcon(pkg.icon)}
                                        color={isPopular ? "opposite" : "default"}
                                        variant={isPopular ? "oppoosite" : "outline"}
                                    /> */}
                <div className="flex items-baseline gap-2">
                    <Text
                        intent="h3"
                        className={cn(
                            "font-heading mb-2 uppercase",
                            isPopular && "text-white"
                        )}
                        text={pkg.name}
                    />
                    <Text intent="small" muted={!isPopular} text={pkg.subtitle} />
                </div>
                <Text muted={!isPopular} text={pkg.description} />
            </CardHeader>

            <CardContent className={cn("flex flex-1 flex-col", "xl:pl-0")}>
                <ul className="mb-6 flex-1 space-y-3">
                    {pkg.features.main.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-3">
                            <Text>{feature.name}</Text>
                            {feature.check === "true" ? (
                                <Check
                                    className={cn(
                                        "mt-0.5 size-5 shrink-0 text-green-500",
                                        isPopular && "text-black"
                                    )}
                                />
                            ) : (
                                <X className="mt-0.5 size-5 shrink-0 text-red-500" />
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter
                className={
                    "col-span-2 flex w-full flex-col items-center justify-end gap-2"
                }
            >
                <div className="flex items-baseline gap-2">
                    <Text intent="var" className="text-3xl" text={pkg.price} />
                    <Text intent="small" muted={!isPopular} text={pkg.priceDetails} />
                </div>

                <Button
                    size="lg"
                    variant={isPopular ? "default" : "secondary"}
                    className="w-fit px-12!"
                    asChild
                >
                    <Link href={"/contact" + `?offer=${pkg.key}#scroll-contact-form`}>
                        {t("selectButton.text")}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
