"use client";

import { useState } from "react";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function openPortal() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to open billing portal");
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to open billing portal");
      setLoading(false);
    }
  }
  return <div className="subscribeControl"><button className="button secondary" onClick={openPortal} disabled={loading}>{loading ? "Opening billing…" : "Manage billing"}</button>{error && <span className="inlineError">{error}</span>}</div>;
}
