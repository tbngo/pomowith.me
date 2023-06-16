"use client";

import { useProfile } from "@/lib/providers/profile-provider";
import { useSupabase, useSession } from "@/lib/providers/supabase-provider";
import { Coordinates } from "@/lib/types";
import {
  PostgrestResponse,
  REALTIME_LISTEN_TYPES,
  REALTIME_PRESENCE_LISTEN_EVENTS,
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimeChannelSendResponse,
  RealtimePresenceState,
} from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Realtime = ({ roomId }: { roomId: string }) => {
  const supabaseClient = useSupabase();
  const profile = useProfile();
  const [userState, setUserState] = useState<{
    [key: string]: [{ username: string; presence_ref: string }];
  }>({});
  const session = useSession();

  const [isInitialStateSynced, setIsInitialStateSynced] =
    useState<boolean>(false);

  // These states will be managed via ref as they're mutated within event listeners

  const [mousePosition, _setMousePosition] = useState<Coordinates>();

  useEffect(() => {
    let roomChannel: RealtimeChannel;

    roomChannel = supabaseClient.channel(`room-${roomId}`, {
      config: {
        presence: {
          key: session?.user?.email ?? "Unknown",
        },
      },
    });

    roomChannel.on(
      REALTIME_LISTEN_TYPES.PRESENCE,
      { event: REALTIME_PRESENCE_LISTEN_EVENTS.SYNC },
      () => {
        const state = roomChannel.presenceState();
        setIsInitialStateSynced(true);
        setUserState({ ...(state as any) });
      }
    );

    roomChannel.subscribe(async (status: `${REALTIME_SUBSCRIBE_STATES}`) => {
      if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        const resp: RealtimeChannelSendResponse = await roomChannel.track({
          username: profile?.display_name ?? "Unknown",
        });
      }
    });
    return () => {
      roomChannel && supabaseClient.removeChannel(roomChannel);
    };
  }, [roomId, session, profile, supabaseClient]);

  return (
    <>
      <p> friends </p>
      {Object.keys(userState).map((key) => {
        const displayName = userState[key][0].username;
        return <p key={key}>Hi {displayName}</p>;
      })}
    </>
  );
};

export default Realtime;
