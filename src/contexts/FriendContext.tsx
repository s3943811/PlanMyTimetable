"use client";

import { createContext, useContext, useState, useEffect } from "react";
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

export function FriendProvider({ children }: FriendProviderProps) {
  const [friendData, setFriendData] = useState<Friend[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem("friends");
      if (storedValue !== null) {
        setFriendData(JSON.parse(storedValue) as Friend[]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && friendData !== null) {
      window.localStorage.setItem("friends", JSON.stringify(friendData));
    }
  }, [friendData]);

  if (!friendData) {
    return <>{children}</>;
  }

  return (
    <FriendContext.Provider value={{ friendData, setFriendData }}>
      {children}
    </FriendContext.Provider>
  );
}
