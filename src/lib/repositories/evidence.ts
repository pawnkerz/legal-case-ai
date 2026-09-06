import type { SupabaseClient } from "@supabase/supabase-js";

export async function listEvidence(client: SupabaseClient, caseId: string) {
  const { data, error } = await client.from("evidence_items").select("*").eq("case_id", caseId).order("created_at");
  if (error) throw error;
  return data ?? [];
}

export async function addEvidence(client: SupabaseClient, input: { case_id: string; label: string; kind: string; status?: string; notes?: string | null }) {
  const { data, error } = await client.from("evidence_items").insert({ ...input, status: input.status ?? "collected" }).select("*").single();
  if (error) throw error;
  return data;
}

export async function listTimeline(client: SupabaseClient, caseId: string) {
  const { data, error } = await client.from("case_timeline_events").select("*").eq("case_id", caseId).order("occurred_at");
  if (error) throw error;
  return data ?? [];
}
