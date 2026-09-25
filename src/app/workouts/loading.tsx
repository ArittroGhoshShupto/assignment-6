import React from "react";
export default function WorkoutsLoading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8 min-h-[70vh]">
      <div className="space-y-2">
        <div className="w-48 h-8 bg-slate-800 rounded-lg animate-pulse" />
        <div className="w-64 h-4 bg-slate-800 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#15171C] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 animate-pulse"
          >
            <div className="w-full sm:w-48 h-36 bg-slate-800 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="w-32 h-6 bg-slate-800 rounded-lg" />
              <div className="w-48 h-4 bg-slate-800 rounded-lg" />
              <div className="w-24 h-8 bg-slate-800 rounded-lg mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}