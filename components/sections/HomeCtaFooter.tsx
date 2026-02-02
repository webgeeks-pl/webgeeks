import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Grid from "../layout/grid";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function HomeCtaFooter() {
    const tHero = useTranslations("pages.home.hero");
    const heroBadges = getArrayFromMessages(tHero.raw("badges.bottom"), z.string());

    return (
        <Section className="py-size-2xl bg-brand-darker/50">
            <SectionContent className="gap-size-md">
                <SectionHeader
                    descriptionClassName="text-black"
                    title="Section Title"
                    descMuted={false}
                    description="This is the section description that gives more details about the section content."
                />
                <Grid cols={0} className="w-fit items-center gap-4 sm:grid-cols-2">
                    {[...heroBadges, heroBadges[0]].map((badge, index) => (
                        <Badge className="gap-2" variant="ghost" key={index}>
                            <div className="bg-clr-700 h-1.5 w-1.5 rounded-full" />
                            <Text intent="small" text={badge} />
                        </Badge>
                    ))}
                </Grid>
                <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1">
                        Learn More
                    </Button>
                    <Button variant="default" className="flex-1">
                        Get Started
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
