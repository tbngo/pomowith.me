import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Users from "./users";

export default async function Room({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <Header />
      <div className="w-full max-w-5xl items-center justify-center lg:flex m-12">
        Room {params.id}
      </div>
      <Users roomId={params.id} />
    </main>
  );
}
