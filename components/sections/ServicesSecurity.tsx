import {
    Anvil,
    ArrowBigUpDash,
    Feather,
    Puzzle,
    ShieldAlert,
    ShieldCheck,
} from "lucide-react";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";

export function ServicesSecurity() {
    return (
        <Section className="py-size-lg sm:py-size-2xl lg:py-size-4xl">
            <SectionContent className="gap-size-lg items-start">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <div>
                            <SectionTitle>Czysty kod</SectionTitle>
                            {/* <Text muted intent="large" className="mt-1">
                                większe bezpieczeństwo
                            </Text> */}
                        </div>
                        <SectionLead className="max-w-prose">
                            Strony oparte na WordPressie często wykorzystują wiele wtyczek
                            i zewnętrznych rozszerzeń, które wymagają ciągłych
                            aktualizacji i mogą stanowić potencjalne luki bezpieczeństwa.
                            Moje realizacje powstają w oparciu o nowoczesne technologie, z
                            minimalną liczbą zależności zewnętrznych. Dzięki temu są
                            bardziej stabilne, bezpieczne i łatwiejsze w utrzymaniu.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="flex w-full flex-col items-center gap-6 text-center">
                    <div className="grid w-full grid-cols-[1fr_50px_1fr] items-center">
                        <Text
                            intent="h3"
                            text={"Moja strona"}
                            className="mb-1 text-center max-sm:text-lg"
                        />
                        <Text intent="var" className="text-xl">
                            vs.
                        </Text>
                        <Text
                            intent="h3"
                            text={"Strona z kreatora"}
                            className="mb-1 text-center max-sm:text-lg"
                        />
                    </div>
                    <div className="grid w-full grid-cols-[1fr_50px_1fr] items-center">
                        <div className="flex flex-col items-center gap-1">
                            <Feather size={24} />
                            <Text
                                intent="var"
                                className="max-sm:text-sm"
                                text={"lekka i szybka"}
                            />
                        </div>
                        <Text intent="var" className="text-xl">
                            vs.
                        </Text>
                        <div className="flex flex-col items-center gap-1">
                            <Anvil size={24} />
                            <Text
                                intent="var"
                                className="max-sm:text-sm"
                                text={"ciężka i wolna"}
                            />
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-[1fr_50px_1fr] items-center">
                        <div className="flex flex-col items-center gap-1">
                            <ArrowBigUpDash size={24} />
                            <Text
                                intent="var"
                                className="max-sm:text-sm"
                                text={"brak niepotrzebnych wtyczek"}
                            />
                        </div>
                        <Text intent="var" className="text-xl">
                            vs.
                        </Text>
                        <div className="flex flex-col items-center gap-1">
                            <Puzzle size={24} />
                            <Text
                                intent="var"
                                className="max-sm:text-sm"
                                text={"dużo zbędnych wtyczek"}
                            />
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-[1fr_50px_1fr] items-center">
                        <div className="flex flex-col items-center gap-1">
                            <ShieldCheck size={24} />
                            <Text
                                intent="var"
                                className="max-sm:text-sm"
                                text={"bezpieczna"}
                            />
                        </div>
                        <Text intent="var" className="text-xl">
                            vs.
                        </Text>
                        <div className="flex flex-col items-center gap-1">
                            <ShieldAlert size={24} />
                            <Text
                                intent="var"
                                className="max-sm:text-sm"
                                text={"niebezpieczna"}
                            />
                        </div>
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
