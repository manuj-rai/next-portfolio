"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabaseClient";
import { FiTrash2 } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setMessages(data);
    setLoading(false);
  };

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this message?")) return;

  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) {
    console.error(error);
    toast.error("Failed to delete message");
  } else {
    toast.success("Message deleted successfully!");
    fetchMessages(); // ✅ refresh UI after delete
  }
};

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No contact messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Message</th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Date</th>
                <th className="p-3 text-center text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">{msg.name}</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400">
                    <a href={`mailto:${msg.email}`} className="hover:underline">
                      {msg.email}
                    </a>
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {msg.message}
                  </td>
                  <td className="p-3 text-gray-500 text-sm">
                    {new Date(msg.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 mx-auto"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
