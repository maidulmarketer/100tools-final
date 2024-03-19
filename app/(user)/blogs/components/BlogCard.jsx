"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CiShare1 } from "react-icons/ci";

import { cn } from "@/lib/utils";
import Button from "@/components/buttons/Button";
import imagePlaceHolder from "@/public/images/image-placeholder.webp";
import { format } from "date-fns";

export default function BlogCard({ post }) {
  const [isHoverActive, setIsHoverActive] = useState(false);

  const postDetailsLink = `/blogs/${post.slug}`;

  return (
    <div
      id="card"
      className="p-0.5 border border-odtheme/10 rounded-2xl flex flex-col"
    >
      <div id="card-top" className="relative h-40 rounded-t-2xl overflow-hidden">
        <Link href={postDetailsLink}>
          <Image
            width={600}
            height={600}
            src={post.avatar || imagePlaceHolder}
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

      <div id="card-content" className="p-3 pt-4 space-y-4 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="text-odtheme/40 font-medium">Updated on {format(new Date(post.created_at), "LLLL dd, yyyy")}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={postDetailsLink}
            className={`text-xl font-semibold`}
            onMouseLeave={() => setIsHoverActive(false)}
            onMouseEnter={() => setIsHoverActive(true)}
          >
            {post.title}
          </Link>

          <Link
            href={postDetailsLink}
            onMouseLeave={() => setIsHoverActive(false)}
            onMouseEnter={() => setIsHoverActive(true)}
          >
            {post.short_description}
          </Link>
        </div>
      </div>

      <div id="actions" className="flex p-3 border-odtheme/10">
        <Link href={postDetailsLink} className="w-fit">
          <Button variant="secondaryOutlined" className="px-2 py-2">
            Read More
            <CiShare1 className="w-4 h-4 text-odtheme" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
