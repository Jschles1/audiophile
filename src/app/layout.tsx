import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import QueryProviders from "./query-providers";
import { CookiesProvider } from "next-client-cookies/server";
import Header from "./shared/header/header";
import Footer from "./shared/footer";
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
        <CookiesProvider>
          <QueryProviders>
            <div className="flex flex-col justify-between min-h-screen">
              <Header />
              <main className="flex flex-col items-center justify-start">
                {children}
                <Analytics />
              </main>
              <Footer />
            </div>
          </QueryProviders>
        </CookiesProvider>
      </body>
    </html>
  );
}
