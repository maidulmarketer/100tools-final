"use client";

import { getPostList } from "@/services/user/postService";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";

export default function BlogList() {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostList().then((res) => res.data),
  });

  if (isLoading) return "Loading.....";

  return (
    <div className="space-y-8">
      <div className="grid gap-2 mt-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4">
        {posts?.results.map((item) => (
          <BlogCard key={item.slug} post={item} />
        ))}
      </div>
    </div>
  );
}
