import { useTranslations } from "next-intl";
import Grid from "../layout/grid";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function HomeCtaFooter() {
    const t = useTranslations("pages.home.ctaFooter");
    const badges = t.raw("badges") as string[];

    return (
        <Section className="py-size-2xl bg-brand-darker/50">
            <SectionContent className="gap-size-md">
                <SectionHeader
                    descriptionClassName="text-black"
                    title={t("sectionHeader.title")}
                    descMuted={false}
                    description={t("sectionHeader.description")}
                />
                <Grid cols={0} className="w-fit items-center gap-4 sm:grid-cols-2">
                    {badges.map((badge, index) => (
                        <Badge className="gap-2" variant="ghost" key={index}>
                            <div className="bg-clr-700 h-1.5 w-1.5 rounded-full" />
                            <Text intent="small" text={badge} />
                        </Badge>
                    ))}
                </Grid>
                <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1">
                        {t("buttons.secondary")}
                    </Button>
                    <Button variant="default" className="flex-1">
                        {t("buttons.primary")}
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
