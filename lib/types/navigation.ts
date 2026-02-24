import type { RouteKey } from "@/config/i18n";

export interface NavigationRoutesEntry {
    link: RouteKey;
    name: string;
    exact?: boolean;
    cta?: boolean;
}

export type NavigationRoutes = NavigationRoutesEntry[];
