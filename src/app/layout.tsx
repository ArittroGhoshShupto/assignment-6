import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train hard, log honest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col justify-between bg-[#0D0E12] text-white">
        <PlanProvider>
          <Toaster position="bottom-right" toastOptions={{ style: { background: "#15171C", color: "#fff", border: "1px solid #334155" } }} />
          <div>
            <Navbar />
            {children}
          </div>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}