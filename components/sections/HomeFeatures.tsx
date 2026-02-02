import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Grid from "../layout/grid";
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
    const tHero = useTranslations("pages.home.hero");
    const heroCards = getArrayFromMessages(tHero.raw("cards"), CardSchema);
    return (
        <Section
            className="pb-size-xl sm:pb-size-2xl pt-0.5"
            shouldRender={heroCards.length > 0}
        >
            <SectionContent>
                <Grid
                    cols={heroCards.length + 1}
                    className="items-stretch max-sm:grid-rows-4"
                >
                    {heroCards.map(({ icon, value, title, description }, index) => {
                        return (
                            <Card className="h-full" key={index}>
                                <CardContent className="flex h-full flex-col items-center justify-between text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <IconContainer Icon={getLucideIcon(icon)} />
                                        <Text
                                            intent="var"
                                            className="text-2xl capitalize"
                                            text={value}
                                        />
                                    </div>
                                    <div>
                                        <Text intent="h3" text={title} />
                                        <Text intent="small" muted text={description} />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                    <Card className="h-full">
                        <CardContent className="relative flex h-full flex-col justify-between">
                            <Text
                                intent="h3"
                                className="from-clr-900 to-clr-400 z-10 bg-linear-to-b bg-clip-text text-center font-semibold text-transparent"
                            >
                                Docieraj na cały świat
                            </Text>
                            <Globe />
                        </CardContent>
                    </Card>
                </Grid>
            </SectionContent>
        </Section>
    );
}
