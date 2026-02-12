export const messagesDirStructure = {
    common: "common.json",
    packages: "packages.json",
    pages: {
        home: "pages/home.json",
    },
} as const;

export const routingConfig = {
    locales: ["en", "pl", "de"],
    localePrefix: "as-needed",
    defaultLocale: "pl",
} as const;
