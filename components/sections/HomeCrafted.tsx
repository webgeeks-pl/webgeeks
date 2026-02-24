import { getArrayFromMessages } from "@/lib/utils/array";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";
import IconContainer from "../ui/iconContainer";
import { getLucideIcon } from "../ui/lucideIcons";

const DifferenceSchema = z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    our: z.string(),
    other: z.string(),
});

export function HandCrafted() {
    const t = useTranslations("pages.home.crafted");
    const codeLines = t.raw("codeLines") as Array<{
        indent: number;
        text: string;
        color: string;
    }>;
    const differences = getArrayFromMessages(t.raw("differences"), DifferenceSchema);

    return (
        <Section className="border-clr-100 relative overflow-hidden border-b bg-white py-20 sm:py-28">
            <SectionContent className="relative">
                <div className="absolute inset-0">
                    {/* <LetterGlitch
                        glitchSpeed={50}
                        centerVignette={true}
                        outerVignette={false}
                        smooth={true}
                    /> */}
                </div>
                <SectionHeader className="mb-8">
                    <SectionHeaderContent>
                        <SectionTitle text={t("sectionHeader.title")} />
                        <SectionLead text={t("sectionHeader.description")} />
                    </SectionHeaderContent>
                </SectionHeader>

                {/* Main content grid */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Code visualization */}
                    <div className="relative">
                        <div className="bg-clr-950 rounded-2xl p-6 shadow-2xl sm:p-8">
                            {/* Window chrome */}
                            <div className="mb-6 flex items-center gap-2">
                                <div className="bg-clr-700 h-3 w-3 rounded-full"></div>
                                <div className="bg-clr-700 h-3 w-3 rounded-full"></div>
                                <div className="bg-clr-700 h-3 w-3 rounded-full"></div>
                                <span className="text-clr-500 ml-3 font-mono text-xs">
                                    {t("codeFile")}
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
                                        <span className="text-clr-600 w-6 text-right text-xs select-none">
                                            {i + 1}
                                        </span>
                                        <span
                                            className={`${line.text.startsWith("//") ? "text-clr-500" : "text-clr-300"}`}
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
                                <span className="text-clr-600 w-6 text-right font-mono text-xs select-none">
                                    14
                                </span>
                                <span className="bg-clr-400 inline-block h-5 w-0.5 animate-pulse"></span>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="bg-clr-900 absolute -top-4 -right-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white shadow-lg">
                            <Sparkles className="size-4" />
                            <span>{t("codeBadge")}</span>
                        </div>

                        {/* Background decoration */}
                        <div className="bg-clr-100 absolute top-8 left-8 -z-10 h-full w-full rounded-2xl"></div>
                    </div>

                    {/* Right: Differences list */}
                    <div className="space-y-6">
                        {differences.map((item, index) => {
                            return (
                                <div key={index} className="group relative">
                                    <div className="flex gap-4 rounded-xl border border-transparent bg-white p-5">
                                        <div className="bg-clr-100 text-clr-700 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                                            <IconContainer
                                                Icon={getLucideIcon(item.icon)}
                                                variant="ghost"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-clr-900 mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-clr-500 mb-2 text-sm">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="bg-clr-900 rounded-full px-2.5 py-1 text-white">
                                                    {item.our}
                                                </span>
                                                <span className="text-clr-400">vs</span>
                                                <span className="bg-clr-100 text-clr-500 rounded-full px-2.5 py-1 line-through">
                                                    {item.other}
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
                <div className="border-clr-100 bg-clr-50 mt-16 rounded-2xl border p-6 sm:p-8">
                    <div className="grid gap-6 text-center sm:grid-cols-3">
                        <div>
                            <div className="text-clr-900 mb-1 text-2xl sm:text-3xl">
                                {t("stats.0.value")}
                            </div>
                            <div className="text-clr-500 text-sm">
                                {t("stats.0.label")}
                            </div>
                        </div>
                        <div className="sm:border-clr-200 sm:border-x">
                            <div className="text-clr-900 mb-1 text-2xl sm:text-3xl">
                                {t("stats.1.value")}
                            </div>
                            <div className="text-clr-500 text-sm">
                                {t("stats.1.label")}
                            </div>
                        </div>
                        <div>
                            <div className="text-clr-900 mb-1 text-2xl sm:text-3xl">
                                {t("stats.2.value")}
                            </div>
                            <div className="text-clr-500 text-sm">
                                {t("stats.2.label")}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContent>
        </Section>
    );
}
