import LucideIcon from "@/components/ui/lucideIcons";
import { useTrans } from "@/hooks/useTrans";
import { MotionCarousel } from "../animate-ui/components/community/motion-carousel";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent, CardHeader } from "../ui/card";

export function HomeSolutions() {
    const t = useTrans("pages.home.solutions");
    const solutions = t.obj("items");

    return (
        <Section className="py-size-xl md:py-size-2xl bg-clr-50">
            <SectionContent className="gap-size-lg">
                <SectionHeader>
                    <SectionHeaderContent>
                        <SectionTitle text={t("sectionHeader.title")} />
                        <SectionLead text={t("sectionHeader.description")} />
                    </SectionHeaderContent>
                </SectionHeader>

                <MotionCarousel
                    slides={solutions.map((solution, index) => {
                        return (
                            <Card className="h-full gap-2" key={index}>
                                <CardHeader>
                                    <LucideIcon name={solution.icon} />
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
                    className="xs:[--slide-size:80%] w-full [--slide-height:h-fit] [--slide-size:97%] sm:[--slide-size:60%] md:[--slide-size:50%] lg:[--slide-size:33%]"
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
