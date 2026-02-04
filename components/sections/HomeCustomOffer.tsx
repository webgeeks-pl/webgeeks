import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import { Button } from "../ui/button";

export function HomeCustomOffer() {
    return (
        <Section className="py-size-lg sm:py-size-xl bg-brand-darker/50">
            <SectionContent className="gap-size-sm">
                <SectionHeader>
                    <SectionHeaderContent>
                        <SectionTitle text="Potrzebujesz czegoś więcej?" />
                        <SectionLead
                            text="Skontaktuj się z nami, aby omówić indywidualne potrzeby Twojego projektu."
                            muted={false}
                        />
                    </SectionHeaderContent>
                </SectionHeader>

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
