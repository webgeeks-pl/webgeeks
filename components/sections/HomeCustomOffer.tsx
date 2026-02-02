import Section, { SectionContent, SectionHeader } from "../layout/section";
import { Button } from "../ui/button";

export function HomeCustomOffer() {
    return (
        <Section className="py-size-lg sm:py-size-xl bg-brand-darker/50">
            <SectionContent className="gap-size-sm">
                <SectionHeader
                    title="Potrzebujesz czegoś więcej?"
                    description="Skontaktuj się z nami, aby omówić indywidualne potrzeby Twojego projektu."
                    descMuted={false}
                />

                <div className="flex gap-4">
                    <Button variant="default" size="lg">
                        Indywidualna wycena
                    </Button>
                    <Button variant="secondary" size="lg">
                        Zobacz cennik usług
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
