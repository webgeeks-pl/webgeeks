import { Feature, useAllPackages } from "@/hooks/useAllPackages";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCarousel } from "../animate-ui/components/community/motion-carousel";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

export function HomePackages() {
    const t = useTranslations("pages.home.packages");
    const allPackages = useAllPackages();

    return (
        <Section className="py-size-xl sm:py-size-2xl bg-white">
            <SectionContent className="gap-size-lg">
                <div className="text-center lg:mb-8">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={t("sectionHeader.title")} />
                            <SectionLead text={t("sectionHeader.description")} />
                        </SectionHeaderContent>
                    </SectionHeader>
                </div>

                <div className="hidden w-full gap-6 lg:grid lg:grid-cols-2">
                    {allPackages.map((pkg, index) => {
                        const isPopular = pkg.isPopular === "true";
                        return (
                            <Card
                                key={index}
                                className={cn(
                                    "relative flex h-full flex-col overflow-visible transition-all duration-300",
                                    "gap-0 lg:grid lg:grid-cols-2",
                                    isPopular && "border-2 border-black"
                                )}
                            >
                                {isPopular && (
                                    <div className="bg-brand absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1">
                                        <Text intent="small" color="opposite">
                                            {t("popularBadge")}
                                        </Text>
                                    </div>
                                )}
                                <CardHeader
                                    className={cn(
                                        "overflow-auto pb-4",
                                        "text-center lg:text-start"
                                    )}
                                >
                                    <IconContainer
                                        Icon={getLucideIcon(pkg.icon)}
                                        color={isPopular ? "opposite" : "default"}
                                        variant={isPopular ? "opposite" : "outline"}
                                    />

                                    <Text intent="h3" className="mb-2" text={pkg.name} />
                                    <div>
                                        <Text
                                            intent="var"
                                            className="text-3xl"
                                            text={pkg.price}
                                        />
                                        <Text
                                            intent="small"
                                            muted
                                            text={pkg.priceDetails}
                                        />
                                    </div>
                                    <Text muted text={pkg.description} />
                                </CardHeader>

                                <CardContent
                                    className={cn("flex flex-1 flex-col", "lg:pl-0")}
                                >
                                    <ul className="mb-6 flex-1 space-y-3">
                                        {(pkg.features.main.slice(0, 6) as Feature[]).map(
                                            (feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mt-0.5 size-5 shrink-0 text-green-500",
                                                            isPopular && "text-black"
                                                        )}
                                                    />
                                                    <Text>{feature.name}</Text>
                                                </li>
                                            )
                                        )}{" "}
                                        {pkg.features.main.length > 6 && (
                                            <li className="flex items-start gap-3">
                                                <Text className="font-semibold">
                                                    {t("andMore", {
                                                        count:
                                                            pkg.features.main.length - 6,
                                                    })}
                                                </Text>
                                            </li>
                                        )}
                                    </ul>

                                    <div className="flex w-full gap-2">
                                        <Button
                                            size="lg"
                                            variant="ghost"
                                            className="flex-1 underline underline-offset-2"
                                            asChild={!!t.raw("detailsButton.href")}
                                        >
                                            {t.raw("detailsButton.href") ? (
                                                <Link
                                                    href={`/offer?offer=${pkg.key}#scroll-${pkg.key}`}
                                                >
                                                    {/* {t("detailsButton.text")}  */}
                                                    szczegóły
                                                </Link>
                                            ) : (
                                                t("detailsButton.text")
                                            )}
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant={isPopular ? "cta" : "secondary"}
                                            className="flex-1"
                                            asChild
                                        >
                                            <Link
                                                href={
                                                    "/contact" +
                                                    `?offer=${pkg.key}#scroll-contact-form`
                                                }
                                            >
                                                {t("selectButton.text")}
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <MotionCarousel
                    labels={allPackages.map((pkg) => pkg.name)}
                    options={{ loop: true }}
                    className="xs:[--slide-size:80%] w-full [--slide-height:h-fit] [--slide-size:97%] lg:hidden"
                    slides={allPackages.map((pkg, index) => {
                        return (
                            <Card
                                key={index}
                                className={cn(
                                    "will-change relative flex h-fit w-full flex-col overflow-visible",
                                    "md:col-span-3! md:grid! md:grid-cols-2!",
                                    pkg.isPopular === "true" && "border-brand border-2"
                                )}
                            >
                                {pkg.isPopular === "true" && (
                                    <div className="bg-brand absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1">
                                        <Text intent="small" color="opposite">
                                            {t("popularBadge")}
                                        </Text>
                                    </div>
                                )}
                                <CardHeader
                                    className={cn("gap-2 overflow-auto", "text-start")}
                                >
                                    <IconContainer
                                        Icon={getLucideIcon(pkg.icon)}
                                        color={
                                            pkg.isPopular === "true"
                                                ? "opposite"
                                                : "default"
                                        }
                                        variant={
                                            pkg.isPopular === "true"
                                                ? "brandSolid"
                                                : "outline"
                                        }
                                    />

                                    <Text intent="h3" className="" text={pkg.name} />
                                    <div>
                                        <Text
                                            intent="var"
                                            className="text-3xl"
                                            text={pkg.price}
                                        />
                                        <Text
                                            intent="small"
                                            muted
                                            text={pkg.priceDetails}
                                        />
                                    </div>
                                    <Text
                                        muted
                                        text={pkg.description}
                                        className="leading-tight"
                                    />
                                </CardHeader>

                                <CardContent className="flex flex-1 flex-col">
                                    <ul className="mb-4 flex-1 space-y-1">
                                        {pkg.features.main
                                            .slice(0, 4)
                                            .map((feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                                    <Text>{feature.name}</Text>
                                                </li>
                                            ))}
                                        {pkg.features.main.length > 4 && (
                                            <li className="flex items-start gap-3">
                                                <Text>
                                                    {t("andMore", {
                                                        count:
                                                            pkg.features.main.length - 4,
                                                    })}
                                                </Text>
                                            </li>
                                        )}
                                    </ul>

                                    <div className="flex w-full flex-col gap-2 sm:flex-row">
                                        <Button
                                            size="lg"
                                            variant="ghost"
                                            className="underline underline-offset-2 sm:flex-1"
                                            asChild={!!t.raw("detailsButton.href")}
                                        >
                                            {t.raw("detailsButton.href") ? (
                                                <Link
                                                    href={`/offer?offer=${pkg.key}#scroll-${pkg.key}`}
                                                >
                                                    szczegóły
                                                </Link>
                                            ) : (
                                                "szczegóły"
                                            )}
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant={
                                                pkg.isPopular === "true"
                                                    ? "cta"
                                                    : "secondary"
                                            }
                                            className="sm:flex-1"
                                            asChild
                                        >
                                            <Link
                                                href={
                                                    "/contact" +
                                                    `?offer=${pkg.key}#scroll-contact-form`
                                                }
                                            >
                                                {t("selectButton.text")}
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                />

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
