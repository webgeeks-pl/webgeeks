import { getArrayFromMessages } from "@/lib/utils/array";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";

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
        <Section className="py-size-xl min-h-screen">
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
                        </div>
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
