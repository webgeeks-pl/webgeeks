import fs from "fs";
import path from "path";

const localesDir = path.resolve(process.cwd(), "node_modules/zod/v4/locales");

function prune() {
    return;
    if (!fs.existsSync(localesDir)) {
        console.warn("zod locales directory not found:", localesDir);
        return;
    }

    const keep = new Set(["en.js", "index.js", "en.cjs", "index.cjs"]);

    const entries = fs.readdirSync(localesDir);
    for (const name of entries) {
        const lower = name.toLowerCase();
        const full = path.join(localesDir, name);
        // Only remove JS/CJS files (leave .d.ts and other artifacts intact)
        if ((lower.endsWith(".js") || lower.endsWith(".cjs")) && !keep.has(name)) {
            try {
                fs.unlinkSync(full);
                console.log("Removed zod locale file:", name);
            } catch (err) {
                console.warn("Failed to remove", full, err.message);
            }
        }
    }
}

prune();
