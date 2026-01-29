import { notFound } from "next/navigation";

export async function getMessages(locale: string) {
    try {
        return {
            common: await import(`../messages/${locale}/common.json`),
            pages: {
                home: await import(`../messages/${locale}/pages/home.json`),
            },
        };
    } catch {
        notFound();
    }
}
