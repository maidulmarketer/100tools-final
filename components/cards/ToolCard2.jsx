"use client";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";

import cardBanner from "@/public/images/card-banner.png";
import Badge from "@/components/badges/Badge";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToolCard2({ featured, brandNew, editorsChoice }) {
  const router = useRouter();
  const [isHoverActive, setIsHoverActive] = useState(false);
  const dynamicLink = `/${"abc"}`;

  return (
    <div id="card" className="p-[2px] border border-odtheme/10 rounded-2xl">
      <div
        id="card-top"
        className="relative h-40 rounded-t-2xl overflow-hidden"
      >
        {editorsChoice ? (
          <p className="absolute top-0 bg-brand-gradient text-sm font-semibold whitespace-nowrap animate-infinite-scroll">
            • Editors choice • Editors choice • Editors choice •
          </p>
        ) : null}
        <Link href={dynamicLink}>
          <Image
            src={cardBanner}
            alt="card-banner"
            className={`w-full h-full object-cover transform transition-transform duration-300 ${
              isHoverActive ? "shadow-lg scale-105" : ""
            }`}
            onMouseLeave={() => setIsHoverActive(false)}
            onMouseEnter={() => setIsHoverActive(true)}
          />
        </Link>

        <div className="absolute bottom-3 left-3 flex items-center gap-4">
          {featured ? (
            <Badge variant="primary" className="flex items-center gap-1 py-1">
              <BsStarHalf className="w-3 h-3 text-odtheme" /> Featured
            </Badge>
          ) : null}

          {editorsChoice ? (
            <Badge variant="primary" className="flex items-center gap-1 py-1">
              <BsStarHalf className="w-3 h-3 text-odtheme" /> Editors choice
            </Badge>
          ) : null}

          {brandNew ? (
            <Badge variant="warning" className="py-1">
              New
            </Badge>
          ) : null}
        </div>
      </div>

      <div id="card-content" className="p-3 pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="successTransparent">Free</Badge>
          <Badge variant="dynamic" className="rounded flex items-center gap-1">
            <AiFillHeart className="w-4 h-4 text-gray-500" /> 13
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={dynamicLink}
            className={`text-xl font-semibold`}
            onMouseLeave={() => setIsHoverActive(false)}
            onMouseEnter={() => setIsHoverActive(true)}
          >
            MarketingBlocks
          </Link>
          <Badge variant="dynamic" className="rounded flex items-center gap-1">
            <BsStarHalf className="w-3 h-3 text-odtheme" /> 13
          </Badge>
        </div>

        <Link
          href={dynamicLink}
          onMouseLeave={() => setIsHoverActive(false)}
          onMouseEnter={() => setIsHoverActive(true)}
        >
          Personal Al assistant for effortless chatting and copywriting.
        </Link>

        <div id="features" className="flex items-center gap-1">
          <Badge variant="dynamic">Real Estate</Badge>
          <Badge variant="dynamic">Real Estate</Badge>
          <Badge variant="dynamic">Real Estate</Badge>
        </div>
      </div>
      <div id="actions" className="flex border-t-2 p-3 border-odtheme/10">
        <Button variant="secondaryOutlined">
          Visit Site
          <CiShare1 className="w-4 h-4 text-odtheme" />
        </Button>
        <Button variant="text" onClick={() => router.push(`${dynamicLink}`)}>
          More Details
        </Button>
      </div>
    </div>
  );
}
