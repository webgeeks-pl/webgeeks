import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Packages } from "../content/Packages";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Button } from "../ui/button";

export function HomePackages() {
    const t = useTranslations("pages.home.packages");

    return (
        <Section className="py-size-xl sm:py-size-2xl bg-white">
            <SectionContent className="gap-size-lg">
                <div className="text-center lg:mb-8">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={t("sectionHeader.title")} />
                            <SectionLead text={t("sectionHeader.description")} />
                        </SectionHeaderContent>
                    </SectionHeader>
                </div>

                <Packages />

                <div className="flex flex-col items-center gap-2">
                    <Text intent="h3" as="h4" text={"Potrzebujesz czegoś innego?"} />
                    <Text
                        intent="small"
                        muted
                        text={"Możesz dopasować pakiet do swoich potrzeb"}
                    />
                    <Button variant={"secondary"} asChild>
                        <Link href="/offer">Przejdź</Link>
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
