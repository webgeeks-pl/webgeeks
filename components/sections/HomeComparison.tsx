import { AlertTriangle, CheckCircle2, X, Zap } from "lucide-react";
import Section, { SectionContent, SectionHeader } from "../layout/section";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const beforeFeatures = [
    { text: "Ciągłe aktualizacje wtyczek", hasIt: false },
    { text: "Problemy z bezpieczeństwem", hasIt: false },
    { text: "Wolne ładowanie (3-5s)", hasIt: false },
    { text: "Wysokie koszty hostingu", hasIt: false },
    { text: "Awarie przy dużym ruchu", hasIt: false },
    { text: "Trudne skalowanie", hasIt: false },
];

const afterFeatures = [
    { text: "Automatyczne aktualizacje", hasIt: true },
    { text: "Bezpieczeństwo na najwyższym poziomie", hasIt: true },
    { text: "Błyskawiczne ładowanie (<1s)", hasIt: true },
    { text: "Niskie koszty hostingu", hasIt: true },
    { text: "99.99% uptime", hasIt: true },
    { text: "Nieograniczone skalowanie", hasIt: true },
];

export function HomeComparison() {
    return (
        <Section className="bg-clr-50 py-size-xl sm:py-size-2xl">
            <SectionContent className="gap-size-lg text-center">
                <SectionHeader
                    title="Transformacja Twojej strony"
                    description="Zobacz jak zmienia się wszystko po migracji z WordPress na Next.js"
                />

                {/* Main Comparison */}
                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* BEFORE - WordPress */}
                    <Card className="relative h-full overflow-hidden border-2 border-red-200 bg-red-50">
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-red-200 opacity-20"></div>
                        <CardContent className="relative z-10 p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-200">
                                    <AlertTriangle className="size-6 text-red-700" />
                                </div>
                                <div>
                                    <Badge className="mb-2 bg-red-600">PRZED</Badge>
                                    <h3 className="text-2xl text-gray-900">WordPress</h3>
                                </div>
                            </div>

                            {/* Browser mockup */}
                            <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                <div className="flex items-center gap-2 border-b border-gray-300 bg-gray-200 px-4 py-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="flex-1 rounded bg-white px-3 py-1 text-xs text-gray-600">
                                        twojastrona.pl
                                    </div>
                                </div>
                                <div className="flex h-48 items-center justify-center bg-linear-to-b from-gray-100 to-gray-200 p-6">
                                    <div className="text-center">
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-700"></div>
                                            <span className="text-sm text-gray-600">
                                                Ładowanie...
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Średnio 4.2 sekundy
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3">
                                {beforeFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <X className="mt-0.5 size-5 shrink-0 text-red-600" />
                                        <span className="text-gray-700">
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AFTER - Next.js */}
                    <Card className="relative h-full overflow-hidden border-2 border-green-200 bg-green-50">
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-green-200 opacity-20"></div>
                        <CardContent className="relative z-10 p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-200">
                                    <Zap className="size-6 text-green-700" />
                                </div>
                                <div>
                                    <Badge className="mb-2 bg-green-600">PO</Badge>
                                    <h3 className="text-2xl text-gray-900">Next.js</h3>
                                </div>
                            </div>

                            {/* Browser mockup */}
                            <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-lg">
                                <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="flex flex-1 items-center gap-2 rounded bg-gray-800 px-3 py-1 text-xs text-gray-300">
                                        🔒 twojastrona.pl
                                        <Badge
                                            variant="outline"
                                            className="border-green-500 text-xs text-green-500"
                                        >
                                            Secure
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex h-48 items-center justify-center bg-linear-to-b from-white to-gray-50 p-6">
                                    <div className="text-center">
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2">
                                            <CheckCircle2 className="size-5 text-green-600" />
                                            <span className="text-sm text-green-800">
                                                Załadowano!
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            W 0.8 sekundy ⚡
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3">
                                {afterFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />
                                        <span className="text-gray-700">
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats Bar */}
                <div className="bg-clr-900 w-full rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-4xl text-white">5-10x</div>
                            <div className="text-clr-400 text-sm">Szybsze ładowanie</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl text-white">-70%</div>
                            <div className="text-clr-400 text-sm">Niższe koszty</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl text-white">+85%</div>
                            <div className="text-clr-400 text-sm">Lepsze SEO</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl text-white">99.9%</div>
                            <div className="text-clr-400 text-sm">Uptime</div>
                        </div>
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
