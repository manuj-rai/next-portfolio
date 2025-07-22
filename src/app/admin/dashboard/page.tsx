import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

export default function AdminPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Welcome, Admin!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Manage your portfolio, projects, and contact messages here.
      </p>

      {/* ✅ Dashboard Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Projects
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add, edit, and manage all your portfolio projects.
          </p>
        </Link>

        <Link
          href="/admin/messages"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Contact Messages
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View and manage messages sent via your contact form.
          </p>
        </Link>

        <Link
          href="/settings"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Settings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Update your account and portfolio preferences.
          </p>
        </Link>
      </div>
    </AdminLayout>
  );
}
