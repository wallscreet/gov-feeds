import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GovFeeds",
  description: "Aggregating official US government data sources into one clear, easy-to-use platform.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <Header />
        
        {/* Breadcrumb Bar */}
        <div className="">
          <div className="max-w-6xl mx-auto px-8 sm:px-8 lg:px-8">
            <AutoBreadcrumbs />
          </div>
        </div>

        {children}
      
      </body>
    </html>
  );
}
