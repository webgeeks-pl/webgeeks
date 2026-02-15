// "use client";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { getLucideIcon } from "@/components/ui/lucideIcons";
// import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
// import { Textarea } from "@/components/ui/textarea";
// import { sendEmail } from "@/services/email/action";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import {
//     Controller,
//     useForm,
//     type ControllerFieldState,
//     type ControllerRenderProps,
// } from "react-hook-form";
// import { toast, ToastContainer } from "react-toastify";
// import { z } from "zod";

// type FormInput = {
//     _key: string;
//     _type: string;
//     name: string;
//     isRequired: boolean;
//     styles?: InputStyles;
// };

// type QuestionInput = {
//     _type: "question";
//     isLong: boolean;
// } & FormInput;

// type EmailInput = {
//     _type: "email";
// } & FormInput;

// type BooleanInput = {
//     _type: "boolean";
// } & FormInput;

// type OptionInput = {
//     _type: "option";
//     options: Option[];
// } & FormInput;

// type Option = {
//     label: string;
//     value: string;
// };

// type InputStyles = {
//     wrapperClassName?: string;
//     labelClassName?: string;
//     inputClassName?: string;
//     errorClassName?: string;
//     icon?: string;
// };

// type FormInputs = QuestionInput | EmailInput | BooleanInput | OptionInput;

// export type FormValues = Record<string, any>;

// function createQuestion(input: Omit<QuestionInput, "_type">): QuestionInput {
//     return { ...input, _type: "question" };
// }

// function createEmail(input: Omit<EmailInput, "_type">): EmailInput {
//     return { ...input, _type: "email" };
// }

// function createBoolean(input: Omit<BooleanInput, "_type">): BooleanInput {
//     return { ...input, _type: "boolean" };
// }

// function createOption(input: Omit<OptionInput, "_type">): OptionInput {
//     return { ...input, _type: "option" };
// }

// const inputs: FormInputs[] = [
//     createQuestion({
//         _key: "name",
//         name: "Imię",
//         isRequired: true,
//         isLong: false,
//         styles: {
//             wrapperClassName: "max-lg:col-span-2",
//             icon: "User",
//         },
//     }),
//     createEmail({
//         _key: "email",
//         name: "Email",
//         isRequired: true,
//         styles: {
//             wrapperClassName: "max-lg:col-span-2",
//             icon: "User",
//         },
//     }),
//     createOption({
//         _key: "selected_offer",
//         name: "Wybrana oferta",
//         isRequired: true,
//         options: [
//             { label: "Nie wiem", value: "nac" }, // Not A Client
//             {
//                 label: "Landing page",
//                 value: "landing_page",
//             },
//             {
//                 label: "Starter",
//                 value: "starter",
//             },
//             {
//                 label: "Business",
//                 value: "business",
//             },
//             {
//                 label: "E-commerce",
//                 value: "ecommerce",
//             },
//             {
//                 label: "Applikacja webowa",
//                 value: "web_app",
//             },
//             {
//                 label: "Enterprise",
//                 value: "enterprise",
//             },
//         ],
//         styles: {
//             wrapperClassName: "col-span-2",
//         },
//     }),
//     createQuestion({
//         _key: "message",
//         name: "Wiadomość",
//         isRequired: true,
//         isLong: true,
//         styles: {
//             wrapperClassName: "col-span-2",
//             icon: "User",
//         },
//     }),
//     createBoolean({
//         _key: "consent",
//         name: "Zgadzam się na przetwarzanie danych (dodać link)",
//         isRequired: true,
//         styles: {
//             wrapperClassName: "col-span-2",
//         },
//     }),
// ];

// interface ContactFormProps {
//     id?: string;
// }

// export default function ContactForm({ id }: ContactFormProps) {
//     const t = useTranslations("pages.contact.form");

//     const schema = buildFormSchema(inputs, t);
//     const defaultValues = buildDefaultValues(inputs);

//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//     const form = useForm<FormValues>({
//         resolver: zodResolver(schema),
//         defaultValues,
//         values: defaultValues, // Wymusza synchronizację wartości
//     });

//     const handleSubmit = async (data: FormValues) => {
//         setIsSubmitting(true);
//         const emailData: Array<{ question: string; answer: string }> = [];

//         for (const field of inputs) {
//             const value = data[field._key];
//             const question = field.name;

//             if (field._type === "boolean") {
//                 emailData.push({
//                     question,
//                     answer: value ? "Tak" : "Nie",
//                 });
//                 continue;
//             }

//             emailData.push({
//                 question,
//                 answer: String(value),
//             });
//         }

