import { useTranslations } from "next-intl";

export interface Feature {
    name: string;
    description: string;
}

export interface Package {
    key: string;
    name: string;
    icon: string;
    price: string;
    description: string;
    category: string;
    features: {
        main: Feature[];
        additional: Feature[];
    };
}

export function useAllPackages(): Package[] {
    const t = useTranslations("offer.packages");

    return [
        {
            key: "onePage",
            name: t("onePage.name"),
            icon: t("onePage.icon"),
            price: t("onePage.price"),
            description: t("onePage.description"),
            category: t("onePage.category"),
            features: t.raw("onePage.features") as {
                main: Feature[];
                additional: Feature[];
            },
        },
        {
            key: "starter",
            name: t("starter.name"),
            icon: t("starter.icon"),
            price: t("starter.price"),
            description: t("starter.description"),
            category: t("starter.category"),
            features: t.raw("starter.features") as {
                main: Feature[];
                additional: Feature[];
            },
        },
        {
            key: "business",
            name: t("business.name"),
            icon: t("business.icon"),
            price: t("business.price"),
            description: t("business.description"),
            category: t("business.category"),
            features: t.raw("business.features") as {
                main: Feature[];
                additional: Feature[];
            },
        },
        {
            key: "enterprise",
            name: t("enterprise.name"),
            icon: t("enterprise.icon"),
            price: t("enterprise.price"),
            description: t("enterprise.description"),
            category: t("enterprise.category"),
            features: t.raw("enterprise.features") as {
                main: Feature[];
                additional: Feature[];
            },
        },
        {
            key: "webapp",
            name: t("webapp.name"),
            icon: t("webapp.icon"),
            price: t("webapp.price"),
            description: t("webapp.description"),
            category: t("webapp.category"),
            features: t.raw("webapp.features") as {
                main: Feature[];
                additional: Feature[];
            },
        },
        {
            key: "ecommerce",
            name: t("ecommerce.name"),
            icon: t("ecommerce.icon"),
            price: t("ecommerce.price"),
            description: t("ecommerce.description"),
            category: t("ecommerce.category"),
            features: t.raw("ecommerce.features") as {
                main: Feature[];
                additional: Feature[];
            },
        },
    ];
}
