import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/core/provider";
import Link from "next/link";

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
        <Providers>
          <nav className="border-b px-6 py-3 flex gap-6">
            <span className="font-semibold text-lg">SGIP</span>
            <Link
              href="/loans"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Préstamos
            </Link>
            <Link
              href="/transactions"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Transacciones
            </Link>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}