export const messagesConfig = {
    common: "common.json",
    pages: {
        home: "pages/home.json",
    },
} as const;

export const routingConfig = {
    // A list of all locales that are supported
    locales: ["en", "pl"],
    localePrefix: "as-needed",
    // Used when no locale matches
    defaultLocale: "pl",
} as const;
