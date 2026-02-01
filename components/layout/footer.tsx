import { cn } from "@/lib/utils";

// import ThemeSwitcher from "../ThemeSwitcher";

import Section, { SectionContent } from "@/components/layout/section";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
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
                <div className="flex items-center gap-2">
                    <FooterSocial link="https://discord.com" />
                    <FooterSocial link="https://github.com/KM-WebDev" />
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
                "bg-clr-bg-light border-clr-border flex h-fit flex-col gap-5 rounded-xl border p-5",
                "md:max-w-sm"
            )}
        >
            <FooterLogo Logo={Logo} />
            <div className="flex flex-col gap-3">
                <Text semantic="h6" text="Bezpłatny audyt twojej strony" />
                <Text muted className="leading-normal">
                    Przeprowadzimy pełną inspekcję strony i pokażemy jak ją usprawnić
                </Text>
                <Button className="w-fit">Zamów teraz</Button>
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
    return (
        <div
            className={cn(
                "grid w-full grid-cols-1 gap-y-10",
                "sm:grid-cols-2",
                "lg:flex lg:flex-row lg:justify-between"
            )}
        >
            <Column title="Szybkie Linki">
                <FooterNavigation routes={routes} />
            </Column>
            <Column title="Szybkie Linki">
                <FooterNavigation routes={routes} />
            </Column>
            <Column title="Szybkie Linki">
                <FooterNavigation routes={routes} />
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
            {routes.map(
                (route, i) =>
                    !route.cta && (
                        <li key={route.link}>
                            <Link
                                href={route.link}
                                className="transition-colors hover:text-sky-500"
                            >
                                <Text text={route.link} muted />
                            </Link>
                        </li>
                    )
            )}
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
