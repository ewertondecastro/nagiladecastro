import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

const SITE_URL = "https://nagiladecastro.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nagila Decastro",
  description: "Esposa, mãe de duas meninas, educadora em casa e mentora de mães. Cape Cod, Massachusetts.",
  openGraph: {
    type: "website",
    siteName: "Nagila Decastro",
    images: [{ url: "/images/hero.jpg", width: 1080, height: 1080, alt: "Nagila Decastro" }],
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
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
