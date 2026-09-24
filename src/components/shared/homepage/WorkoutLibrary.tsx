"use client";
import React, { useEffect, useState } from "react";
import WorkoutCard from "../workcard";
import { IWorkout } from "@/types/fitlog.type";

type SortOption = "duration" | "calories" | "rating";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!response.ok) {
          throw new Error;
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

  
  const parseDuration = (dur: string) => {
    if (!dur) return 0;
    const num = parseInt(dur, 10);
    return isNaN(num) ? 0 : num;
  };

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return parseDuration(b.duration) - parseDuration(a.duration);
    }
    if (sortBy === "calories") {
      return (Number(b.calories) || 0) - (Number(a.calories) || 0);
    }
    if (sortBy === "rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

  return (
    <section className="container mx-auto my-16 px-4">
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

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#15171C] px-4 py-2.5 shadow-sm">
          <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Sort By:
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-transparent pr-7 text-sm font-extrabold text-[#CCFF00] focus:outline-none cursor-pointer"
            >
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

     
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-[#CCFF00]"></div>
          <p className="mt-4 text-sm font-semibold tracking-wide text-gray-400 animate-pulse">
            Loading workouts...
          </p>
        </div>
      ) : (
  
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout: IWorkout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;