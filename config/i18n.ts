export const messagesDirStructure = {
    common: "common.json",
    offer: "offer.json",
    pages: {
        home: "pages/home.json",
        offer: "pages/offer.json",
    },
} as const;

export const routingConfig = {
    locales: ["pl"],
    localePrefix: "as-needed",
    defaultLocale: "pl",
} as const;
