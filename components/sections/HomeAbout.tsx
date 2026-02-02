import { Award, Heart, Infinity, Rocket, Users } from "lucide-react";
import Section, { SectionContent } from "../layout/section";
import Text from "../typography/text";
import { Card, CardContent } from "../ui/card";
import IconContainer from "../ui/iconContainer";

const values = [
    {
        icon: Rocket,
        title: "Innowacja",
        description: "Zawsze na na bieżąco z nowinkami w branży webowej",
    },
    {
        icon: Users,
        title: "Partnerstwo",
        description: "Twój sukces to nasz sukces. Wspólnie osiągamy cele",
    },
    {
        icon: Award,
        title: "Jakość",
        description: "Perfekcja w każdym detalu. Dbamy o najwyższe standardy",
    },
    {
        icon: Heart,
        title: "Pasja",
        description: "Kochamy to, co robimy i to widać w naszych projektach",
    },
];

export function HomeAbout() {
    return (
        <Section className="bg-clr-50 py-size-xl">
            <SectionContent>
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div>
                        <div>
                            <Text intent="sectionHeader" className="mb-size-md">
                                O nas
                            </Text>
                            <div className="font space-y-4">
                                <Text>
                                    NextSpeed to zespół pasjonatów nowoczesnych
                                    technologii webowych. Od 2020 roku pomagamy firmom
                                    porzucać przestarzałe rozwiązania i przechodzić na
                                    szybkie, skalowalne strony oparte na Next.js.
                                </Text>
                                <Text className="text-clr-600">
                                    Zrealizowaliśmy ponad 150 projektów dla klientów z
                                    różnych branż - od startupów po duże korporacje. Każda
                                    migracja z WordPress kończyła się dramatyczną poprawą
                                    wydajności i wzrostem konwersji.
                                </Text>
                                <Text className="text-clr-600">
                                    Specjalizujemy się nie tylko w technologii, ale przede
                                    wszystkim w rozumieniu biznesu naszych klientów. Nie
                                    budujemy tylko stron - tworzymy narzędzia, które
                                    generują realną wartość i przewagę konkurencyjną.
                                </Text>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-6">
                                <div className="border-l-4 border-gray-900 pl-4">
                                    <div className="mb-1 text-4xl text-gray-900">
                                        <Infinity size={42} />
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Pomysłów na Twoją stronę
                                    </div>
                                </div>
                                <div className="border-l-4 border-gray-900 pl-4">
                                    <div className="mb-1 text-4xl text-gray-900">
                                        100%
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Zadowolonych klientów
                                    </div>
                                </div>
                                <div className="border-l-4 border-gray-900 pl-4">
                                    <div className="mb-1 text-4xl text-gray-900">
                                        5 lat
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Doświadczenia
                                    </div>
                                </div>
                                <div className="border-l-4 border-gray-900 pl-4">
                                    <div className="mb-1 text-4xl text-gray-900">
                                        w 24 godz.
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Gwarancja odpowiedzi na zapytania
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {values.map((value, index) => {
                            return (
                                <Card className="h-full" key={index}>
                                    <CardContent className="flex flex-col gap-1">
                                        <IconContainer
                                            Icon={value.icon}
                                            variant="opposite"
                                            size="lg"
                                            color="opposite"
                                        />

                                        <Text intent="h3" text={value.title} />

                                        <Text text={value.description} muted />
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
