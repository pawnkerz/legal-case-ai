import type { LegalResponseEnvelope } from "./response";
import { legalResponseIsPublishable } from "./response";

export function enforceLegalAnswerContract(response: LegalResponseEnvelope) {
  if (!response.summary.trim()) throw new Error("Legal response requires a summary.");
  if (!legalResponseIsPublishable(response)) throw new Error("Legal response contains no publishable verified-source links.");
  if (response.complianceClass === "representation_required") {
    return { ...response, nextSteps: ["Use the platform for preparation and research, and obtain authorized representation for representation-required actions."] };
  }
  return response;
}
