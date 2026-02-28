"use client";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import SendIcon from "@/components/ui/icons/SendIcon";
import { Input } from "@/components/ui/input";
import { getLucideIcon } from "@/components/ui/lucideIcons";
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
import type { MessagesMap } from "@/config/i18n";
import type { TransFor } from "@/hooks/useTrans";
import { useTrans } from "@/hooks/useTrans";
import { Link } from "@/i18n/navigation";
import { sendEmail } from "@/services/email/action";
import { useSearchParams } from "next/navigation";
import { Select as SelectPrimitive } from "radix-ui";
import { useState } from "react";
import {
    Controller,
    useForm,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldValues, type Resolver
} from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
// import { z, type ZodBoolean, type ZodString } from "zod";
import * as z from "zod/v4-mini";
import IconContainer from "../ui/iconContainer";

interface ContactFormProps {
    id?: string;
}

interface EmailData {
    question: string;
    answer: string;
}

export default function ContactForm({ id }: ContactFormProps) {
    const params = useSearchParams();
    const pageT = useTrans("pages.offer");
    const packages = useTrans("offer").obj("packages");

    const inputs: FormInputs[] = [
        createQuestion({
            _key: "name",
            name: "Imię",
            isRequired: true,
            className: "max-lg:col-span-2",
            icon: "User",
        }),
        createEmail({
            _key: "email",
            name: "Email",
            isRequired: true,
            className: "max-lg:col-span-2",
            icon: "Mail",
        }),
        createOfferOption({
            _key: "selected_offer",
            name: "Wybierz pakiet",
            isRequired: true,
            optionsTitle1: pageT("packages.marketingPackagesTitle"),
            optionsTitle2: pageT("packages.specialPackagesTitle"),
            // optionsTitle3: t("packages.otherPackagesTitle"),
            options_1: packages.filter((pkg) => pkg.category === "marketing"),
            options_2: packages.filter((pkg) => pkg.category === "special"),
            options_0: [
                {
                    key: "DIY",
                    name: "Nie jestem zdecydowany",
                    icon: "MessageCircleQuestionMark",
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
            icon: "MessageSquare",
        }),
        createPrivacyPolicy({
            _key: "privacy_policy",
            name: "Akceptuję %link% i wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi mojego zapytania.",
            isRequired: true,
            link: "/polityka-prywatnosci",
            className: "col-span-2",
        }),
    ];
    const t = useTrans("pages.contact.form");

    const schema = buildFormSchema(inputs, t);
    const defaultValues = buildDefaultValues(inputs, params.get("offer"));

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<FormValues>({
        resolver: standardResolver(schema),
        defaultValues,
        mode: "onChange",
        reValidateMode: "onChange",
        values: defaultValues, // Wymusza synchronizację wartości
    });

    const handleSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        const emailData: EmailData[] = [];

        for (const field of inputs) {
            const value = data[field._key];
            const question = field.name;

            if (field._type === "boolean") {
                emailData.push({
                    question,
                    answer: value ? "Tak" : "Nie",
                });
                continue;
            }

            emailData.push({
                question,
                answer: String(value),
            });
        }

        const userName = String(data["name"]) || "Contact Form";
        const userEmail = String(data["email"]) || "formularz@webgeeks.pl";

        const response = await toast.promise(sendEmail(userName, userEmail, emailData), {
            pending: t("submitting"),
            success: t("success"),
            error: t("error"),
        });

        setIsSubmitting(false);
        if (response.success) form.reset();
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <form
                method="POST"
                id={id}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
                {inputs.map((field: FormInputs) => (
                    <Controller
                        key={field._key}
                        name={field._key}
                        control={form.control}
                        render={({ field: fieldProps, fieldState }) =>
                            fieldRenderer({ field, fieldProps, fieldState })
                        }
                    />
                ))}

                <Field
                    orientation="horizontal"
                    className="col-span-2 flex justify-end lg:col-start-2"
                >
                    <Button
                        size="sm"
                        type="submit"
                        form={id}
                        disabled={isSubmitting || !form.formState.isValid}
                        variant="cta"
                        className="disabled:bg-clr-400! h-13 w-full cursor-pointer! gap-3 rounded-xl"
                    >
                        <SendIcon className="h-3.5 w-3.5" />
                        {isSubmitting ? t("submitting") : t("submit")}
                    </Button>
                </Field>
            </form>
        </>
    );
}

function standardResolver<T extends FieldValues>(
  schema: z.ZodMiniType<T>,
): Resolver<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF Resolver type is overly strict
  return (async (values: any) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const fieldErrors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) {
        fieldErrors[path] = {
          type: issue.code,
          message: issue.message,
        };
      }
    }

    return { values: {} as T, errors: fieldErrors };
  }) as unknown as Resolver<T>;
}

interface FieldRendererProps {
    field: FormInputs;
    fieldProps: ControllerRenderProps<FormValues, string>;
    fieldState: ControllerFieldState;
}

