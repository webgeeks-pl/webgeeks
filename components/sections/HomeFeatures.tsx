import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import * as z from "zod/v4-mini";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
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
                <div className="grid w-full grid-cols-1 items-stretch gap-4 max-md:grid-rows-4 md:grid-cols-2 lg:gap-x-10 xl:grid-cols-4">
                    {heroCards.map(({ icon, value, title, description }, index) => {
                        return (
                            <Card
                                className="bg-brand-200/30 h-full"
                                key={index}
                            >
                                <CardContent className="flex h-full flex-row-reverse items-center justify-between md:flex-col md:text-center">
                                    <div className="flex flex-col items-end md:items-center md:gap-2">
                                        <IconContainer
                                            variant={"ghost"}
                                            Icon={getLucideIcon(icon)}
                                        />
                                        <Text
                                            intent="var"
                                            className="xs:text-lg text-base lg:text-lg"
                                            text={value}
                                        />
                                    </div>
                                    <div>
                                        <Text
                                            intent="h3"
                                            text={title}
                                            className="font-heading font-semibold capitalize lg:text-2xl"
                                        />
                                        <Text
                                            intent="small"
                                            className="font-heading"
                                            text={description}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </SectionContent>
        </Section>
    );
}
