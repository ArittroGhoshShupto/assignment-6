"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IWorkout } from "@/types/fitlog.type";
import { usePlan } from "@/context/PlanContext";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function WorkoutDetailsPage() {
  const params = useParams();
  const rawId = params?.id;
  const id: string | undefined = Array.isArray(rawId) ? rawId[0] : rawId;

  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToTodayPlan, saveForLater } = usePlan();

  useEffect(() => {
    let isMounted = true;

    async function fetchDetails() {
      if (!id) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch workout details");
        }

        const data: IWorkout = await res.json();
        if (isMounted) {
          setWorkout(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
        if (isMounted) {
          setError("Workout details could not be loaded.");
          setWorkout(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#0d0e12]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-[#CCFF00]"></div>
        <p className="mt-4 text-sm font-semibold text-gray-400 animate-pulse">
          Loading workout details...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="py-24 text-center font-sans text-gray-400 bg-[#0d0e12]">
        {error || "Workout details not found."}
      </div>
    );
  }

  const categories: string[] = Array.isArray(workout.category)
    ? workout.category
    : workout.category
    ? [workout.category]
    : Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups
    : ["Chest", "Arms"];

  const defaultSteps: string[] = [
    "Lie on the bench with eyes under the bar and feet planted.",
    "Unrack with locked elbows and lower the bar to mid-chest.",
    "Press up in a straight line until elbows lock without bouncing.",
    "Keep shoulder blades retracted and a natural arch in the back.",
  ];

  const instructions: string[] =
    workout.instructions && workout.instructions.length > 0
      ? workout.instructions
      : defaultSteps;

  return (
    <div className="bg-[#0d0e12] min-h-screen text-white">
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-800/80 bg-[#15171C]">
            <Image
              src={workout.image || "/banner.png"}
              alt={workout.name || "Workout Image"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1
                className={`${oswald.className} text-3xl sm:text-4xl font-black uppercase tracking-tight text-white`}
              >
                {workout.name || "BARBELL BENCH PRESS"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                {workout.description ||
                  "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((cat: string, idx: number) => (
                  <span
                    key={idx}
                    className="rounded-full bg-[#CCFF00] px-3 py-1 text-[11px] font-black uppercase text-black"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-[#15171C] p-4 divide-y divide-slate-800/60 text-xs font-sans">
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  EQUIPMENT
                </span>
                <span className="text-white font-semibold">
                  {workout.equipment || "Barbell, Bench"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  DIFFICULTY
                </span>
                <span className="text-[#CCFF00] font-semibold">
                  {workout.difficulty || "Intermediate"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  SETS
                </span>
                <span className="text-white font-semibold">
                  {workout.sets || 4}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  REPS
                </span>
                <span className="text-white font-semibold">
                  {workout.reps || "8-12"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  DURATION
                </span>
                <span className="text-white font-semibold">
                  {workout.duration || 25} min
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  CALORIES
                </span>
                <span className="text-white font-semibold">
                  {workout.caloriesBurned ?? workout.calories ?? 180} kcal
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  RATING
                </span>
                <span className="text-white font-semibold">
                  {workout.rating || 4.8} / 5.0
                </span>
              </div>
            </div>

            <div className="space-y-3 font-sans">
              <h3
                className={`${oswald.className} text-base font-bold uppercase tracking-wider text-white`}
              >
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2 text-xs text-gray-300">
                {instructions.slice(0, 4).map((step: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex gap-3 bg-[#15171C] p-3 rounded-lg border border-slate-800/80"
                  >
                    <span className="text-[#CCFF00] font-bold">{idx + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => addToTodayPlan(workout)}
                className="flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black text-xs uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>+ Add to today&apos;s plan</span>
              </button>
              <button
                onClick={() => saveForLater(workout)}
                className="flex-1 border border-slate-700 hover:border-[#CCFF00] text-white font-bold text-xs uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 bg-transparent"
              >
                <span>★ Save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}