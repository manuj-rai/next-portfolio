"use client";

import { useAdmin } from "@/hooks/useAdmin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaSpinner, FaSignOutAlt, FaHome, FaCode, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <FaSpinner className="text-4xl text-blue-600 dark:text-blue-400" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    router.push("/admin/login");
    return null;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isMobile ? 64 : 256 }}
        animate={{ width: isCollapsed ? 64 : 256 }}
        className={`bg-gray-100 dark:bg-gray-800 p-4 flex flex-col border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}
      >
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <NavLink 
            href="/admin/dashboard" 
            icon={<FaHome />}
            isCollapsed={isCollapsed}
            text="Dashboard"
          />
          <NavLink 
            href="/admin/projects" 
            icon={<FaCode />}
            isCollapsed={isCollapsed}
            text="Projects"
          />
          <NavLink 
            href="/admin/messages" 
            icon={<FaEnvelope />}
            isCollapsed={isCollapsed}
            text="Messages"
          />
        </nav>

        <button
          onClick={logout}
          className={`mt-auto flex items-center gap-2 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <FaSignOutAlt />
          {!isCollapsed && "Logout"}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, text, isCollapsed }: { 
  href: string, 
  icon: React.ReactNode, 
  text: string,
  isCollapsed: boolean
}) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
      >
        <span className="text-lg">{icon}</span>
        {!isCollapsed && <span>{text}</span>}
      </motion.div>
    </Link>
  );
}