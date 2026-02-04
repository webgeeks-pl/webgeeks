"use client";

import { Page } from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import { HomeComparison } from "../sections/HomeComparison";
import { HomeCtaFooter } from "../sections/HomeCtaFooter";
import { HomeHero } from "../sections/HomeHero";
import { HomePackages } from "../sections/HomePackages";
import { HomeShowcase } from "../sections/HomeShowcase";
import { HomeSolutions } from "../sections/HomeSolutions";
import { HomeWhyUs } from "../sections/HomeWhyUs";
import { HeroParallax } from "../ui/hero-parallax";
import { Separator } from "../ui/separator";
export const products = [
    {
        title: "Moonbeam",
        link: "https://gomoonbeam.com",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
        title: "Cursor",
        link: "https://cursor.so",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
        title: "Rogue",
        link: "https://userogue.com",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },

    {
        title: "Editorially",
        link: "https://editorially.org",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
        title: "Editrix AI",
        link: "https://editrix.ai",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
        title: "Pixel Perfect",
        link: "https://app.pixelperfect.quest",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },

    {
        title: "Algochurn",
        link: "https://algochurn.com",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
        title: "Aceternity UI",
        link: "https://ui.aceternity.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
        title: "Tailwind Master Kit",
        link: "https://tailwindmasterkit.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
        title: "SmartBridge",
        link: "https://smartbridgetech.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
        title: "Renderwork Studio",
        link: "https://renderwork.studio",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },

    {
        title: "Creme Digital",
        link: "https://cremedigital.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
        title: "Golden Bells Academy",
        link: "https://goldenbellsacademy.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
        title: "Invoker Labs",
        link: "https://invoker.lol",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
        title: "E Free Invoice",
        link: "https://efreeinvoice.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
];

export default function HomePage() {
    console.log("Rendering HomePage");
    return (
        <Page>
            {/* <div className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-white/20" />
                </div>
            </div> */}
            {/* <div className="conic-bg absolute inset-0 z-0" /> */}
            {/* <HomeHero /> */}
            {/* <HomeFeatures /> */}
            <HeroParallax
                products={products}
                className="h-[240vh] sm:h-[220vh] lg:h-[220vh]"
            />
            <HomeHero />
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
            <HomeComparison />
            <Separator decorative />
            <HomeCtaFooter />
        </Page>
    );
}
