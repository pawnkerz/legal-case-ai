import type { SupabaseClient } from "@supabase/supabase-js";

export async function searchAuthorities(client: SupabaseClient, input: { jurisdiction: string; query: string; limit?: number }) {
  const { data, error } = await client.rpc("search_legal_authorities", {
    p_jurisdiction: input.jurisdiction,
    p_query: input.query,
    p_limit: input.limit ?? 20,
  });
  if (error) throw error;
  return data ?? [];
}

export async function listSourceVersions(client: SupabaseClient, sourceId: string) {
  const { data, error } = await client.from("legal_source_versions").select("*").eq("source_id", sourceId).order("retrieved_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
