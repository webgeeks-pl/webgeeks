import { Rocket, Snail } from "lucide-react";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";

export function ServicesSpeed() {
    return (
        <Section className="py-size-2xl bg-clr-50">
            <SectionContent className="gap-size-lg items-start">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <div>
                            <SectionTitle>Szybkość i wydajność</SectionTitle>
                            {/* <Text intent="large" className="mt-1" muted>
                                więcej klientów
                            </Text> */}
                        </div>
                        <SectionLead>
                            Internet jest dziś bardzo konkurencyjny. Jeśli Twoja strona
                            ładuje się dłużej niż 3 sekundy, możesz stracić nawet połowę
                            użytkowników, zanim zobaczą ofertę. Strony, które tworzę, są
                            zoptymalizowane pod kątem wydajności i Core Web Vitals. Ładują
                            się niemal natychmiast, co zwiększa szansę na pozostanie
                            użytkownika na stronie i wysłanie zapytania.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="py-size-xl gap-size-xl flex w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <Text intent="h3" text={"Moja strona"} className="mb-2" />
                        <Rocket size={32} />
                        <Text intent="var" text={"ok. 1s"} />
                    </div>
                    <Text intent="var" className="text-xl">
                        vs.
                    </Text>
                    <div className="flex flex-col items-center gap-2">
                        <Text intent="h3" text={"Strona z kreatora"} className="mb-2" />
                        <Snail size={32} />
                        <Text intent="var" text={"5-10s"} />
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
