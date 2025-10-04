import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rencana Belanja Bulanan",
  description: "Rencanakan belanja bulananmu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
      >
        <header
          className="sticky top-0 z-50 border-b border-neutral-200 shadow-2xs w-full
        bg-white"
        >
          <div className="max-w-md mx-auto px-4 py-3">
            <h1 className="text-lg font-semibold tracking-tight">
              🛒 Rencana Belanja Bulanan
            </h1>
          </div>
        </header>
        <main className="max-w-md mx-auto p-4 flex-1 w-full h-full flex max-h-[800px]">
          {children}
        </main>
      </body>
    </html>
  );
}
