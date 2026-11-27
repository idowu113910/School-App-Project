import type { AuthError } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

function getClient() {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error(
      "Authentication is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
}

function throwIfError(error: AuthError | null) {
  if (error) throw error;
}

export function getAuthErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const normalized = message.toLowerCase();

  if (normalized.includes("not configured")) {
    return "Authentication is not configured. Contact the app administrator.";
  }
  if (
    normalized.includes("already registered") ||
    normalized.includes("email_exists")
  ) {
    return "An account with this email already exists. Sign in instead.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Your email is not verified yet. Resend the verification email below.";
  }
  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid_credentials")
  ) {
    return "Email or password is incorrect.";
  }
  if (
    normalized.includes("invalid") &&
    (normalized.includes("otp") || normalized.includes("token"))
  ) {
    return "That verification code is invalid or expired. Request a new email and try again.";
  }
  if (
    normalized.includes("rate limit") ||
    normalized.includes("too many requests")
  ) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (normalized.includes("failed to fetch") || normalized.includes("network")) {
    return "Unable to reach the authentication service. Check your connection and try again.";
  }

  return message || "The request could not be completed. Please try again.";
}

export async function signUp(
  email: string,
  password: string,
  phoneNumber: string,
) {
  const client = getClient();
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { phone_number: phoneNumber },
      emailRedirectTo: `${window.location.origin}/accountsetup`,
    },
  });
  throwIfError(error);
  return data;
}

export async function verifySignupCode(email: string, token: string) {
  const { data, error } = await getClient().auth.verifyOtp({
    email,
    token,
    type: "signup",
  });
  throwIfError(error);
  return data;
}

export async function resendSignupEmail(email: string) {
  const { error } = await getClient().auth.resend({
    email,
    type: "signup",
    options: { emailRedirectTo: `${window.location.origin}/accountsetup` },
  });
  throwIfError(error);
}

export async function signIn(email: string, password: string) {
  const { data, error } = await getClient().auth.signInWithPassword({
    email,
    password,
  });
  throwIfError(error);
  return data;
}

export async function requestPasswordReset(email: string) {
  const { error } = await getClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  throwIfError(error);
}

export async function updatePassword(password: string) {
  const { data, error } = await getClient().auth.updateUser({ password });
  throwIfError(error);
  return data;
}

export async function signOut() {
  const { error } = await getClient().auth.signOut();
  throwIfError(error);
}
