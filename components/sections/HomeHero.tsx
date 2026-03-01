import { useTrans } from "@/hooks/useTrans";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";
import { EncryptedText } from "../ui/encrypted-text";
import { TextShimmer } from "../ui/text-shimmer";

export function HomeHero() {
    const t = useTrans("pages.home");
    const tHero = useTrans("pages.home.hero");
    // const heroBadges = tHero.obj("badges.bottom")

    return (
        <Section
            as="header"
            id="hero"
            className="py-size-lg xs:pt-size-xl xs:pb-size-lg relative mt-20"
        >
            <SectionContent className="gap-size-sm sm:gap-size-md z-10 items-start text-start">
                {/* <Badge className="p-3" variant="secondary">
                    <span className="flex items-center">
                        <Zap className="h-3.5 w-3.5 text-yellow-400" />
                    </span>
                    <span>{t("hero.badges.top")}</span>
                </Badge> */}

                <Text
                    as="span"
                    intent="h1"
                    className="font-heading xs:text-4xl! max-w-5xl text-3xl! font-normal tracking-wide md:text-7xl!"
                >
                    <EncryptedText
                        startDelayMs={1000}
                        text={t("hero.title")}
                        className=""
                    />
                </Text>

                <Text intent="lead" className="max-w-2xl">
                    {t("hero.leadStart")}
                    <TextShimmer
                        as="span"
                        className="font-bold [--base-color:var(--color-sky-800)] [--base-gradient-color:var(--color-sky-300)]"
                    >
                        {t("hero.leadHighlight")}
                    </TextShimmer>
                    {t("hero.leadEnd")}
                </Text>

                <div className="relative flex gap-4">
                    <Button asChild variant="secondary">
                        <Link href={t("hero.buttons.secondary.href")}>
                            <span>{t("hero.buttons.secondary.text")}</span>
                        </Link>
                    </Button>
                    <Button asChild variant="default">
                        <Link href={t("hero.buttons.primary.href")}>
                            <span>{t("hero.buttons.primary.text")}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
