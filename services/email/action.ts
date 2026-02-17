"use server";

import { EmailTemplate } from "@/services/email/template";
import { render } from "@react-email/render";
import { randomUUID } from "crypto";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

interface EmailField {
    question: string;
    answer: string;
}

const resend = getResendObject();

const RESEND_TO = process.env.RESEND_TO_EMAIL || "webgeeks_pl@proton.me";

export async function sendEmail(userName: string, userEmail: string, data: EmailField[]) {
    const t = await getTranslations("pages.contact.form");

    if (!resend) {
        return {
            success: false,
            message: t("error"),
        };
    }

    try {
        const uniqueId = randomUUID().replace(/-/g, "").substring(0, 16);

        const { error } = await resend.emails.send({
            from: `${userName} <formularz+${uniqueId}@webkrakow.pl>`,
            to: RESEND_TO,
            subject: "Nowa wiadomość z formularza kontaktowego",
            html: await render(EmailTemplate({ data })),
            replyTo: userEmail,
        });

        if (error) {
            console.error("(Resend) Form message sending error:", error);
            return { success: false, message: t("error") };
        }

        return { success: true, message: t("success") };
    } catch (error) {
        console.error("Form message sending error:", error);
        return {
            success: false,
            message: t("error"),
        };
    }
}

function getResendObject(): Resend | null {
    try {
        return new Resend(process.env.RESEND_API_KEY);
    } catch (error) {
        console.error("Resend initialization error: ", error);
        return null;
    }
}
