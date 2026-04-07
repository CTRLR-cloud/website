import localFont from "next/font/local";

/** Self-hosted from `Branding/Fonts/Geist` (OFL). Variable weight 100–900. */
export const geistSans = localFont({
  src: "./geist/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
