import { Link } from "@/i18n/navigation";
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
                    <Button variant="secondary" className="flex-1" asChild>
                        <Link href={t("buttons.secondary.href")}>
                            {t("buttons.secondary.text")}
                        </Link>
                    </Button>
                    <Button variant="default" className="flex-1" asChild>
                        <Link href={t("buttons.primary.href")}>
                            {t("buttons.primary.text")}
                        </Link>
                    </Button>
                </div>
            </SectionContent>
        </Section>
    );
}
