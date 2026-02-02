import { cn } from "@/lib/utils";
import { CornerLeftDown } from "lucide-react";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import Text from "../typography/text";
import { EncryptedText } from "../ui/encrypted-text";
import { Iphone } from "../ui/iphone";
import { Safari } from "../ui/safari";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tilt } from "../ui/tilt";

const mobileFriendlyItems = [
    {
        number: "1",
        title: "Responsywny design",
        description:
            "Twoi klienci bez wysiłku znajdą to, czego szukają, więcej zapytań i mniej porzuceń na telefonie.",
    },
    {
        number: "2",
        title: "Mniej porzuceń, więcej leadów",
        description:
            "Krótka ścieżka do oferty i kontaktu zwiększa liczbę zapytań — telefonicznie i z formularza.",
    },
    {
        number: "3",
        title: "Szybkość, która sprzedaje",
        description:
            "Szybsze wczytywanie to większe zaufanie i wyższa sprzedaż, a klienci zostają i wracają częściej.",
    },
];

export function HomeShowcase() {
    return (
        <Section className="py-size-xl sm:py-size-2xl relative">
            <SectionContent className="gap-size-xl">
                <Tabs defaultValue="desktop" className="gap-size-md flex w-full flex-col">
                    <TabsList className="relative mx-auto">
                        <TabsTrigger value="desktop">Komputery</TabsTrigger>
                        <TabsTrigger value="mobile">Urządzenia mobilne</TabsTrigger>
                        <div className="text-clr-900 absolute bottom-full mb-2 flex gap-2 md:left-3/5">
                            <CornerLeftDown
                                size={18}
                                strokeWidth={3.5}
                                className="mt-2.5"
                            />
                            <EncryptedText
                                startDelayMs={1000}
                                text="sprawdź, jak Twoja strona działa na różnych urządzeniach"
                                className="font-heading font-bold text-nowrap"
                            />
                        </div>
                    </TabsList>
                    <TabsContent value="desktop" className="gap-size-md flex flex-col">
                        <SectionHeader
                            title="Nowoczesny design i funkcjonalność"
                            description="Tworzymy strony, które nie tylko wyglądają świetnie, ale są też intuicyjne i łatwe w obsłudze dla Twoich użytkowników."
                        />
                        <Safari
                            url="https:\\"
                            imageSrc="/template-hero.webp"
                            className="max-w-7xl"
                        />
                    </TabsContent>
                    <TabsContent value="mobile" className="gap-size-md flex flex-col">
                        <SectionHeader
                            title="Dopasowane na urządzenia mobilne"
                            description="Ponad 60% ruchu w internecie pochodzi z urządzeń mobilnych. Twoja strona będzie wyglądać i działać perfekcyjnie na każdym ekranie."
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
                                className="group relative h-full w-full max-w-md rounded-lg max-md:mx-auto md:col-start-2 md:row-span-3"
                            >
                                <Iphone src="/strona.jpeg" className="" />
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
