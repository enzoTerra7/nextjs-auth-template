"use client";

import { ThemeProvider } from "../_components/theme-provider";
import { Toaster } from "../_components/ui/sonner";
import { queryClient } from "../_lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export function BaseProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children} <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
