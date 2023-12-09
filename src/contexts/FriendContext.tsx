"use client";

import { useLocalStorage, useIsClient } from "@uidotdev/usehooks";
import { createContext, useContext } from "react";
import type { Preference } from "~/lib/definitions";

export type Friend = {
  id: string;
  state: Preference[];
  name: string;
  link: string;
  active: boolean;
};

interface FriendProviderProps {
  children: React.ReactNode;
}

interface FriendContext {
  friendData: Friend[];
  setFriendData: React.Dispatch<React.SetStateAction<Friend[]>>;
}

const FriendContext = createContext({} as FriendContext);
export function useFriend() {
  return useContext(FriendContext);
}

function FriendClient({ children }: FriendProviderProps) {
  const [friendData, setFriendData] = useLocalStorage<Friend[]>("friend", []);

  return (
    <FriendContext.Provider value={{ friendData, setFriendData }}>
      {children}
    </FriendContext.Provider>
  );
}

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const FriendProvider: React.FC<ClientOnlyProps> = ({
  children,
  fallback,
}) => {
  const isClient = useIsClient();

  // Render children if on client side, otherwise return null
  return isClient ? <FriendClient>{children}</FriendClient> : fallback ?? null;
};
