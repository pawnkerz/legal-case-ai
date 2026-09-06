import type { ComplianceClass } from "@/types/domain";

const representationSignals = [
  "represent me",
  "appear for me",
  "speak for me in court",
  "contact opposing counsel as my lawyer",
  "sign as my attorney",
  "pretend to be my lawyer"
];

const highRiskSignals = [
  "what should i plead",
  "should i accept the plea",
  "should i waive",
  "should i testify",
  "guarantee i win",
  "hide evidence",
  "lie to",
  "destroy evidence"
];

export function classifyLegalRequest(input: string): ComplianceClass {
  const normalized = input.toLowerCase();
  if (representationSignals.some((signal) => normalized.includes(signal))) {
    return "representation_required";
  }
  if (highRiskSignals.some((signal) => normalized.includes(signal))) {
    return "high_risk";
  }
  return "self_help";
}

export function complianceNotice(classification: ComplianceClass) {
  if (classification === "representation_required") {
    return "This request involves legal representation or another licensed function. The platform can help you prepare, organize, research, and understand the process, but it cannot act as your lawyer or appear as counsel.";
  }
  if (classification === "high_risk") {
    return "This is a high-stakes, case-specific legal decision. The platform can explain the governing law, options, consequences, and relevant evidence, but it should not present a licensed-professional decision as its own.";
  }
  return "Legal information and self-help assistance only. This software is not a law firm and does not create an attorney-client relationship.";
}
