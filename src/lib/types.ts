import { Session } from "@supabase/supabase-js";

export interface Coordinates {
  x: number | undefined;
  y: number | undefined;
}

export interface Task {
  id: number;
  user_id: string;
  task: string;
  created_at: Date;
}

export type MaybeSession = Session | null;
