import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'selector',
    plugins: [],
    theme: {
        fontSize: {
            // s: '0.75rem',
            // m: '0.9375rem',
            // lg: '1.125rem',
            // xl: '1.5rem',
            // ...
        },
        colors: {
            "transparent": "#00000000",
            "white": "#FFFFFF",
            "k-black": "#000112",
            "kd-lines": "#3E3F4E",
            "kl-lines": "#E4EBFA",
            "k-dark-grey": "#2B2C37",
            "k-medium-grey": "#828FA3",
            "k-light-grey": "#F4F7FD",
            "k-purple": "#635FC7",
            "kh-purple": "#A8A4FF",
            "k-red": "#EA5555",
            "kh-red": "#FF9898",
        }
    }
};
export default config;
