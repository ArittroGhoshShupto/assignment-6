import { IWorkout } from "@/types/fitlog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IWorkoutCardProps {
  workout: IWorkout;
}
const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  const categories = Array.isArray(workout.category)
    ? workout.category
    : workout.category
    ? [workout.category]
    : [];
  const mainCategory = categories[0] || "WORKOUT";
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#15171C] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#CCFF00]/50 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden bg-[#1D2026]">
        <Image
          src={workout.image}
          alt={workout.name}
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold text-black shadow-md uppercase">
          {mainCategory}
        </span>
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#0D0E12]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur border border-slate-700">
          <span className="text-[#CCFF00]">★</span>
          {workout.rating}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="rounded-md border border-[#CCFF00]/30 bg-[#CCFF00]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#CCFF00] uppercase"
            >
              #{cat}
            </span>
          ))}
        </div>
        <h3 className="line-clamp-1 text-xl font-extrabold uppercase text-white transition-colors group-hover:text-[#CCFF00]">
          {workout.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-gray-400">
          Equipment: <span className="font-semibold text-gray-200">{workout.equipment}</span>
        </p>
        <div className="my-5 flex items-center justify-between border-y border-slate-800/80 py-3 text-sm text-gray-400">
          <div className="text-center flex-1">
            <p className="text-[11px] uppercase tracking-wider text-gray-500">Duration</p>
            <p className="font-bold text-white mt-0.5">{workout.duration} min</p>
          </div>

          <div className="h-7 w-px bg-slate-800"></div>

          <div className="text-center flex-1">
            <p className="text-[11px] uppercase tracking-wider text-gray-500">Calories</p>
            <p className="font-bold text-white mt-0.5">{workout.calories} kcal</p>
          </div>

          <div className="h-7 w-px bg-slate-800"></div>

          <div className="text-center flex-1">
            <p className="text-[11px] uppercase tracking-wider text-gray-500">Rating</p>
            <p className="font-bold text-white mt-0.5">{workout.rating} / 5</p>
          </div>
        </div>
        <Link href={`/workouts/${workout.id}`} className="block w-full">
          <button className="w-full rounded-xl bg-[#CCFF00] py-2.5 text-center text-sm font-bold text-black transition-all hover:bg-[#b8e600] active:scale-95">
            View Details →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;