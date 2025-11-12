import { useGetUser } from "@/api/tinder-api/api";
import { GetUser200 } from "@/api/tinder-api/models";
import React, { createContext, useContext } from "react";

interface UserContextType {
  user: GetUser200 | null;
  isUserReady: boolean;
  isLoading: boolean;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUser({
    query: {
      retry: false,
    },
  });

  const isUserReady = !!user && !isLoading;

  return (
    <UserContext.Provider
      value={{ user: user ?? null, isUserReady, isLoading, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
