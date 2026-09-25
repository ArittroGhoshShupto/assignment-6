"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import ListedWorkoutCard from "@/components/shared/listedworkcard";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function MyPlanPage() {
  const {
    todayPlan,
    savedPlan,
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const currentList = activeTab === "plan" ? todayPlan : savedPlan;

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const totalCalories = todayPlan.reduce(
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

      {/* Metrics Summary */}
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

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-3 font-bold text-sm uppercase transition relative ${
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
          className={`pb-3 font-bold text-sm uppercase transition relative ${
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

      {/* List / Empty State */}
      {currentList.length === 0 ? (
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
          {currentList.map((workout) => (
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