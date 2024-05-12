import {Dispatch, useEffect, useState} from "react";
import {Theme} from "@/lib/Theme";

// Default theme is Light
// Set 'dark' class to root element if preferred or chosen theme is Dark.

export function useTheme() {
    let initialTheme: Theme = Theme.Light;
    if (typeof window !== "undefined") {
        if ('theme' in localStorage) {
            initialTheme = localStorage.getItem("theme") as Theme;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialTheme = Theme.Dark;
        }
    }

    const [theme, setTheme]: [Theme, Dispatch<Theme>] = useState(initialTheme);

    useEffect(() => {
        console.log(`Change theme to : ${theme}`);

        // Reset
        document.documentElement.classList.remove('dark');

        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
        }

        // Apply
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }


    }, [theme]);

    return [theme, setTheme] as const;
}