function fieldRenderer({ field, fieldProps, fieldState }: FieldRendererProps) {
    return (
        <FieldGroup data-invalid={fieldState.invalid} className={field.className}>
            {field._type === "question" && (
                <QuestionField
                    field={field}
                    fieldProps={fieldProps}
                    fieldState={fieldState}
                />
            )}

            {field._type === "option" && (
                <SingleChoiceField
                    field={field}
                    fieldProps={fieldProps}
                    fieldState={fieldState}
                />
            )}

            {field._type === "boolean" && (
                <BoolField
                    field={field}
                    fieldProps={fieldProps}
                    fieldState={fieldState}
                />
            )}

            {field._type === "privacy_policy" && (
                <PrivacyPolicyField
                    field={field}
                    fieldProps={fieldProps}
                    fieldState={fieldState}
                />
            )}

            {field._type === "email" && (
                <EmailField
                    field={field}
                    fieldProps={fieldProps}
                    fieldState={fieldState}
                />
            )}

            {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </FieldGroup>
    );
}

type QuestionFieldProps = Omit<FieldRendererProps, "field"> & {
    field: QuestionInput;
};

function QuestionField({ field, fieldProps, fieldState }: QuestionFieldProps) {
    return (
        <IconFieldWrapper iconName={field.icon} isLong={field.isLong}>
            {field.isLong ? (
                <Textarea
                    {...fieldProps}
                    value={String(fieldProps.value ?? "")}
                    id={field._key}
                    rows={7}
                    placeholder={field.name + (field.isRequired ? " *" : "")}
                    aria-required={field.isRequired}
                    aria-invalid={fieldState.invalid}
                    aria-label={field.name}
                />
            ) : (
                <Input
                    {...fieldProps}
                    value={String(fieldProps.value ?? "")}
                    id={field._key}
                    placeholder={field.name + (field.isRequired ? " *" : "")}
                    aria-required={field.isRequired}
                    aria-invalid={fieldState.invalid}
                    aria-label={field.name}
                />
            )}
        </IconFieldWrapper>
    );
}

interface EmailFieldProps extends Omit<FieldRendererProps, "field"> {
    field: EmailInput;
}

function EmailField({ field, fieldProps, fieldState }: EmailFieldProps) {
    return (
        <IconFieldWrapper iconName={field.icon}>
            <Input
                type="email"
                {...fieldProps}
                value={String(fieldProps.value ?? "")}
                id={field._key}
                placeholder={field.name + (field.isRequired ? " *" : "")}
                aria-required={field.isRequired}
                aria-invalid={fieldState.invalid}
                aria-label={field.name}
            />
        </IconFieldWrapper>
    );
}

type ChoiceFieldProps = Omit<FieldRendererProps, "field"> & {
    field: OptionInput;
};

function SingleChoiceField({ field, fieldProps }: ChoiceFieldProps) {
    const selectedOption = [
        ...field.options_0,
        ...field.options_1,
        ...field.options_2,
    ]?.find((o) => o.key === fieldProps.value);

    return (
        <Field>
            <Select
                required={field.isRequired}
                onValueChange={(value) => fieldProps.onChange(value)}
                value={String(fieldProps.value)}
            >
                <SelectTrigger className="data-placeholder:text-clr-400 relative">
                    <div className="absolute top-1/2 left-3 h-fit w-fit -translate-y-1/2">
                        {(() => {
                            const SelectedIcon = getLucideIcon(
                                selectedOption?.icon || "QuestionMark"
                            );
                            return (
                                <IconContainer
                                    variant={"none"}
                                    IconComp={<SelectedIcon className="w-5 h-5 p-0!" />}
                                    size={"form"}
                                    className="w-5 h-5 p-0!"
                                />
                            );
                        })()}
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
                            {selectedOption?.isPopular === "true" && (
                                <span className="bg-brand text-clr-100 inline-flex items-center rounded-full px-2 py-0.5 text-xs leading-none">
                                    <Text intent="small" color="opposite" as="span">
                                        Polecany
                                    </Text>
                                </span>
                            )}
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
                            <SelectCustomItem key={i} option={opt} />
                        ))}
                        <SelectLabel className="bg-clr-100">
                            {field.optionsTitle1}
                        </SelectLabel>

                        {field.options_1?.map((opt, i) => (
                            <SelectCustomItem key={i} option={opt} />
                        ))}

                        <SelectLabel className="bg-clr-100">
                            {field.optionsTitle2}
                        </SelectLabel>

                        {field.options_2?.map((opt, i) => (
                            <SelectCustomItem key={i} option={opt} />
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    );
}

function BoolField({ field, fieldProps, fieldState }: FieldRendererProps) {
    return (
        <Field orientation="horizontal">
            <Checkbox
                id={field._key}
                checked={!!fieldProps.value}
                aria-invalid={fieldState.invalid}
                aria-labelledby={field._key}
                onCheckedChange={(checked) => fieldProps.onChange(checked === true)}
            />

            <FieldLabel htmlFor={field._key} id={field._key} className="text-clr-600">
                {field.name}
                {field.isRequired && " *"}
            </FieldLabel>
        </Field>
    );
}

type PrivacyPolicyFieldProps = Omit<FieldRendererProps, "field"> & {
    field: PrivacyPolicyInput;
};

function PrivacyPolicyField({ field, fieldProps, fieldState }: PrivacyPolicyFieldProps) {
    const parts = field.name.split("%link%");

    return (
        <Field orientation="horizontal" className="flex flex-row items-start">
            <Checkbox
                id={field._key}
                checked={!!fieldProps.value}
                aria-invalid={fieldState.invalid}
                aria-labelledby={field._key}
                className="mt-1 cursor-pointer!"
                onCheckedChange={(checked) => fieldProps.onChange(checked === true)}
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
        </Field>
    );
}

function IconFieldWrapper({
    iconName,
    isLong,
    children,
}: {
    iconName?: string;
    isLong?: boolean;
    children: React.ReactNode;
}) {
    return (
        <Field className="relative">
            <div
                className={`absolute left-1.5 h-fit! w-fit! ${
                    isLong ? "top-2" : "top-1/2 -translate-y-1/2"
                }`}
            >
                {(() => {
                    const FieldIcon = getLucideIcon(iconName || "QuestionMark");
                    return (
                        <IconContainer
                            variant={"none"}
                            IconComp={<FieldIcon className="text-muted-foreground" />}
                            className="text-muted-foreground"
                            size={"form"}
                        />
                    );
                })()}
            </div>
            {children}
        </Field>
    );
}

function SelectCustomItem({ option }: { option: Package }) {
    return (
        <SelectItem value={option.key} className="group flex items-center">
            <div className="relative flex w-full items-center">
                {(() => {
                    const OptIcon = getLucideIcon(option.icon || "QuestionMark");
                    return (
                        <IconContainer
                            variant={"none"}
                            IconComp={<OptIcon className="absolute -ml-2" />}
                            size={"form"}
                            className="absolute -ml-2"
                        />
                    );
                })()}
                {/* <Icon className="absolute top-1/2 left-0.5 h-5 w-5 -translate-y-1/2" /> */}

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

function buildFormSchema(inputs: FormInputs[], t: TransFor<"pages.contact.form">) {
    const shape: Record<string, z.ZodMiniString | z.ZodMiniBoolean> = {};

    for (const field of inputs) {
        const key = field._key;

        switch (field._type) {
            case "question":
                shape[key] = field.isRequired
                    ? z.string().check(z.minLength(1, { message: t("required") }))
                    : z.string();
                break;
            case "option":
                shape[key] = field.isRequired
                    ? z.string().check(z.minLength(1, { message: t("required") }))
                    : z.string();
                break;

            case "boolean":
            case "privacy_policy":
                shape[key] = field.isRequired
                    ? z.boolean().check(z.refine((val) => val === true, { message: t("required") }))
                    : z.boolean();
                break;

            case "email": {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                let emailSchema = z.string();

                if (field.isRequired) {
                     shape[key] = emailSchema.check(z.minLength(1, { message: t("required") }), z.refine((val) => emailRegex.test(val), { message: t("invalidEmail") }) );
                } else {
                    shape[key] = emailSchema.check(z.refine((val) => emailRegex.test(val), { message: t("invalidEmail") }) );
                }

                break;
            }
        }
    }

    return z.object(shape);
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
                // const searchParams = useSearchParams();
                // if (searchParams.has("offer")) {
                //     const offerKey = searchParams.get("offer")!;
                //     defaults[field._key] = offerKey;
                // } else {
                //     defaults[field._key] = field.options_1?.[0]?.key ?? "";
                // }
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

type FormInput = {
    _key: string;
    _type: string;
    name: string;
    isRequired: boolean;
    placeholder?: string;
    className?: string;
    icon?: string;
};

export type Package = MessagesMap["offer"] extends { packages: (infer U)[] }
    ? U
    : never;

type QuestionInput = {
    _type: "question";
    isLong?: boolean;
} & FormInput;

type EmailInput = {
    _type: "email";
} & FormInput;

type BooleanInput = {
    _type: "boolean";
} & FormInput;

type PrivacyPolicyInput = {
    _type: "privacy_policy";
    link: string;
} & FormInput;

type OptionInput = Omit<FormInput, "icon"> & {
    _type: "option";
    optionsTitle1: string;
    optionsTitle2: string;
    // optionsTitle3: string;
    options_1: Package[];
    options_2: Package[];
    options_0: Package[];
};

type FormInputs =
    | QuestionInput
    | EmailInput
    | BooleanInput
    | OptionInput
    | PrivacyPolicyInput;

export type FormValues = Record<string, string | boolean>;

function createQuestion(input: Omit<QuestionInput, "_type">): QuestionInput {
    return { ...input, _type: "question" };
}

function createEmail(input: Omit<EmailInput, "_type">): EmailInput {
    return { ...input, _type: "email" };
}

// function createBoolean(input: Omit<BooleanInput, "_type">): BooleanInput {
//     return { ...input, _type: "boolean" };
// }

function createOfferOption(input: Omit<OptionInput, "_type">): OptionInput {
    return { ...input, _type: "option" };
}

function createPrivacyPolicy(
    input: Omit<PrivacyPolicyInput, "_type">
): PrivacyPolicyInput {
    return { ...input, _type: "privacy_policy" };
}
