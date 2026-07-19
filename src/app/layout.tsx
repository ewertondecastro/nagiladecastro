import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nagila Decastro",
  description: "Esposa, mãe de duas meninas, educadora em casa e mentora de mães. Cape Cod, Massachusetts.",
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
