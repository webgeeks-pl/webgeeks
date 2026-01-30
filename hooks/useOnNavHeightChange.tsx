import { useNavigation } from "@/context/NavigationProvider";
import { useRef } from "react";
import useOnMount from "./useOnMount";
import useOnResize from "./useOnResize";

export function useOnNavHeightChange(
    callback: (height: number, isNavOpen: boolean) => void
) {
    const prevHeightRef = useRef(0);
    const { isNavOpen, headerRef } = useNavigation();
    const checkNavHeight = () => {
        if (!headerRef.current) return;
        const navHeight = headerRef.current.getBoundingClientRect().height;
        if (prevHeightRef.current === navHeight) return;
        prevHeightRef.current = navHeight;
        callback(navHeight, isNavOpen);
    };

    useOnMount(checkNavHeight);
    useOnResize(checkNavHeight, headerRef);
}
