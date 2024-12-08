import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                "slide-in": "slide-in 0.3s ease-out",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                "slide-in": {
                    from: { height: "0%" },
                    to: { height: "2px" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
