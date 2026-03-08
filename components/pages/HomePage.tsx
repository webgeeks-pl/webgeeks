import { HomeShowcase } from "@/components/sections/HomeShowcase";
import Page from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import { HomeCtaFooter } from "../sections/HomeCtaFooter";
import HomeExample from "../sections/HomeExample";
import { HomeHero } from "../sections/HomeHero";
import { HomePackages } from "../sections/HomePackages";
import { HomeSolutions } from "../sections/HomeSolutions";
import HomeStart from "../sections/HomeStart";
import { Separator } from "../ui/separator";

export default function HomePage() {
    return (
        <Page id="home-start">
            <HomeHero />
            <HomeExample />

            <HomeAbout />
            <HomeStart />
            {/* <HomeWhyUs /> */}
            <HomeShowcase />
            <HomePackages />
            <Separator decorative />
            <HomeSolutions />
            <Separator decorative />
            <HomeCtaFooter />
        </Page>
    );
}
