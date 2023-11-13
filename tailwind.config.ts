import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "48": "repeat(48, minmax(0, 1fr))",
      },
      fontSize: {
        md: [
          "1.125rem",
          {
            lineHeight: "1.625",
          },
        ],
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
