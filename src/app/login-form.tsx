"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useSession } from "./supabase-provider";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const session = useSession();

  const handleSignOff = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  if (session) return <button onClick={handleSignOff}>Sign out</button>;
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={["google"]}
      redirectTo="http://localhost:3000/auth/callback"
      onlyThirdPartyProviders={true}
    />
  );
}
