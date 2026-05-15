import type { Metadata } from "next";
import { Playfair_Display, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nagila Decastro",
  description: "Mãe de duas meninas, esposa, educadora em casa e mentora de mães. Cape Cod, Massachusetts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${barlow.variable} ${barlowCondensed.variable} bg-background text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
