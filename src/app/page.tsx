import Header from "@/components/Header";
import { RoomInput } from "./room-input";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <Header />
      <div className="w-full max-w-5xl items-center justify-center lg:flex m-12">
        <RoomInput />
      </div>
    </main>
  );
}
