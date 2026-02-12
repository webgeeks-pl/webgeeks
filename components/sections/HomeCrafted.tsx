import { Code2, Fingerprint, Layers, Puzzle, Sparkles, Terminal } from "lucide-react";
import { useState } from "react";
import Section, { SectionContent } from "../layout/section";

const codeLines = [
    { indent: 0, text: '<html lang="pl">', color: "text-gray-500" },
    { indent: 1, text: "<head>", color: "text-gray-500" },
    { indent: 2, text: '<meta charset="UTF-8" />', color: "text-gray-400" },
    { indent: 2, text: "<title>Twoja Strona</title>", color: "text-gray-900" },
    { indent: 1, text: "</head>", color: "text-gray-500" },
    { indent: 1, text: "<body>", color: "text-gray-500" },
    { indent: 2, text: '<main className="custom">', color: "text-gray-900" },
    { indent: 3, text: "// Twój unikalny kod", color: "text-gray-400" },
    { indent: 3, text: "// Pisany od zera", color: "text-gray-400" },
    { indent: 3, text: "// Żadnych szablonów", color: "text-gray-400" },
    { indent: 2, text: "</main>", color: "text-gray-900" },
    { indent: 1, text: "</body>", color: "text-gray-500" },
    { indent: 0, text: "</html>", color: "text-gray-500" },
];

const differences = [
    {
        icon: Code2,
        title: "Kod pisany ręcznie",
        description:
            "Każda linia kodu jest napisana przez doświadczonego programistę. Żadnych gotowych szablonów, żadnego copy-paste.",
        vs: "Szablony i generatory kodu",
    },
    {
        icon: Fingerprint,
        title: "Unikalna jak Twoja firma",
        description:
            "Strona dopasowana dokładnie do Twojej wizji i potrzeb biznesowych — nie przerobiony szablon, który wygląda jak tysiące innych.",
        vs: "Ten sam wygląd co konkurencja",
    },
    {
        icon: Layers,
        title: "Zero zbędnego kodu",
        description:
            "Bez wtyczek, które spowalniają stronę. Bez niepotrzebnych bibliotek. Tylko to, czego naprawdę potrzebujesz.",
        vs: "Dziesiątki wtyczek i bloatware",
    },
    {
        icon: Puzzle,
        title: "Pełna kontrola",
        description:
            "Możesz zmienić dosłownie wszystko. Żadnych ograniczeń platformy, żadnych limitów kreatywności.",
        vs: "Ograniczenia szablonu i platformy",
    },
];

export function HandCrafted() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <Section className="overflow-hidden border-b border-gray-100 bg-white py-20 sm:py-28">
            <SectionContent>
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                        <Terminal className="size-4" />
                        <span className="text-sm">Co nas wyróżnia</span>
                    </div>
                    <h2 className="mb-4 text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
                        Tworzone od zera.{" "}
                        <span className="text-gray-400">Przez programistę.</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-500">
                        Nie korzystamy z gotowych szablonów. Nie instalujemy dziesiątek
                        wtyczek. Każdy piksel i każda linia kodu jest stworzona specjalnie
                        dla Ciebie.
                    </p>
                </div>

                {/* Main content grid */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Code visualization */}
                    <div className="relative">
                        <div className="rounded-2xl bg-gray-950 p-6 shadow-2xl sm:p-8">
                            {/* Window chrome */}
                            <div className="mb-6 flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gray-700"></div>
                                <div className="h-3 w-3 rounded-full bg-gray-700"></div>
                                <div className="h-3 w-3 rounded-full bg-gray-700"></div>
                                <span className="ml-3 font-mono text-xs text-gray-500">
                                    twoja-strona.tsx
                                </span>
                            </div>

                            {/* Code lines */}
                            <div className="space-y-1 font-mono text-sm">
                                {codeLines.map((line, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 transition-all duration-300"
                                        style={{
                                            opacity:
                                                0.4 +
                                                (i === 3 ||
                                                i === 6 ||
                                                i === 7 ||
                                                i === 8 ||
                                                i === 9
                                                    ? 0.6
                                                    : 0.3),
                                        }}
                                    >
                                        <span className="w-6 text-right text-xs text-gray-600 select-none">
                                            {i + 1}
                                        </span>
                                        <span
                                            className={`${line.text.startsWith("//") ? "text-gray-500" : "text-gray-300"}`}
                                            style={{
                                                paddingLeft: `${line.indent * 1.25}rem`,
                                            }}
                                        >
                                            {line.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Cursor blink */}
                            <div className="mt-3 flex items-center gap-3">
                                <span className="w-6 text-right font-mono text-xs text-gray-600 select-none">
                                    14
                                </span>
                                <span
                                    className="inline-block h-5 w-2 animate-pulse bg-gray-400"
                                    style={{ paddingLeft: "2.5rem" }}
                                ></span>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
                            <Sparkles className="size-4" />
                            <span>100% Custom Code</span>
                        </div>

                        {/* Background decoration */}
                        <div className="absolute top-8 left-8 -z-10 h-full w-full rounded-2xl bg-gray-100"></div>
                    </div>

                    {/* Right: Differences list */}
                    <div className="space-y-6">
                        {differences.map((item, index) => {
                            const Icon = item.icon;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div
                                        className={`flex gap-4 rounded-xl border p-5 transition-all duration-300 ${
                                            isHovered
                                                ? "border-gray-200 bg-gray-50 shadow-sm"
                                                : "border-transparent bg-white"
                                        }`}
                                    >
                                        <div
                                            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                                                isHovered
                                                    ? "bg-gray-900 text-white"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            <Icon className="size-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-1 text-gray-900">
                                                {item.title}
                                            </h3>
                                            <p className="mb-2 text-sm text-gray-500">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="rounded-full bg-gray-900 px-2.5 py-1 text-white">
                                                    Nasze podejście
                                                </span>
                                                <span className="text-gray-400">vs</span>
                                                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-500 line-through">
                                                    {item.vs}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom summary bar */}
                <div className="mt-16 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
                    <div className="grid gap-6 text-center sm:grid-cols-3">
                        <div>
                            <div className="mb-1 text-2xl text-gray-900 sm:text-3xl">
                                0
                            </div>
                            <div className="text-sm text-gray-500">
                                gotowych szablonów — wszystko od zera
                            </div>
                        </div>
                        <div className="sm:border-x sm:border-gray-200">
                            <div className="mb-1 text-2xl text-gray-900 sm:text-3xl">
                                0
                            </div>
                            <div className="text-sm text-gray-500">
                                zbędnych wtyczek — czysty, lekki kod
                            </div>
                        </div>
                        <div>
                            <div className="mb-1 text-2xl text-gray-900 sm:text-3xl">
                                100%
                            </div>
                            <div className="text-sm text-gray-500">
                                unikalności — strona tylko dla Ciebie
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
