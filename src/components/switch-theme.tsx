'use client';

import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/Theme";


export default function SwitchTheme() {
    const [theme, setTheme] = useTheme();

    return (
        <div>
            {theme === Theme.Dark ? (
                <button
                    onClick={() => {
                        setTheme(Theme.Light);
                    }}
                >
                    To Light theme
                </button>
            ) : (
                <button
                    onClick={() => {
                        setTheme(Theme.Dark);
                    }}
                >
                    To Dark theme
                </button>
            )}

        </div>
    );
}