"use client";

import Dither from "../Dither";
import Page from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import { HomeComparison } from "../sections/HomeComparison";
import { HandCrafted } from "../sections/HomeCrafted";
import { HomeCtaFooter } from "../sections/HomeCtaFooter";
import { HomeFeatures } from "../sections/HomeFeatures";
import { HomeHero } from "../sections/HomeHero";
import { HomePackages } from "../sections/HomePackages";
import { HomeShowcase } from "../sections/HomeShowcase";
import { HomeSolutions } from "../sections/HomeSolutions";
import { HomeWhyUs } from "../sections/HomeWhyUs";
import { Separator } from "../ui/separator";

export default function HomePage() {
    return (
        <Page>
            <div className="relative w-full">
                <div className="bg-brand absolute inset-0 -z-10">
                    <Dither
                        waveColor={[0, 1, 1]}
                        disableAnimation={false}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                    />
                </div>
                <div className="absolute inset-0 -z-5 bg-linear-to-b from-white/100 to-white/20" />

                <HomeHero />
                <HomeFeatures />
            </div>
            <Separator decorative />
            <HomeAbout />
            <Separator decorative />
            <HandCrafted />
            <Separator decorative />
            <HomeWhyUs />
            <Separator decorative />
            <HomeShowcase />
            <Separator decorative />
            <HomeSolutions />
            <Separator decorative />
            <HomePackages />
            <Separator decorative />
            <HomeComparison />
            <Separator decorative />
            <HomeCtaFooter />
        </Page>
    );
}
