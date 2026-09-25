"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import ListedWorkoutCard from "@/components/shared/listedworkcard";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type SortOption = "duration" | "calories" | "rating";
const emptySubscribe = () => () => {};
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

export default function MyPlanPage() {
  const {
    todayPlan,
    savedPlan,
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const mounted = useIsMounted();

  const currentList = activeTab === "plan" ? todayPlan : savedPlan;
  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") {
        return (Number(a.duration) || 0) - (Number(b.duration) || 0);
      }
      if (sortBy === "calories") {
        const calA = Number(a.caloriesBurned ?? a.calories) || 0;
        const calB = Number(b.caloriesBurned ?? b.calories) || 0;
        return calB - calA;
      }
      if (sortBy === "rating") {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
      return 0;
    });
  }, [currentList, sortBy]);

  const safeTodayPlan = mounted ? todayPlan : [];
  const safeSortedList = mounted ? sortedList : [];

  const totalExercises = safeTodayPlan.length;
  const totalMinutes = safeTodayPlan.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const totalCalories = safeTodayPlan.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned ?? curr.calories) || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 min-h-[70vh]">
      <div>
        <h1
          className={`${oswald.className} text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white`}
        >
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm mt-1 font-sans">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-[#15171C] border border-slate-800 rounded-2xl p-4 text-center font-sans">
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase">Exercises</p>
          <p
            className={`${oswald.className} text-2xl font-bold text-[#CCFF00] mt-1`}
          >
            {totalExercises}
          </p>
        </div>
        <div className="border-x border-slate-800">
          <p className="text-gray-500 text-xs font-bold uppercase">Minutes</p>
          <p
            className={`${oswald.className} text-2xl font-bold text-white mt-1`}
          >
            {totalMinutes}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase">Calories</p>
          <p
            className={`${oswald.className} text-2xl font-bold text-white mt-1`}
          >
            {totalCalories}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 gap-4 pb-3">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("plan")}
            className={`font-bold text-sm uppercase transition relative pb-3 ${
              activeTab === "plan"
                ? "text-[#CCFF00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
            {activeTab === "plan" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`font-bold text-sm uppercase transition relative pb-3 ${
              activeTab === "saved"
                ? "text-[#CCFF00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
            {activeTab === "saved" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-gray-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#15171C] text-white border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-semibold appearance-none pr-8 cursor-pointer focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {safeSortedList.length === 0 ? (
        <div className="bg-[#15171C] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <h3
            className={`${oswald.className} text-xl font-bold text-white uppercase tracking-wider`}
          >
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto font-sans">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#CCFF00] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl hover:bg-[#b8e600] transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {safeSortedList.map((workout) => (
            <ListedWorkoutCard
              key={workout.id}
              workout={workout}
              isCompleted={workout.isDone}
              onMarkAsDone={activeTab === "plan" ? toggleMarkAsDone : undefined}
              onRemove={
                activeTab === "plan" ? removeFromTodayPlan : removeFromSaved
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}