import { supabase } from "@/lib/supabaseClient";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">
          ⚠ Error loading projects: {error.message}
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No projects found yet</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        My Projects
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
