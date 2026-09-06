import { MobileAppNav } from "@/components/mobile-app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<MobileAppNav/></>;
}
