"use client";

import { TaskType } from "@/lib/types";

interface TaskProps {
  thisTask: TaskType;
}

export function Task({ thisTask }: TaskProps) {
  return (
    <div
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
