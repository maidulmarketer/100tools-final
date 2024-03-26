import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsSun } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { RiMenu4Line } from "react-icons/ri";
import { WiMoonAltFirstQuarter } from "react-icons/wi";

import { cn } from "@/lib/utils";
import { navLinks, socialLinks } from "@/constants/navigation";

import Container from "../wrappers/Container";
import Button from "../buttons/Button";

export default function MobileNav({isMobileNavOpen, setIsMobileNavOpen}) {
  

  function toggleMobileNav() {
    setIsMobileNavOpen(!isMobileNavOpen);
  }

  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
    toggleMobileNav();
  }

  // Disable vertical scrolling while mobile nav is open
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    function handleResize() {
      // Close mobile menu if window width >= 768px
      if (innerWidth >= 768) {
        setIsMobileNavOpen(false);
      }
    }

    if (isMobileNavOpen) {
      addEventListener("resize", handleResize);
      body.style.height = "100vh";
      body.style.overflowY = "hidden";
    } else {
      body.style.height = "auto";
      body.style.overflowY = "visible";
    }

    return () => removeEventListener("resize", handleResize);
  }, [isMobileNavOpen]);

  return (
    <div>
      <div className="cursor-pointer" onClick={toggleMobileNav}>
        {isMobileNavOpen ? (
          <RxCross1 className="w-6 h-6" />
        ) : (
          <RiMenu4Line className="w-6 h-6 rotate-180" />
        )}
      </div>

      <div
        className={cn(
          "fixed transition-all mb-[60px] bg-dtheme md:mb-0",
          isMobileNavOpen
            ? "inset-0 top-[66px] opacity-100 z-[99]"
            : "top-0 left-0 right-full bottom-full overflow-hidden opacity-0"
        )}
      >
        <Container className="py-0 z-50">
          <ul className="text-center divide-y-2 divide-odtheme/10">
            {navLinks.map((link) => (
              <li key={link.href} className="py-6" onClick={toggleMobileNav}>
                <Link href={link.href} className="text-xl">
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="py-6 flex gap-3 justify-center">
              {socialLinks.map((link) => (
                <Image
                  alt={link.title}
                  key={link.title}
                  src={link.logo}
                  width={30}
                  height={30}
                  className="w-7"
                  onClick={toggleMobileNav}
                />
              ))}
            </li>
          </ul>

          <Button
            variant="dynamic"
            onClick={toggleTheme}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4"
          >
            {theme === "light" ? (
              <WiMoonAltFirstQuarter className="w-5 h-5" />
            ) : (
              <BsSun className="w-5 h-5" />
            )}
            <span className="text-xl">
              {theme === "light" ? "Dark mode" : "Light mode"}
            </span>
          </Button>
        </Container>
      </div>
    </div>
  );
}
