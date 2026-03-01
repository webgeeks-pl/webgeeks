import LucideIcon from "@/components/ui/lucideIcons";
import { CheckCircle2, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import Text from "../typography/text";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export function HomeComparison() {
    const t = useTranslations("pages.home.comparison");
    const beforeFeatures = t.raw("before.features") as string[];
    const afterFeatures = t.raw("after.features") as string[];

    return (
        <Section className="bg-clr-50 py-size-xl sm:py-size-2xl">
            <SectionContent className="gap-size-lg text-center">
                <SectionHeader>
                    <SectionHeaderContent className="">
                        <SectionTitle text={t("sectionHeader.title")} />
                        <SectionLead text={t("sectionHeader.description")} />
                    </SectionHeaderContent>
                </SectionHeader>
                {/* Main Comparison */}
                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* BEFORE - WordPress */}
                    <Card className="ring-destructive/30 relative h-full overflow-hidden bg-red-50">
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-red-200 opacity-20"></div>
                        <CardContent className="relative z-10">
                            <div className="mb-6 flex items-center gap-3">
                                <LucideIcon
                                    name="AlertTriangle"
                                    className="text-destructive bg-destructive/15 border-destructive/30 border"
                                />
                                <div>
                                    <Text intent="h3" className="font-heading">
                                        {t("before.title")}
                                    </Text>
                                </div>
                            </div>

                            {/* Browser mockup */}
                            <BrowserBad
                                url={t("before.browser.url")}
                                loading={t("before.browser.loading")}
                                time={t("before.browser.time")}
                            />

                            {/* Features */}
                            <div className="space-y-3">
                                {beforeFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <X className="mt-0.5 size-5 shrink-0 text-red-600" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AFTER - Next.js */}
                    <Card className="ring-success/30 relative h-full overflow-hidden bg-green-50">
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-green-200 opacity-20"></div>
                        <CardContent className="relative z-10">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-200">
                                    <Zap className="size-6 text-green-700" />
                                </div>
                                <div>
                                    <Text intent="h3" className="font-heading">
                                        {t("after.title")}
                                    </Text>
                                </div>
                            </div>

                            {/* Browser mockup */}
                            <BrowserGood
                                url={t("after.browser.url")}
                                secure={t("after.browser.secure")}
                                loaded={t("after.browser.loaded")}
                                time={t("after.browser.time")}
                            />
                            {/* Features */}
                            <div className="space-y-3">
                                {afterFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SectionContent>
        </Section>
    );
}

function BrowserBad({
    url,
    loading,
    time,
}: {
    url: string;
    loading: string;
    time: string;
}) {
    return (
        <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-300 bg-gray-200 px-4 py-2">
                <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 rounded bg-white px-3 py-1 text-xs text-gray-600">
                    {url}
                </div>
            </div>
            <div className="flex h-48 items-center justify-center bg-linear-to-b from-gray-100 to-gray-200 p-6">
                <div className="text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-700"></div>
                        <span className="text-sm text-gray-600">{loading}</span>
                    </div>
                    <div className="text-xs text-gray-500">{time}</div>
                </div>
            </div>
        </div>
    );
}

function BrowserGood({
    url,
    secure,
    loaded,
    time,
}: {
    url: string;
    secure: string;
    loaded: string;
    time: string;
}) {
    return (
        <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-500 bg-white shadow-lg">
            <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2">
                <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex flex-1 items-center gap-2 rounded bg-gray-800 px-3 py-1 text-xs text-gray-300">
                    🔒 {url}
                    <Badge
                        variant="outline"
                        className="border-green-500 text-xs text-green-500"
                    >
                        {secure}
                    </Badge>
                </div>
            </div>
            <div className="flex h-48 items-center justify-center bg-linear-to-b from-white to-gray-50 p-6">
                <div className="text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2">
                        <CheckCircle2 className="size-5 text-green-600" />
                        <span className="text-sm text-green-800">{loaded}</span>
                    </div>
                    <div className="text-xs text-gray-500">{time}</div>
                </div>
            </div>
        </div>
    );
}

/* ----------------------- Second ----------------------- */
//  {/* PROPOZYCJA 5: Wolne bo bloatware */}
//             <div className="mb-12 text-center">
//                 <Badge className="mb-4 bg-yellow-600">Propozycja 5</Badge>
//                 <h2 className="mb-3 text-3xl text-gray-900 sm:text-4xl">
//                     Wolne, bo przeładowane
//                 </h2>
//                 <p className="text-gray-600">
//                     Builder musi działać dla milionów - nie dla Ciebie
//                 </p>
//             </div>

//             <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
//                 {/* Builder Heavy */}
//                 <Card className="border-2 border-red-200 bg-red-50">
//                     <CardContent className="p-8">
//                         <div className="mb-6 flex items-center gap-3">
//                             <Anchor className="size-12 text-red-600" />
//                             <div>
//                                 <h3 className="text-2xl text-gray-900">Builder</h3>
//                                 <p className="text-gray-600">Ciężki jak kotwica</p>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="rounded-lg bg-white p-4">
//                                 <h4 className="mb-2 text-gray-900">
//                                     Ładuje kod, którego nie używasz
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Wszystkie funkcje dla wszystkich użytkowników. Ty
//                                     potrzebujesz 10%, ale ładujesz 100%.
//                                 </p>
//                             </div>

//                             <div className="rounded-lg bg-white p-4">
//                                 <h4 className="mb-2 text-gray-900">
//                                     Optymalizacja? Jakakolwiek?
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Muszą obsłużyć wszystkie możliwe scenariusze. Nie
//                                     mogą optymalizować pod Ciebie.
//                                 </p>
//                             </div>

//                             <div className="rounded-lg bg-white p-4">
//                                 <h4 className="mb-2 text-gray-900">
//                                     Klienci to czują
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Każda sekunda ładowania to uciekający klient. A
//                                     Twoja strona ładuje się... i ładuje... i ładuje...
//                                 </p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Custom Light */}
//                 <Card className="border-2 border-green-200 bg-green-50">
//                     <CardContent className="p-8">
//                         <div className="mb-6 flex items-center gap-3">
//                             <Wind className="size-12 text-green-600" />
//                             <div>
//                                 <h3 className="text-2xl text-gray-900">
//                                     Custom Next.js
//                                 </h3>
//                                 <p className="text-gray-600">Lekki jak piórko</p>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="rounded-lg border-l-4 border-green-500 bg-white p-4">
//                                 <h4 className="mb-2 text-gray-900">
//                                     Tylko to, czego potrzebujesz
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Każda linia kodu ma cel. Zero zbędnego balastu.
//                                     Strona szyja na miarę Twoich potrzeb.
//                                 </p>
//                             </div>

//                             <div className="rounded-lg border-l-4 border-green-500 bg-white p-4">
//                                 <h4 className="mb-2 text-gray-900">
//                                     Zoptymalizowana do bólu
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Każdy obrazek, każda animacja, każdy element -
//                                     dopracowane dla maksymalnej wydajności.
//                                 </p>
//                             </div>

//                             <div className="rounded-lg border-l-4 border-green-500 bg-white p-4">
//                                 <h4 className="mb-2 text-gray-900">
//                                     Klienci to uwielbiają
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Błyskawiczne ładowanie = zadowoleni użytkownicy =
//                                     więcej sprzedaży. To takie proste.
//                                 </p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             <div className="text-center">
//                 <h3 className="mb-4 text-3xl text-gray-900">Szybkość = pieniądze</h3>
//                 <p className="mb-6 text-xl text-gray-600">
//                     Każda zaoszczędzona sekunda to wyższa konwersja
//                 </p>
//                 <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
//                     Chcę błyskawiczną stronę
//                 </Button>
//             </div>
