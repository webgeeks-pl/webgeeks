import { useTranslations } from "next-intl";
import { Packages } from "../content/Packages";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

export function HomePackages() {
    const t = useTranslations("pages.home.packages");

    return (
        <Section className="py-size-xl sm:py-size-2xl bg-white">
            <SectionContent className="gap-size-lg">
                <div className="mb-16 text-center">
                    <SectionHeader>
                        <SectionHeaderContent>
                            <SectionTitle text={t("sectionHeader.title")} />
                            <SectionLead text={t("sectionHeader.description")} />
                        </SectionHeaderContent>
                    </SectionHeader>
                </div>
                <Packages />
            </SectionContent>
        </Section>
    );
}
