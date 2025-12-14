"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { REACT_QUERY_STALE_TIME } from "../constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY_STALE_TIME
    }
  }
});

export function ClientProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
