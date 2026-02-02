import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

const ValueSchema = z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
});

const StatSchema = z.object({
    value: z.string(),
    label: z.string(),
});

export function HomeAbout() {
    const t = useTranslations("pages.home.about");
    const values = getArrayFromMessages(t.raw("values"), ValueSchema);
    const stats = getArrayFromMessages(t.raw("stats"), StatSchema);
    const paragraphs = t.raw("paragraphs") as string[];

    return (
        <Section className="bg-clr-50 py-size-xl">
            <SectionContent>
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div>
                        <div>
                            <Text intent="sectionHeader" className="mb-size-md">
                                {t("sectionHeader")}
                            </Text>
                            <div className="font space-y-4">
                                <Text>{paragraphs[0]}</Text>
                                <Text className="text-clr-600">{paragraphs[1]}</Text>
                                <Text className="text-clr-600">{paragraphs[2]}</Text>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-6">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="border-l-4 border-gray-900 pl-4"
                                    >
                                        <div className="mb-1 text-4xl text-gray-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {values.map((value, index) => {
                            return (
                                <Card className="h-full" key={index}>
                                    <CardContent className="flex flex-col gap-1">
                                        <IconContainer
                                            Icon={getLucideIcon(value.icon)}
                                            variant="opposite"
                                            size="lg"
                                            color="opposite"
                                        />

                                        <Text intent="h3" text={value.title} />

                                        <Text text={value.description} muted />
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
