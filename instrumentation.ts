import { runValidateMessages } from "./scripts/validateMessages";

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // Run only in development
        if (process.env.NODE_ENV === "development") {
            runValidateMessages();
        }
    }
}
