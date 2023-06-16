"use client";

import Link from "next/link";
import SignIn from "./SignIn";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full z-10">
      <div className="bg-black drop-shadow-xl p-4 rounded-lg">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-400 hover:text-slate-300 transition-colors"
        >
          <p className="underline decoration-green-500">pomo</p>
          <span className="underline decoration-sky-500">w/</span>
          <span className="underline decoration-red-500">me</span>
        </Link>
      </div>
      <SignIn />
    </header>
  );
}
