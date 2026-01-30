export interface NavigationRoutesEntry {
    link: string;
    exact?: boolean;
    cta?: boolean;
}

export type NavigationRoutes = NavigationRoutesEntry[];
