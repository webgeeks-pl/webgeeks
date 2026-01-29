import { BasicComponentProps } from "@types";
import { NextIntlClientProvider } from "next-intl";

interface AppControlsProps extends BasicComponentProps {}

export default function AppControls({ children }: AppControlsProps) {
    return (
        <NextIntlClientProvider>
            <>{children}</>
        </NextIntlClientProvider>
    );
}
