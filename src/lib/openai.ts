import { LEGAL_SYSTEM_GUARDRAILS, CASE_ANALYSIS_INSTRUCTIONS } from "@/lib/legal/prompts";

const DEFAULT_MODEL = "gpt-5.6-terra";
const OFFICIAL_DOMAINS = [
  "uscis.gov",
  "justice.gov",
  "ecfr.gov",
  "uscode.house.gov",
  "supremecourt.gov",
  "courts.wa.gov",
  "app.leg.wa.gov",
  "leg.wa.gov",
];

export interface LegalAiRequest {
  question: string;
  jurisdiction?: string;
  caseContext?: string;
}

export async function createLegalResponse(input: LegalAiRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const requestId = crypto.randomUUID();
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Client-Request-Id": requestId,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_LEGAL_MODEL ?? DEFAULT_MODEL,
      store: false,
      reasoning: { effort: "medium" },
      instructions: `${LEGAL_SYSTEM_GUARDRAILS}\n\n${CASE_ANALYSIS_INSTRUCTIONS}\n\nUse official primary sources whenever available. Do not state a material legal rule without a source. Jurisdiction: ${input.jurisdiction ?? "unresolved"}.`,
      tools: [{ type: "web_search", filters: { allowed_domains: OFFICIAL_DOMAINS }, search_context_size: "high" }],
      input: input.caseContext ? `CASE CONTEXT:\n${input.caseContext}\n\nUSER QUESTION:\n${input.question}` : input.question,
      max_output_tokens: 5000,
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.error?.message ?? `OpenAI request failed (${response.status})`);
  return { payload, requestId };
}

export function responseText(payload: any): string {
  if (typeof payload?.output_text === "string") return payload.output_text;
  const parts: string[] = [];
  for (const item of payload?.output ?? []) {
    if (item?.type !== "message") continue;
    for (const content of item.content ?? []) if (content?.type === "output_text" && typeof content.text === "string") parts.push(content.text);
  }
  return parts.join("\n");
}
