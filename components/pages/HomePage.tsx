import { ArrowRight, Gauge, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Animate from "../animations/Animate";
import Grid from "../layout/grid";
import { Page } from "../layout/page";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { Separator } from "../ui/separator";

export default function HomePage() {
    const t = useTranslations("pages.home");

    return (
        <Page>
            <Section as="header" className="py-size-2xl">
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
            <Section className="pb-size-2xl">
                <SectionContent>
                    <Grid>
                        <Card className="">
                            <CardContent className="flex flex-col items-center text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <IconContainer Icon={Gauge} />
                                    <Text intent="var" className="text-4xl">
                                        10x
                                    </Text>
                                </div>
                                <div>
                                    <Text intent="h3">Szybsze ładowanie</Text>
                                    <Text intent="small" muted>
                                        od stron z builderów
                                    </Text>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <IconContainer Icon={Gauge} />
                                    <Text intent="var" className="text-4xl">
                                        10x
                                    </Text>
                                </div>
                                <div>
                                    <Text intent="h3">Szybsze ładowanie</Text>
                                    <Text intent="small" muted>
                                        od stron z builderów
                                    </Text>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <IconContainer Icon={Gauge} />
                                    <Text intent="var" className="text-4xl">
                                        10x
                                    </Text>
                                </div>
                                <div>
                                    <Text intent="h3">Szybsze ładowanie</Text>
                                    <Text intent="small" muted>
                                        od stron z builderów
                                    </Text>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </SectionContent>
            </Section>
            <Separator decorative />
            <Section className="bg-clr-50 py-size-2xl">
                <SectionContent className="text-center" gapped="lg">
                    <SectionHeader
                        title="Transformacja Twojej strony"
                        description="Zobacz jak zmienia się wszystko po migracji z WordPress na Next.js"
                    />
                </SectionContent>
            </Section>
        </Page>
    );
}
