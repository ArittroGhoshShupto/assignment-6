import React from "react";
import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-[#0D0E12]">
      <div className="relative">
        <h1
          className={`${oswald.className} text-8xl sm:text-9xl font-black text-[#CCFF00] tracking-tighter opacity-90`}
        >
          404
        </h1>
        <div className="absolute inset-0 bg-[#CCFF00]/10 blur-3xl rounded-full -z-10" />
      </div>

      <h2
        className={`${oswald.className} text-2xl sm:text-3xl font-extrabold uppercase text-white mt-4 tracking-wide`}
      >
        OUT OF RANGE / PAGE NOT FOUND
      </h2>

      <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-md font-sans leading-relaxed">
        The lift or routine you are looking for doesn&apos;t exist, was removed,
        or the URL is incorrect. Let&apos;s get you back to training.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/"
          className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-6 py-3.5 rounded-xl transition active:scale-95"
        >
          Back to Home
        </Link>
        <Link
          href="/my-plan"
          className="border border-slate-700 hover:border-[#CCFF00] text-white font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition active:scale-95"
        >
          View My Plan
        </Link>
      </div>
    </div>
  );
}