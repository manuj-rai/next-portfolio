import { supabase } from "@/lib/supabaseClient";

export default async function ProjectsPage() {
  const { data: projects } = await supabase.from("projects").select("*");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects?.map((p) => (
        <div key={p.id} className="border p-4 rounded-lg shadow bg-white">
          <img
            src={p.image_url}
            alt={p.title}
            className="rounded mb-2 w-full h-40 object-cover"
          />
          <h3 className="text-lg font-bold">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.description}</p>
          <div className="mt-2 flex gap-4 text-blue-600">
            {p.live_url && <a href={p.live_url}>Live</a>}
            {p.github_url && <a href={p.github_url}>GitHub</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
