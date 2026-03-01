"use client";

import {
    createContext,
    RefObject,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";

interface Props {
    children: React.ReactNode;
}

interface Context {
    isNavOpen: boolean;
    setIsNavOpen: (value: boolean) => void;
    openNav: () => void;
    closeNav: () => void;
    toggleNav: () => void;
    scrollRef: RefObject<number>;
    headerRef: RefObject<HTMLDivElement | null>;
}

export const NavigationContext = createContext<Context>({
    isNavOpen: false,
    setIsNavOpen: () => {},
    openNav: () => {},
    closeNav: () => {},
    toggleNav: () => {},
    scrollRef: { current: 0 },
    headerRef: { current: null },
});

export default function NavigationProvider({ children }: Props) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const scrollRef = useRef(0);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const openNav = useCallback(() => setIsNavOpen(true), []);
    const closeNav = useCallback(() => setIsNavOpen(false), []);
    const toggleNav = useCallback(() => setIsNavOpen((x) => !x), []);

    // useEffect(() => {
    //     if (isNavOpen) {
    //         const scrollY = window.scrollY;
    //         document.body.style.position = "fixed";
    //         document.body.style.top = `-${scrollY}px`;
    //         document.body.style.width = "100%";
    //     } else {
    //         const scrollY = document.body.style.top;
    //         document.body.style.position = "";
    //         document.body.style.top = "";
    //         window.scrollTo(0, parseInt(scrollY || "0") * -1);
    //     }
    // }, [isNavOpen]);

    const value = useMemo(() => {
        return {
            isNavOpen,
            setIsNavOpen,
            openNav,
            closeNav,
            toggleNav,
            scrollRef,
            headerRef,
        };
    }, [isNavOpen, setIsNavOpen, openNav, closeNav, toggleNav, scrollRef, headerRef]);

    return <NavigationContext value={value}>{children}</NavigationContext>;
}

export function useNavigation() {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error("useNavigation must be used within NavigationProvider");
    return ctx;
}
