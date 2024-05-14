import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        themes: [
            {
                dark: {
                    "color-scheme": "dark",
                    "primary": "#FF6EC7",
                    "primary-content": "#D6D6D6",
                    "secondary": "#DE5D84",
                    "secondary-content": "#D6D6D6",
                    "accent": "#73C2FB",
                    "accent-content": "#D6D6D6",
                    "neutral": "#373737",
                    "neutral-content": "#D6D6D6",
                    "base-100": "#101010",
                    "base-200": "#101010",
                    "base-300": "#262626",
                    "base-content": "#d6d6d6",
                    "info": "#009deb",
                    "success": "#56de00",
                    "warning": "#ffb900",
                    "error": "#ff414c",
                    "--rounded-box": "0.5rem",
                    "--rounded-btn": "0.4rem",
                    "--rounded-badge": "0.5rem",
                    "--tab-radius": "0.5rem",
                    "--animation-btn": "0",
                    "--animation-input": "0",
                    "--btn-focus-scale": "0.99"
                },
            }
        ]
    },
    plugins: [daisyui]
};

export default config;