//         const userName = data["name"] || "Contact Form";
//         const userEmail = data["email"] || "formularz@webgeeks.pl";

//         const response = await toast.promise(sendEmail(userName, userEmail, emailData), {
//             pending: t("submitting"),
//             success: t("success"),
//             error: t("error"),
//         });

//         setIsSubmitting(false);
//         if (response.success) form.reset();
//     };

//     return (
//         <>
//             <ToastContainer position="top-center" autoClose={3000} />
//             <form
//                 method="POST"
//                 id={id}
//                 onSubmit={form.handleSubmit(handleSubmit)}
//                 className="grid grid-cols-1 gap-8 md:grid-cols-2"
//             >
//                 {inputs.map((field: FormInputs) => (
//                     <Controller
//                         key={field._key}
//                         name={field._key}
//                         control={form.control}
//                         render={({ field: fieldProps, fieldState }) =>
//                             fieldRenderer({ field, fieldProps, fieldState })
//                         }
//                     />
//                 ))}

//                 <Field orientation="horizontal" className="md:col-span-2">
//                     <Button
//                         size="sm"
//                         type="submit"
//                         form={id}
//                         disabled={isSubmitting}
//                         variant="cta"
//                         className="w-full rounded-lg"
//                     >
//                         {isSubmitting ? t("submitting") : t("submit")}
//                     </Button>
//                 </Field>
//             </form>
//         </>
//     );
// }

// interface FieldRendererProps {
//     field: FormInputs;
//     fieldProps: ControllerRenderProps<FormValues, string>;
//     fieldState: ControllerFieldState;
// }

// function fieldRenderer({ field, fieldProps, fieldState }: FieldRendererProps) {
//     return (
//         <FieldGroup
//             data-invalid={fieldState.invalid}
//             className={field.styles?.wrapperClassName}
//         >
//             {field._type === "question" && (
//                 <QuestionField
//                     field={field}
//                     fieldProps={fieldProps}
//                     fieldState={fieldState}
//                 />
//             )}

//             {field._type === "option" && (
//                 <SingleChoiceField
//                     field={field}
//                     fieldProps={fieldProps}
//                     fieldState={fieldState}
//                 />
//             )}

//             {field._type === "boolean" && (
//                 <BoolField
//                     field={field}
//                     fieldProps={fieldProps}
//                     fieldState={fieldState}
//                 />
//             )}

//             {field._type === "email" && (
//                 <EmailField
//                     field={field}
//                     fieldProps={fieldProps}
//                     fieldState={fieldState}
//                 />
//             )}

//             {fieldState.invalid && (
//                 <FieldError
//                     errors={[fieldState.error]}
//                     className={field.styles?.errorClassName}
//                 />
//             )}
//         </FieldGroup>
//     );
// }

// function QuestionField({ field, fieldProps, fieldState }: FieldRendererProps) {
//     return (
//         <Field>
//             <FieldLabel
//                 htmlFor={field._key}
//                 id={field._key}
//                 className={field.styles?.labelClassName}
//             >
//                 {field.name}
//                 {field.isRequired && <span className="text-destructive ml-1">*</span>}
//             </FieldLabel>

//             <div className="relative">
//                 {(field as QuestionInput).isLong ? (
//                     <>
//                         <div className="absolute top-4 left-3.5 h-4 w-4">
//                             {(() => {
//                                 const Icon = getLucideIcon(
//                                     field.styles?.icon || "QuestionMark"
//                                 );
//                                 return <Icon className="text-muted-foreground h-5 w-5" />;
//                             })()}
//                         </div>
//                         <Textarea
//                             {...fieldProps}
//                             className={field.styles?.inputClassName}
//                             rows={7}
//                             id={field._key}
//                             aria-invalid={fieldState.invalid}
//                             aria-labelledby={field._key}
//                             aria-required={field.isRequired}
//                         />
//                     </>
//                 ) : (
//                     <>
//                         <div className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2">
//                             {(() => {
//                                 const Icon = getLucideIcon(
//                                     field.styles?.icon || "QuestionMark"
//                                 );
//                                 return <Icon className="text-muted-foreground h-5 w-5" />;
//                             })()}
//                         </div>
//                         <Input
//                             {...fieldProps}
//                             className={field.styles?.inputClassName}
//                             id={field._key}
//                             aria-required={field.isRequired}
//                             aria-labelledby={field._key}
//                             aria-invalid={fieldState.invalid}
//                         />
//                     </>
//                 )}
//             </div>
//         </Field>
//     );
// }

// type ChoiceFieldProps = FieldRendererProps & {
//     field: OptionInput;
// };

