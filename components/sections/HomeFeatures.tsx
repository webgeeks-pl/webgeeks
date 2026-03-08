import LucideIcon from "@/components/ui/lucideIcons";
import { useTrans } from "@/hooks/useTrans";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";

export function HomeFeatures() {
    const t = useTrans("pages.home");
    const tHero = useTrans("pages.home.hero");
    const heroCards = tHero.obj("cards");

    return (
        <Section className="pb-size-md pt-size-xl" shouldRender={heroCards.length > 0}>
            <SectionContent>
                <div className="lg:gap-x-size-sm grid w-full grid-cols-1 items-stretch gap-x-8 gap-y-4 max-md:grid-rows-4 md:grid-cols-2 xl:grid-cols-4">
                    {heroCards.map(({ icon, value, title, description }, index) => {
                        return (
                            <Card
                                className="bg-brand h-full backdrop-blur-sm"
                                key={index}
                            >
                                <CardContent className="flex h-full flex-row-reverse items-center justify-between md:flex-col md:text-center">
                                    <div className="flex flex-col items-end md:items-center md:gap-2">
                                        <LucideIcon
                                            name={icon}
                                            className="bg-transparent"
                                        />
                                    </div>
                                    <div>
                                        <Text
                                            intent="h3"
                                            text={title}
                                            className="font-heading lg:text-2xl"
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
