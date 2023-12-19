import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "./header/header";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audiophile",
  description: "Audio e-commerce site built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <div>
          <Header />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
