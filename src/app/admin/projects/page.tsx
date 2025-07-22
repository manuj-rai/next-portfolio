"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { FiTrash2, FiEdit, FiPlus, FiX, FiUpload, FiLink, FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  created_at: string;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Project>>({ tech_stack: [] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newTech, setNewTech] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast.error("Failed to fetch projects");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile && form.image_url) return form.image_url;
    if (!imageFile) return null;

    const fileName = `${Date.now()}-${imageFile.name}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(fileName, imageFile);

    if (error) {
      toast.error("Image upload failed");
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const imageUrl = await toast.promise(
        handleImageUpload(),
        {
          loading: 'Uploading image...',
          success: 'Image uploaded!',
          error: 'Image upload failed'
        }
      );

      const projectData = {
        ...form,
        image_url: imageUrl || form.image_url || null,
        tech_stack: form.tech_stack || []
      };

      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);
        if (error) throw error;
        toast.success('Project updated successfully');
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);
        if (error) throw error;
        toast.success('Project added successfully');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm({ tech_stack: [] });
    setImageFile(null);
    setPreviewUrl(null);
    setEditingId(null);
    setNewTech("");
    setIsFormOpen(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      ...project,
      tech_stack: project.tech_stack || []
    });
    setPreviewUrl(project.image_url);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  const addTech = () => {
    if (!newTech.trim()) return;
    setForm({
      ...form,
      tech_stack: [...(form.tech_stack || []), newTech.trim()]
    });
    setNewTech("");
  };

  const removeTech = (techToRemove: string) => {
    setForm({
      ...form,
      tech_stack: (form.tech_stack || []).filter(tech => tech !== techToRemove)
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {/* Project Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <button 
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title*</label>
                      <input
                        type="text"
                        placeholder="Project title"
                        value={form.title || ""}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Description*</label>
                      <textarea
                        placeholder="Project description"
                        value={form.description || ""}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Live URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                          <FiLink />
                        </div>
                        <input
                          type="url"
                          placeholder="https://example.com"
                          value={form.live_url || ""}
                          onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                          className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">GitHub URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                          <FiGithub />
                        </div>
                        <input
                          type="url"
                          placeholder="https://github.com/user/repo"
                          value={form.github_url || ""}
                          onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                          className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tech Stack</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Add technology (e.g., React)"
                          value={newTech}
                          onChange={(e) => setNewTech(e.target.value)}
                          className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                        />
                        <button
                          type="button"
                          onClick={addTech}
                          className="bg-gray-200 dark:bg-gray-600 px-3 rounded-lg"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.tech_stack?.map((tech) => (
                          <span 
                            key={tech} 
                            className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                            <button 
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              <FiX size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Project Image*</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center">
                      {previewUrl ? (
                        <div className="relative w-full h-48 mb-4">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                          <FiUpload size={48} className="text-gray-400" />
                        </div>
                      )}
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <FiUpload />
                        {imageFile ? "Change Image" : "Upload Image"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          required={!editingId}
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Recommended size: 1200×630px
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {editingId ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Project List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects found. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                {project.tech_stack?.length ? (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech_stack.slice(0, 5).map(tech => (
                      <span key={tech} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 5 && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        +{project.tech_stack.length - 5}
                      </span>
                    )}
                  </div>
                ) : null}

                <div className="flex items-center gap-4 text-sm mb-3">
                  {project.live_url && (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <FiLink size={14} /> Live
                    </a>
                  )}
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      <FiGithub size={14} /> Code
                    </a>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}