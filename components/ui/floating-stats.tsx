"use client";
import { DollarSign, Eye, Share, ShoppingCart, ThumbsUp, User } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

const icons = [User, ThumbsUp, Eye, DollarSign, Share, ShoppingCart];

interface FloatingStatProps {
    id: string;
    icon: React.ElementType;
    initialDelay: number;
    duration: number;
    value: number;
}

function FloatingStat({
    id,
    icon: Icon,
    initialDelay,
    duration,
    value,
}: FloatingStatProps) {
    const seededRandom = useCallback(
        (seed: number) => {
            const x = Math.sin(seed * 12345 + value + Math.PI) * 10000;
            return x - Math.floor(x);
        },
        [value]
    );

    const [cycle, setCycle] = useState(0);

    const leftPosition = 12 + seededRandom(cycle * 73) * 76;
    const bottomStart = 5 + seededRandom(cycle * 149) * 55;
    const driftX = (seededRandom(cycle * 31 + value) - 0.5) * 12;

    const cycleDelay =
        cycle === 0 ? initialDelay : 0.2 + seededRandom(cycle * 17 + value) * 0.9;

    return (
        <div
            className="absolute"
            style={{ left: `${leftPosition}%`, bottom: `${bottomStart}%` }}
        >
            <motion.div
                className="text-muted-foreground flex items-center gap-1 text-xs"
                initial={{ y: 0, x: 0, scale: 0.6, opacity: 0, filter: "blur(3px)" }}
                animate={{
                    y: [0, "-50%", "-100%"],
                    x: [0, driftX, 0],
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0, 1, 0],
                    filter: ["blur(3px)", "blur(0px)", "blur(3px)"],
                }}
                transition={{
                    duration,
                    delay: cycleDelay,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                }}
                onAnimationComplete={() => setCycle((c) => c + 1)}
                key={`${id}-${cycle}`}
            >
                <Icon size={14} />
                <span className="text-xs font-medium tabular-nums">{value}</span>
            </motion.div>
        </div>
    );
}

export function FloatingStats() {
    // 12 elementów w 3 grupach czasowych
    const items = icons.map((icon, i) => {
        const idx = i * 2;
        const group = idx % 3;
        return {
            id: `stat-${i}`,
            icon,
            initialDelay: group * 1.1 + ((idx * 0.37) % 0.9),
            duration: 3.2 + (idx % 5) * 0.35,
            value: 100 + i * 30 * 15,
        };
    });

    return (
        <div className="relative h-full w-full overflow-hidden">
            {items.map((item) => (
                <FloatingStat key={item.id} {...item} />
            ))}
        </div>
    );
}
