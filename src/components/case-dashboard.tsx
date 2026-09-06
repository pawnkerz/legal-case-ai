import { CaseEvidenceManager } from "./case-evidence-manager";
import { CaseTimelineManager } from "./case-timeline-manager";
import { CaseSummaryButton } from "./case-summary-button";
import { DraftStudio } from "./draft-studio";
import { DocumentUpload } from "./document-upload";

export function CaseDashboard({ caseId }: { caseId: string }) {
  return <div className="caseDashboard"><div className="caseActionRow"><CaseSummaryButton caseId={caseId}/><DocumentUpload caseId={caseId}/></div><div className="casePanelGrid"><CaseEvidenceManager caseId={caseId}/><CaseTimelineManager caseId={caseId}/></div><DraftStudio caseId={caseId}/></div>;
}
