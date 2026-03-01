import LucideIcon from "@/components/ui/lucideIcons";
import type { MessagesMap } from "@/config/i18n";
import { useTrans } from "@/hooks/useTrans";
import type { JSX } from "react";

type FormInput = {
    _key: string;
    _type: string;
    name: string;
    isRequired: boolean;
    placeholder?: string;
    className?: string;
    icon?: string;
    Icon?: JSX.Element;
};

export type Package = Omit<MessagesPackage, "icon"> & { Icon: JSX.Element };
type MessagesPackage = MessagesMap["offer"] extends { packages: (infer U)[] } ? U : never;

export type QuestionInput = { _type: "question"; isLong?: boolean } & FormInput;
export type EmailInput = { _type: "email" } & FormInput;
export type BooleanInput = { _type: "boolean" } & FormInput;
export type PrivacyPolicyInput = { _type: "privacy_policy"; link: string } & FormInput;

export type OptionInput = Omit<FormInput, "icon"> & {
    _type: "option";
    optionsTitle1: string;
    optionsTitle2: string;
    options_1: Package[];
    options_2: Package[];
    options_0: Package[];
};

export type FormInputs =
    | QuestionInput
    | EmailInput
    | BooleanInput
    | OptionInput
    | PrivacyPolicyInput;

export default function CreateInputs(): FormInputs[] {
    const pageT = useTrans("pages.offer");
    const packages = useTrans("offer").obj("packages");

    return [
        createQuestion({
            _key: "name",
            name: "Imię",
            isRequired: true,
            className: "max-lg:col-span-2",
            icon: "user",
            Icon: (
                <LucideIcon
                    name="user"
                    className="text-muted-foreground absolute top-1/2 left-3.5 h-5! w-5! -translate-y-1/2"
                />
            ),
        }),
        createEmail({
            _key: "email",
            name: "Email",
            isRequired: true,
            className: "max-lg:col-span-2",
            icon: "mail",
            Icon: (
                <LucideIcon
                    name="mail"
                    className="text-muted-foreground absolute top-1/2 left-3.5 h-5! w-5! -translate-y-1/2"
                />
            ),
        }),
        createOfferOption({
            _key: "selected_offer",
            name: "Wybierz pakiet",
            isRequired: true,
            optionsTitle1: pageT("packages.marketingPackagesTitle"),
            optionsTitle2: pageT("packages.specialPackagesTitle"),
            options_1: packages
                .filter((pkg) => pkg.category === "marketing")
                .map((pkg) => ({
                    ...pkg,
                    Icon: (
                        <LucideIcon
                            name={pkg.icon}
                            className="absolute top-1/2 left-0.5 h-5! w-5! -translate-y-1/2"
                        />
                    ),
                })),
            options_2: packages
                .filter((pkg) => pkg.category === "special")
                .map((pkg) => ({
                    ...pkg,
                    Icon: (
                        <LucideIcon
                            name={pkg.icon}
                            className="absolute top-1/2 left-0.5 h-5! w-5! -translate-y-1/2"
                        />
                    ),
                })),
            options_0: [
                {
                    key: "DIY",
                    name: "Nie jestem zdecydowany",
                    Icon: (
                        <LucideIcon
                            name="message-circle-question-mark"
                            className="absolute top-1/2 left-0.5 h-5! w-5! -translate-y-1/2"
                        />
                    ),
                    price: "do ustalenia",
                    subtitle: "",
                    isPopular: "false",
                    priceDetails: "",
                    description: "",
                    category: "",
                    features: {
                        main: [],
                    },
                },
            ],
            className: "col-span-2",
        }),
        createQuestion({
            _key: "message",
            name: "Wiadomość",
            isRequired: true,
            isLong: true,
            className: "col-span-2",
            icon: "message-square",
            Icon: (
                <LucideIcon
                    name="message-square"
                    className="text-muted-foreground absolute top-6.5 left-3.5 h-5! w-5! -translate-y-1/2"
                />
            ),
        }),
        createPrivacyPolicy({
            _key: "privacy_policy",
            name: "Akceptuję %link% i wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi mojego zapytania.",
            isRequired: true,
            link: "/polityka-prywatnosci",
            className: "col-span-2",
        }),
    ];
}

function createQuestion(input: Omit<QuestionInput, "_type">): QuestionInput {
    return { ...input, _type: "question" };
}

function createEmail(input: Omit<EmailInput, "_type">): EmailInput {
    return { ...input, _type: "email" };
}

function createOfferOption(input: Omit<OptionInput, "_type">): OptionInput {
    return { ...input, _type: "option" };
}

function createPrivacyPolicy(
    input: Omit<PrivacyPolicyInput, "_type">
): PrivacyPolicyInput {
    return { ...input, _type: "privacy_policy" };
}
