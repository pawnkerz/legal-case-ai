"use client";

import { useState } from "react";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function subscribe() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await response.json();
      if (response.status === 401) { window.location.assign("/login?next=/pricing"); return; }
      if (!response.ok) throw new Error(data.error ?? "Unable to start checkout");
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout");
      setLoading(false);
    }
  }

  return <div className="subscribeControl"><button className="button" type="button" onClick={subscribe} disabled={loading}>{loading ? "Opening checkout…" : "Get full access — $59/month"}</button>{error && <span className="inlineError">{error}</span>}</div>;
}
