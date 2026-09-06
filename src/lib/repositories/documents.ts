import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "case-documents";

export async function uploadCaseDocument(client: SupabaseClient, input: { caseId: string; file: File }) {
  const { data: userData, error: userError } = await client.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error("Authentication required");
  const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${userData.user.id}/${input.caseId}/${crypto.randomUUID()}-${safeName}`;
  const { error: uploadError } = await client.storage.from(BUCKET).upload(path, input.file, { upsert: false });
  if (uploadError) throw uploadError;
  const { data, error } = await client.from("documents").insert({ case_id: input.caseId, user_id: userData.user.id, name: input.file.name, storage_path: path, mime_type: input.file.type, size_bytes: input.file.size }).select("*").single();
  if (error) {
    await client.storage.from(BUCKET).remove([path]);
    throw error;
  }
  return data;
}
