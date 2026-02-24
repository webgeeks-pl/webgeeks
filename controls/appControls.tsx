import { AnimationProvider } from "@/context/AnimationContext";
import NavigationProvider from "@/context/navigationContext";
import { BasicComponentProps } from "@types";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
export default function AppControls({ children }: BasicComponentProps) {
    return (
        <>
            <AnimationProvider>
                <NavigationProvider>
                    <NextIntlClientProvider>
                        <>{children}</>
                    </NextIntlClientProvider>
                </NavigationProvider>
            </AnimationProvider>
            <SpeedInsights />
            {/* <LenisControls /> */}
        </>
    );
}
