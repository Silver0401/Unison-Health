import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "@/styles/css/Index.css";

const display = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: "--font-outfit" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Unison Health",
  description: "Medicina y nutrición coordinadas para entender y controlar tu salud.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
