import ICON_MAP from "@/components/ui/icons";
import FileQuestionMarkIcon from "@/components/ui/icons/FileQuestionMarkIcon";

function normalizeName(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, "").trim();
}

export function getLucideIcon(name: string | null) {
  if (!name) return FileQuestionMarkIcon;

  const raw = String(name);
  const key = normalizeName(raw);

  // direct lookup
  if (ICON_MAP[key]) return ICON_MAP[key];

  // case-insensitive fallback: try to match ignoring case
  const lower = key.toLowerCase();
  for (const k of Object.keys(ICON_MAP)) {
    if (k.toLowerCase() === lower) return ICON_MAP[k];
  }

  return FileQuestionMarkIcon;
}

export default getLucideIcon;
