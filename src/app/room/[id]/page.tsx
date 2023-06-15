import { cookies } from "next/headers";
import Header from "@/components/Header";
import Realtime from "./realtime";

export default async function Room({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div
        className="absolute h-full w-full left-0 top-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundSize: "30px 30px",
          backgroundImage:
            "radial-gradient(circle, white 1px, rgba(0, 0, 0, 0) 1px)",
        }}
      />
      <Header />
      <div className="w-full max-w-5xl items-center justify-center lg:flex m-12">
        Room {params.id}
      </div>
      <Realtime roomId={params.id} />
    </main>
  );
}
