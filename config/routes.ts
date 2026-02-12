import { NavigationRoutes } from "@/lib/types";

export const routes: NavigationRoutes = [
    { link: "/", name: "Strona główna" },
    // { link: "/about" },
    { link: "/offer", name: "Oferta" },
    // { link: "/portfolio" },
    // { link: "/process" },
    // { link: "/templates" },
    { link: "/contact", name: "Kontakt" },
    { link: "/templates", name: "Szablony" },
    // { link: "/testimonials" },
    {
        name: "Skontaktuj się z nami",
        link: "/contact",
        cta: true,
    },
];

export const footerRoutes = {
    links: [],
    contacts: [],
    legal: [],
};

export const legalRoutes: NavigationRoutes = [
    { link: "/privacy-policy", name: "Polityka prywatności" },
    {
        link: "/terms-of-service",
        name: "Warunki korzystania z usługi",
    },
];
