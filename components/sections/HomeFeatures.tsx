import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
import { Globe } from "../ui/globe";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

const CardSchema = z.object({
    icon: z.string(),
    value: z.string(),
    title: z.string(),
    description: z.string(),
});

export function HomeFeatures() {
    const t = useTranslations("pages.home");
    const tHero = useTranslations("pages.home.hero");
    const heroCards = getArrayFromMessages(tHero.raw("cards"), CardSchema);
    return (
        <Section
            className="pb-size-xl sm:pb-size-2xl pt-0.5"
            shouldRender={heroCards.length > 0}
        >
            <SectionContent>
                <div className="grid w-full grid-cols-1 items-stretch gap-4 gap-x-10 max-md:grid-rows-3 md:grid-cols-2 xl:grid-cols-3">
                    {heroCards.map(({ icon, value, title, description }, index) => {
                        return (
                            <Card
                                className="bg-brand-200/30 h-full backdrop-blur-sm"
                                key={index}
                            >
                                <CardContent className="flex h-full flex-col items-center justify-between text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <IconContainer
                                            variant={"none"}
                                            Icon={getLucideIcon(icon)}
                                        />
                                        <Text
                                            intent="var"
                                            className="text-2xl capitalize"
                                            text={value}
                                        />
                                    </div>
                                    <div>
                                        <Text intent="h3" text={title} />
                                        <Text intent="small" text={description} />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </SectionContent>
            <Card className="hidden h-full bg-white/20 backdrop-blur-lg">
                <CardContent className="relative flex h-full flex-col justify-between">
                    <Text intent="h3" className="z-10 pb-1 text-center font-semibold">
                        {t("features.globeTitle")}
                    </Text>
                    <Globe />
                </CardContent>
            </Card>
        </Section>
    );
}
