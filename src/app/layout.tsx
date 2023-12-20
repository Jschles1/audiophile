import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Header from "./header/header";
import Footer from "./footer";
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
        <div className="flex flex-col justify-between">
          <Header />
          <main className="flex min-h-screen flex-col items-center justify-between">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
