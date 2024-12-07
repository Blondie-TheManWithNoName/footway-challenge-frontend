/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        picked: "#6D11A7",
        // picked2: "#EEDAFB",
        picked2: "#f0f0f0",
        picked3: "#e0e0e0",
        "violet-100": "#531A74",
        "violet-400": "#321046",
        "violet-700": "#300F43",
        "violet-800": "#240B32",
        default: "#FFFFFF",
        disabled: "#75aaff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
