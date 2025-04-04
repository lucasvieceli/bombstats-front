import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1A1C26",
        secondary: "#272932",
        secondaryHover: "#3A3C4A",
        blue: "#8C67F6",
        gray: "#8F8F8F",
        skeleton: "#374151",
        selected: "#22242C",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
      },
      boxShadow: {
        "3xl-white": "0 35px 60px -15px rgba(255, 255, 255, 0.3)",
      },

      width: {
        modal: "80%",
        modalSm: "100%",
      },
      height: {
        modalSm: "95%",
        modal: "90%",
      },
      maxHeight: {
        modal: "800px",
        modalSm: "95%",
      },
      maxWidth: {
        modalForceSm: "414px",
        modalSm: "100%",
        modal: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
