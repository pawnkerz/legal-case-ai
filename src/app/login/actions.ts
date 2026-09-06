"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function credentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!/^\S+@\S+\.\S+$/.test(email)) redirect("/login?error=Enter%20a%20valid%20email%20address");
  if (password.length < 8) redirect("/login?error=Password%20must%20be%20at%20least%208%20characters");
  return { email, password };
}

export async function login(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword(credentials(formData));
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/app/cases");
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.signUp({ ...credentials(formData), options: { emailRedirectTo: `${origin}/auth/callback` } });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?message=Check%20your%20email%20to%20confirm%20your%20account");
}
