"use client"; // ✅ Only if using client-side hooks; remove if purely static

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        About Me
      </h1>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Hi, I’m Manuj Rai. I am a full-stack developer passionate about building scalable
        and secure applications using Next.js, Supabase, and modern web technologies.
      </p>
    </div>
  );
}