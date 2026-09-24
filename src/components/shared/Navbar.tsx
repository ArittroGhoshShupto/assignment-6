import Image from "next/image";
import React from "react";
import logo from "../../../assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#0D0E12] border-b border-slate-800 py-2">
      <div className="navbar container mx-auto px-4">

        
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />

            <span className="font-oswald text-xl font-extrabold italic tracking-wider text-white uppercase">
              FITLOG
            </span>
          </Link>
        </div>

       
        <div className="navbar-center hidden md:flex">
          <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-[#15171C] p-1 text-xs font-semibold">

            <Link
              href="/"
              className="rounded-full bg-[#CCFF00] px-4 py-1.5 font-extrabold text-black"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full px-4 py-1.5 text-gray-400 transition hover:text-white"
            >
              My Plan
            </Link>

          </div>
        </div>

        
        <div className="navbar-end hidden gap-2 md:flex">

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#CCFF00] px-3.5 py-1 text-xs font-black uppercase text-black"
          >
            <span>Plan</span>

            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-extrabold text-[#CCFF00]">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-[#15171C] px-3.5 py-1 text-xs font-bold uppercase text-gray-200"
          >
            <span>Saved</span>

            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
              0
            </span>
          </Link>

        </div>

        
        <div className="navbar-end md:hidden">
          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-slate-800 bg-[#15171C] p-2 text-white shadow-lg"
            >
              <li>
                <Link href="/">Workouts</Link>
              </li>

              <li>
                <Link href="/my-plan">My Plan</Link>
              </li>

              <li>
                <Link href="/my-plan">
                  Plan <span>0</span>
                </Link>
              </li>

              <li>
                <Link href="/my-plan">
                  Saved <span>0</span>
                </Link>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;