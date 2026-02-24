import OfferPage from "@/components/pages/offerPage";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <OfferPage />;
}
