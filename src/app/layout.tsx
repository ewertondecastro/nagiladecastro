import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import "./globals.css";

// Tipografia oficial "Argila & Sálvia": Lora (títulos) + Lato (texto).
// Mantemos os nomes de variável antigos para não renomear classes no site.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const SITE_URL = "https://nagiladecastro.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nágila Decastro",
  description: "Esposa, mãe de duas meninas, educadora em casa e mentora de mães. Cape Cod, Massachusetts.",
  openGraph: {
    type: "website",
    siteName: "Nágila Decastro",
    images: [{ url: "/images/hero.jpg", width: 1080, height: 1080, alt: "Nágila Decastro" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${lora.variable} ${lato.variable} bg-background text-text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
