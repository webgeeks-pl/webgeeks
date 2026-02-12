import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCarousel } from "../animate-ui/components/community/motion-carousel";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

export interface Package {
    key: string;
    name: string;
    icon: string;
    price: string;
    description: string;
    features: string[];
}

export function useAllPackages(): Package[] {
    const t = useTranslations("pages.home.packages");

    return [
        {
            key: "onePage",
            name: t("onePage.name"),
            icon: t("onePage.icon"),
            price: t("onePage.price"),
            description: t("onePage.description"),
            features: t.raw("onePage.features") as string[],
        },
        {
            key: "starter",
            name: t("starter.name"),
            icon: t("starter.icon"),
            price: t("starter.price"),
            description: t("starter.description"),
            features: t.raw("starter.features") as string[],
        },
        {
            key: "business",
            name: t("business.name"),
            icon: t("business.icon"),
            price: t("business.price"),
            description: t("business.description"),
            features: t.raw("business.features") as string[],
        },
        {
            key: "enterprise",
            name: t("enterprise.name"),
            icon: t("enterprise.icon"),
            price: t("enterprise.price"),
            description: t("enterprise.description"),
            features: t.raw("enterprise.features") as string[],
        },
        {
            key: "webapp",
            name: t("webapp.name"),
            icon: t("webapp.icon"),
            price: t("webapp.price"),
            description: t("webapp.description"),
            features: t.raw("webapp.features") as string[],
        },
        {
            key: "ecommerce",
            name: t("ecommerce.name"),
            icon: t("ecommerce.icon"),
            price: t("ecommerce.price"),
            description: t("ecommerce.description"),
            features: t.raw("ecommerce.features") as string[],
        },
    ];
}

export function Packages() {
    const t = useTranslations("pages.home.packages");
    const allPackages = useAllPackages();

    return (
        <>
            <div className="hidden flex-col gap-8 lg:flex">
                <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
                    <div className="flex flex-col gap-8 lg:col-span-2">
                        <StarterPackage />
                        <OnePagePackage />
                    </div>
                    <BusinessPackage />
                    <EnterprisePackage />
                </div>
                <ComplexPackages />
            </div>
            <MotionCarousel
                slides={allPackages.map((pkg, index) => {
                    return (
                        <Card
                            key={index}
                            className={cn(
                                "will-change relative flex h-fit w-full flex-col overflow-visible",
                                "md:col-span-3! md:grid! md:grid-cols-2!"
                            )}
                        >
                            <CardHeader
                                className={cn("overflow-auto pb-4", "text-start")}
                            >
                                <IconContainer
                                    Icon={getLucideIcon(pkg.icon)}
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
                                    {(pkg.features as string[]).map((feature, idx) => (
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
                    );
                })}
                labels={allPackages.map((pkg) => pkg.name)}
                options={{ loop: true }}
                className="w-full [--slide-height:h-fit] [--slide-size:80%] lg:hidden"
            />
        </>
    );
}

function OnePagePackage() {
    const t = useTranslations("pages.home.packages");
    return (
        <Card className="relative flex flex-col overflow-visible transition-all duration-300">
            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(t("onePage.icon"))}
                    className="mx-auto"
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={t("onePage.name")} />

                <Text intent="var" className="text-3xl" text={t("onePage.price")} />
                <Text muted text={t("onePage.description")} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("onePage.features") as string[]).map((feature, idx) => (
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
    );
}

function StarterPackage() {
    const t = useTranslations("pages.home.packages");
    return (
        <Card className="relative flex flex-col overflow-visible transition-all duration-300">
            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(t("starter.icon"))}
                    className="mx-auto"
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={t("starter.name")} />

                <Text intent="var" className="text-3xl" text={t("starter.price")} />
                <Text muted text={t("starter.description")} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("starter.features") as string[]).map((feature, idx) => (
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
    );
}

function BusinessPackage() {
    const t = useTranslations("pages.home.packages");
    return (
        <Card className="border-brand relative flex h-full scale-102 flex-col overflow-visible border-2 shadow-lg transition-all duration-300 lg:col-span-2">
            <div className="bg-brand absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1">
                <Text intent="small" color="opposite">
                    {t("popularBadge")}
                </Text>
            </div>

            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(t("business.icon"))}
                    className="mx-auto"
                    color="opposite"
                    variant="brandSolid"
                />

                <Text intent="h3" className="mb-2" text={t("business.name")} />

                <Text intent="var" className="text-3xl" text={t("business.price")} />
                <Text muted text={t("business.description")} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("business.features") as string[]).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                            <Text>{feature}</Text>
                        </li>
                    ))}
                </ul>

                <Button size="lg" variant="cta">
                    {t("selectButton")}
                </Button>
            </CardContent>
        </Card>
    );
}

