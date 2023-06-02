import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// export const notoSansTC = Noto_Sans_TC({
//   subsets: ["latin"],
//   variable: "--font-noto-sans-tc",
//   weight: ["100", "300", "400", "500", "700", "900"],
// });

export const fontClasses = twMerge(inter.variable);
