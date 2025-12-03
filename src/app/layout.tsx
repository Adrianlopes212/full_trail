import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrailMaster - Sua Aventura Começa Aqui",
  description: "Aplicativo completo para trilheiros e aventureiros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
