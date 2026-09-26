"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IWorkout } from "@/types/fitlog.type";

interface PlanContextType {
  todayPlan: IWorkout[];
  savedPlan: IWorkout[];
  addToTodayPlan: (workout: IWorkout) => void;
  removeFromTodayPlan: (id: string | number) => void;
  toggleMarkAsDone: (id: string | number) => void;
  saveForLater: (workout: IWorkout) => void;
  removeFromSaved: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

// Helper function to safely read localStorage synchronously
const getInitialData = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  // Pass initializer function directly inside useState to avoid calling setState in useEffect
  const [todayPlan, setTodayPlan] = useState<IWorkout[]>(() =>
    getInitialData("fitlog_today", [])
  );
  const [savedPlan, setSavedPlan] = useState<IWorkout[]>(() =>
    getInitialData("fitlog_saved", [])
  );

  // Sync state to localStorage only when state changes
  useEffect(() => {
    localStorage.setItem("fitlog_today", JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(savedPlan));
  }, [savedPlan]);

  const addToTodayPlan = (workout: IWorkout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap reached! Maximum 5 lifts allowed for today.");
      return;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    setTodayPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan!");
  };

  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const toggleMarkAsDone = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout marked as completed!");
  };

  const saveForLater = (workout: IWorkout) => {
    if (savedPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in saved lifts!");
      return;
    }
    setSavedPlan((prev) => [...prev, workout]);
    toast.success("Saved for later!");
  };

  const removeFromSaved = (id: string | number) => {
    setSavedPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved list");
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        addToTodayPlan,
        removeFromTodayPlan,
        toggleMarkAsDone,
        saveForLater,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
};