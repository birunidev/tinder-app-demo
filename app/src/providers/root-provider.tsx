import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { UserProvider } from "./user-provider";

const queryClient = new QueryClient();
export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};
