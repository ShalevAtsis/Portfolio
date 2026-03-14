"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
    useEffect(() => {
        window.history.scrollRestoration = "manual";

        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
        }

        window.scrollTo(0, 0);

        return () => {
            window.history.scrollRestoration = "auto";
        };
    }, []);

    return null;
}
