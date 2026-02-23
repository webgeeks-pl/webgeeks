"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useTrans } from "@/hooks/useTrans";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Page from "../layout/page";
import Section, { SectionContent, SectionLead, SectionTitle } from "../layout/section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

// Template data structure

// Sample templates - you can move this to a constants file later

export default function TemplatesPage() {
    const t = useTrans("pages.templates");
    const templates = t.obj("templates");
    const categories = t.obj("categories");
    const tCommon = useTrans("common");
    tCommon("button.submit");

    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
    const isMobile = useIsMobile();

    const filteredTemplates =
        selectedCategory === "Wszystkie"
            ? templates
            : templates.filter((t) => t.category === selectedCategory);

    return (
        <Page>
            {/* Templates Gallery */}
            <Section className="py-size-xl">
                <SectionContent className="gap-size-xl">
                    <div className="space-y-3 text-center">
                        <SectionTitle>{t("pageTitle")}</SectionTitle>
                        <SectionLead className="mx-auto max-w-2xl">
                            {t("pageLead")}
                        </SectionLead>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={String(category)}
                                variant={
                                    selectedCategory === category ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(String(category))}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Templates Grid */}
                    <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTemplates.map((template) => (
                            <Card
                                key={template.id}
                                size="sm"
                                className="w-full overflow-hidden pt-0!"
                            >
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <Image
                                        fill
                                        src={template.desktopImage}
                                        alt={template.name}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0" /> */}
                                </div>
                                <CardHeader className="space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <CardTitle className="text-xl">
                                            {template.name}
                                        </CardTitle>
                                        <Badge variant="outline" className="shrink-0">
                                            {template.category}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {template.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="w-full space-y-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {template.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                {template.demoUrl && (
                                    <CardFooter className="w-full">
                                        <div className="xs:flex-row flex w-full flex-col gap-2">
                                            <Button
                                                asChild
                                                variant="secondary"
                                                className="xs:flex-1"
                                            >
                                                <Link
                                                    href={template.demoUrl}
                                                    target="_blank"
                                                >
                                                    Link{" "}
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            {!isMobile && (
                                                <Button
                                                    className="xs:flex-1 w-full"
                                                    asChild
                                                >
                                                    <a
                                                        href={`/templates/demo?template=${template.id}`}
                                                    >
                                                        Demo
                                                        <ArrowRight className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-muted-foreground py-12 text-center">
                            {t("notFound")}
                        </div>
                    )}
                </SectionContent>
            </Section>

            <Separator decorative />

            {/* CTA Section */}
            <Section className="py-size-2xl bg-brand">
                <SectionContent className="gap-size-lg text-center">
                    <div className="mx-auto max-w-3xl space-y-4">
                        <SectionTitle className="text-3xl sm:text-4xl">
                            {t("cta.title")}
                        </SectionTitle>
                        <SectionLead className="text-lg">
                            {t("cta.description")}
                        </SectionLead>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/contact">
                                {t("cta.buttons.primary")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/offer">{t("cta.buttons.secondary")}</Link>
                        </Button>
                    </div>
                </SectionContent>
            </Section>
        </Page>
    );
}
