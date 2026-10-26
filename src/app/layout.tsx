import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import Script from "next/script";
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

const SITE_URL = "https://nagiladecastro.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nágila Decastro",
  description: "Esposa, mãe de duas meninas, educadora em casa e consultora de mães. Cape Cod, Massachusetts.",
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
        {/* Microsoft Clarity: só no domínio real, para não contar localhost nem previews do Netlify. */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`if (["nagiladecastro.com", "www.nagiladecastro.com"].includes(location.hostname)) {
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "z3cl8q682y");
}`}
        </Script>
      </body>
    </html>
  );
}
