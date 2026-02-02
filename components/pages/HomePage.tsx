"use client";

import { Page } from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import { HomeComparison } from "../sections/HomeComparison";
import { HomeCtaFooter } from "../sections/HomeCtaFooter";
import { HomeCustomOffer } from "../sections/HomeCustomOffer";
import { HomeFeatures } from "../sections/HomeFeatures";
import { HomeHero } from "../sections/HomeHero";
import { HomePackages } from "../sections/HomePackages";
import { HomeShowcase } from "../sections/HomeShowcase";
import { HomeSolutions } from "../sections/HomeSolutions";
import { HomeWhyUs } from "../sections/HomeWhyUs";
import { Separator } from "../ui/separator";

export default function HomePage() {
    console.log("Rendering HomePage");
    return (
        <Page>
            <HomeHero />
            <HomeFeatures />
            <Separator decorative />
            <HomeAbout />
            <Separator decorative />
            <HomeShowcase />
            <Separator decorative />
            <HomeWhyUs />
            <Separator decorative />
            <HomePackages />
            <Separator decorative />
            <HomeSolutions />
            <Separator decorative />
            <HomeCustomOffer />
            <Separator decorative />
            <HomeComparison />
            <Separator decorative />
            <HomeCtaFooter />
        </Page>
    );
}
