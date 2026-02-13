import { HARD_SPACE_WORDS } from "@constants";

export function applyHardSpaceBreaks(
    text: string,
    hardSpaceWords: string[] = HARD_SPACE_WORDS
): string {
    const nbsp = "\u00A0";
    const words = text.split(" ");
    const processedWords = words.map((word, i) => {
        const isCurrTargetWord = hardSpaceWords.includes(word);
        if (i === words.length) return word;
        if (isCurrTargetWord) {
            return word + nbsp;
        }
        return word + " ";
    });
    return processedWords.join("");
}
