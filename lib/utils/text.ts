import { HARD_SPACE_WORDS } from "@constants";


export function applyHardSpaceBreaks(
    text: string,
    hardSpaceWords: string[] = HARD_SPACE_WORDS
): string {
    const nbsp = "\u00A0";
    const words = text.split(" ");
    let targetWordIndex: number = -2;
    const processedWords = words.map((word, i) => {
        if (hardSpaceWords.includes(word)) {
            targetWordIndex = i;
            return "";
        }
        if (targetWordIndex === i - 1) {
            const bindedWords = words[targetWordIndex] + nbsp + word;
            targetWordIndex = -1;
            return bindedWords;
        }
        return word;
    });
    return processedWords.join(" ");
}