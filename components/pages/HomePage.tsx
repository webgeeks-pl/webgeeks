import { useTranslations } from "next-intl";
import Link from "next/link";
import Text from "../typography/text";
import { Button } from "../ui/button";

export default function HomePage() {
    const t = useTranslations("pages.home");

    return (
        <div>
            <Text asChild intent="h1" muted>
                <span>{t("hero.title")}</span>
            </Text>
            <Button asChild variant="default">
                <Link href="/">{t("hero.getStarted")}</Link>
            </Button>
        </div>
    );
}
