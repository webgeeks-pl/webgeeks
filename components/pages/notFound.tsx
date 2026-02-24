import { Link } from "@/i18n/navigation";
import FuzzyText from "../FuzzyText";
import { Button } from "../ui/button";

export default function NotFoundPage() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-white px-4 text-center">
            <FuzzyText color="#000">404</FuzzyText>
            <p className="text-lg text-gray-600">Strona nie została znaleziona.</p>
            <Button variant="default">
                <Link href="/">Wróć do strony głównej</Link>
            </Button>
        </div>
    );
}