function EnterprisePackage() {
    const t = useTranslations("pages.home.packages");
    return (
        <Card className="relative flex h-full flex-col overflow-visible transition-all duration-300 sm:col-span-2 lg:col-span-2">
            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(t("enterprise.icon"))}
                    className="mx-auto"
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={t("enterprise.name")} />

                <Text intent="var" className="text-3xl" text={t("enterprise.price")} />
                <Text muted text={t("enterprise.description")} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3 sm:grid sm:grid-cols-2 lg:block">
                    {(t.raw("enterprise.features") as string[]).map((feature, idx) => (
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
    );
}

export function ComplexPackages() {
    return (
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            <WebAppPackage />
            <EcommercePackage />
        </div>
    );
}

function WebAppPackage({ horizontal = true }: { horizontal?: boolean }) {
    const t = useTranslations("pages.home.packages");
    return (
        <Card
            className={cn(
                "relative flex h-full flex-col overflow-visible transition-all duration-300",
                horizontal
                    ? "lg:col-span-3 lg:grid lg:grid-cols-2"
                    : "sm:col-span-2 lg:col-span-2"
            )}
        >
            <CardHeader
                className={cn(
                    "overflow-auto pb-4",
                    horizontal ? "text-center lg:text-start" : "text-center"
                )}
            >
                <IconContainer
                    Icon={getLucideIcon(t("webapp.icon"))}
                    className={horizontal ? "max-lg:mx-auto" : "mx-auto"}
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={t("webapp.name")} />

                <Text intent="var" className="text-3xl" text={t("webapp.price")} />
                <Text muted text={t("webapp.description")} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("webapp.features") as string[]).map((feature, idx) => (
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
    );
}

function EcommercePackage({ horizontal = true }: { horizontal?: boolean }) {
    const t = useTranslations("pages.home.packages");
    return (
        <Card
            className={cn(
                "relative flex h-full flex-col overflow-visible transition-all duration-300",
                horizontal
                    ? "lg:col-span-3 lg:grid lg:grid-cols-2"
                    : "sm:col-span-2 lg:col-span-2"
            )}
        >
            <CardHeader
                className={cn(
                    "overflow-auto pb-4",
                    horizontal ? "text-center lg:text-start" : "text-center"
                )}
            >
                <IconContainer
                    Icon={getLucideIcon(t("ecommerce.icon"))}
                    className={horizontal ? "max-lg:mx-auto" : "mx-auto"}
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={t("ecommerce.name")} />

                <Text intent="var" className="text-3xl" text={t("ecommerce.price")} />
                <Text muted text={t("ecommerce.description")} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("ecommerce.features") as string[]).map((feature, idx) => (
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
    );
}

// export function MarketingPackage() {
//     const t = useTranslations("pages.home.packages");
//     return (
//         <Card className="relative flex h-full flex-col overflow-visible transition-all duration-300 sm:col-span-2 lg:col-span-2">
//             <CardHeader className="overflow-auto pb-4 text-center">
//                 <IconContainer
//                     Icon={getLucideIcon(t("marketing.icon"))}
//                     className="mx-auto"
//                     color="default"
//                     variant="outline"
//                 />

//                 <Text intent="h3" className="mb-2" text={t("marketing.name")} />

//                 <Text intent="var" className="text-3xl" text={t("marketing.price")} />
//                 <Text muted text={t("marketing.description")} />
//             </CardHeader>

//             <CardContent className="flex flex-1 flex-col">
//                 <ul className="mb-6 flex-1 space-y-3 sm:grid sm:grid-cols-2 lg:block">
//                     {(t.raw("marketing.features") as string[]).map((feature, idx) => (
//                         <li key={idx} className="flex items-start gap-3">
//                             <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
//                             <Text>{feature}</Text>
//                         </li>
//                     ))}
//                 </ul>

//                 <Button size="lg" variant="outline">
//                     {t("selectButton")}
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// }
