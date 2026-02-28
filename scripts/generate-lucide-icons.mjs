#!/usr/bin/env node
import fs from "fs";
import * as lucide from "lucide-react";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Default icons to always include
const ICONS = new Set([
    "User",
    "Mail",
    "MessageSquare",
    "MessageCircleQuestionMark",
    "QuestionMark",
    "Send",
    "FileQuestionMark",
    // icons referenced directly in code
    "ThumbsUp",
    "Eye",
    "Share",
]);

// Convert set to array for iteration below
const ICON_LIST = Array.from(ICONS);

const outDir = path.resolve(process.cwd(), "components/ui/icons");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function transformToJsx(svg) {
    return svg
        .replace(/stroke-width=/g, "strokeWidth=")
        .replace(/stroke-linecap=/g, "strokeLinecap=")
        .replace(/stroke-linejoin=/g, "strokeLinejoin=")
        .replace(/fill-rule=/g, "fillRule=")
        .replace(/clip-rule=/g, "clipRule=")
        .replace(/class=/g, "className=")
        .replace(/stroke-opacity=/g, "strokeOpacity=")
        .replace(/fill-opacity=/g, "fillOpacity=")
        .replace(/xmlns:xlink=/g, "xmlnsXlink=")
        .replace(/xlink:href=/g, "xlinkHref=");
}

for (const name of ICON_LIST) {
    const Icon = lucide[name];
    if (!Icon) {
        console.warn(`Icon ${name} not found in lucide-react, skipping.`);
        continue;
    }

    const svg = renderToStaticMarkup(React.createElement(Icon, { width: 24, height: 24 }));
    const jsx = transformToJsx(svg);
    // inject {...props} into the opening svg tag
    const jsxWithProps = jsx.replace(/^<svg/, "<svg {...props}");

    const componentName = `${name}Icon`;
    const fileContent = `import React from "react";

export default function ${componentName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${jsxWithProps}
  );
}
`;

    const outPath = path.join(outDir, `${componentName}.tsx`);
    fs.writeFileSync(outPath, fileContent, "utf8");
    console.log(`Generated ${outPath}`);
}

// Build an index file that exports ICON_MAP automatically
const files = fs.readdirSync(outDir).filter((f) => f.endsWith("Icon.tsx"));
const imports = files
    .map((f, i) => {
        const name = path.basename(f, ".tsx");
        return `import ${name} from "./${name}";`;
    })
    .join("\n");

const entries = files
    .map((f) => {
        const base = path.basename(f, ".tsx");
        const key = base.replace(/Icon$/, "");
        return `  ${JSON.stringify(key)}: ${base},`;
    })
    .join("\n");

const indexContent = `import React from "react";
${imports}

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
${entries}
};

export default ICON_MAP;
`;

fs.writeFileSync(path.join(outDir, "index.tsx"), indexContent, "utf8");
console.log(`Wrote index.tsx with ${files.length} icons.`);

console.log("Done generating icons.");
