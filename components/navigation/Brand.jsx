"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useDynamicLogo from "@/hooks/useDynamicLogo";

export default function Brand({ sponsor, className }) {
  const logo = useDynamicLogo();
  return (
    <div
      className={cn(
        "w-fit flex flex-col items-start lg:flex-row gap-x-2 gap-y-1 lg:items-center",
        className
      )}
    >
      <Link href="/">
        <Image src={logo} alt="Logo" className="h-8 w-fit lg:h-10" />
      </Link>
      {/* {sponsor ? (
        <p className="text-[10px] lg:text-base space-x-1">
          <span className="text-odtheme/50">Sponsored by:</span>
          <span className="font-bold underline text-odtheme">{sponsor}</span>
          <span className="underline">(Productivity Tool)</span>
        </p>
      ) : null} */}
    </div>
  );
}
