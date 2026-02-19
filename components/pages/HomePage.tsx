"use client";

import Dither from "../Dither";
import Page from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import { HomeComparison } from "../sections/HomeComparison";
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
            <div className="relative flex min-h-screen w-full flex-col justify-between gap-40">
                <div className="bg-brand absolute inset-0 -z-10">
                    <Dither
                        waveColor={[0.1, 0.9, 1]}
                        disableAnimation={false}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                    />
                </div>
                {/* Vertical white gradient overlay */}
                <div className="absolute inset-0 -z-5 [background:linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,.8)_20%,rgba(255,255,255,0.5)_35%,rgba(255,255,255,0.2)_70%,rgba(255,255,255,.2)_85%,rgba(255,255,255,.5)_100%)]" />

                {/* Elliptical white-to-transparent gradient overlay */}
                <div className="pointer-events-none absolute inset-0 -z-5 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_55%,rgba(255,255,255,1)_100%)]" />

                <HomeHero />
                <div className="relative h-full pb-30">
                    <HomeFeatures />

                    {/* <div className="bg-brand-800 absolute inset-0 -z-4 bg-linear-to-b" /> */}
                    <div className="absolute inset-0 -z-6 [background:linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_40%,rgba(255,255,255,0.5)_65%,rgba(255,255,255,.85)_85%,rgba(255,255,255)_100%)]" />

                    {/* <div className="absolute inset-0 -z-4 bg-linear-to-b from-white/0 to-white/100" /> */}
                </div>
            </div>
            {/* <Separator decorative /> */}

            {/* <Separator decorative /> */}
            {/* <HandCrafted /> */}
            <Separator decorative />
            <HomeAbout />
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
