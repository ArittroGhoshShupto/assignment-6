import Image from "next/image";
import React from "react";
import bannerImg from "../../../../assets/banner.png";


const Banner = () => {
  return (
    <section className="px-4 py-10 md:py-16 bg-[#0D0E12]">
      <div className="container mx-auto overflow-hidden rounded-3xl border border-slate-800 bg-[#15171C] shadow-2xl">
        <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-14">
          
          
          <div className="space-y-6 text-center md:text-left">
          
            <span className="inline-block rounded-full bg-[#CCFF00]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#CCFF00] border border-[#CCFF00]/20">
              WORKOUT LIBRARY
            </span>

         
            <h1 className="text-4xl font-black uppercase leading-tight text-white md:text-5xl lg:text-6xl tracking-tight">
              TRAIN WITH INTENT. <br />
              <span className="text-[#CCFF00]">LOG EVERY SET.</span>
            </h1>

          
            <p className="max-w-lg text-base leading-7 text-gray-400 md:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

           
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="#library"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#CCFF00] px-8 py-3.5 text-sm font-extrabold uppercase text-black transition-all hover:bg-[#b8e600] active:scale-95 shadow-lg shadow-[#CCFF00]/10"
              >
                BROWSE WORKOUTS 
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-[#CCFF00]/10 blur-3xl"></div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
              <Image
                src={bannerImg}
                alt="FitLog Hero Workout"
                priority
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;