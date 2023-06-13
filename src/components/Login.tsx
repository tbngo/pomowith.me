"use client";

import { useRouter } from "next/navigation";
import { useSession, useSupabase } from "../lib/providers/supabase-provider";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const supabase = useSupabase();
  const session = useSession();

  const handleSignOff = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (session) return <button onClick={() => handleSignOff()}>Sign out</button>;
  return <Link href="/login">Sign in</Link>;
}
