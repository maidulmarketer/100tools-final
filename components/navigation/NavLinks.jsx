import { navLinks } from "@/constants/navigation";
import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="flex gap-4 text-sm font-semibold">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.title}
        </Link>
      ))}
    </div>
  );
}
