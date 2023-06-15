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

export interface Profile {
  id: string;
  display_name: string | null;
}

export type MaybeSession = Session | null;
