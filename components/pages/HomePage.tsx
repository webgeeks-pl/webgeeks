import Page from "../layout/page";
import { HomeAbout } from "../sections/HomeAbout";
import HomeExample from "../sections/HomeExample";
import { HomeHero } from "../sections/HomeHero";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";

const HomeStart = dynamic(() => import("../sections/HomeStart"));
const HomeShowcase = dynamic(() =>
    import("../sections/HomeShowcase").then((m) => ({ default: m.HomeShowcase }))
);
const HomePackages = dynamic(() =>
    import("../sections/HomePackages").then((m) => ({ default: m.HomePackages }))
);
const HomeSolutions = dynamic(() =>
    import("../sections/HomeSolutions").then((m) => ({ default: m.HomeSolutions }))
);
const HomeCtaFooter = dynamic(() =>
    import("../sections/HomeCtaFooter").then((m) => ({ default: m.HomeCtaFooter }))
);

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
