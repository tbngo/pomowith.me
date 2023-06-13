"use client";

import { useSupabase, useSession } from "@/lib/providers/supabase-provider";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Users = ({ roomId }: { roomId: string }) => {
  const supabaseClient = useSupabase();
  const [userState, setUserState] = useState<RealtimePresenceState>({});
  const currentUser = useSession();
  useEffect(() => {
    console.log("user: ", currentUser);

    const channel = supabaseClient.channel(`room-${roomId}`, {
      config: {
        presence: {
          key: currentUser?.user?.email ? currentUser?.user.email : "Unknown",
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
          user_name: currentUser?.user?.email
            ? currentUser?.user.email
            : "Unknown",
        });
        console.log("status: ", status);
      }
    });
  }, []);

  return (
    <>
      <p> List of Currently Logged in Users: </p>
      {Object.keys(userState).map((key) => (
        <p key={key}>Hi {key}</p>
      ))}
    </>
  );
};

export default Users;
