import Banner from "@/components/shared/homepage/Banner";
import WorkoutLibrary from "@/components/shared/homepage/WorkoutLibrary";
import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0D0E12] text-white">
      <Banner />
      <section id="library" className="scroll-mt-16">
        <WorkoutLibrary />
      </section>
    </main>
  );
}