import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(
    isSupabaseConfigured
      ? null
      : "Authentication is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
  );

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;

    let active = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setError(null);
      setIsLoading(false);
    });

    void supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!active) return;
        if (sessionError) {
          setError(sessionError.message);
        } else {
          setSession(data.session);
        }
        setIsLoading(false);
      })
      .catch((sessionError: unknown) => {
        if (!active) return;
        setError(
          sessionError instanceof Error
            ? sessionError.message
            : "Unable to restore the authentication session.",
        );
        setIsLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      isLoading,
      error,
    }),
    [session, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
