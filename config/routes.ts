import { NavigationRoutes } from "@/lib/types";

export const routes: NavigationRoutes = [
    { link: "/" },
    // { link: "/about" },
    { link: "/offer" },
    // { link: "/portfolio" },
    // { link: "/process" },
    // { link: "/templates" },
    { link: "/contact" },
    // { link: "/testimonials" },
    {
        link: "/contact",
        cta: true,
    },
];

export const legalRoutes: NavigationRoutes = [
    { link: "/privacy-policy" },
    {
        link: "/terms-of-service",
    },
];
