"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { MaybeSession, Profile } from "../types";

const ProfileContext = createContext<Profile | null>(null);

export default function ProfileProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const supabase = createClientComponentClient<Database>();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(
    function fetchAndSetProfile() {
      const fetchProfile = async () => {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id)
          .limit(1)
          .single();
        if (error) {
          console.error("Error fetching profile", error);
          throw new Error(error.message);
        }
        setProfile(profile);
      };
      fetchProfile();
    },
    [supabase, session]
  );

  return (
    <ProfileContext.Provider value={profile}>
      <>{children}</>
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
