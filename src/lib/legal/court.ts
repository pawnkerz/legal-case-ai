export interface CourtAssistPolicy {
  courtId: string;
  electronicDevices: "allowed" | "restricted" | "unknown";
  recording: "allowed" | "restricted" | "unknown";
  liveAiAssist: "allowed" | "requires_permission" | "not_allowed" | "unknown";
  verifiedAt?: string;
  sourceUrl?: string;
}

export function liveAssistAvailable(policy: CourtAssistPolicy) {
  return policy.liveAiAssist === "allowed" && policy.electronicDevices === "allowed" && policy.recording !== "restricted";
}
