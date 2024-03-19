"use client";
import { useState } from "react";
import Brand from "./Brand";
import Container from "../wrappers/Container";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import Banner from "@/app/(user)/components/Banner";

export default function UserNavbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <nav className={`fixed top-0 w-full bg-dtheme ${isMobileNavOpen ? "z-[999]" : "z-0"}`}>
      <Container className="p-4 md:pb-4 flex flex-row-reverse md:flex-row justify-between items-center relative border-b border-odtheme/25">
        <div className="flex justify-center md:justify-start items-center w-full md:w-auto">
          <Brand sponsor="Stocking AI" />
        </div>
        <div className="hidden md:block">
          <NavLinks />
        </div>
        <NavActions isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen}/>
      </Container>
      <Banner />
    </nav>
  );
}
