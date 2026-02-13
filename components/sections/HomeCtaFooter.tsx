import { useTranslations } from "next-intl";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import { Button } from "../ui/button";

export function HomeCtaFooter() {
    const t = useTranslations("pages.home.ctaFooter");

    return (
        <Section className="py-size-2xl bg-brand-darker/50">
            <SectionContent className="gap-size-md">
                <SectionHeader>
                    <SectionHeaderContent>
                        <SectionTitle text={t("sectionHeader.title")} />
                        <SectionLead
                            text={t("sectionHeader.description")}
                            muted={false}
                            className="text-black"
                        />
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1">
                        {t("buttons.secondary")}
                    </Button>
                    <Button variant="default" className="flex-1">
                        {t("buttons.primary")}
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
