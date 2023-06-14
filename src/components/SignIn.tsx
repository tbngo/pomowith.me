"use client";

import { useRouter } from "next/navigation";
import { useSession, useSupabase } from "../lib/providers/supabase-provider";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function SignIn() {
  const router = useRouter();
  const supabase = useSupabase();
  const session = useSession();

  const handleSignOff = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (session)
    return (
      <button
        className="text-slate-400 transition-colors hover:text-slate-300 shadow-blackA7 hover:bg-slate-950 inline-flex h-10 items-center justify-center rounded-lg bg-black px-4 font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        onClick={() => handleSignOff()}
      >
        sign out
      </button>
    );
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white shadow-blackA7 hover:bg-slate-950 inline-flex h-10 items-center justify-center rounded-lg bg-black px-4 font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          sign in
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="absolute text-8xl"></Dialog.Title>
          <div className="flex justify-center">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              localization={{
                variables: {
                  sign_in: {
                    social_provider_text: "Continue with {{provider}}",
                  },
                },
              }}
              theme="dark"
              showLinks={false}
              providers={["google"]}
              redirectTo={`${process.env.host}/auth/callback`}
              onlyThirdPartyProviders={true}
            />
          </div>
          <Dialog.Close asChild>
            <button
              className="text-slate-400 hover:bg-gray-800 focus:shadow-gray-300 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
