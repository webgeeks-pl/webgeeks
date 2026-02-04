import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { MotionCarousel } from "../animate-ui/components/community/motion-carousel";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

const SolutionSchema = z.object({
    icon: z.string(),
    title: z.string(),
    label: z.string(),
    description: z.string(),
});

export function HomeSolutions() {
    const t = useTranslations("pages.home.solutions");
    const solutions = getArrayFromMessages(t.raw("items"), SolutionSchema);

    return (
        <Section className="py-size-xl md:py-size-2xl bg-clr-50">
            <SectionContent className="gap-size-lg">
                <SectionHeader
                    title={t("sectionHeader.title")}
                    description={t("sectionHeader.description")}
                />

                <MotionCarousel
                    slides={solutions.map((solution, index) => {
                        return (
                            <Card className="h-full gap-2" key={index}>
                                <CardHeader>
                                    <IconContainer Icon={getLucideIcon(solution.icon)} />
                                    <Text intent="h3" text={solution.title} />
                                </CardHeader>
                                <CardContent>
                                    <Text muted text={solution.description} />
                                </CardContent>
                            </Card>
                        );
                    })}
                    labels={solutions.map((s) => s.label)}
                    options={{ loop: true }}
                    className="w-full [--slide-height:h-fit] [--slide-size:80%] sm:[--slide-size:60%] md:[--sile-size:50%] lg:[--slide-size:33%]"
                />

                <div className="mt-12 text-center">
                    <p className="mb-6 text-gray-600">
                        {t("cta.text")}
                        <br className="hidden sm:block" />
                        {t("cta.subtext")}
                    </p>
                </div>
            </SectionContent>
        </Section>
    );
}
