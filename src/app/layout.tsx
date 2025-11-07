import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cercle de projet 2025 !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={"font-[silkscreen]"}>
      <body>{children}</body>
    </html>
  );
}
