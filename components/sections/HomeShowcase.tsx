import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Iphone } from "../ui/iphone";

export function HomeShowcase() {
    const t = useTrans("pages.home.showcase");
    const mobileFriendlyItems = t.obj("mobile.items");

    return (
        <Section className="py-size-xl sm:py-size-2xl relative">
            <SectionContent className="gap-size-xl">
                <SectionHeader>
                    <SectionHeaderContent>
                        <SectionTitle text={t("mobile.title")} />
                        <SectionLead text={t("mobile.description")} />
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="gap-size-md grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3">
                    <div className="group relative h-full w-full max-w-md rounded-lg max-md:mx-auto max-sm:max-w-xs! md:col-start-2 md:row-span-3 md:mx-auto">
                        <Iphone src="/mobile.jpeg" />
                    </div>
                    {mobileFriendlyItems.map((item, index) => (
                        <div
                            className={cn(
                                "flex flex-col md:col-start-1 md:justify-center md:text-end",
                                index === 0 && "md:row-start-1",
                                index === 1 &&
                                    "md:row-start-2 lg:col-start-3 lg:text-start",
                                index === 2 && "md:row-start-3"
                            )}
                            key={index}
                        >
                            <Text intent="var" className="text-4xl sm:text-6xl">
                                {item.number}
                            </Text>
                            <Text intent="h3">{item.title}</Text>
                            <Text muted size="small">
                                {item.description}
                            </Text>
                        </div>
                    ))}
                </div>
            </SectionContent>
        </Section>
    );
}
