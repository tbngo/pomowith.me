"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

import { useSession, useSupabase } from "./supabase-provider";

export default function LoginForm() {
  const router = useRouter();
  const supabase = useSupabase();
  const session = useSession();

  const handleSignOff = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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
