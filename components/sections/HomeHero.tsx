import { getArrayFromMessages } from "@/lib/utils/array";
import { ArrowRight, CornerLeftUp, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { z } from "zod";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { EncryptedText } from "../ui/encrypted-text";
import { Separator } from "../ui/separator";
import { TextShimmer } from "../ui/text-shimmer";

export function HomeHero() {
    const t = useTranslations("pages.home");
    const tHero = useTranslations("pages.home.hero");
    const heroBadges = getArrayFromMessages(tHero.raw("badges.bottom"), z.string());

    return (
        <Section as="header" className="py-size-xl sm:py-size-2xl">
            <SectionContent className="gap-size-md text-center">
                <Badge className="p-3" variant="secondary">
                    <span className="flex items-center">
                        <Zap className="h-3.5 w-3.5 text-yellow-400" />
                    </span>
                    <span>{t("hero.badges.top")}</span>
                </Badge>
                <Text
                    as="span"
                    intent="h1"
                    className="font-heading max-w-3xl text-3xl sm:text-5xl"
                >
                    {t("hero.title")}
                </Text>
                <Text intent="lead" muted className="max-w-2xl">
                    {t("hero.leadStart")}
                    <TextShimmer
                        as="span"
                        className="font-bold [--base-color:var(--color-sky-500)] [--base-gradient-color:var(--color-sky-300)]"
                    >
                        {t("hero.leadHighlight")}
                    </TextShimmer>
                    {t("hero.leadEnd")}
                </Text>
                <div className="relative flex gap-4">
                    <Button asChild variant="default">
                        <Link href="/">
                            <span>{t("hero.buttons.primary")}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">
                            <span>{t("hero.buttons.secondary")}</span>
                        </Link>
                    </Button>
                    <div className="absolute top-full mt-3 flex gap-2 md:left-1/5">
                        <CornerLeftUp size={18} strokeWidth={3.5} />
                        <EncryptedText
                            startDelayMs={1000}
                            text="nie zwlekaj, ulepsz swój biznes już dziś!"
                            className="font-heading font-bold text-nowrap"
                        />
                    </div>
                </div>
                <Separator className="mt-4 max-w-xl" decorative />

                {heroBadges.length > 0 && (
                    <div className="flex flex-col gap-2 md:flex-row">
                        {heroBadges.map((badge, index) => (
                            <Badge className="gap-2" variant="ghost" key={index}>
                                <div className="bg-success h-1.5 w-1.5 rounded-full" />
                                <Text intent="small" muted text={badge} />
                            </Badge>
                        ))}
                    </div>
                )}
            </SectionContent>
        </Section>
    );
}
