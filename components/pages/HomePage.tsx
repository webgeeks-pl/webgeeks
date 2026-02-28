import { HomeShowcase } from "@/components/sections/HomeShowcase";
import Dither from "../Dither";
import Page from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import { HomeCtaFooter } from "../sections/HomeCtaFooter";
import HomeExample from "../sections/HomeExample";
import { HomeHero } from "../sections/HomeHero";
import { HomePackages } from "../sections/HomePackages";
import { HomeSolutions } from "../sections/HomeSolutions";
import HomeStart from "../sections/HomeStart";
import { HomeWhyUs } from "../sections/HomeWhyUs";
import { Separator } from "../ui/separator";

export default function HomePage() {
    return (
        <Page id="home-start">
            <div className="relative flex min-h-screen w-full flex-col justify-between">
                <div className="bg-brand/20 absolute inset-0 -z-10">
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
                <div className="absolute inset-0 -z-5 [background:linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,.2)_20%,rgba(255,255,255,0)_35%,rgba(255,255,255,0)_70%,rgba(255,255,255,0)_85%,rgba(255,255,255,0)_100%)]" />

                <div className="absolute inset-0 -z-5 bg-white/10 lg:hidden" />

                {/* Elliptical white-to-transparent gradient overlay */}
                <div className="pointer-events-none absolute inset-0 -z-5 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_55%,rgba(255,255,255,.5)_75%,rgba(255,255,255,1)_100%)]" />

                {/* Elliptical gradient from top-left corner */}
                <div className="pointer-events-none absolute inset-0 -z-5 [background:radial-gradient(ellipse_at_top_left,rgba(255,255,255,1)_0%,rgba(255,255,255,.8)_25%,rgba(255,255,255,.25)_55%,rgba(255,255,255,0)_100%)]" />

                <HomeHero />
                <div className="relative h-full">
                    <HomeExample />

                    {/* <div className="bg-brand-800 absolute inset-0 -z-4 bg-linear-to-b" /> */}
                    <div className="absolute inset-0 -z-6 [background:linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_40%,rgba(255,255,255,0.5)_65%,rgba(255,255,255,.85)_85%,rgba(255,255,255)_100%)]" />

                    {/* <div className="absolute inset-0 -z-4 bg-linear-to-b from-white/0 to-white/100" /> */}
                </div>
            </div>
            {/* <Separator decorative /> */}

            {/* <Separator decorative /> */}
            {/* <HandCrafted /> */}
            {/* <HomeFeatures /> */}
            <HomeAbout />
            <HomeStart />
            <HomeWhyUs />
            <HomeShowcase />
            <HomePackages />
            <Separator decorative />
            <HomeSolutions />
            <Separator decorative />
            <HomeCtaFooter />
        </Page>
    );
}
