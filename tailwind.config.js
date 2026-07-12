/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Albert Sans", "system-ui", "sans-serif"],
      },
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          deep: "var(--accent-deep)",
          on: "var(--accent-on)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          deep: "var(--secondary-deep)",
        },
        border: "var(--border)",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
