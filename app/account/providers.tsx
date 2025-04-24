"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient: QueryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

