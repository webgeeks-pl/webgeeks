"use client";

import { useSearchParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { Accordion } from "./accordion";

export default function OfferAccordion({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const searchParams = useSearchParams();
    const offerParam = searchParams.get("offer");

    const [expandedValue, setExpandedValue] = useState<Key | null>(null);

    useEffect(() => {
        if (offerParam) {
            setExpandedValue(offerParam);
        } else {
            setExpandedValue(null);
        }
    }, [offerParam]);

    const handleValueChange = (value: Key | null) => {
        setExpandedValue(value);
    };

    return (
        <Accordion
            expandedValue={expandedValue}
            onValueChange={handleValueChange}
            className={className}
        >
            {children}
        </Accordion>
    );
}
