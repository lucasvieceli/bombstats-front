import resolveConfig from "tailwindcss/resolveConfig";
export const twFullConfig: any = resolveConfig({
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
    },
  },
  plugins: [],
});

export const twColors = twFullConfig.theme?.colors as Record<string, string>;

export const getIsBreakPoint = (breakpoint: string) => {
  if (!twFullConfig?.theme?.screens || typeof window == "undefined")
    return false;
  for (const key of Object.keys(twFullConfig.theme.screens).reverse()) {
    const breakpointValue = twFullConfig.theme.screens[key];

    const query = window.matchMedia(`(min-width: ${breakpointValue})`);
    if (query.matches) {
      return true;
    }
    if (key === breakpoint) return false;
  }

  return false;
};
