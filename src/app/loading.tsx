import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0e11]/80 backdrop-blur-md text-white">
      <div className="w-10 h-10 border-4 border-[#CCFF00]/20 border-t-[#CCFF00] rounded-full animate-spin mb-4" />
      <p className="text-gray-400 text-xs uppercase tracking-widest font-sans animate-pulse">
        Loading workouts…
      </p>
    </div>
  );
}