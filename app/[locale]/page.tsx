import { routing } from "@/i18n/routing";
import HomePage from "@components/pages/HomePage";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static"

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <HomePage />;
}
