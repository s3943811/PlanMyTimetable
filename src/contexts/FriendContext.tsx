"use client";

import { createContext, useContext } from "react";
import { Preference } from "~/lib/definitions";
import { useLocalStorage } from "~/hooks/useLocalStorage";

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

export function FriendProvider({ children }: FriendProviderProps) {
  const [friendData, setFriendData] = useLocalStorage<Friend[]>("friends", []);
  return (
    <FriendContext.Provider value={{ friendData, setFriendData }}>
      {children}
    </FriendContext.Provider>
  );
}
