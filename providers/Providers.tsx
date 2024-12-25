"use client"

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react";

export function Providers ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null
  }
  return <SessionProvider><NextThemesProvider {...props}>{children}</NextThemesProvider></SessionProvider>
}
