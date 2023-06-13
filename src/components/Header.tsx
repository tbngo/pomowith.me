"use client";

import Link from "next/link";
import SignIn from "./SignIn";
import { Fragment } from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <Link href="/" className="text-2xl font-bold">
        <p className="underline decoration-green-500">pomo</p>
        <p className="underline decoration-sky-500">w/me</p>
      </Link>
      <SignIn />
    </header>
  );
}
