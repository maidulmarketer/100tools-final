"use client";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, updateBlog } from "@/services/admin/blogService";
import { toast } from "sonner";
import Checkbox from "@/components/forms/Checkbox";
import PageTitle from "@/components/ui/PageTitle";
import BackButton from "@/components/buttons/BackButton";

export default function Page() {
  const {
    isLoading: isBlogsLoading,
    data: blogs,
    refetch: refetchBlogs,
    isError: isBlogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs().then((res) => res.data),
  });

  function updateIndexing(slug, is_noindex) {
    const promise = updateBlog(slug, { is_noindex })
      .then(refetchBlogs)
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating..",
      success: "Updated successfully",
      error: "Failed to update...!",
    });
  }

  if (isBlogsLoading) return "Loading...";
  if (isBlogsError) return "Something went wrong!";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <PageTitle title="Blog Pages (No Index)" />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {blogs?.results.map((blog) => (
          <Checkbox
            key={blog.slug}
            checked={blog.is_noindex}
            onChange={(e) => updateIndexing(blog.slug, e.target.checked)}
            isChecked={blog.is_noindex}
            label={`/posts/${blog.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
