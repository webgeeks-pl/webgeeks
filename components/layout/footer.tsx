import { cn } from "@/lib/utils";

// import ThemeSwitcher from "../ThemeSwitcher";

import Section, { SectionContent } from "@/components/layout/section";
import Text from "@/components/typography/text";
import { legalRoutes, routes } from "@/config/routes";
import type { NavigationRoutes } from "@/lib/types";
import Link from "next/link";
import { ReactNode } from "react";
import { Separator } from "../ui/separator";

interface FooterProps {
    Logo: ReactNode;
}

interface SocialProps {
    link: string;
}

export default function Footer({ Logo }: FooterProps) {
    const mainRoutes = routes.filter(
        (r) => !r.cta && ["/", "/offer", "/process", "/portfolio"].includes(r.link)
    );
    const contactRoutes = routes.filter((r) => !r.cta && ["/contact"].includes(r.link));
    contactRoutes[0].name = "Napisz do nas";
    contactRoutes.push({
        link: "mailto:kontakt@webgeeks.pl",
        name: "kontakt@webgeeks.pl",
    });

    return (
        <Section as="footer" className="border-border border-t">
            <SectionContent
                className={cn(
                    "py-size-xl grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5",
                    "md:flex-row"
                )}
            >
                <div className="relative z-10 flex flex-col gap-2 sm:col-span-2 md:col-span-3 xl:col-span-2">
                    {Logo && <Link href="/">{Logo}</Link>}
                    <div className="flex flex-col">
                        <Text
                            semantic="h6"
                            text="Potrzebujesz strony?"
                            className="text-2xl font-bold"
                        />
                        <Text muted className="text-sm leading-relaxed">
                            Stwórzmy razem profesjonalną stronę, która przyciągnie
                            klientów
                        </Text>
                    </div>
                    <div className="flex w-fit">
                        <FooterSocial link="https://github.com/webgeeks-pl" />
                        <FooterSocial link="https://www.linkedin.com/company/webgeeks" />
                        <FooterSocial link="https://facebook.com/webgeeks" />
                        <FooterSocial link="https://twitter.com/webgeeks" />
                    </div>
                </div>

                <div className={cn("flex w-fit flex-col gap-3")}>
                    <Text semantic="h6" text="Usługi" />
                    <FooterNavigation routes={mainRoutes} />
                </div>
                <div className={cn("flex w-fit flex-col gap-3")}>
                    <Text semantic="h6" text="Kontakt" />
                    <FooterNavigation routes={contactRoutes} />
                </div>
                <div className={cn("flex w-fit flex-col gap-3")}>
                    <Text semantic="h6" text="Informacje prawne" />
                    <FooterNavigation routes={legalRoutes} />
                </div>
            </SectionContent>
            <Separator decorative />
            <SectionContent className={cn("py-size-sm flex flex-col items-start gap-4")}>
                <Text className="text-clr-text-extra-muted" size="small">
                    &copy; {new Date().getFullYear()} KM-WebDev. Wszelkie prawa
                    zastrzeżone.
                </Text>
            </SectionContent>
        </Section>
    );
}

function FooterSocial({ link }: SocialProps) {
    const brand = getBrandFromUrl(link);

    return (
        <a href={link} className="flex h-full w-full items-center px-1">
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

function FooterNavigation({ routes }: { routes: NavigationRoutes }) {
    return (
        <ul className="flex flex-col gap-2">
            {routes.map((route) => (
                <li key={route.link}>
                    <Link
                        href={route.link}
                        className="transition-colors hover:text-sky-500"
                    >
                        <Text text={route.name} muted size="small" />
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
