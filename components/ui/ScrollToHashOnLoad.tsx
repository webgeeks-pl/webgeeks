"use client";

import { useEffect } from "react";

export default function ScrollToHashOnLoad() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash || !hash.startsWith("#scroll-")) return;
        
        const id = hash.replace("#scroll-", "#");

        // Try immediately, then poll using requestAnimationFrame until element exists.
        let raf = 0;
        const tryScroll = () => {
            const el = document.querySelector(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            raf = requestAnimationFrame(tryScroll);
        };

        // First attempt in a microtask to be as fast as possible
        Promise.resolve().then(tryScroll);

        // Safety timeout: stop polling after 1 second
        const stop = setTimeout(() => cancelAnimationFrame(raf), 1000);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(stop);
        };
    }, []);

    return null;
}
