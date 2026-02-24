import common from "@/messages/pl/common.json";
import offer from "@/messages/pl/offer.json";
import contact from "@/messages/pl/pages/contact.json";
import demo from "@/messages/pl/pages/demo.json";
import home from "@/messages/pl/pages/home.json";
import templates from "@/messages/pl/pages/templates.json";

export const messagesDirStructure = {
    common: "common.json",
    offer: "offer.json",
    pages: {
        home: "pages/home.json",
        offer: "pages/offer.json",
        contact: "pages/contact.json",
        demo: "pages/demo.json",
        templates: "pages/templates.json",
    },
} as const;

export type MessagesMap = {
    common: typeof common;
    offer: typeof offer;
    pages: {
        home: typeof home;
        offer: typeof offer;
        contact: typeof contact;
        demo: typeof demo;
        templates: typeof templates;
    };
};

export type RouteKey = keyof MessagesMap["common"]["navigation"]["routes"];

export const routingConfig = {
    locales: ["pl"],
    localePrefix: "as-needed",
    defaultLocale: "pl",
} as const;

declare module "next-intl" {
    interface AppConfig {
        // Automatically use the structure of your default messages
        Messages: MessagesMap;
    }
}
