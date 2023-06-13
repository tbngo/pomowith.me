"use client";

import { useSupabase, useSession } from "@/lib/providers/supabase-provider";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Users = ({ roomId }: { roomId: string }) => {
  const supabaseClient = useSupabase();
  const [userState, setUserState] = useState<RealtimePresenceState>({});
  const session = useSession();
  useEffect(() => {
    console.log("user: ", session);

    const channel = supabaseClient.channel(`room-${roomId}`, {
      config: {
        presence: {
          key: session?.user?.email ? session?.user.email : "Unknown",
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      const presentState = channel.presenceState();

      console.log("inside presence: ", presentState);

      setUserState({ ...presentState });
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      console.log("New users have joined: ", newPresences);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const status = await channel.track({
          user_name: session?.user?.email ? session?.user.email : "Unknown",
        });
        console.log("status: ", status);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p> friends </p>
      {Object.keys(userState).map((key) => (
        <p key={key}>Hi {key}</p>
      ))}
    </>
  );
};

export default Users;
