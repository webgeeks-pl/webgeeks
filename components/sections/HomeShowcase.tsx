import { cn } from "@/lib/utils";
import { getArrayFromMessages } from "@/lib/utils/array";
import { CornerLeftDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { EncryptedText } from "../ui/encrypted-text";
import { Iphone } from "../ui/iphone";
import { Safari } from "../ui/safari";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tilt } from "../ui/tilt";

const MobileItemSchema = z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
});

export function HomeShowcase() {
    const t = useTranslations("pages.home.showcase");
    const mobileFriendlyItems = getArrayFromMessages(
        t.raw("mobile.items"),
        MobileItemSchema
    );

    return (
        <Section className="py-size-xl sm:py-size-2xl relative">
            <SectionContent className="gap-size-xl">
                <Tabs defaultValue="desktop" className="gap-size-md flex w-full flex-col">
                    <TabsList className="relative mx-auto">
                        <TabsTrigger value="desktop">{t("tabs.desktop")}</TabsTrigger>
                        <TabsTrigger value="mobile">{t("tabs.mobile")}</TabsTrigger>
                        <div className="text-clr-900 absolute bottom-full mb-2 flex gap-2 md:left-3/5">
                            <CornerLeftDown
                                size={18}
                                strokeWidth={3.5}
                                className="mt-2.5"
                            />
                            <EncryptedText
                                startDelayMs={1000}
                                text={t("encryptedText")}
                                className="font-heading font-bold text-nowrap"
                            />
                        </div>
                    </TabsList>
                    <TabsContent value="desktop" className="gap-size-md flex flex-col">
                        <SectionHeader
                            title={t("desktop.title")}
                            description={t("desktop.description")}
                        />
                        <Safari
                            url="https:\\"
                            imageSrc="/template-hero.webp"
                            className="max-w-7xl"
                        />
                    </TabsContent>
                    <TabsContent value="mobile" className="gap-size-md flex flex-col">
                        <SectionHeader
                            title={t("mobile.title")}
                            description={t("mobile.description")}
                        />

                        <div className="gap-size-md grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3">
                            <Tilt
                                rotationFactor={6}
                                isRevese
                                style={{
                                    transformOrigin: "center center",
                                }}
                                springOptions={{
                                    stiffness: 26.7,
                                    damping: 4.1,
                                    mass: 0.2,
                                }}
                                className="group relative h-full w-full max-w-md rounded-lg max-md:mx-auto max-sm:max-w-xs! md:col-start-2 md:row-span-3"
                            >
                                <Iphone src="/strona.jpeg" />
                            </Tilt>
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
                    </TabsContent>
                </Tabs>
            </SectionContent>
        </Section>
    );
}
