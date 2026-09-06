"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, BriefcaseBusiness, MessageSquareText, Scale, UserRound } from "lucide-react";

const items = [
  { href: "/app", label: "Ask AI", Icon: MessageSquareText },
  { href: "/app/cases", label: "Cases", Icon: BriefcaseBusiness },
  { href: "/research", label: "Research", Icon: BookOpenCheck },
  { href: "/account", label: "Account", Icon: UserRound },
];

export function MobileAppNav() {
  const pathname = usePathname();
  return <nav className="mobileAppNav" aria-label="App navigation">{items.map(({ href, label, Icon })=><Link href={href} key={href} className={pathname === href || (href !== "/app" && pathname.startsWith(href)) ? "active" : ""}><Icon size={18}/><span>{label}</span></Link>)}<Link href="/" aria-label="Home"><Scale size={18}/><span>Home</span></Link></nav>;
}
