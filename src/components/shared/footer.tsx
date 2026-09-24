import React from 'react';
import Image from 'next/image';

interface FooterProps {
  logoSrc?: string;
}

const Footer: React.FC<FooterProps> = ({ logoSrc }) => {
  return (
    <footer className="w-full bg-[#0D0E12] border-t border-slate-800/80 py-8 px-4 sm:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Logo & Brand Name with Oswald Font */}
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6">
            <Image 
              src={logoSrc || "/assets/logo.png"} 
              alt="FITLOG Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-wider text-white uppercase">
              FITLOG
            </span>
        </div>

        {/* Copyright Text */}
        <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;