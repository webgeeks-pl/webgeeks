import { cn } from "@/lib/utils";

// import ThemeSwitcher from "../ThemeSwitcher";

import Section, { SectionContent } from "@/components/layout/section";
import Text from "@/components/typography/text";
import { footerRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";
import ScrollButton from "../ui/scroll-button";
import { Separator } from "../ui/separator";

interface FooterProps {
    Logo: ReactNode;
}

interface SocialProps {
    link: string;
}

export default function Footer({ Logo }: FooterProps) {
    const t = useTranslations("common.footer");
    const tRoutes = useTranslations("common.navigation.routes");

    const mainRoutes = footerRoutes.main
        .filter((r) => r.link !== "/" && r.link !== "/contact")
        .map((r) => ({ link: r.link, name: tRoutes(r.link) }));

    const contactLinks: { link: string; name: string }[] = [
        ...footerRoutes.contact.map((r) => ({ link: r.link, name: tRoutes(r.link) })),
        { link: "mailto:kontakt@webgeeks.pl", name: "kontakt@webgeeks.pl" },
    ];

    const legalLinks = footerRoutes.legal.map((r) => ({
        link: r.link,
        name: tRoutes(r.link),
    }));

    return (
        <Section as="footer" className="border-border border-t">
            <SectionContent
                className={cn(
                    "py-size-xl grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5",
                    "md:flex-row"
                )}
            >
                <div className="relative z-10 flex flex-col gap-2 sm:col-span-2 md:col-span-3 xl:col-span-2">
                    {Logo && (
                        <ScrollButton
                            target="#navigation-top"
                            onRoute="/"
                            className="w-fit"
                        >
                            <Link href="/">{Logo}</Link>
                        </ScrollButton>
                    )}
                    <div className="flex flex-col">
                        <Text
                            semantic="h6"
                            text={t("title")}
                            className="text-2xl font-bold"
                        />
                        <Text
                            muted
                            className="text-sm leading-relaxed"
                            text={t("description")}
                        />
                    </div>
                    <div className="flex w-fit">
                        <FooterSocial link="https://github.com/webgeeks-pl" />
                        <FooterSocial link="https://www.linkedin.com/company/webgeeks" />
                        <FooterSocial link="https://facebook.com/webgeeks" />
                        {/* <FooterSocial link="https://twitter.com/webgeeks" /> */}
                    </div>
                </div>

                <div className={cn("flex w-fit flex-col gap-3")}>
                    <Text semantic="h6" text={t("services")} />
                    <FooterNavigation routes={mainRoutes} />
                </div>
                <div className={cn("flex w-fit flex-col gap-3")}>
                    <Text semantic="h6" text={t("contact")} />
                    <FooterNavigation routes={contactLinks} />
                </div>
                <div className={cn("flex w-fit flex-col gap-3")}>
                    <Text semantic="h6" text={t("legal")} />
                    <FooterNavigation routes={legalLinks} />
                </div>
            </SectionContent>
            <Separator decorative />
            <SectionContent className={cn("py-size-sm flex flex-col items-start gap-4")}>
                <Text className="text-clr-text-extra-muted" size="small">
                    &copy; {new Date().getFullYear()} {t("copyright")}
                </Text>
            </SectionContent>
        </Section>
    );
}

function FooterSocial({ link }: SocialProps) {
    const brand = getBrandFromUrl(link);

    return (
        <a
            href={link}
            className="hover:text-brand flex h-full w-full items-center px-1 transition-all duration-200"
        >
            <div
                className="h-5 w-5"
                style={{
                    WebkitMaskImage: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@13.21.0/icons/${brand}.svg)`,
                    maskImage: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@13.21.0/icons/${brand}.svg)`,
                    background: "currentcolor",
                    backgroundSize: "cover",
                }}
            />
        </a>
    );
}

function FooterNavigation({ routes }: { routes: { link: string; name: string }[] }) {
    return (
        <ul className="flex flex-col gap-2">
            {routes.map((route) => (
                <li key={route.link}>
                    <Link href={route.link} className="">
                        <Text
                            text={route.name}
                            muted
                            size="small"
                            className="hover:text-brand transition-colors duration-200"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function getBrandFromUrl(url: string) {
    try {
        const { hostname } = new URL(url);
        return hostname.replace("www.", "").split(".")[0];
    } catch (e) {
        return "wordpress";
    }
}
