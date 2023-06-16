"use client";

import { useSession, useSupabase } from "@/lib/providers/supabase-provider";
import { useEffect, useState } from "react";
import { TaskType } from "@/lib/types";
import { Task } from "./task";

interface CanvasHandlerProps {
  roomId: string;
}

/*
  This component handles: 1) creating a new task when the user double clicks on the canvas
  2) rendering the background grid
  3) fetching and rendering the tasks
*/
export const CanvasHandler = ({ roomId }: CanvasHandlerProps) => {
  const session = useSession();
  const supabase = useSupabase();
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(
    function fetchAndSetTasks() {
      async function _fetchAndSetTasks() {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("room_id", roomId);
        if (error || !data) {
          console.error(error);
          throw new Error(error.message);
        }
        setTasks(data as TaskType[]);
      }
      _fetchAndSetTasks();
    },
    [roomId, supabase]
  );

  const handleDoubleClickOnCanvas = async (event: MouseEvent) => {
    if (!session) return;
    const { detail: clicks, pageX, pageY } = event;
    if (clicks === 2) {
      const newTask: Partial<TaskType> = {
        user_id: session.user.id,
        x: pageX,
        y: pageY,
        task: "New Task",
        room_id: roomId,
      };

      const { data, error } = await supabase
        .from("tasks")
        .insert([newTask])
        .select();
      if (error || !data) {
        console.error(error);
        throw new Error(error.message);
      }
      newTask.id = data[0].id;
      newTask.created_at = data[0].created_at;
      setTasks([...tasks, newTask as TaskType]);
    }
  };
  return (
    <div
      className="absolute h-full w-full left-0 top-0"
      style={{
        opacity: 0.04,
        backgroundSize: "30px 30px",
        backgroundImage:
          "radial-gradient(circle, white 1px, rgba(0, 0, 0, 0) 1px)",
      }}
      onClick={(event: any) => handleDoubleClickOnCanvas(event)}
    >
      {tasks.map((task) => (
        <Task key={task.id} thisTask={task} />
      ))}
    </div>
  );
};
