import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/core/provider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SGIP - Sistema de Gestión de Inversiones y Préstamos",
  description: "Sistema financiero para gestión de préstamos e inversiones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
