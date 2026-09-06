import { ShieldCheck } from "lucide-react";

export function PrivacyNotice() {
  return <div className="securityNote"><ShieldCheck size={16}/> Case data is designed for private, user-scoped storage. Do not upload confidential documents until the dedicated backend is active and the application indicates uploads are enabled.</div>;
}
