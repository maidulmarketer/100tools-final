import Link from "next/link";
import Image from "next/image";
import Brand from "./Brand";
import Container from "../wrappers/Container";
import { footerLinks, socialLinks } from "@/constants/navigation";

export default function Footer() {
  return (
    <footer>
      <Container
        className={`relative border-t-2 border-odtheme/10 mb-24 md:mb-8 z-10`}
      >
        <section className="flex flex-wrap md:flex-nowrap justify-between py-4 items-center">
          <Brand sponsor="Stocking AI" />
          <div className="hidden lg:flex gap-6 text-sm font-semibold">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex gap-3 text-sm">
            {socialLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Image alt={link.title} className="w-6 h-6" src={link.logo} />
              </Link>
            ))}
          </div>
          <div className="grid lg:hidden grid-cols-2 gap-x-10 gap-y-3 text-sm font-semibold pt-5">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </footer>
  );
}
