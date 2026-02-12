import { cn } from "@/lib/utils";

// import ThemeSwitcher from "../ThemeSwitcher";

import Section, { SectionContent } from "@/components/layout/section";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { legalRoutes, routes } from "@/config/routes";
import type { BasicComponentProps, NavigationRoutes } from "@/lib/types";
import Link from "next/link";
import { ReactNode } from "react";

interface FooterProps {
    Logo: ReactNode;
}

interface ColumnProps extends BasicComponentProps {
    title: string;
}

interface FooterLogoProps extends BasicComponentProps {
    Logo: ReactNode;
}

interface SocialProps {
    link: string;
}

export default function Footer({ Logo }: FooterProps) {
    return (
        <footer className="border-clr-border border-t py-10">
            <Section className="gap-10">
                <FooterTopContent Logo={Logo} />
                <FooterBottomContent />
            </Section>
        </footer>
    );
}

function FooterTopContent({ Logo }: FooterProps) {
    return (
        <SectionContent className={cn("flex w-full flex-col gap-16", "md:flex-row")}>
            <FooterCTA Logo={Logo} />
            <FooterNav />
        </SectionContent>
    );
}

function FooterBottomContent() {
    return (
        <SectionContent className="flex w-full flex-col-reverse items-center justify-between gap-5 sm:flex-row">
            <Text className="text-clr-text-extra-muted" size="small">
                &copy; {new Date().getFullYear()} KM-WebDev. Wszelkie prawa zastrzeżone.
            </Text>

            <div className="flex gap-5">
                <div className="flex items-center gap-3">
                    <FooterSocial link="https://github.com/webgeeks-pl" />
                    <FooterSocial link="https://www.linkedin.com/company/webgeeks" />
                    <FooterSocial link="https://facebook.com/webgeeks" />
                    <FooterSocial link="https://twitter.com/webgeeks" />
                </div>

                {/* <ThemeSwitcher /> */}
            </div>
        </SectionContent>
    );
}

function FooterCTA({ Logo }: FooterLogoProps) {
    return (
        <div
            className={cn(
                "border-border bg-card relative overflow-hidden rounded-2xl border p-8",
                "md:max-w-sm"
            )}
        >
            <div className="relative z-10 flex flex-col gap-6">
                <FooterLogo Logo={Logo} />
                <div className="flex flex-col gap-3">
                    <Text
                        semantic="h6"
                        text="Potrzebujesz strony?"
                        className="text-2xl font-bold"
                    />
                    <Text muted className="text-sm leading-relaxed">
                        Stwórzmy razem profesjonalną stronę, która przyciągnie klientów
                    </Text>
                </div>
                <Button
                    className="group w-full shadow-md hover:shadow-lg"
                    size="lg"
                    asChild
                >
                    <Link href="/contact" className="flex items-center gap-2">
                        Rozpocznij projekt
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}

function FooterLogo({ Logo }: FooterLogoProps) {
    if (!Logo) return <></>;

    return <Link href="/">{Logo}</Link>;
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

function FooterNav() {
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
        <div
            className={cn(
                "grid w-full grid-cols-1 gap-y-10",
                "sm:grid-cols-2",
                "lg:grid-cols-4 lg:gap-x-12"
            )}
        >
            <Column title="Usługi">
                <FooterNavigation routes={mainRoutes} />
            </Column>
            <Column title="Kontakt">
                <FooterNavigation routes={contactRoutes} />
            </Column>
            <Column title="Informacje prawne">
                <FooterNavigation routes={legalRoutes} />
            </Column>
        </div>
    );
}

function Column({ title, children, className }: ColumnProps) {
    return (
        <div className={cn("flex w-fit flex-col gap-3", className)}>
            <Text semantic="h6" text={title} />

            {children}
        </div>
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
