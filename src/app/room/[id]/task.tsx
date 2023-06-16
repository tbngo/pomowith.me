"use client";

import { TaskType } from "@/lib/types";

interface TaskProps {
  thisTask: TaskType;
}

export function Task({ thisTask }: TaskProps) {
  return (
    <div
      className="bg-yellow-300 p-2 rounded-lg shadow-lg select-none"
      style={{
        position: "absolute",
        left: `${thisTask.x}px`,
        top: `${thisTask.y}px`,
      }}
    >
      {thisTask.task}
    </div>
  );
}
