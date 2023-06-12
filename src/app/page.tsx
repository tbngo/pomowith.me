import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

async function getData() {
  const res = await supabase.from("countries").select();
  return res.data;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ul>
          {data?.map((country: any) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
