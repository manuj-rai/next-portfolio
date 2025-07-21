"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun, LogIn, Home, Folder, Mail } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Projects", href: "/projects", icon: <Folder size={20} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      {/* ✅ Top Desktop Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            MyLogo
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-blue-600`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side (Login + Theme Toggle) */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Link href="/login">Login</Link>
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Bottom Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow-inner flex justify-around py-2 z-50">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-xs ${
              pathname === item.href
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        <Link
          href="/login"
          className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300"
        >
          <LogIn size={20} />
          Login
        </Link>
      </div>
    </>
  );
}
