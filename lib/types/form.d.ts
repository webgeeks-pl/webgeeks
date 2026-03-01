import type { MessagesMap } from "@/config/i18n";

type MessagesPackage = MessagesMap["offer"] extends { packages: (infer U)[] } ? U : never;
export type Package = Omit<MessagesPackage, "icon"> & { Icon: JSX.Element };

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
