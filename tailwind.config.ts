import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Titulares (headlines) — sans-serif, geométrica, con peso
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Cuerpo de texto — serif editorial, cómoda para lectura larga
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
      },
      colors: {
        // Paleta "índigo eléctrico" — acento de marca de Límite ILM
        electric: {
          50: "#f0f0ff",
          100: "#e4e3ff",
          200: "#cdccff",
          300: "#aaa6ff",
          400: "#8479ff",
          500: "#6552f6", // acento principal
          600: "#5333e8",
          700: "#4525c9",
          800: "#3a20a3",
          900: "#321e82",
          950: "#1e1152",
        },
        // Neutros cálidos para el fondo editorial (evita el blanco puro "de plantilla")
        paper: {
          50: "#fdfcfa",
          100: "#f8f6f1",
          200: "#efece3",
          300: "#e2ddd0",
        },
        ink: {
          800: "#2a2740",
          900: "#1a1830",
        },
      },
      boxShadow: {
        // Sombras difuminadas tintadas de índigo, en vez de shadow-xl gris genérico
        "glow-sm": "0 8px 24px -8px rgba(101, 82, 246, 0.35)",
        "glow-md": "0 20px 45px -12px rgba(101, 82, 246, 0.40)",
        "glow-lg": "0 30px 70px -20px rgba(83, 51, 232, 0.45)",
        "glow-inset": "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "electric-radial":
          "radial-gradient(circle at 30% 20%, rgba(101,82,246,0.18), transparent 60%)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#2a2740",
            "--tw-prose-headings": "#1a1830",
            "--tw-prose-links": "#5333e8",
            fontFamily: "var(--font-serif)",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
