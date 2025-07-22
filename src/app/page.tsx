"use client";

import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <Testimonials />
      <Footer />
    </>
  );
}