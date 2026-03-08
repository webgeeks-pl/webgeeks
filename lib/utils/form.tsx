import LucideIcon from "@/components/ui/lucideIcons";
import { useTrans } from "@/hooks/useTrans";
import type {
    EmailInput,
    FormInputs,
    OptionInput,
    PrivacyPolicyInput,
    QuestionInput,
} from "@/lib/types/form";

export default function CreateInputs(): FormInputs[] {
    const pageT = useTrans("pages.offer");
    const packages = useTrans("offer").obj("packages");

    return [
        createQuestion({
            _key: "name",
            name: "Imię",
            isRequired: true,
            className: "max-lg:col-span-2",
            icon: "User",
            Icon: (
                <LucideIcon
                    name="User"
                    className="text-muted-foreground absolute top-1/2 left-3.5 h-5! w-5! -translate-y-1/2"
                />
            ),
        }),
        createEmail({
            _key: "email",
            name: "Email",
            isRequired: true,
            className: "max-lg:col-span-2",
            icon: "Mail",
            Icon: (
                <LucideIcon
                    name="Mail"
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
                            name="MessageCircleQuestionMark"
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
                    name="MessageSquare"
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
