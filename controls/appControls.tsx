import { BasicComponentProps } from "@types";
import { NextIntlClientProvider } from "next-intl";

export default function AppControls({ children }: BasicComponentProps) {
    return (
        <>
            <NextIntlClientProvider>
                <>{children}</>
            </NextIntlClientProvider>
            {/* <LenisControls /> */}
        </>
    );
}
