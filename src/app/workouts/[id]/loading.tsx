import React from "react";

export default function WorkoutDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl min-h-[70vh] animate-pulse">
      
      <div className="w-24 h-6 bg-slate-800 rounded-lg mb-6" />

     
      <div className="bg-[#15171C] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="h-64 sm:h-80 w-full bg-slate-800 rounded-xl" />
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-slate-800 rounded-full" />
            <div className="w-16 h-6 bg-slate-800 rounded-full" />
          </div>
          <div className="w-3/4 h-8 bg-slate-800 rounded-lg" />
          <div className="w-1/2 h-4 bg-slate-800 rounded-lg" />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="h-12 bg-slate-800 rounded-lg" />
          <div className="h-12 bg-slate-800 rounded-lg" />
          <div className="h-12 bg-slate-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}