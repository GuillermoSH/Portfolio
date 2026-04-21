/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "#f5f3ef",
          dark: "#07090d",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#10141c",
        },
        muted: {
          DEFAULT: "#57534e",
          dark: "#a8a29e",
        },
        accent: {
          DEFAULT: "#0d9488",
          dark: "#2dd4bf",
        },
        coral: {
          DEFAULT: "#c2410c",
          dark: "#fb923c",
        },
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 0% 0%, rgba(13,148,136,0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(194,65,12,0.08) 0px, transparent 45%), radial-gradient(at 100% 100%, rgba(13,148,136,0.06) 0px, transparent 40%)",
        "mesh-dark":
          "radial-gradient(at 20% 20%, rgba(45,212,191,0.08) 0px, transparent 45%), radial-gradient(at 80% 0%, rgba(251,146,60,0.06) 0px, transparent 40%), radial-gradient(at 50% 100%, rgba(45,212,191,0.05) 0px, transparent 50%)",
        "grid-faint":
          "linear-gradient(to right, rgba(120,113,108,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,113,108,0.06) 1px, transparent 1px)",
        "grid-faint-dark":
          "linear-gradient(to right, rgba(168,162,158,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,162,158,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        lift: "0 24px 80px -24px rgba(15, 23, 42, 0.12)",
        "lift-dark": "0 24px 80px -24px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
