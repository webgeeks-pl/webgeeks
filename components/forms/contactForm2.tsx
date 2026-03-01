"use client";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTrans } from "@/hooks/useTrans";
import { Link } from "@/i18n/navigation";
import type {
    BooleanInput,
    EmailInput,
    FormInputs,
    OptionInput,
    Package,
    PrivacyPolicyInput,
    QuestionInput,
} from "@/lib/utils/form";
import { sendEmail } from "@/services/email/action";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Select as SelectPrimitive } from "radix-ui";
import { useCallback, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface ContactFormProps {
    id?: string;
    inputs: FormInputs[];
}

type FormValues = Record<string, string | boolean>;

export default function ContactForm2({ id, inputs }: ContactFormProps) {
    const params = useSearchParams();
    // const pageT = useTrans("pages.offer");
    // const packages = useTrans("offer").obj("packages");

    // const inputs: FormInputs[] = [
    //     createQuestion({
    //         _key: "name",
    //         name: "Imię",
    //         isRequired: true,
    //         className: "max-lg:col-span-2",
    //         icon: "user",
    //     }),
    //     createEmail({
    //         _key: "email",
    //         name: "Email",
    //         isRequired: true,
    //         className: "max-lg:col-span-2",
    //         icon: "mail",
    //     }),
    //     createOfferOption({
    //         _key: "selected_offer",
    //         name: "Wybierz pakiet",
    //         isRequired: true,
    //         optionsTitle1: pageT("packages.marketingPackagesTitle"),
    //         optionsTitle2: pageT("packages.specialPackagesTitle"),
    //         options_1: packages.filter((pkg) => pkg.category === "marketing"),
    //         options_2: packages.filter((pkg) => pkg.category === "special"),
    //         options_0: [
    //             {
    //                 key: "DIY",
    //                 name: "Nie jestem zdecydowany",
    //                 icon: "message-circle-question-mark",
    //                 price: "do ustalenia",
    //                 subtitle: "",
    //                 isPopular: "false",
    //                 priceDetails: "",
    //                 description: "",
    //                 category: "",
    //                 features: {
    //                     main: [],
    //                 },
    //             },
    //         ],
    //         className: "col-span-2",
    //     }),
    //     createQuestion({
    //         _key: "message",
    //         name: "Wiadomość",
    //         isRequired: true,
    //         isLong: true,
    //         className: "col-span-2",
    //         icon: "message-square",
    //     }),
    //     createPrivacyPolicy({
    //         _key: "privacy_policy",
    //         name: "Akceptuję %link% i wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi mojego zapytania.",
    //         isRequired: true,
    //         link: "/polityka-prywatnosci",
    //         className: "col-span-2",
    //     }),
    // ];

    const t = useTrans("pages.contact.form");

    const defaultValues = useMemo(
        () => buildDefaultValues(inputs, params.get("offer")),
        [inputs, params]
    );

    const [values, setValues] = useState<FormValues>(defaultValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setValue = useCallback((key: string, value: string | boolean) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    }, []);

    function validateAll(): Record<string, string> {
        const errs: Record<string, string> = {};

        for (const field of inputs) {
            const key = field._key;
            const value = values[key];

            switch (field._type) {
                case "question":
                    if (field.isRequired && String(value || "").trim().length === 0) {
                        errs[key] = t("required");
                    }
                    break;
                case "option":
                    if (field.isRequired && String(value || "").trim().length === 0) {
                        errs[key] = t("required");
                    }
                    break;
                case "boolean":
                case "privacy_policy":
                    if (field.isRequired && value !== true) {
                        errs[key] = t("required");
                    }
                    break;
                case "email": {
                    const emailVal = String(value || "").trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (field.isRequired && emailVal.length === 0) {
                        errs[key] = t("required");
                    } else if (emailVal.length > 0 && !emailRegex.test(emailVal)) {
                        errs[key] = t("invalidEmail");
                    }
                    break;
                }
            }
        }

        return errs;
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        const validation = validateAll();
        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            toast.error(t("error"));
            return;
        }

        setIsSubmitting(true);

        const emailData: EmailData[] = [];
        for (const field of inputs) {
            const value = values[field._key];
            const question = field.name;

            if (field._type === "boolean") {
                emailData.push({ question, answer: value ? "Tak" : "Nie" });
                continue;
            }

            emailData.push({ question, answer: String(value ?? "") });
        }

        const userName = String(values["name"]) || "Contact Form";
        const userEmail = String(values["email"]) || "formularz@webgeeks.pl";

        try {
            const response = await toast.promise(
                sendEmail(userName, userEmail, emailData),
                {
                    pending: t("submitting"),
                    success: t("success"),
                    error: t("error"),
                }
            );

            if (response?.success) {
                setValues(defaultValues);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <form
                method="POST"
                id={id}
                onSubmit={(e) => void handleSubmit(e)}
                className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
                {inputs.map((field) => (
                    <FieldGroup
                        data-invalid={!!errors[field._key]}
                        className={field.className}
                        key={field._key}
                    >
                        {field._type === "question" && (
                            <QuestionField2
                                field={field}
                                value={String(values[field._key] ?? "")}
                                onChange={(v) => setValue(field._key, v)}
                                error={errors[field._key]}
                            />
                        )}

                        {field._type === "option" && (
                            <SingleChoiceField2
                                field={field}
                                value={String(values[field._key] ?? "")}
                                onChange={(v) => setValue(field._key, v)}
                                error={errors[field._key]}
                            />
                        )}

                        {field._type === "boolean" && (
                            <BoolField2
                                field={field}
                                checked={!!values[field._key]}
                                onChange={(v) => setValue(field._key, v)}
                                error={errors[field._key]}
                            />
                        )}

                        {field._type === "privacy_policy" && (
                            <PrivacyPolicyField2
                                field={field}
                                checked={!!values[field._key]}
                                onChange={(v) => setValue(field._key, v)}
                                error={errors[field._key]}
                            />
                        )}

                        {field._type === "email" && (
                            <EmailField2
                                field={field}
                                value={String(values[field._key] ?? "")}
                                onChange={(v) => setValue(field._key, v)}
                                error={errors[field._key]}
                            />
                        )}
                    </FieldGroup>
                ))}

                <Field
                    orientation="horizontal"
                    className="col-span-2 flex justify-end lg:col-start-2"
                >
                    <Button
                        size="sm"
                        type="submit"
                        disabled={isSubmitting}
                        variant="cta"
                        className="disabled:bg-clr-400! h-13 w-full cursor-pointer! gap-3 rounded-xl"
                        onClick={(e) => void handleSubmit(e)}
                    >
                        <Send className="h-3.5 w-3.5" />
                        {isSubmitting ? t("submitting") : t("submit")}
                    </Button>
                </Field>
            </form>
        </>
    );
}

function QuestionField2({
    field,
    value,
    onChange,
    error,
}: {
    field: QuestionInput;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <>
            {field.isLong ? (
                <Field className="relative">
                    {field.Icon}
                    {/* <LucideIcon
                        name={field.icon || "file-question-mark"}
                        className={`text-muted-foreground absolute top-6.5 left-3.5 h-5! w-5! -translate-y-1/2`}
                    /> */}
                    <Textarea
                        value={value}
                        id={field._key}
                        rows={7}
                        placeholder={field.name + (field.isRequired ? " *" : "")}
                        aria-required={field.isRequired}
                        aria-label={field.name}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </Field>
            ) : (
                <Field className="relative">
                    {field.Icon}
                    {/* <LucideIcon
                        name={field.icon || "file-question-mark"}
                        className="text-muted-foreground absolute top-1/2 left-3.5 h-5! w-5! -translate-y-1/2"
                    /> */}
                    <Input
                        value={value}
                        id={field._key}
                        placeholder={field.name + (field.isRequired ? " *" : "")}
                        aria-required={field.isRequired}
                        aria-label={field.name}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </Field>
            )}
            {error && <div className="text-destructive mt-1 text-sm">{error}</div>}
        </>
    );
}

// function QuestionField2({
//     field,
//     value,
//     onChange,
//     error,
// }: {
//     field: QuestionInput;
//     value: string;
//     onChange: (v: string) => void;
//     error?: string;
// }) {
//     return (
//         <IconFieldWrapper2 iconName={field.icon} isLong={field.isLong}>
//             {field.isLong ? (
//                 <Textarea
//                     value={value}
//                     id={field._key}
//                     rows={7}
//                     placeholder={field.name + (field.isRequired ? " *" : "")}
//                     aria-required={field.isRequired}
//                     aria-label={field.name}
//                     onChange={(e) => onChange(e.target.value)}
//                 />
//             ) : (
//                 <Input
//                     value={value}
//                     id={field._key}
//                     placeholder={field.name + (field.isRequired ? " *" : "")}
//                     aria-required={field.isRequired}
//                     aria-label={field.name}
//                     onChange={(e) => onChange(e.target.value)}
//                 />
//             )}
//             {error && <div className="text-destructive mt-1 text-sm">{error}</div>}
//         </IconFieldWrapper2>
//     );
// }

function EmailField2({
    field,
    value,
    onChange,
    error,
}: {
    field: EmailInput;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <Field className="relative">
            {field.Icon}
            {/* <LucideIcon
                name={field.icon || "file-question-mark"}
                className="text-muted-foreground absolute top-1/2 left-3.5 h-5! w-5! -translate-y-1/2"
            /> */}
            <Input
                type="email"
                value={value}
                id={field._key}
                placeholder={field.name + (field.isRequired ? " *" : "")}
                aria-required={field.isRequired}
                aria-label={field.name}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <div className="text-destructive mt-1 text-sm">{error}</div>}
        </Field>
    );
}

function SingleChoiceField2({
    field,
    value,
    onChange,
    error,
}: {
    field: OptionInput;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    const selectedOption = [
        ...field.options_0,
        ...field.options_1,
        ...field.options_2,
    ]?.find((o) => o.key === value);

    return (
        <Field>
            <Select
                required={field.isRequired}
                onValueChange={(v) => onChange(v)}
                value={String(value)}
            >
                <SelectTrigger className="data-placeholder:text-clr-400 relative">
                    <div className="absolute left-2.5">
                        {selectedOption?.Icon ?? <></>}
                        {/* <LucideIcon
                            name={selectedOption?.icon || "file-question-mark"}
                            className="absolute top-1/2 left-0.5 h-5! w-5! -translate-y-1/2"
                        /> */}
                    </div>

                    <div className="flex w-full items-center">
                        <div className="flex h-6 min-w-0 flex-1 items-center gap-2">
                            <SelectValue
                                className="truncate"
                                placeholder={field.name + (field.isRequired ? " *" : "")}
                            >
                                {selectedOption?.name ??
                                    field.name + (field.isRequired ? " *" : "")}
                            </SelectValue>
                        </div>

                        {selectedOption?.price && (
                            <Text
                                intent="small"
                                muted
                                as="span"
                                className="ml-3 shrink-0 whitespace-nowrap"
                            >
                                {selectedOption.price}
                            </Text>
                        )}
                    </div>
                </SelectTrigger>

                <SelectContent position="popper">
                    <SelectGroup>
                        {field.options_0?.map((opt, i) => (
                            <SelectCustomItem2
                                key={i}
                                option={opt}
                                onSelect={() => onChange(opt.key)}
                            />
                        ))}
                        <SelectLabel className="bg-clr-100">
                            {field.optionsTitle1}
                        </SelectLabel>

                        {field.options_1?.map((opt, i) => (
                            <SelectCustomItem2
                                key={i}
                                option={opt}
                                onSelect={() => onChange(opt.key)}
                            />
                        ))}

                        <SelectLabel className="bg-clr-100">
                            {field.optionsTitle2}
                        </SelectLabel>

                        {field.options_2?.map((opt, i) => (
                            <SelectCustomItem2
                                key={i}
                                option={opt}
                                onSelect={() => onChange(opt.key)}
                            />
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && <div className="text-destructive mt-1 text-sm">{error}</div>}
        </Field>
    );
}

function BoolField2({
    field,
    checked,
    onChange,
    error,
}: {
    field: BooleanInput;
    checked: boolean;
    onChange: (v: boolean) => void;
    error?: string;
}) {
    return (
        <Field orientation="horizontal">
            <Checkbox
                id={field._key}
                checked={!!checked}
                aria-labelledby={field._key}
                onCheckedChange={(c) => onChange(c === true)}
            />

            <FieldLabel htmlFor={field._key} id={field._key} className="text-clr-600">
                {field.name}
                {field.isRequired && " *"}
            </FieldLabel>
            {error && <div className="text-destructive mt-1 text-sm">{error}</div>}
        </Field>
    );
}

function PrivacyPolicyField2({
    field,
    checked,
    onChange,
    error,
}: {
    field: PrivacyPolicyInput;
    checked: boolean;
    onChange: (v: boolean) => void;
    error?: string;
}) {
    const parts = field.name.split("%link%");

    return (
        <Field orientation="horizontal" className="flex flex-row items-start">
            <Checkbox
                id={field._key}
                checked={!!checked}
                aria-labelledby={field._key}
                className="mt-1 cursor-pointer!"
                onCheckedChange={(c) => onChange(c === true)}
            />

            <FieldLabel htmlFor={field._key} id={field._key} className="text-clr-500">
                <span className="leading-relaxed">
                    {parts[0]}
                    <Link
                        href="/polityka-prywatnosci"
                        target="_blank"
                        className="text-brand cursor-pointer! underline"
                    >
                        {"politykę prywatności"}
                    </Link>{" "}
                    {parts[1]}
                    {field.isRequired && " *"}
                </span>
            </FieldLabel>
            {error && <div className="text-destructive mt-1 text-sm">{error}</div>}
        </Field>
    );
}

function SelectCustomItem2({
    option,
    onSelect,
}: {
    option: Package;
    onSelect: () => void;
}) {
    return (
        <SelectItem
            value={option.key}
            className="group flex items-center"
            onClick={onSelect}
        >
            <div className="relative flex w-full items-center">
                {option.Icon}
                {/* <LucideIcon
                    name={option.icon || "file-question-mark"}
                    className="absolute top-1/2 left-0.5 h-5! w-5! -translate-y-1/2"
                /> */}
                <SelectPrimitive.ItemText asChild>
                    <span className="flex items-center gap-2 truncate pl-8">
                        <span className="min-w-0 truncate">{option.name}</span>
                        {option.isPopular === "true" && (
                            <span className="bg-brand text-clr-100 inline-flex items-center rounded-full px-2 py-0.5 text-xs leading-none">
                                <Text intent="small" color="opposite" as="span">
                                    Polecany
                                </Text>
                            </span>
                        )}
                    </span>
                </SelectPrimitive.ItemText>

                <Text
                    intent="small"
                    muted
                    as="span"
                    className="group-data-[state=checked]:text-clr-100 ml-auto pr-6 whitespace-nowrap"
                >
                    {option.price}
                </Text>
            </div>
        </SelectItem>
    );
}

function buildDefaultValues(inputs: FormInputs[], optionDefault: string | null) {
    const defaults: FormValues = {};

    for (const field of inputs) {
        switch (field._type) {
            case "question":
                defaults[field._key] = "";
                break;
            case "option":
                defaults[field._key] = optionDefault || field.options_0?.[0]?.key || "";
                break;
            case "boolean":
            case "privacy_policy":
                defaults[field._key] = false;
                break;
            case "email":
                defaults[field._key] = "";
                break;
        }
    }

    return defaults;
}

type EmailData = {
    question: string;
    answer: string;
};
