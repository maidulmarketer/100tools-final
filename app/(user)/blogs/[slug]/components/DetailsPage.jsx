"use client";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Button";
import { useQuery } from "@tanstack/react-query";
import ToolsDetails from "@/components/skeleton/toolsDetails/ToolsDetails";
import imagePlaceHolder from "@/public/images/image-placeholder.webp";
import { getPostDetails } from "@/services/user/postService";
import { IoIosHome } from "react-icons/io";
import { format } from "date-fns";
import PopularPost from "./PopularPost";

export default function DetailsPage({ params }) {
  const {
    isLoading,
    data: post,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [`posts/${params.slug}`],
    queryFn: () => getPostDetails(params.slug).then((res) => res.data),
  });

  if (isLoading) {
    return <ToolsDetails />;
  }

  return (
    <>
      <div className="space-y-3">
        <p className="text-odtheme/40 font-medium">Updated on {format(new Date(post.created_at), "LLLL dd, yyyy")}</p>
        <h1 className="text-5xl font-medium">{post.title}</h1>
        <p>{post.short_description}</p>
        <div>
          <Link href="/">
            <Button variant="dynamic" className="gap-0 px-6 py-4">
              <IoIosHome className="w-7" /> Explore All AI Tools
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="w-full md:w-9/12 flex flex-col gap-4">
          {/* image  */}
          <div>
            <Image
              width={800}
              height={800}
              src={post.avatar || imagePlaceHolder}
              alt="card-banner"
              className="w-full h-full object-cover rounded-md max-h-48 lg:max-h-[359px]"
            />
          </div>
          {/* description details  */}
          <div>
            <div
              className="override-style"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="rounded-md border border-odtheme/20 py-5 px-7 space-y-6">
            <p className="text-2xl font-medium">Popular Posts</p>
            <PopularPost slug={params.slug}/>
          </div>
        </div>
      </div>
    </>
  );
}
