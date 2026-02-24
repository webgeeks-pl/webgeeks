"use client";

import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import DotBackground from "./dotBackground";
import { GridBackground } from "./gridBackground";

export function AnimatedBackgroundSwitcher() {
    const [showGrid, setShowGrid] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowGrid((prev) => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 1 }}
                animate={{ opacity: showGrid ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <GridBackground />
            </motion.div>

            <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: showGrid ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <DotBackground />
            </motion.div>
        </>
    );
}
