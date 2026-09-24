import React from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0D0E12] border-t border-slate-800/80 py-8 mt-16 `font-[family-name:var(--font-oswald)]`">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        <div className="flex items-center gap-2.5">
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={24}
            height={24}
            className="h-8 w-8 object-contain"
          />

          <span className="text-xl `font-[family-name:var(--font-oswald)] text-white uppercase">
            FITLOG
          </span>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide font-sans">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;