import { cn } from "@/lib/utils";
import { getArrayFromMessages } from "@/lib/utils/array";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

const PackageSchema = z.object({
    name: z.string(),
    icon: z.string(),
    price: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    popular: z.boolean(),
});

const ExtraPackageSchema = z.object({
    name: z.string(),
    icon: z.string(),
    price: z.string(),
    description: z.string(),
    features: z.array(z.string()),
});

export function HomePackages() {
    const t = useTranslations("pages.home.packages");
    const packages = getArrayFromMessages(t.raw("items"), PackageSchema);
    const extraPackages = getArrayFromMessages(
        t.raw("extraPackages"),
        ExtraPackageSchema
    );

    return (
        <Section className="py-size-xl sm:py-size-2xl bg-white">
            <SectionContent className="gap-size-lg">
                <div className="mb-16 text-center">
                    <SectionHeader
                        title={t("sectionHeader.title")}
                        description={t("sectionHeader.description")}
                    />
                </div>

                <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-6">
                    {packages.map((pkg, index) => {
                        return (
                            <Card
                                key={index}
                                className={cn(
                                    "relative flex h-full flex-col overflow-visible transition-all duration-300 md:col-span-2",
                                    pkg.popular &&
                                        "border-brand scale-105 border-2 shadow-xl",
                                    index === 2 && "sm:col-span-2"
                                    // index === 0 && "max-md:-order-1",
                                    // index === 2 && "max-md:-order-1"
                                )}
                            >
                                {pkg.popular && (
                                    <div className="bg-brand absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1">
                                        <Text intent="small" color="opposite">
                                            {t("popularBadge")}
                                        </Text>
                                    </div>
                                )}

                                <CardHeader className="overflow-auto pb-4 text-center">
                                    <IconContainer
                                        Icon={getLucideIcon(pkg.icon)}
                                        className="mx-auto"
                                        color={pkg.popular ? "opposite" : "default"}
                                        variant={pkg.popular ? "brandSolid" : "outline"}
                                    />

                                    <Text intent="h3" className="mb-2" text={pkg.name} />

                                    <Text
                                        intent="var"
                                        className="text-3xl"
                                        text={pkg.price}
                                    />
                                    <Text muted text={pkg.description} />
                                </CardHeader>

                                <CardContent className="flex flex-1 flex-col">
                                    <ul
                                        className={cn(
                                            "mb-6 flex-1 space-y-3",
                                            index === 2 &&
                                                "sm:grid sm:grid-cols-2 md:block"
                                        )}
                                    >
                                        {pkg.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3"
                                            >
                                                <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                                <Text>{feature}</Text>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        size="lg"
                                        variant={pkg.popular ? "cta" : "outline"}
                                    >
                                        {t("selectButton")}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                    {extraPackages.map((pkg, index) => (
                        <Card
                            key={index}
                            className="relative flex h-full flex-col overflow-visible transition-all duration-300 md:col-span-3 lg:grid lg:grid-cols-2"
                        >
                            <CardHeader className="overflow-auto pb-4 text-center lg:text-start">
                                <IconContainer
                                    Icon={getLucideIcon(pkg.icon)}
                                    className="max-lg:mx-auto"
                                    color="default"
                                    variant="outline"
                                />

                                <Text intent="h3" className="mb-2" text={pkg.name} />

                                <Text
                                    intent="var"
                                    className="text-3xl"
                                    text={pkg.price}
                                />
                                <Text muted text={pkg.description} />
                            </CardHeader>

                            <CardContent className="flex flex-1 flex-col">
                                <ul className="mb-6 flex-1 space-y-3">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                            <Text>{feature}</Text>
                                        </li>
                                    ))}
                                </ul>

                                <Button size="lg" variant="outline">
                                    {t("selectButton")}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionContent>
        </Section>
    );
}
