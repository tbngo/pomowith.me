"use client";

import { useRouter } from "next/navigation";

export const RoomInput = () => {
  const router = useRouter();
  return (
    <input
      type="text"
      placeholder="enter a room name 👻"
      className="shadow appearance-none bg-black text-sm rounded w-96 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      onKeyDown={(e) => {
        if (e.code !== "Enter" || !e.currentTarget.value) return;
        router.push(`/room/${e.currentTarget.value}`);
      }}
    />
  );
};
