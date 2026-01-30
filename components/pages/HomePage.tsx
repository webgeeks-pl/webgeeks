import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Animate from "../animations/Animate";
import { Page } from "../layout/page";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function HomePage() {
    const t = useTranslations("pages.home");

    return (
        <Page>
            <Section as="header" padded="2xl">
                <SectionContent className="text-center" gapped="md">
                    <Animate>
                        <Badge className="p-3" variant="secondary">
                            <span className="flex items-center">
                                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                            </span>
                            <span>{t("hero.badges.top")}</span>
                        </Badge>
                    </Animate>
                    <Text
                        intent="h1"
                        className="max-w-3xl text-3xl sm:text-5xl"
                    >
                        {t("hero.title")}
                    </Text>
                    <Text intent="lead" muted className="max-w-2xl">
                        {t("hero.lead")}
                    </Text>
                    <div className="flex gap-4">
                        <Button asChild variant="default">
                            <Link href="/">
                                <span>{t("hero.buttons.primary")}</span>
                                <ArrowRight />
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">
                                <span>{t("hero.buttons.secondary")}</span>
                            </Link>
                        </Button>
                    </div>
                    <Separator className="max-w-xl" decorative />
                    <div className="flex flex-col gap-2 md:flex-row">
                        <Badge className="gap-2" variant="ghost">
                            <div className="bg-success h-1.5 w-1.5 rounded-full" />
                            <span>{t("hero.badges.first")}</span>
                        </Badge>
                        <Badge className="gap-2" variant="ghost">
                            <div className="bg-success h-1.5 w-1.5 rounded-full" />
                            <span>{t("hero.badges.second")}</span>
                        </Badge>
                        <Badge className="gap-2" variant="ghost">
                            <div className="bg-success h-1.5 w-1.5 rounded-full" />
                            <span>{t("hero.badges.third")}</span>
                        </Badge>
                    </div>
                </SectionContent>
            </Section>
            <Section>
                <SectionContent></SectionContent>
            </Section>
        </Page>
    );
}
