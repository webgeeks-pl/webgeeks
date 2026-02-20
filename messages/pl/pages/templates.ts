export interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    desktopImage: string;
    mobileImage?: string;
    demoUrl?: string;
    features: string[];
}
