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
        <Section className="py-size-2xl">
            <SectionContent className="gap-size-lg items-start">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <div>
                            <SectionTitle>Czysty kod</SectionTitle>
                            {/* <Text muted intent="large" className="mt-1">
                                większe bezpieczeństwo
                            </Text> */}
                        </div>
                        <SectionLead>
                            Strony oparte na WordPressie często wykorzystują wiele wtyczek
                            i zewnętrznych rozszerzeń, które wymagają ciągłych
                            aktualizacji i mogą stanowić potencjalne luki bezpieczeństwa.
                            Moje realizacje powstają w oparciu o nowoczesne technologie, z
                            minimalną liczbą zależności zewnętrznych. Dzięki temu są
                            bardziej stabilne, bezpieczne i łatwiejsze w utrzymaniu.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="py-size-xl gap-size-xl flex w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Text intent="h3" text={"Moja strona"} className="mb-2" />
                        <div className="flex flex-col items-center gap-1">
                            <Feather size={24} />
                            <Text intent="var" text={"lekka i szybka"} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <ArrowBigUpDash size={24} />
                            <Text intent="var" text={"brak niepotrzebnych wtyczek"} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <ShieldCheck size={24} />
                            <Text intent="var" text={"bezpieczna"} />
                        </div>
                    </div>
                    <Text intent="var" className="text-xl">
                        vs.
                    </Text>
                    <div className="flex flex-col items-center gap-4">
                        <Text intent="h3" text={"Strona z kreatora"} className="mb-2" />
                        <div className="flex flex-col items-center gap-1">
                            <Anvil size={24} />
                            <Text intent="var" text={"ciężka i wolna"} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Puzzle size={24} />
                            <Text intent="var" text={"dużo zbędnych wtyczek"} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <ShieldAlert size={24} />
                            <Text intent="var" text={"niebezpieczna"} />
                        </div>
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
