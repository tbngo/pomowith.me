import Header from "@/components/Header";
import Realtime from "./realtime";
import { CanvasHandler } from "./canvas-handler";

export default async function Room({ params }: { params: { id: string } }) {
  const roomId = params.id;
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <Header />
      <Realtime roomId={roomId} />
      <div className="w-full max-w-5xl items-center justify-center lg:flex m-12">
        <CanvasHandler roomId={roomId} />
        room {roomId}
      </div>
    </main>
  );
}
