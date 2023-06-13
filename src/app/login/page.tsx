"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../../lib/providers/supabase-provider";

export default function Login() {
  const supabase = useSupabase();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={false}
        providers={["google"]}
        redirectTo="http://localhost:3000/auth/callback"
        onlyThirdPartyProviders={true}
      />
    </main>
  );
}
