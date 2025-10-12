import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: { display: ["Inter", "ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [],
} satisfies Config;
