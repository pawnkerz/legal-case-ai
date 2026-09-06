"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { uploadCaseDocument } from "@/lib/repositories/documents";
import { validateDocumentUpload } from "@/lib/limits";

export function DocumentUpload({ caseId }: { caseId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onFile(file?: File) {
    if (!file) return;
    const validation = validateDocumentUpload(file);
    if (!validation.ok) { setStatus(validation.error); return; }
    setLoading(true); setStatus("");
    try {
      const client = createSupabaseBrowserClient();
      await uploadCaseDocument(client, { caseId, file });
      setStatus("Upload complete.");
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) { setStatus(error instanceof Error ? error.message : "Upload failed"); }
    finally { setLoading(false); }
  }

  return <div className="documentUpload"><input ref={inputRef} type="file" hidden accept=".pdf,.txt,.docx,.jpg,.jpeg,.png,.webp" onChange={(event)=>void onFile(event.target.files?.[0])}/><button className="button" disabled={loading} onClick={()=>inputRef.current?.click()}><Upload size={17}/>{loading ? "Uploading…" : "Upload document"}</button>{status && <span className="uploadStatus">{status}</span>}</div>;
}
