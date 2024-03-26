"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import imagePlaceHolder from "@/public/images/image-placeholder.webp";
import { useSession } from "next-auth/react";
import { patchUserTool } from "@/services/user/toolsService";
import { MdVerified } from "react-icons/md";

import { Love, Star } from "../svg/icons";
import { useTheme } from "next-themes";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";
import googleLogo from "@/public/images/google.png";

export default function ToolCard({ tool, refetch }) {
  const theme = useTheme();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [isHoverActive, setIsHoverActive] = useState(false);
  const [googleModal, setGoogleModal] = useState(false);

  const toolDetailsLink = `/tool/${tool.slug}`;

  function handleLoveSubmit() {
    if (!isAuthenticated) {
      setGoogleModal(true);
    } else {
      const payload = {
        save_count: tool.is_loved ? tool.save_count - 1 : tool.save_count + 1,
        slug: tool.slug,
      };

      patchUserTool(tool.slug, payload)
        .then((res) => {
          refetch();
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  return (
    <div
      id="card"
      className={`p-4 shadow-md rounded-md flex flex-col justify-between gap-3 ${
        theme.theme === "dark" ? "bg-[#37384D]" : "bg-dtheme shadow-odtheme/10"
      }`}
    >
      <Link
        href={toolDetailsLink}
        id="card-head"
        className="flex items-center gap-3"
      >
        <div id="card-top" className="h-11 overflow-hidden rounded-md">
          <Link
            href={toolDetailsLink}
            className="cursor-pointer"
            onMouseLeave={() => setIsHoverActive(false)}
            onMouseEnter={() => setIsHoverActive(true)}
          >
            <Image
              width={50}
              height={50}
              src={tool.image || imagePlaceHolder}
              alt="card-banner"
              className={cn(
                "w-full h-full object-cover transform transition-transform duration-300",
                isHoverActive && "shadow-lg scale-105"
              )}
              onMouseLeave={() => setIsHoverActive(false)}
              onMouseEnter={() => setIsHoverActive(true)}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={toolDetailsLink}
            className="flex gap-1 items-center text-sm md:text-base font-semibold"
            onMouseLeave={() => setIsHoverActive(false)}
            onMouseEnter={() => setIsHoverActive(true)}
          >
            <span className="cursor-pointer">{tool.name}</span>
            {tool.is_verified && <MdVerified className="w-5 text-[#3BA2F5]" />}
          </Link>
          <div id="category" className="flex items-center gap-1">
            {tool.sub_category.length > 0 &&
              tool.sub_category.map((sc, i) => (
                <Link
                  className="text-[10px] md:text-xs font-semibold text-odtheme/60 cursor-pointer"
                  key={i}
                  href={`ai-tools/${sc.slug}`}
                >
                  {sc.title}
                </Link>
              ))}
          </div>
        </div>
      </Link>

      <Link href={toolDetailsLink} className="leading-[16px]" id="card-center">
        <Link
          className="text-[10px] md:text-xs text-odtheme/70"
          href={toolDetailsLink}
          onMouseLeave={() => setIsHoverActive(false)}
          onMouseEnter={() => setIsHoverActive(true)}
        >
          {tool.short_description}
        </Link>
      </Link>

      <section className="flex justify-between items-center" id="card-bottom">
        <div className="text-xs font-medium">{tool.pricing}</div>

        <div className="flex gap-3 text-odtheme/80">
          <p className="flex items-center gap-1 text-[10px] font-medium leading-[12px]">
            <Star className="w-[12px] h-[12px]" />
            {tool.average_ratings || "0"}
          </p>
          <div className="flex items-center gap-1">
            <Love
              className="w-[10px] h-[9px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(), handleLoveSubmit();
              }}
            />
            <span className="text-[10px] font-medium text-odtheme/80 leading-[12px]">
              {tool.save_count}
            </span>
          </div>
        </div>
      </section>

      <Modal show={googleModal} onClose={() => setGoogleModal(false)}>
        <div className="px-4 py-16 flex flex-col gap-12 justify-center items-center mx-auto w-full">
          <h2 className="font-semibold text-xl">
            Sign in to continue (100% free)
          </h2>
          <p className="text-base font-medium text-center text-odtheme/75">
            To prevent spam, some actions require being signed in. It's free and
            takes a few seconds.
          </p>
          <Button className="bg-odtheme text-dtheme">
            <Image src={googleLogo} alt="google-logo" className="w-5 h-5" />
            Sing in with Google
          </Button>
        </div>
      </Modal>
    </div>
  );
}
