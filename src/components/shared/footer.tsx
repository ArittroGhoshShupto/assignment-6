import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";
import logo from "../../../assets/logo.png";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer: React.FC = () => {
  return (
    <footer
      className={`${oswald.className} w-full bg-[#0D0E12] border-t border-slate-800 py-6 mt-16`}
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
       
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logo as StaticImageData}
            alt="FITLOG Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-extrabold tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>
        <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;