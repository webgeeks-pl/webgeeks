import { Feature, Package, useAllPackages } from "@/hooks/useAllPackages";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCarousel } from "../animate-ui/components/community/motion-carousel";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

export function Packages() {
    const t = useTranslations("offer.packages");

    const allPackages = useAllPackages();

    return (
        <>
            <div className="hidden flex-col gap-8 lg:flex">
                <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
                    <div className="flex flex-col gap-8 lg:col-span-2">
                        <StarterPackage pkg={allPackages[1]} t={t} />
                        <OnePagePackage pkg={allPackages[0]} t={t} />
                    </div>
                    <BusinessPackage pkg={allPackages[2]} t={t} />
                    <EnterprisePackage pkg={allPackages[3]} t={t} />
                </div>
                <ComplexPackages t={t} />
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
                                    {pkg.features.main.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                            <Text>{feature.name}</Text>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex w-full gap-2">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="flex-1"
                                        asChild={!!t.raw("detailsButton.href")}
                                    >
                                        {t.raw("detailsButton.href") ? (
                                            <Link href={t("detailsButton.href")}>
                                                {t("detailsButton.text")}
                                            </Link>
                                        ) : (
                                            t("detailsButton.text")
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="default"
                                        className="flex-1"
                                        asChild
                                    >
                                        <Link href={t("selectButton.href")}>
                                            {t("selectButton.text")}
                                        </Link>
                                    </Button>
                                </div>
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

function OnePagePackage({ pkg, t }: { pkg: Package; t: any }) {
    return (
        <Card className="relative flex flex-col overflow-visible transition-all duration-300">
            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(pkg.icon)}
                    className="mx-auto"
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={pkg.name} />

                <Text intent="var" className="text-3xl" text={pkg.price} />
                <Text muted text={pkg.description} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {pkg.features.main.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                            <Text>{feature.name}</Text>
                        </li>
                    ))}
                </ul>
                <div className="flex w-full gap-2">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="flex-1 underline underline-offset-2"
                        asChild={!!t.raw("detailsButton.href")}
                    >
                        {t.raw("detailsButton.href") ? (
                            <Link href={t("detailsButton.href")}>
                                {t("detailsButton.text")}
                            </Link>
                        ) : (
                            t("detailsButton.text")
                        )}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" asChild>
                        <Link href={t("selectButton.href")}>
                            {t("selectButton.text")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function StarterPackage({ pkg, t }: { pkg: Package; t: any }) {
    return (
        <Card className="relative flex flex-col overflow-visible transition-all duration-300">
            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(pkg.icon)}
                    className="mx-auto"
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={pkg.name} />

                <Text intent="var" className="text-3xl" text={pkg.price} />
                <Text muted text={pkg.description} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {pkg.features.main.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                            <Text>{feature.name}</Text>
                        </li>
                    ))}
                </ul>

                <div className="flex w-full gap-2">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="flex-1 underline underline-offset-2"
                        asChild={!!t.raw("detailsButton.href")}
                    >
                        {t.raw("detailsButton.href") ? (
                            <Link href={t("detailsButton.href")}>
                                {t("detailsButton.text")}
                            </Link>
                        ) : (
                            t("detailsButton.text")
                        )}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" asChild>
                        <Link href={t("selectButton.href")}>
                            {t("selectButton.text")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function BusinessPackage({ pkg, t }: { pkg: Package; t: any }) {
    return (
        <Card className="border-brand relative flex h-full scale-102 flex-col overflow-visible border-2 shadow-lg transition-all duration-300 lg:col-span-2">
            <div className="bg-brand absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1">
                <Text intent="small" color="opposite">
                    {t("popularBadge")}
                </Text>
            </div>

            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(pkg.icon)}
                    className="mx-auto"
                    color="opposite"
                    variant="brandSolid"
                />

                <Text intent="h3" className="mb-2" text={pkg.name} />

                <Text intent="var" className="text-3xl" text={pkg.price} />
                <Text muted text={pkg.description} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                    {pkg.features.main.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                            <Text>{feature.name}</Text>
                        </li>
                    ))}
                </ul>

                <div className="flex w-full gap-2">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="flex-1 underline underline-offset-2"
                        asChild={!!t.raw("detailsButton.href")}
                    >
                        {t.raw("detailsButton.href") ? (
                            <Link href={t("detailsButton.href")}>
                                {t("detailsButton.text")}
                            </Link>
                        ) : (
                            t("detailsButton.text")
                        )}
                    </Button>
                    <Button size="lg" variant="cta" className="flex-1" asChild>
                        <Link href={t("selectButton.href")}>
                            {t("selectButton.text")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function EnterprisePackage({ pkg, t }: { pkg: Package; t: any }) {
    return (
        <Card className="relative flex h-full flex-col overflow-visible transition-all duration-300 sm:col-span-2 lg:col-span-2">
            <CardHeader className="overflow-auto pb-4 text-center">
                <IconContainer
                    Icon={getLucideIcon(pkg.icon)}
                    className="mx-auto"
                    color="default"
                    variant="outline"
                />

                <Text intent="h3" className="mb-2" text={pkg.name} />

                <Text intent="var" className="text-3xl" text={pkg.price} />
                <Text muted text={pkg.description} />
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3 sm:grid sm:grid-cols-2 lg:block">
                    {[...pkg.features.main, ...pkg.features.additional].map(
                        (feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                <Text>{feature.name}</Text>
                            </li>
                        )
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
                            <Link href={t("detailsButton.href")}>
                                {t("detailsButton.text")}
                            </Link>
                        ) : (
                            t("detailsButton.text")
                        )}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" asChild>
                        <Link href={t("selectButton.href")}>
                            {t("selectButton.text")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export function ComplexPackages({ t }: { t: any }) {
    return (
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            <WebAppPackage t={t} />
            <EcommercePackage t={t} />
        </div>
    );
}

function WebAppPackage({ horizontal = true, t }: { horizontal?: boolean; t: any }) {
    return (
        <Card
            className={cn(
                "relative flex h-full flex-col overflow-visible transition-all duration-300",
                horizontal
                    ? "gap-0 lg:col-span-3 lg:grid lg:grid-cols-2"
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

            <CardContent
                className={cn("flex flex-1 flex-col", horizontal ? "lg:pl-0" : "")}
            >
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("webapp.features.main") as Feature[]).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                            <Text>{feature.name}</Text>
                        </li>
                    ))}
                </ul>

                <div className="flex w-full gap-2">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="flex-1 underline underline-offset-2"
                        asChild={!!t.raw("detailsButton.href")}
                    >
                        {t.raw("detailsButton.href") ? (
                            <Link href={t("detailsButton.href")}>
                                {t("detailsButton.text")}
                            </Link>
                        ) : (
                            t("detailsButton.text")
                        )}
                    </Button>
                    <Button size="lg" variant="secondary" className="flex-1" asChild>
                        <Link href={t("selectButton.href")}>
                            {t("selectButton.text")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function EcommercePackage({ horizontal = true, t }: { horizontal?: boolean; t: any }) {
    return (
        <Card
            className={cn(
                "relative flex h-full flex-col overflow-visible transition-all duration-300",
                horizontal
                    ? "gap-0 lg:col-span-3 lg:grid lg:grid-cols-2"
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

            <CardContent
                className={cn("flex flex-1 flex-col", horizontal ? "lg:pl-0" : "")}
            >
                <ul className="mb-6 flex-1 space-y-3">
                    {(t.raw("ecommerce.features.main") as Feature[]).map(
                        (feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                                <Text>{feature.name}</Text>
                            </li>
                        )
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
                            <Link href={t("detailsButton.href")}>
                                {t("detailsButton.text")}
                            </Link>
                        ) : (
                            t("detailsButton.text")
                        )}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" asChild>
                        <Link href={t("selectButton.href")}>
                            {t("selectButton.text")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// export function MarketingPackage() {
//      const t = useTranslations("packages.packages");
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
