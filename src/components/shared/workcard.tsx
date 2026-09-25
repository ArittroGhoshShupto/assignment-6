import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IWorkout } from "@/types/fitlog.type";

interface WorkoutCardProps {
  workout?: IWorkout;
}


const getSmartCategories = (name: string = ""): string[] => {
  const n = name.toLowerCase().trim();

  if (n.includes("bench press")) return ["CHEST", "ARMS"];
  if (n.includes("pull-up") || n.includes("pull up")) return ["BACK", "ARMS"];
  if (n.includes("back squat") || n.includes("squat")) return ["LEGS", "CORE"];
  if (n.includes("overhead press")) return ["SHOULDERS", "ARMS"];
  if (n.includes("bicep curl") || n.includes("curl")) return ["ARMS"];
  if (n.includes("hollow-body plank") || n.includes("plank")) return ["CORE"];
  if (n.includes("deadlift")) return ["BACK", "LEGS"];
  if (n.includes("push-up") || n.includes("pushup")) return ["CHEST", "ARMS", "CORE"];
  if (n.includes("lunge")) return ["LEGS"];
  if (n.includes("russian twist") || n.includes("twist")) return ["CORE"];
  if (n.includes("burpee")) return ["CARDIO", "FULL BODY"];
  if (n.includes("swing")) return ["POSTERIOR", "CARDIO"];

  return ["FITNESS"];
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  if (!workout) return null;

  const w = workout as unknown as Record<string, unknown>;

  const rawCategories =
    w.category ||
    w.categories ||
    w.target ||
    w.targetMuscle ||
    w.muscles ||
    w.muscleGroup ||
    w.tags ||
    [];

  let categories: string[] = [];

  if (Array.isArray(rawCategories) && rawCategories.length > 0) {
    categories = rawCategories.map((c) => String(c));
  } else if (typeof rawCategories === "string" && rawCategories.trim() !== "") {
    categories = rawCategories.split(",").map((c) => c.trim()).filter(Boolean);
  }

  
  if (categories.length === 0) {
    categories = getSmartCategories(workout.name);
  }

  const calories = workout?.caloriesBurned ?? workout?.calories ?? 0;

  return (
    <Link href={`/workouts/${workout.id}`} className="group block h-full">
      <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#15171C] p-4 transition-all duration-300 hover:border-slate-600 hover:shadow-xl">
        <div>
         
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-[#1D2026]">
            {workout.image ? (
              <Image
                src={workout.image}
                alt={workout.name || "Workout Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                No Image
              </div>
            )}
          </div>

          
          <div className="mb-2.5 flex min-h-6 flex-wrap gap-1.5">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="rounded-full bg-[#CCFF00] px-2.5 py-0.5 font-sans text-[10px] font-extrabold uppercase text-black"
              >
                {cat}
              </span>
            ))}
          </div>

          
          <h3 className="text-lg font-black uppercase tracking-tight text-white transition-colors group-hover:text-[#CCFF00]">
            {workout.name}
          </h3>

        
          <p className="mt-1 font-sans text-xs text-gray-400">
            {workout.equipment || "N/A"}
          </p>
        </div>

        
        <div className="mt-4 flex items-center justify-start gap-5 border-t border-slate-800/80 pt-4 font-sans text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{workout.duration || 0} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            <span>{calories} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 text-white">
            <svg className="h-3.5 w-3.5 fill-[#CCFF00] text-[#CCFF00]" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{workout.rating || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;