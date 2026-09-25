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

// Helper function for lazy initialization (Runs only once on client mount)
const getStorageItem = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
};

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  // Lazy initial state - Reads localStorage directly on mount (No Effect needed)
  const [todayPlan, setTodayPlan] = useState<IWorkout[]>(() =>
    getStorageItem("fitlog_today", [])
  );
  const [savedPlan, setSavedPlan] = useState<IWorkout[]>(() =>
    getStorageItem("fitlog_saved", [])
  );

  // Sync to LocalStorage ONLY when state changes
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
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan!");
  };

  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const toggleMarkAsDone = (id: string | number) => {
    let updatedState = false;

    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedState = !item.isDone;
          return { ...item, isDone: updatedState };
        }
        return item;
      })
    );

    toast.success(updatedState ? "Marked as Done!" : "Unmarked status");
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