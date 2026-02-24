import { useTrans } from "./useTrans";

export interface Feature {
    name: string;
    description: string;
}

export interface AdditionalFeature extends Feature {
    price: string;
    recommended?: string;
}

export interface Package {
    key: string;
    isPopular?: string;
    name: string;
    icon: string;
    price: string;
    description: string;
    category: string;
    features: {
        main: Feature[];
        additional: AdditionalFeature[];
    };
}

export function useAllPackages() {
    const t = useTrans("offer");
    const packages = t.obj("packages");
    console.log("Packages:", packages);
    return packages;
}