// function SingleChoiceField({ field, fieldProps, fieldState }: ChoiceFieldProps) {
//     return (
//         <Field>
//             <FieldLabel
//                 htmlFor={field._key}
//                 id={field._key}
//                 className={field.styles?.labelClassName}
//             >
//                 {field.name}
//                 {field.isRequired && <span className="text-destructive ml-1">*</span>}
//             </FieldLabel>
//             <NativeSelect
//                 className={field.styles?.inputClassName}
//                 required={field.isRequired}
//                 value={fieldProps.value}
//                 onChange={(e) => fieldProps.onChange(e.target.value)}
//                 aria-invalid={fieldState.invalid}
//                 wrapperClassName="w-full!"
//                 aria-labelledby={field._key}
//             >
//                 {field.options?.map((opt, i) => (
//                     <NativeSelectOption
//                         key={`${field._key}-${i}`}
//                         value={opt.value}
//                         label={opt.label}
//                         className="overflow-auto"
//                     />
//                 ))}
//             </NativeSelect>
//         </Field>
//     );
// }

// function BoolField({ field, fieldProps, fieldState }: FieldRendererProps) {
//     return (
//         <Field orientation="horizontal">
//             <Checkbox
//                 className={field.styles?.inputClassName}
//                 id={field._key}
//                 checked={fieldProps.value}
//                 aria-invalid={fieldState.invalid}
//                 aria-labelledby={field._key}
//                 onCheckedChange={(val) => fieldProps.onChange(val === true)}
//             />
//             <FieldLabel
//                 htmlFor={field._key}
//                 id={field._key}
//                 className={field.styles?.labelClassName}
//             >
//                 {field.name}
//                 {field.isRequired && <span className="text-destructive ml-1">*</span>}
//             </FieldLabel>
//         </Field>
//     );
// }

// function EmailField({ field, fieldProps, fieldState }: FieldRendererProps) {
//     return (
//         <Field>
//             <FieldLabel
//                 htmlFor={field._key}
//                 id={field._key}
//                 className={field.styles?.labelClassName}
//             >
//                 {field.name}
//                 {field.isRequired && <span className="text-destructive ml-1">*</span>}
//             </FieldLabel>
//             <div className="relative">
//                 <div className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2">
//                     {(() => {
//                         const Icon = getLucideIcon(field.styles?.icon || "QuestionMark");
//                         return <Icon className="text-muted-foreground h-5 w-5" />;
//                     })()}
//                 </div>
//                 <Input
//                     type="email"
//                     {...fieldProps}
//                     className={field.styles?.inputClassName}
//                     id={field._key}
//                     aria-required={field.isRequired}
//                     aria-labelledby={field._key}
//                     aria-invalid={fieldState.invalid}
//                 />
//             </div>
//         </Field>
//     );
// }

// function buildFormSchema(
//     inputs: FormInputs[],
//     t: (s: string) => string
// ): z.ZodObject<any, any> {
//     const shape: Record<string, z.ZodTypeAny> = {};

//     for (const field of inputs) {
//         const key = field._key;

//         switch (field._type) {
//             case "question":
//                 shape[key] = field.isRequired
//                     ? z.string().min(1, { message: t("required") })
//                     : z.string();
//                 break;
//             case "option":
//                 shape[key] = field.isRequired
//                     ? z.string().min(1, { message: t("required") })
//                     : z.string();
//                 break;

//             case "boolean":
//                 shape[key] = field.isRequired
//                     ? z.boolean().refine((v) => v === true, {
//                           message: t("required"),
//                       })
//                     : z.boolean();
//                 break;

//             case "email": {
//                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 let emailSchema = z.string();

//                 if (field.isRequired) {
//                     emailSchema = emailSchema.min(1, { message: t("required") });
//                 }

//                 shape[key] = emailSchema.refine(
//                     (value) => !value || emailRegex.test(value),
//                     { message: t("invalidEmail") }
//                 );
//                 break;
//             }
//         }
//     }

//     return z.object(shape);
// }

// function buildDefaultValues(inputs: FormInputs[]) {
//     const defaults: FormValues = {};

//     for (const field of inputs) {
//         switch (field._type) {
//             case "question":
//                 defaults[field._key] = "";
//                 break;

//             case "option":
//                 defaults[field._key] = field.options?.[0]?.value ?? "";
//                 break;

//             case "boolean":
//                 defaults[field._key] = false;
//                 break;

//             case "email":
//                 defaults[field._key] = "";
//                 break;
//         }
//     }

//     return defaults;
// }

interface ContactFormProps {
    id?: string;
}

export default function ContactForm({ id }: ContactFormProps) {
    return <> </>;
}
