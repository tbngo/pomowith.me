import "./globals.css";
import { Inter } from "next/font/google";
import SupabaseProvider from "../lib/providers/supabase-provider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "pomowith.me",
  description: "Pomodoro with your friends!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-400`}>
        <SupabaseProvider session={session}>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
