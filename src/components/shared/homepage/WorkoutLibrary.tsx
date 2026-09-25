
"use client";

import React, { useEffect, useState } from "react";
import WorkoutCard from "@/components/shared/workcard";
import { IWorkout } from "@/types/fitlog.type";

type SortOption = "default" | "duration" | "calories" | "rating";

const figmaIdOrder = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 7, 12];

const WorkoutSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="bg-[#15171C] border border-slate-800 rounded-2xl p-4 animate-pulse flex flex-col justify-between `h-[360px]"
      >
        <div className="w-full h-44 bg-slate-800/60 rounded-xl mb-4" />
        <div className="h-4 w-20 bg-slate-800/80 rounded-full mb-3" />
        <div className="h-6 w-3/4 bg-slate-800/80 rounded mb-2" />
        <div className="h-4 w-1/2 bg-slate-800/50 rounded mb-4" />
        <div className="flex justify-between items-center pt-3 border-t border-slate-800/60">
          <div className="h-4 w-12 bg-slate-800/60 rounded" />
          <div className="h-4 w-12 bg-slate-800/60 rounded" />
          <div className="h-4 w-12 bg-slate-800/60 rounded" />
        </div>
      </div>
    ))}
  </div>
);

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const filteredWorkouts = (workouts || []).filter((w) => {
    if (!w) return false;
    const query = searchQuery.toLowerCase();

    const workoutObj = w as unknown as { muscleGroups?: string[]; category?: string | string[] };
    const rawCategories = workoutObj.muscleGroups || w.category || [];
    const categories = Array.isArray(rawCategories)
      ? rawCategories
      : [rawCategories];

    return (
      w.name?.toLowerCase().includes(query) ||
      w.equipment?.toLowerCase().includes(query) ||
      categories.some((cat) => String(cat).toLowerCase().includes(query))
    );
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "default") {
      const indexA = figmaIdOrder.indexOf(Number(a.id));
      const indexB = figmaIdOrder.indexOf(Number(b.id));

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return Number(a.id || 0) - Number(b.id || 0);
    }

    if (sortBy === "duration") {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    }

    if (sortBy === "calories") {
      const calB = Number(b.caloriesBurned ?? b.calories ?? 0);
      const calA = Number(a.caloriesBurned ?? a.calories ?? 0);
      return calB - calA;
    }

    if (sortBy === "rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }

    return 0;
  });

  return (
    <section id="library" className="container mx-auto my-16 px-4">
      <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end border-b border-slate-800 pb-6">
        <div className="text-center md:text-left">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            WORKOUT LIBRARY
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            THE LIBRARY
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search workout..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 rounded-xl border border-slate-800 bg-[#15171C] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#CCFF00] focus:outline-none transition"
          />

          <div className="flex w-full sm:w-auto items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#15171C] px-4 py-2.5 shadow-sm">
            <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0">
              Sort By:
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-transparent pr-7 text-sm font-extrabold text-[#CCFF00] focus:outline-none cursor-pointer"
              >
                <option value="default" className="bg-[#15171C] text-white">Default</option>
                <option value="duration" className="bg-[#15171C] text-white">Duration</option>
                <option value="calories" className="bg-[#15171C] text-white">Calories</option>
                <option value="rating" className="bg-[#15171C] text-white">Rating</option>
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-[#CCFF00]">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <WorkoutSkeleton />
      ) : sortedWorkouts.length === 0 ? (
        <div className="py-20 text-center font-sans text-gray-400">
          No workouts found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout: IWorkout) => (
            <WorkoutCard key={`${workout.id}-${workout.name}`} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;