import type { SupabaseClient } from "@supabase/supabase-js";

export interface CreateCaseInput {
  title: string;
  matter_type: string;
  jurisdiction_country: string;
  jurisdiction_state?: string | null;
  jurisdiction_county?: string | null;
  court_name?: string | null;
}

export async function listCases(client: SupabaseClient) {
  const { data, error } = await client.from("cases").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createCase(client: SupabaseClient, input: CreateCaseInput) {
  const { data: userData, error: userError } = await client.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error("Authentication required");
  const { data, error } = await client.from("cases").insert({ ...input, user_id: userData.user.id }).select("*").single();
  if (error) throw error;
  return data;
}

export async function getCase(client: SupabaseClient, id: string) {
  const { data, error } = await client.from("cases").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
