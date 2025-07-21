import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Manuj | Portfolio",
  description: "Production-ready Next.js + Supabase portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="pb-16">{children}</main> {/* pb-16 for mobile bottom nav */}
      </body>
    </html>
  );
}
