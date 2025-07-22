import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manuj | Portfolio",
  description: "Production-ready Next.js + Supabase portfolio",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Manuj | Portfolio",
    description: "Scalable and secure Next.js + Supabase portfolio",
    url: "https://yourdomain.com",
    siteName: "Manuj Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Optional: place in /public
        width: 1200,
        height: 630,
        alt: "Manuj Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ✅ suppressHydrationWarning avoids false hydration mismatches for theme toggling */}
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="pb-16">{children}</main>
      </body>
    </html>
  );
}
