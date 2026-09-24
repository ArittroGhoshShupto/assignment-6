import { IWorkout } from "@/types/fitlog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  // Extract categories array
  const categories = Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups
    : Array.isArray(workout.category)
    ? workout.category
    : workout.category
    ? [workout.category]
    : [];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#15171C] p-3 transition-all duration-300 hover:border-[#CCFF00]/50 flex flex-col justify-between">
      <div>
        {/* Image Section (No badges inside image) */}
        <div className="relative h-52 w-full overflow-hidden rounded-xl bg-[#1D2026]">
          <Image
            src={workout.image}
            alt={workout.name}
            width={800}
            height={600}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="pt-4 px-1">
          {/* Category Pills (Under image, above title) */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="rounded bg-[#CCFF00] px-2 py-0.5 text-[10px] font-black uppercase text-black tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="line-clamp-1 text-lg font-black uppercase text-white">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-1 line-clamp-1 text-xs text-gray-400">
            Equipment: <span className="text-gray-300">{workout.equipment}</span>
          </p>

          {/* Stats Bar */}
          <div className="my-4 flex items-center justify-between border-y border-slate-800/80 py-2.5 text-xs text-gray-400">
            <div className="text-center flex-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Duration</p>
              <p className="font-extrabold text-white mt-0.5">{workout.duration} min</p>
            </div>

            <div className="h-6 w-px bg-slate-800"></div>

            <div className="text-center flex-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Calories</p>
              <p className="font-extrabold text-white mt-0.5">
                {workout.caloriesBurned ?? workout.calories ?? 0} kcal
              </p>
            </div>

            <div className="h-6 w-px bg-slate-800"></div>

            <div className="text-center flex-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Rating</p>
              <p className="font-extrabold text-white mt-0.5">{workout.rating} / 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="px-1 pb-1">
        <Link href={`/workouts/${workout.id}`} className="block w-full">
          <button className="w-full rounded-xl bg-[#CCFF00] py-2.5 text-center text-xs font-black text-black uppercase tracking-wider transition-all hover:bg-[#b8e600]">
            View Details →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;