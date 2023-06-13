import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/Header";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <Header />
      <div className="w-full max-w-5xl items-center justify-center lg:flex m-12"></div>
    </main>
  );
}
