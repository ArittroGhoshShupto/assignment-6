"use client";

import { IWorkout } from "@/types/fitlog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IListedWorkoutCardProps {
  workout: IWorkout;
  isCompleted?: boolean;
  onMarkAsDone?: (id: string | number) => void;
  onRemove?: (id: string | number) => void;
}

const ListedWorkoutCard = ({
  workout,
  isCompleted = false,
  onMarkAsDone,
  onRemove,
}: IListedWorkoutCardProps) => {
  const categories: string[] = Array.isArray(workout.category)
    ? workout.category
    : workout.category
    ? [workout.category]
    : Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups
    : [];

  const primaryCategory = categories[0] || "WORKOUT";

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#15171C] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row ${
        isCompleted ? "opacity-75 border-green-900/50" : ""
      }`}
    >
      <div className="relative h-64 w-full shrink-0 overflow-hidden bg-[#1D2026] sm:h-auto sm:w-72">
        <Image
          src={workout.image || ""}
          alt={workout.name || "Workout Image"}
          width={450}
          height={450}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold text-black uppercase">
          {primaryCategory}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map((cat: string, idx: number) => (
              <span
                key={idx}
                className="rounded-full border border-[#CCFF00] px-3 py-1 text-xs font-semibold text-[#CCFF00]"
              >
                {cat.toUpperCase()}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-[#CCFF00] md:text-3xl">
            {workout.name?.toUpperCase() || "WORKOUT"}
          </h2>

          <p className="mt-1 text-sm text-gray-400 md:text-base">
            Equipment:{" "}
            <span className="font-semibold text-gray-200">
              {workout.equipment || "Bodyweight"}
            </span>
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg text-[#CCFF00]">★</span>
            <span className="font-semibold text-white">
              {workout.rating ?? 5.0}
            </span>
            <span className="text-sm text-gray-500">/ 5.0</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-800 py-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="mt-1 font-bold text-white">
                {workout.duration || 0} min
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Calories</p>
              <p className="mt-1 font-bold text-white">
                {workout.caloriesBurned ?? workout.calories ?? 0} kcal
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Equipment</p>
              <p className="mt-1 truncate font-bold text-white">
                {workout.equipment || "Bodyweight"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
         
          <Link
            href={`/workouts/${workout.id}`}
            className="flex-1 sm:flex-none text-center rounded-xl bg-[#CCFF00] px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-[#b8e600] active:scale-95"
          >
            View Details →
          </Link>

          {onMarkAsDone && (
            <button
              onClick={() => onMarkAsDone(workout.id)}
              disabled={isCompleted}
              className={`flex-1 sm:flex-none rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                isCompleted
                  ? "border-green-600 bg-green-600/20 text-green-400 cursor-not-allowed"
                  : "border-gray-600 bg-transparent text-white hover:border-green-500 hover:bg-green-500/10 hover:text-green-400"
              }`}
            >
              {isCompleted ? "✓ Completed" : "✓ Mark as Done"}
            </button>
          )}

          {onRemove && (
            <button
              onClick={() => onRemove(workout.id)}
              title="Remove"
              className="rounded-xl border border-gray-600 bg-transparent px-4 py-2.5 text-sm font-bold text-white transition-all hover:border-red-500 hover:bg-red-500/20 hover:text-red-400 active:scale-95"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListedWorkoutCard;