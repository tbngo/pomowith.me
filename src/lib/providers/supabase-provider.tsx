"use client";

import { createContext, useContext, useEffect } from "react";
import {
  Session,
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "../database.types";
import { MaybeSession } from "../types";

type SupabaseContextType = {
  supabase: SupabaseClient<any, string>;
  session: MaybeSession;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, _session) => {
      if (_session?.access_token !== session?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, session]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

export const useSupabase = <
  Database = any,
  SchemaName extends string & keyof Database = "public" extends keyof Database
    ? "public"
    : string & keyof Database
>() => {
  let context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context.supabase as SupabaseClient<Database, SchemaName>;
};

export const useSession = () => {
  let context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useSession must be used inside SupabaseProvider");
  }

  return context.session;
};
